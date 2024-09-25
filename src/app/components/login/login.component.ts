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
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

constructor(private data:DataService, private router: Router, private auth: AuthService) {

}

ngOnInit(){
  this.buildLoginForm();
}

buildLoginForm() {
  this.loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    setCookie: new FormControl<string | null>(null)
});
  this.watchSetCookieChanges();
}

  async login() {
    this.isLoading = true;
    let loginFormData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    try {
      let resp: any = await this.auth.loginWithUsernameAndPassword(loginFormData);
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/videos');
    } catch (e: any) {
      this.displayErrorMessage(e)
    }
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
