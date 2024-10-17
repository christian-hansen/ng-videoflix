import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-videoflix';
  hideFooter = false;
  hideHeader = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Subscribe to router events to detect route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkFooterVisibility();
    });
  }

  checkFooterVisibility() {
    const currentUrl = this.router.url;

    // Hide the footer for /videos/:id route
    if (currentUrl.startsWith('/videos/')) {
      this.hideFooter = true;
      this.hideHeader = true;
    } else {
      this.hideFooter = false;
      this.hideHeader = false;
    }
  }
}

