// services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../models/user.model';
import { doc, getDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  // RIGHT URL //
  private apiUrl =
    'https://api.jsonbin.io/v3/b/6728e650ad19ca34f8c40232?meta=false';
  // -------- //

  public response: { users: any[] } | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    console.log('Login result:', result.user.uid);
    // Obtener rol del usuario desde Firestore
    const userDoc = await getDoc(doc(this.firestore, `users/${result.user.uid}`));
    const currentLoggedInUser = userDoc.data() as User;
    // añadir uid al objeto de usuario
    currentLoggedInUser.uid = result.user.uid;
    console.log('Current user:', currentLoggedInUser);

    if (currentLoggedInUser) {
      await this.profileService.updateCurrentUser(currentLoggedInUser);
      return true;
    } else {
      console.error('Credenciales inválidas');
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
