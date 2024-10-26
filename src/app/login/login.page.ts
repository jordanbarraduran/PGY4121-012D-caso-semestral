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
    console.log('Ejecutando validacion!');
    // Revisa si el usuario y contraseña son correctos
    if (await this.authService.checkUsernameExists(this.username)) {
      console.log('Usuario existe!');

      // login
      const user = await this.authService.login(this.username, this.password);

      if (this.authService.isAuthenticated()) {
        this.showToastMessage('Inicio de sesion válido.', 'success');
        this.welcomeMessage = `Bienvenido ${user}`;
        const extras = this.createExtrasUser(this.username);
        this.router.navigate(['/home'], extras);
      } else {
        this.showToastMessage('Inicio de sesion inválido.', 'danger');
      }
  } else {
      // Si es incorrecta, se muestra un mensaje de error
      this.showToastMessage('Inicio de sesion inválido.', 'danger');
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
