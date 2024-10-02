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

  async activateAccount(): Promise<void> {
    // Extract 'uidb64' and 'token' from the route parameters using snapshot or async subscribe
    const uidb64 = this.route.snapshot.params['id'];
    const token = this.route.snapshot.params['token'];

    try {
      // Await the activation response from the auth service
      const response = await this.auth.activateAccount(uidb64, token);
      // If successful, set success flag
      this.activationSuccess = true;
    } catch (e: any) {
      // Handle error and set error message
      this.errorMessage = e.error ? e.error.error : 'Activation failed';
      console.error('Activation failed', e);
    }
  }

  directToLogin(): void {
    this.router.navigate(['login']);
  }
}
