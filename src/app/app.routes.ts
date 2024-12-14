import { Routes } from '@angular/router';
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
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'password-reset',
    loadComponent: () =>
      import('./password-reset/password-reset.page').then(
        (m) => m.PasswordResetPage
      ),
  },
  {
    path: 'profile',
    canActivate: [NoAuthenticationGuard],
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./attendance/attendance.page').then((m) => m.AttendancePage),
  },
  {
    path: 'admin',
    canActivate: [NoAuthenticationGuard],
    loadComponent: () => import('./admin/admin.page').then((m) => m.AdminPage),
  },
  {
    path: 'generar',
    canActivate: [NoAuthenticationGuard],
    loadComponent: () =>
      import('./generar/generar.page').then((m) => m.GenerarPage),
  },
  {
    path: 'horario',
    loadComponent: () =>
      import('./horario/horario.page').then((m) => m.HorarioPage),
  },

  // IMPORTANTE: NotFound debe ser el último path de la lista, sino sobreescribe a los demás //
  {
    path: '**',
    loadComponent: () =>
      import('./notfound/notfound.page').then((m) => m.NotfoundPage),
  },

  // -------------------------------------------------------------- //
];
