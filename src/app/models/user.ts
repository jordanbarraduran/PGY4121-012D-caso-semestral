import { Subject } from './subject';

export interface User {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  carrera: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  listaAsignaturas: Subject[];
}
