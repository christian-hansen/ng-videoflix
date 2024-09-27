import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss',
})
export class ActivateComponent {
  activationSuccess: boolean = false;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.activateAccount();
  }

  activateAccount(): void {
    this.route.params.subscribe((params) => {
      const uidb64 = params['id'];
      const token = params['token'];

      this.auth.activateAccount(uidb64, token).subscribe({
        next: (response) => {
          this.activationSuccess = true;
        },
        error: (error) => {
          this.errorMessage = error.error.error;
        },
      });
    });
  }

  directToLogin(): void {
    this.router.navigate(['login']);
  }
}
