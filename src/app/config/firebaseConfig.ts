// src/app/config/firebaseConfig.ts

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type Auth,
} from 'firebase/auth';

/**
 * Configuração do Firebase usando variáveis de ambiente do Vite.
 * Certifique-se de definir essas variáveis em `.env.local`:
 *
 * VITE_FIREBASE_API_KEY=...
 * VITE_FIREBASE_AUTH_DOMAIN=...
 * VITE_FIREBASE_PROJECT_ID=...
 * VITE_FIREBASE_STORAGE_BUCKET=...
 * VITE_FIREBASE_MESSAGING_SENDER_ID=...
 * VITE_FIREBASE_APP_ID=...
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

// Providers de login social
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Escopos extras se quiser puxar mais dados do perfil
googleProvider.addScope('profile');
googleProvider.addScope('email');

export { app as firebaseApp, auth as firebaseAuth, googleProvider, facebookProvider };
