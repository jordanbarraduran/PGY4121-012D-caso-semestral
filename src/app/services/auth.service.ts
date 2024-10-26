// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUser: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    // Check for stored user on service initialization
    this.loadStoredUser();
  }

  private async loadStoredUser() {
    try {
      const storedUser = await this.storageService.get('currentUser');
      if (storedUser) {
        this.currentUser = storedUser;
        // Optional: Validate stored session here if needed
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    }
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const users = await firstValueFrom(
        this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
          map(users => users.some(user => user.username === username))
        )
      );
      return users;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await firstValueFrom(
        this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
          map(users => users.find(user => user.username === username) || null)
        )
      );
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const user = await this.getUserByUsername(username);
      if (user && user.password === password) {
        this.currentUser = user;
        await this.storageService.set('currentUser', user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logout() {
    try {
      this.currentUser = null;
      await this.storageService.remove('currentUser');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
}