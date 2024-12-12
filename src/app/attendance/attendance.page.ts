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
  IonList,
  IonIcon,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Asignatura } from '../models/asignatura.model';
import { ProfileService } from '../services/profile.service';
import { Asistencia } from '../models/asistencia.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonList,
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
  profileService = inject(ProfileService);
  asignaturas: Asignatura[] = [];
  asistencias: Asistencia[] = [];
  currentUser = this.profileService.getCurrentUser()?.uid;

  constructor() {}

  ngOnInit() {
    if (this.currentUser) {
      this.dataService
        .getAsistenciasPorEstudiante(this.currentUser)
        .then((asistenciasArray) => {
          asistenciasArray.map((asistencia) => {
            this.asistencias.push(asistencia);
          });
        });
    }
  }
}
