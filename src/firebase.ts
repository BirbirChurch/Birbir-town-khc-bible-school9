import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDB11TdTT_B-WtbYGRG_EegLyQdvLoZJ2s",
  authDomain: "birbir-town-khc-bible-school9.firebaseapp.com",
  projectId: "birbir-town-khc-bible-school9",
  storageBucket: "birbir-town-khc-bible-school9.firebasestorage.app",
  messagingSenderId: "694184896195",
  appId: "1:694184896195:web:3c08c6800f437dd924e476"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
