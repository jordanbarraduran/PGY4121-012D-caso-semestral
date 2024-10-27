// services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/users';

  constructor() { }

  async login(username: string, password: string) {
    try {
      // Get users that match both username and password
      const response = await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}?username=${username}`)
      );
  
      // Check if we got a user and if the password matches
      const user = response.find(u => u.password === password);
      
      if (user) {
        console.log('User found:', user);
        await this.storage.setItem('currentUser', user);
        return true;
      }
      
      console.log('Invalid credentials');
      return false;
  
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async logout() {
    await this.storage.setItem('currentUser', null);
    this.router.navigate(['/login']);
  }
  
  getCurrentUser() {
    return this.storage.getItem('currentUser');
  }
}