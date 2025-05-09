// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task-management-418ab.firebaseapp.com",
  projectId: "task-management-418ab",
  storageBucket: "task-management-418ab.firebasestorage.app",
  messagingSenderId: "686007840546",
  appId: "1:686007840546:web:250b332475e5d061b3bf7b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);