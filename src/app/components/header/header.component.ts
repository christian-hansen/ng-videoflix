import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentRoute!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  directToHome() {
    this.router.navigate([''])
  }

  login() {
    this.router.navigate(['login'])
  }

  isHideLoginButtonRoute(): boolean {
    const routesToHide = ['/register', '/'];  // Routes where the login button should be hidden
    return routesToHide.includes(this.currentRoute);
  }
}
