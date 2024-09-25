import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { Message } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, CardModule, PasswordModule, ReactiveFormsModule, MessagesModule, CheckboxModule, DividerModule, AutoFocusModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  isCookieSet: boolean = false;
  messages: Message[] = [];
  
  constructor(private data:DataService) {
  
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
      // first_name: new FormControl('', [
      //   Validators.minLength(2),
      //   Validators.required,
      // ]),
      // last_name: new FormControl('', [
      //   Validators.minLength(2),
      //   Validators.required,
      // ]),
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

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.get('username')?.value);
      console.log(this.registerForm.get('email')?.value);
      console.log(this.registerForm.get('password')?.value);
      
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
