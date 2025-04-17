// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// ⚠️ Tu configuración real de Firebase debe ir aquí:
const firebaseConfig = {
  apiKey: "AIzaSyCVyuWVvZZWNLDhAfmEdpH_Hk8VeIEUcus",
  authDomain: "sovi-des-d0245.firebaseapp.com",
  projectId: "sovi-des-d0245",
  storageBucket: "sovi-des-d0245.firebasestorage.app",
  messagingSenderId: "540643364304",
  appId: "1:540643364304:web:2e511e95605575e0007dd5",
  measurementId: "G-0Y7Z9YNZTJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Guarda usuario en Firestore si no existe
const saveUserToFirestore = async (user, additionalData = {}) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      role: 'cliente',
      createdAt: new Date().toISOString(),
      ...additionalData,
    });
  }
};

export {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  saveUserToFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
};
