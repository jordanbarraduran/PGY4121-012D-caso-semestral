import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private confirmDialogController: AlertController) {}

  // Cerrar sesión
  async logout() {
    console.log('Método logout.');
    await this.authService.logout();
  }

  // Abrir | Escaner
  async openScanner() {
    const confirmDialogAlert = await this.confirmDialogController.create({
      header: 'Acción crítica',
      message:
        'Una vez ejecutada esta acción, no podrá ser revertida, ¿desea continuar?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => {
            this.scannerService.scan();
          },
        },
      ],
    });
    await confirmDialogAlert.present();
  }

  async confirmLogout() {
    const confirmDialogAlert = await this.confirmDialogController.create({
      header: 'Cierre de sesión',
      message:
        '¿Está seguro que desea cerrar sesión?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await confirmDialogAlert.present();
  }

  async navigateToHorario() {
    await this.router.navigateByUrl('/horario');
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
