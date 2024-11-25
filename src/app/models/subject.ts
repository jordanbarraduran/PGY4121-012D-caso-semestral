import { Attendance } from './attendance';

export interface Subject {
  nombreAsignatura: string;
  seccionAsignatura: string;
  listaAsistencias: Attendance[];
}
