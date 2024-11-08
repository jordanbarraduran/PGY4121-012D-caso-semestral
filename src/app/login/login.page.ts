import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// Import | Clase Usuario //
import { AuthService } from '../services/auth.service';

// Import | Scanner //
import {
  BarcodeScanner,
  BarcodeFormat,
  Barcode,
} from '@capacitor-mlkit/barcode-scanning';
// Fin | Scanner //

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonInputPasswordToggle,
  ],
})
export class LoginPage implements OnInit {
  // Inyecta el servicio AuthService en la variable authService
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

  welcomeMessage = '¡Bienvenid@ a ';
  subMessage = 'Nos alegra verte otra vez 😊';

  // Variables | Scanner //

  // Array para almacenar códigos QR
  barcodes: Barcode[] = [];
  // Variable para almacenar la disponibilidad del escáner
  isScannerSupported: boolean = false;

  // Fin | Scanner //

  constructor(
    private toastController: ToastController // Indica que este componente depende del service StorageService inicializado en storage.service.ts
  ) {}

  async ngOnInit() {
    // Revisa si hay un usuario logueado
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      console.log('Already logged in user:', currentUser);
      // Redirige al usuario a la página de inicio si ya está logueado
      await this.router.navigateByUrl('/home');
    } else {
      console.log('No user logged in');
    }
  }

  async login(username: string, password: string) {
    if (await this.authService.login(username, password)) {
      console.log('Login successful');
      // Redirect to home page
      this.showToastMessage('Inicio de sesión válido', 'success');
      this.router.navigate(['/home']);
    } else {
      this.showToastMessage('Por favor ingrese todos los campos', 'warning');
      this.showToastMessage('Contraseña incorrecta', 'danger');
    }
  }

  navigateToPasswordReset() {
    this.router.navigate(['/password-reset']);
  }

  async showToastMessage(text: string, msgColor: string) {
    const toast = await this.toastController.create({
      message: text,
      color: msgColor,
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
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    // Guarda el código escaneado el array
    console.log('AGREGANDO CODIGO AL ARRAY...');
    this.barcodes.push(...barcodes);
  }
  // FIN | SCANNER //
}
