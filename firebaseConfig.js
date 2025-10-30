// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf7e1X8UysJGHjZj4faE2KuTxfvcQeybQ",
  authDomain: "meuappfirebase-baee1.firebaseapp.com",
  projectId: "meuappfirebase-baee1",
  storageBucket: "meuappfirebase-baee1.firebasestorage.app",
  messagingSenderId: "1061878748951",
  appId: "1:1061878748951:web:773a2db774061ac42b0952",
  measurementId: "G-J2GKKLWPR5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };