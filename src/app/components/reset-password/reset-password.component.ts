import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, MessagesModule, ButtonGroupModule, FloatLabelModule, FormsModule, ButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  messages: Message[] = [];
  isLoading: boolean = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    this.buildResetPasswordForm();
  }

  buildResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      password_repeat: new FormControl('', [Validators.required]),
    }, { validators: this.passwordsMatchValidator });
  }
  
  // Custom validator to check if passwords match
  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('password_repeat')?.value;

    if (password !== passwordRepeat) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  requestPasswordUpdate() {
    const password = this.resetPasswordForm.get('password')?.value;
    console.log("Password", password);
  
    this.route.params.subscribe((params) => {
      const uidb64 = params['id'];
      const token = params['token'];
  
      this.auth.updatePassword(uidb64, token, password)
        .then((resp: any) => {
          console.log(resp);
          this.messages = [
            { severity: 'success', detail: `${resp.detail}. You will be redirected to login.` },
          ];
          setTimeout(() => {
            this.router.navigateByUrl('login');
          }, 10000);
    
        })
        .catch((e: any) => {
          this.messages = [{ severity: 'error', detail: `${e.error.error}` }];
          console.error(e);
        });
    });
  }

  directToLogin(): void {
    this.router.navigate(['login']);
  }
}