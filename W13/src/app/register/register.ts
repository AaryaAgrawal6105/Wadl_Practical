import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = { fullName: '', username: '', email: '', password: '' };
  message = '';

  submit() {
    if (!this.user.username || !this.user.password) {
      this.message = 'Username and password are required.';
      return;
    }
    if (this.auth.register({ ...this.user })) {
      this.message = 'Registered successfully! Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.message = 'Username already exists.';
    }
  }
}
