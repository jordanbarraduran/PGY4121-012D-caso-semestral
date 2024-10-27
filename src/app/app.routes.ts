import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NoAuthenticationGuard } from './guards/auth.guard';
import { AuthenticationGuard } from './guards/no-auth.guard';
export const routes: Routes = [
  {
    path: 'home',
    canActivate: [NoAuthenticationGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthenticationGuard],
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'password-reset',
    loadComponent: () => import('./password-reset/password-reset.page').then( m => m.PasswordResetPage)
  },

];
