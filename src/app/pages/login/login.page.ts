import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    CommonModule, 
    FormsModule,
    RouterModule
  ]
})
export class LoginPage implements OnInit {

  constructor() {
    addIcons({ 
      personCircleOutline, 
      mailOutline,
      lockClosedOutline
    });
  }

  ngOnInit() {
  }

}
