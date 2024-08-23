import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  public enteredEmail!: string;

  constructor(public data: DataService) {

  }

  forwardEmail() {
    this.data.email = this.enteredEmail;
    console.log("this.data.email", this.data.email);
    
  }
}
