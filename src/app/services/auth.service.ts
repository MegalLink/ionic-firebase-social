import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
  authState
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  public currentUser$: Observable<User | null>;

  constructor() {
    // Observable del estado de autenticación
    this.currentUser$ = authState(this.auth);
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Registrar nuevo usuario con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña
   * @param displayName Nombre completo del usuario
   */
  async signUp(email: string, password: string, displayName: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Actualizar el perfil con el nombre
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }
      
      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Iniciar sesión con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña
   */
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Maneja los errores de Firebase Auth y los traduce a mensajes legibles
   */
  private handleAuthError(error: any): Error {
    let message = 'Ha ocurrido un error. Por favor intenta nuevamente.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Este correo electrónico ya está registrado.';
        break;
      case 'auth/invalid-email':
        message = 'El correo electrónico no es válido.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operación no permitida.';
        break;
      case 'auth/weak-password':
        message = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
        break;
      case 'auth/user-disabled':
        message = 'Esta cuenta ha sido deshabilitada.';
        break;
      case 'auth/user-not-found':
        message = 'No existe una cuenta con este correo electrónico.';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta.';
        break;
      case 'auth/invalid-credential':
        message = 'Credenciales inválidas. Verifica tu email y contraseña.';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos fallidos. Por favor intenta más tarde.';
        break;
      case 'auth/network-request-failed':
        message = 'Error de conexión. Verifica tu conexión a internet.';
        break;
      default:
        message = error.message || 'Ha ocurrido un error desconocido.';
    }

    return new Error(message);
  }

  /**
   * Convierte un User de Firebase a AuthUser
   */
  mapUserToAuthUser(user: User | null): AuthUser | null {
    if (!user) return null;
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
  }
}
