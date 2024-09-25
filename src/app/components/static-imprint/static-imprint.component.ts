import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-static-imprint',
  standalone: true,
  imports: [],
  templateUrl: './static-imprint.component.html',
  styleUrl: './static-imprint.component.scss'
})
export class StaticImprintComponent {

  constructor(private router: Router) {}

  isImprintRoute(): boolean {
    return this.router.url === '/imprint';
  }
}

