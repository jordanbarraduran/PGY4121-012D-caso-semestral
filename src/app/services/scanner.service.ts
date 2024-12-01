import { Injectable } from '@angular/core';

// Import | Scanner //
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
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

    // TESTING //
    console.log('ASIGNATURA: ' + asignatura);
    console.log('SECCION: ' + seccion);
    console.log('SALA: ' + sala);
    console.log('FECHA: ' + fecha);
    //

    /*
    // Valida si la asignatura y sección corresponden al usuario
    const foundSubject = this.listaAsignaturas?.find(
      (a) =>
        a.nombreAsignatura === asignatura && a.seccionAsignatura === seccion
    );

    if (foundSubject) {
                  //

      // Crea una instancia de Asistencia
      let asistencia: DataQR = {
        asignatura: asignatura,
        seccion: seccion,
        sala: sala,
        fecha: fecha,
      };

      // Almacena la instancia en el storage
      this.storage.setItem('asistencia', asistencia);
    } else {
      // IMPLEMENTAR: ALERT
      console.log('ESTE CODIGO QR NO ES VALIDO PARA ESTE USUARIO');
    }*/
  }
}
