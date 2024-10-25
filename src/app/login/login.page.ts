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
import { User, UserList } from '../User';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [StorageService, Storage],
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
  welcomeMessage = '¡Bienvenid@ a ';
  subMessage = 'Nos alegra verte otra vez 😊';
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    // Indica que este componente depende del service StorageService inicializado en storage.service.ts
    private service: StorageService
  ) {}

  // Instanciar Usuarios //
  user1 = new User('admin', '12345');
  user2 = new User('jordan', '123j');
  user3 = new User('atenas', '123a');

  // Agregar Usuarios a la Lista de Usuarios //
  listOfUsers = new UserList().addUser(this.user1, this.user2, this.user3);

  // Valida el inicio de sesión
  validateLogin() {
    console.log('Ejecutando validacion!');
    // Revisa si la contraseña ingresada es correcta
    if (this.listOfUsers.validatePassword(this.username, this.password)) {
      // Si es correcta, el usuario ingresa correctamente al home
      this.showToastMessage('Inicio de sesion válido.', 'success');
      this.welcomeMessage = `Bienvenido ${this.username}`;

      const extras = this.createExtrasUser(this.username);
      this.router.navigate(['/home'], extras);
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

  // createExtrasUserList(userList: UserList): NavigationExtras | undefined {
  //   return {
  //     state: {
  //       userList: userList,
  //     },
  //   };
  // }

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
