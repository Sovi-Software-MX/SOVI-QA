// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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

// Function to save user data to Firestore
const saveUserToFirestore = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);
  
  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      role: 'cliente', // Default role
      createdAt: new Date().toISOString()
    });
  }
};

export { auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, saveUserToFirestore };
