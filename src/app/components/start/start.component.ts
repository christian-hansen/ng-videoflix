import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  public enteredEmail!: string;


  forwardEmail() {
    console.log("this.enteredEmail", this.enteredEmail);
    
  }
}
