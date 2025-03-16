import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
  authDomain: "netflix-clone-23a24.firebaseapp.com",
  projectId: "netflix-clone-23a24",
  storageBucket: "netflix-clone-23a24.firebasestorage.app",
  messagingSenderId: "294815044523",
  appId: "1:294815044523:web:e2ddd76e059eb5cec378ee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
//const myCollection = collection(db, "your-collection-name");

export { auth, db, functions };
export default app;


/*



const firebaseConfig = {
  apiKey: "AIzaSyBuYbH-z0tR42WQDX4CaImDeK-1BtnHbN8",
  authDomain: "netflix-clone-23a24.firebaseapp.com",
  projectId: "netflix-clone-23a24",
  storageBucket: "netflix-clone-23a24.firebasestorage.app",
  messagingSenderId: "294815044523",
  appId: "1:294815044523:web:e2ddd76e059eb5cec378ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/