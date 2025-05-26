// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ8fUIFePmDKaB4KSoQM8Ftr6LaKpRwDY",
  authDomain: "potry-e5773.firebaseapp.com",
  projectId: "potry-e5773",
  storageBucket: "potry-e5773.firebasestorage.app",
  messagingSenderId: "728778316569",
  appId: "1:728778316569:web:152dcab7e272cca5c30388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)