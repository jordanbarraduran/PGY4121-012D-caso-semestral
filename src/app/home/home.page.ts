import { Component, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
// Import | Scanner //
import {
  BarcodeScanner,
  BarcodeFormat,
  Barcode,
  ScanResult,
} from '@capacitor-mlkit/barcode-scanning';

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
  personCircleOutline,
} from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AttendanceService } from '../services/attendance.service';
import { DataQR } from '../models/dataQR';
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
  private authService = inject(AuthService);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private attendanceService = inject(AttendanceService);
  private currentUser = this.profileService.getCurrentUser();
  private storage = inject(StorageService);
  username = this.currentUser?.nombre;

  // Variables | Asistencia //
  listaAsignaturas = this.currentUser?.listaAsignaturas;

  // Variables | Scanner //
  // Almacenar texto del código QR
  scanResult: string = '';
  // Variable para almacenar la disponibilidad del escáner
  isScannerSupported: boolean = false;

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

  async logout() {
    console.log('Método logout.');
    await this.authService.logout();
  }

  async navigateToAttendance() {
    await this.router.navigateByUrl('/attendance');
  }

  async goToProfile() {
    console.log('Método goToProfile.');
    await this.router.navigateByUrl('/profile');
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

  // METODOS | SCANNER //
  // Instala el plugin GoogleBarcodeScanner
  async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  // Solicita permisos al usuario para usar la cámara
  async requestCameraPermissions(): Promise<boolean> {
    // Almacena la propiedad "camera"
    const { camera } = await BarcodeScanner.requestPermissions();

    // Si los permisos para usar la cámara están activados por completo o parcialmente, retorna true
    return camera === 'granted' || camera === 'limited';
  }

  // Escanea el código
  async scan(): Promise<void> {
    // Confirma ejecución del método
    console.log('MÉTODO SCAN EJECUTADO');

    // Verifica los permisos de cámara
    const isPermissionGranted = await this.requestCameraPermissions();

    // Si el permiso es denegado
    if (!isPermissionGranted) {
      console.log('PERMISO DENEGADO');
      // Finaliza la ejecución del escáner
      return;
    }
    // Instala el plugin de Google
    this.installGoogleBarcodeScannerModule();

    // Empieza la ejecución del escáner
    console.log('EMPEZAR ESCANEO...');
    // Obtiene la propiedad 'barcodes' del codigo
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    // Guarda el código escaneado el array
    console.log('ALMACENANDO CODIGO QR...');
    this.scanResult = barcodes[0].rawValue;

    // IMPLEMENTAR: REGEX PARA VALIDAR FORMATO DE CODIGO QR

    // EXTRAER DATOS //
    // Extrae datos del código QR
    const [asignatura, seccion, sala, fecha] = this.scanResult.split('|');

    // Valida si la asignatura y sección corresponden al usuario
    const foundSubject = this.listaAsignaturas?.find(
      (a) =>
        a.nombreAsignatura === asignatura && a.seccionAsignatura === seccion
    );

    if (foundSubject) {
      // TESTING //
      console.log('ASIGNATURA: ' + asignatura);
      console.log('SECCION: ' + seccion);
      console.log('SALA: ' + sala);
      console.log('FECHA: ' + fecha);
      //             //

      // Crea una instancia de Asistencia
      let asistencia: DataQR = {
        asignatura: asignatura,
        seccion: seccion,
        sala: sala,
        fecha: fecha,
      };

      // Almacena la instancia en el storage
      this.storage.setItem('asistencia', asistencia);
    } else {
      // IMPLEMENTAR: ALERT
      console.log('ESTE CODIGO QR NO ES VALIDO PARA ESTE USUARIO');
    }
  }
}
