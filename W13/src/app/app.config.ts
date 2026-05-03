import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Profile } from './profile/profile';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter([
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: 'profile', component: Profile }
    ])
  ]
};
