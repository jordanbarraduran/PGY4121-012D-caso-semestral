import { Component, inject } from '@angular/core';
import { ToastController, IonicModule } from '@ionic/angular';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';
import { NavigationService } from '../services/navigation.service';
import { addIcons } from 'ionicons';
import {
  qrCodeOutline,
  timeOutline,
  bookOutline,
  homeOutline,
  logOutOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, TabMenuComponent],
})
export class HomePage {
  private profileService = inject(ProfileService);
  private currentUser = this.profileService.getCurrentUser();
  username = this.currentUser?.nombre;
  navigationService = inject(NavigationService);

  // Variables | Asistencia //
  // listaAsignaturas = this.currentUser?.listaAsignaturas;

  constructor(private toastController: ToastController) {
    addIcons({
      'qr-code-outline': qrCodeOutline,
      'time-outline': timeOutline,
      'book-outline': bookOutline,
      'home-outline': homeOutline,
      'log-out-outline': logOutOutline,
      'person-circle-outline': personCircleOutline,
    });
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
