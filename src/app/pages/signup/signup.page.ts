import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personAddOutline, 
  personOutline,
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class SignupPage implements OnInit {

  constructor() {
    addIcons({ 
      personAddOutline, 
      personOutline,
      mailOutline,
      lockClosedOutline
    });
  }

  ngOnInit() {
  }

}
