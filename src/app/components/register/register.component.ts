import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    // this.email = this.data.email;
  }

  buildRegisterForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      first_name: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      password: new FormControl('', [Validators.required]),
      password_repeat: new FormControl('', [Validators.required]),

  });
  }

  register() {

  }

  isEmailAdressDefined() {
    if (this.data.email === undefined) return false
    else return true
  }

  resetForm() {
    this.isLoading = false;
  }

  isPassWordsMatching(): boolean {
    return this.registerForm.value.password === this.registerForm.value.password_repeat;
  }
}
