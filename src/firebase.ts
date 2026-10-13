import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAnUdWOOAZhOfRtx-GfW89pz1iKrDonz_s",
  authDomain: "birbir-town-khc-bible-sc-82849.firebaseapp.com",
  projectId: "birbir-town-khc-bible-sc-82849",
  storageBucket: "birbir-town-khc-bible-sc-82849.firebasestorage.app",
  messagingSenderId: "745550786105",
  appId: "1:745550786105:web:6724bcaecde6d39b1967e8"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
