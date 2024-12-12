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

  constructor() {}

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
      console.log('PERMISO DENEGADO');
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
        this.dataService.registrarAsistencia(nuevaAsistencia);
        console.log('CODIGO ESCANEADO CORRECTAMENTE');
      } catch (error) {
        console.log(error);
      }
    }

    /*
    // Valida si la asignatura y sección corresponden al usuario
    const foundSubject = this.listaAsignaturas?.find(
      (a) =>
        a.nombreAsignatura === asignatura && a.seccionAsignatura === seccion
    );

    if (foundSubject) {
      // Almacena la instancia en el storage
      this.storage.setItem('asistencia', asistencia);
    } else {
      // IMPLEMENTAR: ALERT
      console.log('ESTE CODIGO QR NO ES VALIDO PARA ESTE USUARIO');
    }
    */
  }
}
