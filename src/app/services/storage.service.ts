import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private storage = inject(Storage);

  constructor() {
    this.init();
  }

  async init() {
    console.log('Initializing storage service');
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setItem(key: string, value: any) {
    return this.storage.set(key, value);
  }

  getItem(key: string) {
    return this.storage.get(key);
  }
}
