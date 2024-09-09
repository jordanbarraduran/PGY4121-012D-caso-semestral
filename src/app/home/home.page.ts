import { Component } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonTabs, IonTabBar, IonTabButton],
})
export class HomePage {
  username: string = 'guest';

  constructor(
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      console.log(`Username: ${state['user']}`)
      this.username = state['user']
    }
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
