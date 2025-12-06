// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACw4U6Us-yBh_0hVGrEwjb191JE74pklM",
  authDomain: "book-courier-7c825.firebaseapp.com",
  projectId: "book-courier-7c825",
  storageBucket: "book-courier-7c825.firebasestorage.app",
  messagingSenderId: "629406744188",
  appId: "1:629406744188:web:3e3a6e96cfa452f53a53f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
