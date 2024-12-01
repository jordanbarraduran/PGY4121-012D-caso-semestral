import { Component, OnInit, inject } from '@angular/core';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { shieldCheckmarkOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
// SERVICES //
import { ProfileService } from '../services/profile.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  standalone: true,
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule],
})
export class TabMenuComponent implements OnInit {
  navigationService = inject(NavigationService);
  currentUser = inject(ProfileService).getCurrentUser() as User;

  constructor() {
    console.log('TAB-MENU INICIALIZADO');
    addIcons({
      'shield-checkmark-outline': shieldCheckmarkOutline,
    });
  }

  ngOnInit() {
    console.log('currentUser', this.currentUser, 'on tab-menu');
  }
}
