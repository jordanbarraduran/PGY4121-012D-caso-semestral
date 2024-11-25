import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, NgFor, FormsModule],
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
