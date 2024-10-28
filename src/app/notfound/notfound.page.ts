import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, CommonModule, FormsModule]
})
export class NotfoundPage implements OnInit {
  private router = inject(Router);
  constructor() { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
