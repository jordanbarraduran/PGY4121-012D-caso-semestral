import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard,
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
  IonLabel, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  qrCodeOutline,
  timeOutline,
  bookOutline,
  homeOutline,
  logOutOutline,
  personCircleOutline,
  createOutline,
  calendarOutline,
  mailOutline,
  personOutline,
  schoolOutline,
  keyOutline,
} from 'ionicons/icons';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonCard,
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
    IonLabel, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser: User | null = null;
  userFullName: string = '';

  constructor(private profileService: ProfileService) {
    addIcons({
      'qr-code-outline': qrCodeOutline,
      'time-outline': timeOutline,
      'book-outline': bookOutline,
      'home-outline': homeOutline,
      'log-out-outline': logOutOutline,
      'person-circle-outline': personCircleOutline,
      'create-outline': createOutline,
      'calendar-outline': calendarOutline,
      'mail-outline': mailOutline,
      'person-outline': personOutline,
      'school-outline': schoolOutline,
      'key-outline': keyOutline,
    });
  }

  ngOnInit() {
    this.currentUser = this.profileService.getCurrentUser();
    this.userFullName = this.profileService.getFullName();
  }

  async logout() {
    console.log('Método logout.');
    await this.authService.logout();
  }

  async goToHome() {
    console.log('Método goToHome.');
    this.router.navigate(['/home']);
  }  

  ionViewWillEnter() {
    this.currentUser = this.profileService.getCurrentUser();
    this.userFullName = this.profileService.getFullName();
  }

  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-CL');
  }

  unavailableFunctionToast() {
    // Tu implementación actual
  }
}