import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent {

  constructor(private router: Router) {}

  directToLogin() {
      this.router.navigate(['login']);
  }

}
