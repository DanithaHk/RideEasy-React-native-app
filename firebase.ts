import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxZY8pHYiMmUn2mChjB03AwZvU-NmE1g0",
  authDomain: "rideeasy-reactnative.firebaseapp.com",
  projectId: "rideeasy-reactnative",
  storageBucket: "rideeasy-reactnative.firebasestorage.app",
  messagingSenderId: "186015714019",
  appId: "1:186015714019:web:154596d1c40c7420a213d6"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
