import { Component, OnInit } from '@angular/core';
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
import { NavigationExtras, Router } from '@angular/router';

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
  welcomeMessage: string;
  subMessage: string;
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
  ) {
    this.welcomeMessage = '¡Bienvenid@ a ';
    this.subMessage = 'Nos alegra verte otra vez 😊';
  }

  validateLogin() {
    console.log('Ejecutando validacion!');
    if (this.username === 'admin' && this.password === '12345') {
      this.showToastMessage('Inicio de sesion válido.', 'success');
      this.welcomeMessage = `Bienvenido ${this.username}`;

      const extras = this.createExtrasUser(this.username);
      this.router.navigate(['/home'], extras);
    } else {
      this.showToastMessage('Inicio de sesion inválido.', 'danger');
    }
  }

  navigateToPasswordReset() {
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
