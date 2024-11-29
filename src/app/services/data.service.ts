import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Asignatura } from '../models/asignatura.model';
import { Seccion } from '../models/seccion.model';
import { User } from '../models/user.model';
import { Clase } from '../models/clase.model';
import { Asistencia } from '../models/asistencia.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);

  constructor() { }

  // Métodos para Usuarios
  async getUser(userId: string): Promise<User | null> {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // We create a User object that matches our interface
        const userData = userDoc.data();
        const user: User = {
          uid: userDoc.id,  // Document ID becomes the uid
          email: userData['email'],
          rol: userData['rol'],
          nombre: userData['nombre'],
          carrera: userData['carrera'] // This will be undefined if not present, which is fine due to optional ?
        };
        
        return user;
      } else {
        console.log('No se encontró usuario con ID:', userId);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  // Métodos para Asignaturas
  async createSubject(asignatura: Partial<Asignatura>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'asignaturas'), asignatura);
      console.log('Asignatura creada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear asignatura:', error);
      throw error;
    }
  }

  async getSubjects(): Promise<Asignatura[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'asignaturas'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Asignatura
      }));
    } catch (error) {
      console.error('Error al obtener asignaturas:', error);
      throw error;
    }
  }

  // Métodos para Secciones
  async createSection(seccion: Partial<Seccion>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'secciones'), seccion);
      console.log('Sección creada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear sección:', error);
      throw error;
    }
  }

  async getSectionsBySubject(asignaturaId: string): Promise<Seccion[]> {
    try {
      const q = query(
        collection(this.firestore, 'secciones'),
        where('asignaturaId', '==', asignaturaId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Seccion
      }));
    } catch (error) {
      console.error('Error al obtener secciones:', error);
      throw error;
    }
  }

  // Obtener secciones de un profesor específico
  async getSeccionesByProfesor(profesorId: string): Promise<Seccion[]> {
    try {
      const q = query(
        collection(this.firestore, 'secciones'),
        where('docenteId', '==', profesorId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Seccion
      }));
    } catch (error) {
      console.error('Error al obtener secciones del profesor:', error);
      throw error;
    }
  }

  // Crear una nueva clase - será usada por el docente para generar QR de clase
  async createClase(clase: Partial<Clase>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'clases'), clase);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear clase:', error);
      throw error;
    }
  }

  // Registrar asistencia
  async registrarAsistencia(asistencia: Partial<Asistencia>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'asistencias'), asistencia);
      return docRef.id;
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      throw error;
    }
  }
}
