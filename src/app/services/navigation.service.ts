import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ScannerService } from './scanner.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private authService = inject(AuthService);
  private scannerService = inject(ScannerService);

  private router = inject(Router);

  constructor() {}

  // Cerrar sesión
  async logout() {
    console.log('Método logout.');
    await this.authService.logout();
  }

  // Abrir | Escaner
  async openScanner() {
    this.scannerService.scan();
  }

  // Navegar | Vista Recuperar Contraseña
  async navigateToPasswordReset() {
    console.log('FUNCION: navigateToPasswordReset()');
    await this.router.navigateByUrl('/password-reset');
  }

  // Navegar | Vista Asistencia
  async navigateToAttendance() {
    console.log('FUNCION: navigateToAttendance()');
    await this.router.navigateByUrl('/attendance');
  }

  // Navegar | Vista Perfil
  async navigateToProfile() {
    console.log('FUNCION: navigateToProfile()');
    await this.router.navigateByUrl('/profile');
  }

  // Navegar | Vista Inicio
  async navigateToHome() {
    console.log('FUNCION: navigateToHome()');
    await this.router.navigateByUrl('/home');
  }

  // Navegar | Vista Admin
  async navigateToAdmin() {
    console.log('FUNCION: navigateToAdmin()');
    await this.router.navigateByUrl('/admin');
  }

  // Navegar | Vista Generar QR
  async navigateToGenerateQR() {
    console.log('FUNCION: navigateToGenerateQR()');
    await this.router.navigateByUrl('/generar');
  }
}
