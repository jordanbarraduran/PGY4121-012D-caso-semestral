import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TabMenuComponent } from '../tab-menu/tab-menu.component';
@Component({
  selector: 'app-generar',
  templateUrl: './generar.page.html',
  styleUrls: ['./generar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabMenuComponent]
})
export class GenerarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
