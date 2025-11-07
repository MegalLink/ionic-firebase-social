# Configuración de Firebase para Ionic Firebase Social

## 📋 Requisitos Previos

- Node.js instalado
- Cuenta de Firebase (gratuita)
- Proyecto Ionic configurado

## 🔥 Configurar Firebase

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Ingresa un nombre para tu proyecto
4. (Opcional) Habilita Google Analytics
5. Espera a que se cree el proyecto

### 2. Habilitar Autenticación

1. En el menú lateral, ve a **Build** → **Authentication**
2. Haz clic en "Comenzar"
3. En la pestaña **Sign-in method**, habilita:
   - **Email/Password** (requerido para login básico)
   - Opcionalmente: Google, Facebook, Apple (para login social)

### 3. Registrar App Web

1. En la página principal del proyecto, haz clic en el ícono **</>** (Web)
2. Registra tu app con un nombre (ejemplo: "Ionic Firebase Social")
3. **NO** marques "Firebase Hosting"
4. Haz clic en "Registrar app"

### 4. Obtener Credenciales

Firebase te mostrará un código similar a este:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
\`\`\`

## 🔐 Configurar Credenciales en el Proyecto

### Paso 1: Copiar el archivo de ejemplo

\`\`\`bash
cp src/environments/firebase.config.example.ts src/environments/firebase.config.ts
\`\`\`

### Paso 2: Editar firebase.config.ts

Abre el archivo `src/environments/firebase.config.ts` y reemplaza con tus credenciales:

\`\`\`typescript
export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID" // Opcional
};
\`\`\`

### Paso 3: Verificar .gitignore

El archivo `.gitignore` ya está configurado para **NO** subir tus credenciales:

\`\`\`
/src/environments/firebase.config.ts
**/firebase.config.ts
\`\`\`

⚠️ **NUNCA** hagas commit del archivo `firebase.config.ts` con credenciales reales.

## 🚀 Ejecutar la Aplicación

\`\`\`bash
# Instalar dependencias (si aún no lo has hecho)
npm install

# Ejecutar en el navegador
ionic serve

# Ejecutar en Android
ionic capacitor run android

# Ejecutar en iOS
ionic capacitor run ios
\`\`\`

## 📱 Funcionalidades Implementadas

### Autenticación
- ✅ Registro de usuarios con email y contraseña
- ✅ Inicio de sesión con email y contraseña
- ✅ Validaciones de formulario
- ✅ Manejo de errores en español
- ✅ Loading indicators
- ✅ Toast notifications
- 🔜 Login social (Google, Facebook, Apple)
- 🔜 Recuperación de contraseña

### Servicios Disponibles

#### AuthService (`src/app/services/auth.service.ts`)

\`\`\`typescript
// Registrar usuario
await authService.signUp(email, password, displayName);

// Iniciar sesión
await authService.signIn(email, password);

// Cerrar sesión
await authService.logout();

// Obtener usuario actual
const user = authService.getCurrentUser();

// Observable del estado de autenticación
authService.currentUser$.subscribe(user => {
  console.log('Usuario:', user);
});
\`\`\`

## 🔒 Seguridad

### Buenas Prácticas Implementadas

1. ✅ Credenciales en archivo ignorado por git
2. ✅ Validaciones del lado del cliente
3. ✅ Manejo seguro de errores
4. ✅ Archivo de ejemplo para configuración
5. ✅ Mensajes de error en español

### Configurar Reglas de Seguridad en Firebase

En Firebase Console → **Build** → **Firestore Database** o **Realtime Database** → **Reglas**:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

## 🐛 Solución de Problemas

### Error: "Firebase config not found"

- Verifica que copiaste `firebase.config.example.ts` a `firebase.config.ts`
- Asegúrate de que las credenciales estén correctamente configuradas

### Error: "Email already in use"

- El correo ya está registrado
- Intenta con otro email o usa la función de recuperación de contraseña

### Error: "Weak password"

- Firebase requiere contraseñas de al menos 6 caracteres

### Error: "Network request failed"

- Verifica tu conexión a internet
- Revisa que Firebase esté correctamente configurado

## 📚 Recursos Adicionales

- [Documentación de Firebase Auth](https://firebase.google.com/docs/auth)
- [Angular Fire Docs](https://github.com/angular/angularfire)
- [Ionic Framework](https://ionicframework.com/docs)

## 🤝 Contribuir

Si encuentras algún problema o tienes sugerencias, por favor abre un issue.

---

**Desarrollado con ❤️ usando Ionic + Angular + Firebase**
