import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { DataService } from '../services/data.service';
import { ProfileService } from '../services/profile.service';
import { Asignatura } from '../models/asignatura.model';
import { Seccion } from '../models/seccion.model';
import {
  AlertController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonNote,
  IonButton,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  // Importamos todos los componentes que necesitamos de Ionic y Angular
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuComponent,
    // Componentes específicos de Ionic que usaremos
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonNote,
    IonButton,
    IonList,
    IonSelect,
    IonSelectOption,
  ],
})
export class AdminPage implements OnInit {
  // Inyección de servicios mediante inject()
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private profileService = inject(ProfileService);
  private alertController = inject(AlertController);

  // Variables de estado y formularios
  asignaturaForm: FormGroup;
  seccionForm: FormGroup;
  asignaturas: Asignatura[] = [];
  secciones: Seccion[] = [];
  currentSegment = 'asignaturas'; // Para controlar el segmento activo

  constructor() {
    // Inicializamos los formularios con sus validadores
    this.asignaturaForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(2)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.seccionForm = this.fb.group({
      asignaturaId: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  // Método para manejar el cambio de segmento
  segmentChanged(event: any) {
    this.currentSegment = event.detail.value;
  }

  ngOnInit() {
    this.loadSubjects();
  }

  async loadSubjects() {
    try {
      this.asignaturas = await this.dataService.getSubjects();
    } catch (error) {
      this.showAlert('Error', 'No se pudieron cargar las asignaturas');
      console.error('Error al cargar asignaturas:', error);
    }
  }

  async loadUserDetails(userId: string) {
    try {
      const user = await this.dataService.getUser(userId);
      if (user) {
        console.log(`Usuario ${user.nombre} cargado`);
        console.log(`Rol: ${user.rol}`);
        if (user.carrera) {
          console.log(`Carrera: ${user.carrera}`);
        }
      } else {
        console.log('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  // Nuevo método para manejar el cambio de asignatura seleccionada
  async onSubjectChange(event: any) {
    const selectedSubjectId = event.detail.value;
    if (selectedSubjectId) {
      try {
        // Cargamos las secciones de la asignatura seleccionada
        this.secciones = await this.dataService.getSectionsBySubject(
          selectedSubjectId
        );
      } catch (error) {
        this.showAlert('Error', 'No se pudieron cargar las secciones');
        console.error('Error al cargar secciones:', error);
      }
    } else {
      // Si no hay asignatura seleccionada, limpiamos las secciones
      this.secciones = [];
    }
  }

  async onSubmitSubject() {
    if (this.asignaturaForm.valid) {
      try {
        await this.dataService.createSubject(this.asignaturaForm.value);
        this.asignaturaForm.reset();
        await this.loadSubjects();
        this.showAlert('Éxito', 'Asignatura creada correctamente');
      } catch (error) {
        this.showAlert('Error', 'No se pudo crear la asignatura');
        console.error('Error al crear asignatura:', error);
      }
    }
  }

  async onSubmitSection() {
    if (this.seccionForm.valid) {
      try {
        const currentUser = this.profileService.getCurrentUser();
        if (!currentUser) {
          throw new Error('No hay usuario autenticado');
        }

        const seccionData = {
          ...this.seccionForm.value,
          docenteId: currentUser.uid,
        };

        await this.dataService.createSection(seccionData);
        this.seccionForm.reset();
        this.showAlert('Éxito', 'Sección creada correctamente');
      } catch (error) {
        this.showAlert('Error', 'No se pudo crear la sección');
        console.error('Error al crear sección:', error);
      }
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
