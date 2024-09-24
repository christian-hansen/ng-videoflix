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
isLoading: boolean = false;
// public isCookieSet: boolean = false;
loginForm!: FormGroup;
messages: Message[] = [];

constructor(private data:DataService) {

}

ngOnInit(){
  this.buildLoginForm();
  
  // this.email = this.data.email;
}

buildLoginForm() {
  this.loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    setCookie: new FormControl<string | null>(null)
});
  this.watchSetCookieChanges();
}

test() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Username:', username);
    console.log('Password:', password);
    this.data.username = username;
    console.log("this.data.username", this.data.username);
    let error = {
      status: 'Status', 
      error: {
non_field_errors: 'Non field error'}
      }
    this.displayErrorMessage(error)
    
  }

  watchSetCookieChanges() {
    this.loginForm.get('setCookie')?.enable;
    this.loginForm.get('setCookie')?.valueChanges.subscribe(value => {  
      if (value[0] === "cookieSet") {
        console.log("Cookie set");
        //TODO save cookie
      } else {
        console.log("Cookie not set");
        //TODO clear cookie
      }
    });
  }

  displayErrorMessage(e: any) {
    console.log(e);
    
    if (e.status === 0) {
      console.error(e)
      this.messages = [
        { severity: 'info', detail: `There is a problem with the server (${e.status})` },
      ];}
    else {
      this.messages = [
        { severity: 'info', detail: `${e.error.non_field_errors} (${e.status})` },
      ];}
    this.isLoading = false;
    }

}
