import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "vesselvault.firebaseapp.com",
  projectId: "vesselvault",
  storageBucket: "vesselvault.appspot.com",
  messagingSenderId: "1050506021268",
  appId: "1:1050506021268:web:a5b046dae3214e015b2781",
  measurementId: "G-QLE53TF35T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
