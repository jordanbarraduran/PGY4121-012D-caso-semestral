import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Asignatura } from '../models/asignatura.model';
import { Seccion } from '../models/seccion.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);

  constructor() { }

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
}
