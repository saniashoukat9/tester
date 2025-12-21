// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIdMWO2rqBM2LKf2XsoAHEJ94HNDOGYI4",
  authDomain: "final-expo-test.firebaseapp.com",
  projectId: "final-expo-test",
  storageBucket: "final-expo-test.firebasestorage.app",
  messagingSenderId: "908900850642",
  appId: "1:908900850642:web:10d68189fb2414ecbd060b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);