// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAU8fEYKkNM4rft9YXyADfyT5jkFapyDvc",
  authDomain: "tennistake-a5b6f.firebaseapp.com",
  projectId: "tennistake-a5b6f",
  storageBucket: "tennistake-a5b6f.appspot.com",
  messagingSenderId: "14307210760",
  appId: "1:14307210760:web:c65f0849434c0b69b7c3bd",
  measurementId: "G-QFDBMKV05E",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
