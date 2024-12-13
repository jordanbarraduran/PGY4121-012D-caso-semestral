import { inject, Injectable } from '@angular/core';
// Import | Scanner //
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';
// MODELOS //
import { Asistencia } from '../models/asistencia.model';
// SERVICIOS //
import { ProfileService } from './profile.service';
import { DataService } from './data.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  // SERVICIOS //
  private profileService = inject(ProfileService);
  private dataService = inject(DataService);

  // Variables | Scanner //
  // Almacenar texto del código QR
  scanResult: string = '';
  // Variable para almacenar la disponibilidad del escáner
  isScannerSupported: boolean = false;

  constructor(private scanAlertController: AlertController) {}

  // METODOS | SCANNER //
  // Instala el plugin GoogleBarcodeScanner
  async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  // Solicita permisos al usuario para usar la cámara
  async requestCameraPermissions(): Promise<boolean> {
    // Almacena la propiedad "camera"
    const { camera } = await BarcodeScanner.requestPermissions();

    // Si los permisos para usar la cámara están activados por completo o parcialmente, retorna true
    return camera === 'granted' || camera === 'limited';
  }

  // Escanea el código
  async scan(): Promise<void> {
    // Confirma ejecución del método
    console.log('MÉTODO SCAN EJECUTADO');

    // Verifica los permisos de cámara
    const isPermissionGranted = await this.requestCameraPermissions();

    // Si el permiso es denegado
    if (!isPermissionGranted) {
      // Muestra mensaje de error al usuario
      const errorAlert = await this.scanAlertController.create({
        header: 'Se requieren permisos',
        message:
          'La aplicación necesita acceder a la cámara para escanear el código QR. Por favor, otorga los permisos necesarios y vuelve a intentarlo.',
        buttons: [{ text: 'Aceptar' }],
      });
      await errorAlert.present();
      // Finaliza la ejecución del escáner
      return;
    }

    // Instala el plugin de Google
    this.installGoogleBarcodeScannerModule();

    // Empieza la ejecución del escáner
    console.log('EMPEZAR ESCANEO...');
    // Obtiene la propiedad 'barcodes' del codigo
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    // Guarda el código escaneado el array
    console.log('ALMACENANDO CODIGO QR...');
    this.scanResult = barcodes[0].rawValue;

    // IMPLEMENTAR: REGEX PARA VALIDAR FORMATO DE CODIGO QR

    // EXTRAER DATOS //
    // Extrae datos del código QR
    const [asignatura, seccion, sala, fecha] = this.scanResult.split('|');
    // Obtiene el ID del estudiante actual
    const estudianteId = this.profileService.getCurrentUser()?.uid;
    // Crea un string en formato JSON
    const formatJson = `{"estudianteId":"${estudianteId}","asignatura":"${asignatura}","sala":"${sala}","seccion":"${seccion}","fecha":"${fecha}"}`;
    // Convierte string en JSON
    const dataQR = JSON.parse(formatJson);
    //
    let isDuplicated: boolean = false;

    /*
    const currentDate = new Date();
    const fecha =
      currentDate.getDate() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getFullYear();
    const hora = currentDate.getHours() + ':' + currentDate.getMinutes();
    const timestamp = fecha + ' | ' + hora;

    */

    if (estudianteId != undefined) {
      // Obtiene las asistencias del estudiante
      const asistencias = await this.dataService.getAsistenciasPorEstudiante(
        estudianteId
      );

      // Busca asistencias duplicadas
      const foundDuplicated = asistencias.filter(
        (a) => a.asignatura == asignatura && a.fecha == fecha
      );

      // Valida si encuentra alguna duplicada
      if (foundDuplicated.length > 0) {
        isDuplicated = true;
      }
    }

    // Si la asistencia es duplicada
    if (isDuplicated) {
      console.log('CODIGO DUPLICADO DETECTADO: ');
      // Muestra mensaje de error al usuario
      const errorAlert = await this.scanAlertController.create({
        header: 'Código duplicado',
        message:
          'Ya existe una asistencia registrada vinculada al código que está intentando escanear. Sólo puedes escanear un código una sola vez.',
        buttons: [{ text: 'Aceptar' }],
      });
      await errorAlert.present();
      // Finaliza la ejecución del escáner
      return;
    }

    // Crea una instancia de Asistencia
    if (estudianteId) {
      let nuevaAsistencia: Asistencia = {
        estudianteId: estudianteId,
        asignatura: asignatura,
        seccion: seccion,
        sala: sala,
        fecha: fecha,
      };

      try {
        // Registra la asistencia en la base de datos
        const registroAsistencia = await this.dataService.registrarAsistencia(
          nuevaAsistencia
        );

        if (registroAsistencia) {
          // Muestra mensaje de éxito al usuario
          const successAlert = await this.scanAlertController.create({
            header: 'Código escaneado correctamente',
            message:
              'El código QR fue escaneado correctamente y su asistencia quedó registrada.',
            buttons: [{ text: 'Aceptar' }],
          });
          await successAlert.present();
        }
      } catch (error) {
        // Muestra mensaje de error al usuario
        const errorAlert = await this.scanAlertController.create({
          header: 'Error al registrar asistencia',
          message:
            'Ocurrió un error al registrar la asistencia. Por favor, revisa que el código QR sea válido y vuelve a intentarlo.',
          buttons: [{ text: 'Aceptar' }],
        });
        await errorAlert.present();
        throw error;
      }
    }

    /*
    // Valida si la asignatura y sección corresponden al usuario
    const foundSubject = this.listaAsignaturas?.find(
      (a) =>
        a.nombreAsignatura === asignatura && a.seccionAsignatura === seccion
    );
    */
  }
}
