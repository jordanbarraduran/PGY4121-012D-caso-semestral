import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ProfileService } from '../services/profile.service';
import { Seccion } from '../models/seccion.model';
import { AlertController } from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';
import { Asignatura } from '../models/asignatura.model';
@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    TabMenuComponent,
  ],
})
export class GenerarPage implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  private profileService = inject(ProfileService);
  private alertController = inject(AlertController);

  mostrandoQR: boolean = false; // Variable para controlar la visibilidad del QR

  // Datos para los selectores
  asignaturas: Asignatura[] = [];
  secciones: Seccion[] = [];

  // Estado de la interfaz
  asignaturaSeleccionada: boolean = false;
  seccionSeleccionada: boolean = false;
  claseActiva: boolean = false;
  qrData: string = '';

  // Formularios
  seleccionForm: FormGroup;
  claseForm: FormGroup;

  constructor() {
    // Formulario para selección de asignatura y sección
    this.seleccionForm = this.fb.group({
      asignaturaId: ['', Validators.required],
      seccionId: ['', Validators.required],
    });

    // Formulario para crear la clase
    this.claseForm = this.fb.group({
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    });

    // Escuchamos cambios en la selección de asignatura
    this.seleccionForm
      .get('asignaturaId')
      ?.valueChanges.subscribe(async (asignaturaId) => {
        if (asignaturaId) {
          await this.cargarSecciones(asignaturaId);
          this.asignaturaSeleccionada = true;
        } else {
          this.secciones = [];
          this.asignaturaSeleccionada = false;
        }
        this.seccionSeleccionada = false;
        this.claseActiva = false;
      });

    // Escuchamos cambios en la selección de sección
    this.seleccionForm.get('seccionId')?.valueChanges.subscribe((seccionId) => {
      this.seccionSeleccionada = !!seccionId;
      this.claseActiva = false;
    });
  }

  ngOnInit() {
    this.cargarAsignaturas();
  }

  async cargarAsignaturas() {
    try {
      const usuario = this.profileService.getCurrentUser();
      if (usuario) {
        this.asignaturas = await this.dataService.getAsignaturasProfesor(
          usuario.uid!,
        );
      }
    } catch (error) {
      console.error('Error al cargar asignaturas:', error);
      this.mostrarAlerta('Error', 'No se pudieron cargar las asignaturas');
    }
  }

  async cargarSecciones(asignaturaId: string) {
    try {
      const usuario = this.profileService.getCurrentUser();
      if (usuario) {
        this.secciones = await this.dataService.getSeccionesByProfesor(
          usuario.uid!,
        );
        // Filtramos las secciones que corresponden a la asignatura seleccionada
        this.secciones = this.secciones.filter(
          (s) => s.asignaturaId === asignaturaId,
        );
      }
    } catch (error) {
      console.error('Error al cargar secciones:', error);
      this.mostrarAlerta('Error', 'No se pudieron cargar las secciones');
    }
  }

  async generarClase() {
    if (this.claseForm.valid && this.seleccionForm.valid) {
      try {
        const claseData = {
          ...this.claseForm.value,
          seccionId: this.seleccionForm.get('seccionId')?.value,
        };

        const claseId = await this.dataService.createClase(claseData);

        this.qrData = JSON.stringify({
          claseId: claseId,
          seccionId: claseData.seccionId,
          horaInicio: claseData.horaInicio,
          horaFin: claseData.horaFin,
        });

        this.mostrandoQR = true; // Mostramos el QR
        this.mostrarAlerta('Éxito', 'Clase creada correctamente');
      } catch (error) {
        console.error('Error al crear clase:', error);
        this.mostrarAlerta('Error', 'No se pudo crear la clase');
      }
    }
  }

  volverAFormulario() {
    this.mostrandoQR = false;
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
