import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCjVJ3ipaBcqOQfPGS5hV1NCzJQRwj8rbA",
  authDomain: "birbir-town-khc-child-pa-43cc5.firebaseapp.com",
  projectId: "birbir-town-khc-child-pa-43cc5",
  storageBucket: "birbir-town-khc-child-pa-43cc5.firebasestorage.app",
  messagingSenderId: "640972301249",
  appId: "1:640972301249:web:d98ba785a373d2c6d50540"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
