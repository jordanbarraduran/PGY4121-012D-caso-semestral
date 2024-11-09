// services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private apiUrl =
    'https://api.jsonbin.io/v3/b/6728e650ad19ca34f8c40232?meta=false';

  constructor() {}

  async login(username: string, password: string) {
    try {
      // Get users that match both username and password
      const response = await firstValueFrom(
        this.http.get<{ users: any[] }>(this.apiUrl)
      );

      // Get array of users
      const allUsers = response.users;

      // Checks if user exists and is valid
      const user = allUsers.find(
        (u) => u.username === username && u.password === password
      );

      // If user is valid
      if (user) {
        console.log('User found:', user);
        await this.profileService.updateCurrentUser(user);
        return true;
      }

      // If user is NOT valid
      console.log('Invalid credentials');
      return false;
    } catch (error) {
      // If login fails
      console.error('Login error:', error);
      return false;
    }
  }

  async logout() {
    console.log('Logging out');
    await this.profileService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    console.log('Getting current user');
    return this.storage.getItem('currentUser');
  }

  isAuthenticated() {
    console.log('Checking if user is authenticated');
    console.log('Current user:', this.getCurrentUser());
    return !!this.profileService.getCurrentUser();
  }
}
