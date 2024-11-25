import { Component, OnInit, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { NavigationService } from '../services/navigation.service';

@Component({
  standalone: true,
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabMenuComponent implements OnInit {
  navigationService = inject(NavigationService);

  constructor() {}

  ngOnInit() {
    console.log('');
  }
}
