import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  // Cerrar sesión
  async logout() {
    console.log('Método logout.');
    await this.authService.logout();
  }

  // Navegar | Vista Asistencia
  async navigateToAttendance() {
    await this.router.navigateByUrl('/attendance');
  }

  // Navegar | Vista Perfil
  async navigateToProfile() {
    console.log('Método goToProfile.');
    await this.router.navigateByUrl('/profile');
  }

  // Navegar | Vista Escaner
  async navigateToScan() {
    await this.router.navigateByUrl('/');
  }
}
