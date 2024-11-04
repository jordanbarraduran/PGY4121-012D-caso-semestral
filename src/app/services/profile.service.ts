import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private storageService = inject(StorageService);
  private currentUser: User | null = null;

  constructor() {
    this.initializeUser();
  }

  private async initializeUser() {
    const userData = await this.storageService.getItem('currentUser');
    if (userData) {
      this.currentUser = userData as User;
    }
  }

  async updateCurrentUser(user: User) {
    await this.storageService.setItem('currentUser', user);
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getFullName(): string {
    if (this.currentUser) {
      return `${this.currentUser.nombre} ${this.currentUser.apellido}`;
    }
    return '';
  }

  clearCurrentUser() {
    this.currentUser = null;
    // storage usar metodo remove
    this.storageService.setItem('currentUser', null);
  }
}