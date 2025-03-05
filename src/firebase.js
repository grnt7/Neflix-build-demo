import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions"; // Import getFunctions

const firebaseConfig = {
    apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
    authDomain: "netflix-clone-23a24.firebaseapp.com",
    projectId: "netflix-clone-23a24",
    storageBucket: "netflix-clone-23a24.firebasestorage.app",
    messagingSenderId: "294815044523",
    appId: "1:294815044523:web:e2ddd76e059eb5cec378ee",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Functions
const functions = getFunctions(app); // Initialize Functions

export { auth, db, functions }; // Export auth, db, and functions
export default app; // You can also export the app, if needed.










/*

papacode
// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
  authDomain: "netflix-clone-23a24.firebaseapp.com",
  projectId: "netflix-clone-23a24",
  storageBucket: "netflix-clone-23a24.firebasestorage.app",
  messagingSenderId: "294815044523",
  appId: "1:294815044523:web:e2ddd76e059eb5cec378ee",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { auth, db }; // Export both auth and db
export default app; //You can also export the app, if needed.

const firebaseConfig = {
    apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
    authDomain: "netflix-clone-23a24.firebaseapp.com",
    projectId: "netflix-clone-23a24",
    storageBucket: "netflix-clone-23a24.firebasestorage.app",
    messagingSenderId: "294815044523",
    appId: "1:294815044523:web:e2ddd76e059eb5cec378ee"
  };
   
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

export { auth }
export default db;

new firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions"; // Import getFunctions

const firebaseConfig = {
    apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
    authDomain: "netflix-clone-23a24.firebaseapp.com",
    projectId: "netflix-clone-23a24",
    storageBucket: "netflix-clone-23a24.firebasestorage.app",
    messagingSenderId: "294815044523",
    appId: "1:294815044523:web:e2ddd76e059eb5cec378ee",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Functions
const functions = getFunctions(app); // Initialize Functions

export { auth, db, functions }; // Export auth, db, and functions
export default app; // You can also export the app, if needed.






*/