import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User, UserList } from '../User';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonToast,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    RouterLink,
  ],
})
export class PasswordResetPage implements OnInit {
  user!: string;
  // userList!: UserList;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  // testing() {
  //   console.log(this.userList);
  // }

  async showToast(
    position: 'top' | 'middle' | 'bottom',
    msg: string,
    color: string
  ) {
    // Crea un toast con los siguientes parámetros
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color,
    });

    await toast.present();
  }

  resetPassword() {
    if (this.user === 'admin') {
      this.showToast(
        'bottom',
        'Contraseña reestablecida correctamente.',
        'success'
      );
      this.router.navigate(['/login']);
    } else {
      this.showToast(
        'bottom',
        'El usuario ingresado no fue encontrado.',
        'danger'
      );
    }
  }

  ngOnInit() {}
}
