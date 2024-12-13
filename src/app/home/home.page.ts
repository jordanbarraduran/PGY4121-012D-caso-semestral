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
import { DataService } from '../services/data.service';

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

  private dataService = inject(DataService);

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

  async testing() {
    let isDuplicated: boolean = false;

    if (this.currentUser?.uid != undefined) {
      const asistencias = await this.dataService.getAsistenciasPorEstudiante(
        this.currentUser?.uid
      );

      const foundDuplicated = asistencias.filter(
        (a) => a.asignatura == 'PGY4121' && a.fecha == '20241104'
      );

      console.log(foundDuplicated.length);

      if (foundDuplicated.length > 0) {
        isDuplicated = true;
      }

      console.log(isDuplicated);
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
