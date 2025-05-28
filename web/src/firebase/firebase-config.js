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

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

// ⚠️ Tu configuración real de Firebase debe ir aquí:
const firebaseConfig = {
  apiKey: "AIzaSyBBk3F6f9rq4DxSPDCaE06fogqNQuK7zgY",
  authDomain: "sovi-qualityassesment.firebaseapp.com",
  projectId: "sovi-qualityassesment",
  storageBucket: "sovi-qualityassesment.firebasestorage.app",
  messagingSenderId: "467464591557",
  appId: "1:467464591557:web:5c096e21a9fb4194bcf8ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

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
  storage, // ← agregado
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
  ref, // ← agregado
  uploadBytes, // ← agregado
  getDownloadURL, // ← agregado
};
