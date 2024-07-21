// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "next-blog-f6d06.firebaseapp.com",
  projectId: "next-blog-f6d06",
  storageBucket: "next-blog-f6d06.appspot.com",
  messagingSenderId: "785217360808",
  appId: "1:785217360808:web:3e3ca8098b38440896039d",
  measurementId: "G-S2GJYTF2XJ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);