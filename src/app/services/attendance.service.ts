import { inject, Injectable, OnInit } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private storageService = inject(StorageService);
  asistenciaData = this.storageService.getItem('asistencia');

  constructor() {}

  // FOR TESTING //
  printAsistenciaData() {
    this.asistenciaData.then((data) => {
      console.log(data);
    });
  }
  // --------- //
}
