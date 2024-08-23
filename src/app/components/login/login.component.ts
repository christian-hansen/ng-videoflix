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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, CardModule, PasswordModule, ReactiveFormsModule, MessagesModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
loginForm!: FormGroup;
isLoading: boolean = false;
isCookieSet: boolean = false;
messages: Message[] = [];

constructor(private data:DataService) {

}

ngOnInit(){
  this.buildLoginForm();
  // this.email = this.data.email;
}

buildLoginForm() {
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    setCookie: new FormControl<string | null>(null)
});
}

test() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Email:', email);
    console.log('Password:', password);
    this.data.email = email;
    console.log("this.data.email", this.data.email);
    let error = {
      status: 'Status', 
      error: {
non_field_errors: 'Non field error'}
      }
    this.displayErrorMessage(error)
    
  }

setCookie() {
  const currentValue = this.loginForm.get('setCookie')?.value;
  if (currentValue) {
    console.log("Cookie set");
  } else {
    console.log('Cookie not set');
    
  }
  
}

  displayErrorMessage(e: any) {
    if (e.status === 0) {
      console.error(e)
      this.messages = [
        { severity: 'error', detail: `There is a problem with the server (${e.status})` },
      ];}
    else {
      this.messages = [
        { severity: 'error', detail: `${e.error.non_field_errors} (${e.status})` },
      ];}
    this.isLoading = false;
    }

}
