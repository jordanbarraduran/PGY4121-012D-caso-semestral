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
  private apiUrl = 'http://localhost:3000'; // URL del JSON Server
  private currentUser: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    // Verificar si hay usuario en storage al iniciar
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      
    }
  }

	// Método para verificar si el username existe en la base de datos de la API
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

  // Método para obtener un usuario por nombre de usuario
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

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Método para obtener el usuario actual
  getCurrentUser(): User | null {
    return this.currentUser;
  }
  
  // Método para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    try {
      // Obtener el usuario por nombre de usuario
      const user = await this.getUserByUsername(username);
      // Verificar si el usuario existe y la contraseña es correcta
      if (user && user.password === password) {
        // Establecer el usuario actual
        this.currentUser = user;
        return true;
      }
      return false;
    } catch (error) {
      // Manejar errores en el inicio de sesión
      console.error('Error logging in:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  logout() {
    // Eliminar el usuario actual
    this.currentUser = null;
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
