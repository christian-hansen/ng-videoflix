import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, CardModule, PasswordModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
loginForm!: FormGroup;
public email!: string;
public password!: string;


constructor(private data:DataService) {

}

ngOnInit(){
  this.buildLoginForm();
  this.email = this.data.email;
}

buildLoginForm() {
  this.loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
});
}

test() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Email:', email);
    console.log('Password:', password);
    this.data.email = email;
    console.log("this.data.email", this.data.email);
    
  }
}
