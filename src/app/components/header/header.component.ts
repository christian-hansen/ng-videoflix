import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule],
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

  isShowLoginButtonRoute(): boolean {
    const routesToShow = ['/register', '/', '/forgot-password', '/forgot-username', '/activate', '/reset-password', '/register-success'];  // Routes where the login button should not be hidden
    return routesToShow.includes(this.currentRoute);
  }

  public isBlackBackgroundRoute(): boolean {
    const routesToShowBlackBackground = ['/imprint', '/privacy'];  // Routes where the login button should not be hidden
    return routesToShowBlackBackground.includes(this.currentRoute);
  }
}
