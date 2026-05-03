import { Injectable, signal } from '@angular/core';

export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];
  currentUser = signal<User | null>(null);

  register(user: User): boolean {
    if (this.users.some(u => u.username === user.username)) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  login(username: string, password: string): boolean {
    const found = this.users.find(
      u => u.username === username && u.password === password
    );
    if (found) {
      this.currentUser.set(found);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
  }
}
