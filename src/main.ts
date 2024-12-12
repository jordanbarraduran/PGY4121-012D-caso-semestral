import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular'; // Add this import

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { StorageService } from './app/services/storage.service';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_72-fNKzqoH90E5GzjjlztLlKInTm6vs",
  authDomain: "registrapp-66a7e.firebaseapp.com",
  projectId: "registrapp-66a7e",
  storageBucket: "registrapp-66a7e.firebasestorage.app",
  messagingSenderId: "238238608984",
  appId: "1:238238608984:web:8fcdc20c8d0a41c071242d"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    AuthService,
    StorageService,
    Storage,
  ],
});
