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
  selector: 'app-forgot-username',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, MessagesModule, FloatLabelModule, RouterLink, RouterLinkActive],
  templateUrl: './forgot-username.component.html',
  styleUrl: './forgot-username.component.scss'
})
export class ForgotUsernameComponent {
  forgotUsernameForm!: FormGroup;
  messages: Message[] = [];
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(){
    this.buildForgotUsernameForm();
  // Subscribe to form's statusChanges to log validity state
  // this.forgotPasswordForm.statusChanges.subscribe(status => {
  //   console.log('Form Valid:', this.forgotPasswordForm.valid);
  //   });
  }
  
  
  buildForgotUsernameForm() {
    this.forgotUsernameForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
  });
  }

  async triggerForgotUsernameMail() {
    const email = this.forgotUsernameForm.get('email')?.value
    try {
      let resp: any = await this.auth.requestUsernameReminder(email);
      console.log(resp);
      this.messages = [
        { severity: 'success', detail: `${resp.detail} Please check your emails.` },
      ];
      console.log("Username reminder mail sent to", email);
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
