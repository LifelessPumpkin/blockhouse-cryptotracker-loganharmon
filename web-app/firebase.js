// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzpTwWqcD7DJiMcPiIERW-Cj-F5txV-VI",
  authDomain: "blockhouse-cryptotracker.firebaseapp.com",
  projectId: "blockhouse-cryptotracker",
  storageBucket: "blockhouse-cryptotracker.firebasestorage.app",
  messagingSenderId: "381340231481",
  appId: "1:381340231481:web:e8c3b67c97dad2eebbaae8",
  measurementId: "G-4H7B9JF5E9"
}; // I know this isn't good coding practice but I kept gettingn error when using envars

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)