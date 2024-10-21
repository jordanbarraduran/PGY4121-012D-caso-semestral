import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Permite que Angular inyecte el service en el componente indicado (root) para que pueda ser usado en dicho componente
@Injectable({
  // Al indicar 'root' como el provider, Angular crea una sola instancia compartida del service que está disponible en toda la app
  providedIn: 'root'
})
export class StorageService {
  // Crea una variable de tipo Storage para almacenar datos
  private _storage: Storage | null = null;

  // CONSTRUCTOR
  constructor(private storage: Storage) {
    // Inicializa la clase StorageService
    this.init();
  }

  // MÉTODOS
  // Inicializa el service
  async init() {
    // Crea una instancia de la clase Storage
    const storage = await this.storage.create();

    // Asigna el valor a la variable _storage creada anteriormente
    this._storage = storage;
  }

  // Método para que los usuarios almacenen valores en el storage
  public set(key: string, value: string) {
    
  }
}
