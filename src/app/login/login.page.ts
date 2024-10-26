import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
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
import { NavigationExtras, Router } from '@angular/router';
// Import | Clase Usuario //
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [StorageService, Storage, AuthService],
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
    HttpClientModule,
  ],
})
export class LoginPage implements OnInit {
  welcomeMessage = '¡Bienvenid@ a ';
  subMessage = 'Nos alegra verte otra vez 😊';
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    // Indica que este componente depende del service StorageService inicializado en storage.service.ts
    private storageService: StorageService,
    private authService: AuthService,
  ) {}

  // Valida el inicio de sesión
  async validateLogin() {
    try {
      if (!this.username || !this.password) {
        this.showToastMessage('Por favor ingrese todos los campos', 'warning');
        return;
      }

      console.log('Validando inicio de sesión...');

      if (await this.authService.checkUsernameExists(this.username)) {
        const loginSuccess = await this.authService.login(this.username, this.password);
        
        console.log('loginSuccess:', loginSuccess);

        if (loginSuccess) {
          console.log('Inicio de sesión válido');
          this.showToastMessage('Inicio de sesión válido', 'success');
          this.router.navigate(['/home']);
        } else {
          this.showToastMessage('Contraseña incorrecta', 'danger');
        }
      } else {
        this.showToastMessage('Usuario o contraseña inválidos', 'danger');
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.showToastMessage('Error al iniciar sesión', 'danger');
    }
  }

  navigateToPasswordReset() {
    // const extras = this.createExtrasUserList(this.listOfUsers);
    this.router.navigate(['/password-reset']);
  }

  ngOnInit() {}

  createExtrasUser(username: string): NavigationExtras | undefined {
    return {
      state: {
        user: username,
      },
    };
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
}
