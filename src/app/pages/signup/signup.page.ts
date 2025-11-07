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
  personAddOutline, 
  personOutline,
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class SignupPage implements OnInit {
  displayName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;

  private authService = inject(AuthService);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  constructor() {
    addIcons({ 
      personAddOutline, 
      personOutline,
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

  async onSignup() {
    // Validaciones
    if (!this.displayName || !this.email || !this.password || !this.confirmPassword) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      await this.showToast('Por favor ingresa un email válido', 'warning');
      return;
    }

    if (this.password.length < 6) {
      await this.showToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      await this.authService.signUp(this.email, this.password, this.displayName);
      await loading.dismiss();
      await this.showToast('¡Cuenta creada exitosamente!', 'success');
      this.router.navigate(['/tabs/tab1']);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message, 'danger');
    }
  }

  async onSocialSignup(provider: 'google' | 'facebook' | 'apple') {
    await this.showToast(`Registro con ${provider} próximamente disponible`, 'medium');
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
