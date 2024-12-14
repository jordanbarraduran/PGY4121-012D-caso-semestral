import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonDatetime,
} from '@ionic/angular/standalone';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonContent,
    CommonModule,
    FormsModule,
    TabMenuComponent,
  ],
})
export class HorarioPage {
  constructor() {}
}
