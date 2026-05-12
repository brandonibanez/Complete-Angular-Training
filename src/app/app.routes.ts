import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { 
    path: 'signup', 
    loadComponent: () => import('./auth/signup/signup.component')
      .then(m => m.SignupComponent),
    canActivate: [authGuard]
  },
];