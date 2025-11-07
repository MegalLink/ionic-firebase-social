# 🚀 Quick Start - Firebase Authentication

## ⚡ Pasos Rápidos para Configurar

### 1️⃣ Copiar archivo de configuración

```bash
cp src/environments/firebase.config.example.ts src/environments/firebase.config.ts
```

### 2️⃣ Obtener credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Project Settings** (⚙️) → **General**
4. Busca la sección **Your apps** → clic en **</>** (Web)
5. Registra tu app y copia las credenciales

### 3️⃣ Configurar credenciales

Edita `src/environments/firebase.config.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123XYZ" // Opcional
};
```

### 4️⃣ Habilitar Email/Password en Firebase

1. En Firebase Console → **Authentication**
2. Clic en **Get started**
3. Pestaña **Sign-in method**
4. Habilita **Email/Password**

### 5️⃣ ¡Listo! Ejecutar la app

```bash
ionic serve
```

## 📝 Notas Importantes

- ⚠️ **NUNCA** hagas commit de `firebase.config.ts`
- ✅ El archivo ya está en `.gitignore`
- 📄 Solo sube `firebase.config.example.ts`

## 🔗 Documentación Completa

Ver [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para más detalles.
