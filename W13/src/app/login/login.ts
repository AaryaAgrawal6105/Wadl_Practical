import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  message = '';

  submit() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.message = 'Invalid username or password.';
    }
  }
}
