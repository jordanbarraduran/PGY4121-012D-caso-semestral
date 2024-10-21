import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Permite que Angular inyecte el service en el componente indicado (root) para que pueda ser usado en dicho componente
@Injectable({
  // Al indicar 'root' como el provider, Angular crea una sola instancia compartida del service que está disponible en toda la app
  providedIn: 'root'
})
export class StorageService {
  // Crea una instancia de Storage, como una variable para almacenar datos
  private _storage: Storage | null = null;

  // CONSTRUCTOR
  constructor(private storage: Storage) {
    // 
    this.init();
  }

  // MÉTODOS
  // Inicializa el service
  async init() {
    const storage = await this.storage.create();
    

  }
}
