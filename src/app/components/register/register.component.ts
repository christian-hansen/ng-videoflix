import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Message } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { AutoFocusModule } from 'primeng/autofocus';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, CardModule, PasswordModule, ReactiveFormsModule, MessagesModule, CheckboxModule, DividerModule, AutoFocusModule, FloatLabelModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  isCookieSet: boolean = false;
  messages: Message[] = [];
  
  constructor(private data:DataService, private auth: AuthService, private router: Router,) {
  
  }

  ngOnInit(){
    console.log("this.data.email in register component", this.data.email);
    this.buildRegisterForm();

      // Subscribe to form's statusChanges to log validity state
  this.registerForm.statusChanges.subscribe(status => {
    console.log('Form Valid:', this.registerForm.valid);
  });
  }

  buildRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      first_name: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      last_name: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      password: new FormControl('', [Validators.required]),
      password_repeat: new FormControl('', [Validators.required]),
    }, { validators: this.passwordsMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('password_repeat')?.value;

    if (password !== passwordRepeat) {
      // this.messages = [
      //   { severity: 'error', detail: `Passwords are not matching` },
      // ];
      return { passwordsMismatch: true };
    }
    return null;
  }

  async register() {
    this.isLoading = true;
    let regFormData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      password: this.registerForm.value.password,
    };

    console.log(regFormData);
    

    try {
        let resp: any = await this.auth.registerWithUsernameAndPassword(regFormData);
        console.log(resp.message);
        this.router.navigate(['/register-success']);
      } catch (e: any) {
        this.messages = [{ severity: 'error', detail: `${e.error.error}` }];
        console.error(e);
        this.resetForm();
      }
    } 
  

  isEmailAdressDefined() {
    if (this.data.email === undefined) return false
    else return true
  }

  resetForm() {
    this.isLoading = false;
  }

}
