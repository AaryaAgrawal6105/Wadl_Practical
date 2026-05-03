import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html'
})
export class Profile {
  private auth = inject(AuthService);
  private router = inject(Router);
  user = this.auth.currentUser;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
