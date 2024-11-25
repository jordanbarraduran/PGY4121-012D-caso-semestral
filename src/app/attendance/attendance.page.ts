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
  IonIcon,
} from '@ionic/angular/standalone';

import { AttendanceService } from '../services/attendance.service';

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
    IonIcon,
    TabMenuComponent,
  ],
})
export class AttendancePage implements OnInit {
  private attendanceService = inject(AttendanceService);
  asistencia = this.attendanceService.asistenciaData;
  asistenciaData = this.asistencia.then((data) => {
    return data.asignatura;
  });

  constructor() {}

  ngOnInit() {
    console.log('ASISTENCIA DATA: ' + this.asistenciaData);
  }
}
