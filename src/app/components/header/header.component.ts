import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentRoute!: string;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
    
    
  }

  directToHome() {
    this.router.navigate(['videos'])
  }

  login() {
    this.router.navigate(['login'])
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/');
    });
  }

  isShowLoginButtonRoute(): boolean {
    const routesToShow = ['/register', '/', '/forgot-password', '/forgot-username', '/activate', '/reset-password', '/register-success'];
    return routesToShow.includes(this.currentRoute);
  }

  isHideButtonsRoute(): boolean {
    const routesToHide = ['/imprint', '/privacy', '/login'];
    return routesToHide.includes(this.currentRoute);
  }

  public isBlackBackgroundRoute(): boolean {
    const routesToShowBlackBackground = ['/imprint', '/privacy', '/videos'];
    return routesToShowBlackBackground.includes(this.currentRoute);
  }
}
