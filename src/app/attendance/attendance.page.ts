import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';
import {
  IonContent,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Asignatura } from '../models/asignatura.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonContent,
    CommonModule,
    FormsModule,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonButton,
    TabMenuComponent,
  ],
})
export class AttendancePage implements OnInit {
  dataService = inject(DataService);
  asignaturas: Asignatura[] = [];

  constructor() {}

  ngOnInit() {
    this.dataService.getSubjects().then((asignaturaArray) => {
      asignaturaArray.map((asignatura) => {
        this.asignaturas.push(asignatura);
      });
    });
  }
}
