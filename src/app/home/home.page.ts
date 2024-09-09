import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { 
  qrCodeOutline, 
  timeOutline, 
  bookOutline, 
  homeOutline,
  logOutOutline
} from 'ionicons/icons';
import { timeout } from 'rxjs';

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
  username: string = 'guest';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      console.log(`Username: ${state['user']}`);
      this.username = state['user'];
    }

    addIcons({
      'qr-code-outline': qrCodeOutline,
      'time-outline': timeOutline,
      'book-outline': bookOutline,
      'home-outline': homeOutline,
      'log-out-outline': logOutOutline
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
