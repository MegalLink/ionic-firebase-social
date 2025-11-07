import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  mailOutline,
  lockClosedOutline,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

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
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  private authService = inject(AuthService);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  constructor() {
    addIcons({ 
      personCircleOutline, 
      mailOutline,
      lockClosedOutline,
    });
  }

  ngOnInit() {
    // Verificar si ya hay un usuario autenticado
    const user = this.authService.getCurrentUser();
    if (user) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  async onLogin() {
    // Validaciones básicas
    if (!this.email || !this.password) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      await this.showToast('Por favor ingresa un email válido', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      await this.authService.signIn(this.email, this.password);
      await loading.dismiss();
      await this.showToast('¡Bienvenido!', 'success');
      this.router.navigate(['/tabs/tab1']);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message, 'danger');
    }
  }

  async onSocialLogin(provider: 'google' | 'facebook' | 'apple') {
    await this.showToast(`Login con ${provider} próximamente disponible`, 'medium');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
