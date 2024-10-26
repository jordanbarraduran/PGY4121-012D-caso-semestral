import { Component, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonCardContent,
  IonButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  qrCodeOutline,
  timeOutline,
  bookOutline,
  homeOutline,
  logOutOutline,
} from 'ionicons/icons';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonCardContent,
    IonButton,
    IonIcon,
    IonLabel,
  ],
})
export class HomePage {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.authService.logout(); // This will redirect to login
      return;
    }

    addIcons({
      'qr-code-outline': qrCodeOutline,
      'time-outline': timeOutline,
      'book-outline': bookOutline,
      'home-outline': homeOutline,
      'log-out-outline': logOutOutline,
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      const toast = await this.toastController.create({
        message: 'Sesión cerrada exitosamente',
        color: 'success',
        position: 'bottom',
        duration: 3000,
      });
      toast.present();
    } catch (error) {
      console.error('Error during logout:', error);
      const toast = await this.toastController.create({
        message: 'Error al cerrar sesión',
        color: 'danger',
        position: 'bottom',
        duration: 3000,
      });
      toast.present();
    }
  }

  async unavailableFunctionToast() {
    console.log('Método unavailableFunctionToast.');
    const toast = await this.toastController.create({
      message: 'Funcionalidad no disponible.',
      color: 'danger',
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }
}
