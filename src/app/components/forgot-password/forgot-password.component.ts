import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Message } from 'primeng/api';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, MessagesModule, FloatLabelModule, RouterLink, RouterLinkActive],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  messages: Message[] = [];
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(){
    this.buildForgotPasswordForm();
  // Subscribe to form's statusChanges to log validity state
  // this.forgotPasswordForm.statusChanges.subscribe(status => {
  //   console.log('Form Valid:', this.forgotPasswordForm.valid);
  //   });
  }
  
  
  buildForgotPasswordForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
  });
  }

  async triggerForgotPasswordMail() {
    const email = this.forgotPasswordForm.get('email')?.value
    try {
      let resp: any = await this.auth.requestPasswordReset(email);
      // console.log(resp);
      this.messages = [
        { severity: 'success', detail: `${resp.detail} Please check your emails and follow the instructions to reset your password.` },
      ];
      // console.log("Password reset mail sent to", email);
      setTimeout(() => {
        this.router.navigateByUrl('login');
      }, 10000);

    } catch (e: any) {
      this.displayErrorMessage(e)
    }
  }

  displayErrorMessage(e: any) {    
    if (e.status === 0 || e.status === 500) {
      console.error(e)
      this.messages = [
        { severity: 'info', detail: `There is a problem with the server (${e.status})` },
      ];}
    else if (e.status === 403 || e.status === 404) {
      this.messages = [
        { severity: 'info', detail: `${e.error.error}` },
      ];
    }
    else {
      this.messages = [
        { severity: 'info', detail: `${e.error.non_field_errors} (${e.status})` },
      ];}
    this.isLoading = false;
    }

}
