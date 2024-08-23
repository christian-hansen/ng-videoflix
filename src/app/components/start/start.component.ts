import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  public enteredEmail!: string;

  constructor(public data: DataService, private router: Router) {

  }

  forwardEmailToSignUp() {
    this.data.email = this.enteredEmail;
    this.router.navigate(['register'])
    console.log("this.data.email", this.data.email);
    
  }
}
