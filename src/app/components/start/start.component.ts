import { Component } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MessagesModule, ButtonModule, FormsModule, InputTextModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  public enteredEmail!: string;
  errors: Message[] = [];

  constructor(public data: DataService, private router: Router) {}

  forwardEmailToSignUp() {
    if (!this.isEmailValid()) this.displayError();
    else {
      this.data.email = this.enteredEmail;
      this.router.navigate(['register']);
    }
  }

  isEmailValid(): boolean {
    // Define the email pattern as a regular expression
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/;

    // Test the enteredEmail against the pattern
    return emailPattern.test(this.enteredEmail);
  }

  displayError() {
    this.errors = [
      { severity: 'info', detail: `Please enter a valid email address` },
    ];
  }
}
