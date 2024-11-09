// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrPZHuRc_ybZUBr9i9iyZCvoIhR7LMOD0",
  authDomain: "fasttube-499ac.firebaseapp.com",
  projectId: "fasttube-499ac",
  storageBucket: "fasttube-499ac.appspot.com",
  messagingSenderId: "334447115957",
  appId: "1:334447115957:web:2860277b236a702a9548fc",
  measurementId: "G-KX9W2M7ERH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };