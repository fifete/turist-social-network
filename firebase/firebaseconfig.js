// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';

import {
  getFirestore, setDoc,
  doc, getDoc, addDoc, collection, serverTimestamp,
  getDocs, onSnapshot, orderBy, query,
  updateDoc, deleteDoc, where,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
// query, , ,
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithRedirect, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, sendEmailVerification,
  onAuthStateChanged, signOut,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';

import {
  getStorage, ref, uploadBytes,
  getDownloadURL,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-storage.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCUpEXw7ZlfvMdeZ3xROQMIknx6Db6qeT4',
  authDomain: 'touristsocial-network.firebaseapp.com',
  projectId: 'touristsocial-network',
  storageBucket: 'touristsocial-network.appspot.com',
  messagingSenderId: '522769666950',
  appId: '1:522769666950:web:a068223c05d70a7089d207',
  measurementId: 'G-Y4JZWZE5YE',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference (conexion) to the service (db)
export const db = getFirestore(app);

export const auth = getAuth(app);
/** Iniciando storage */
export const storage = getStorage();

export {
  setDoc, doc, getDoc, addDoc, collection, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,
  serverTimestamp, getDocs, onSnapshot, orderBy, query, ref, uploadBytes,
  getDownloadURL, updateDoc, deleteDoc, where, signOut,
};
