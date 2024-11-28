export interface User {
    uid: string;
    email: string;
    role: 'admin' | 'docente' | 'estudiante';
    nombre: string;
  }