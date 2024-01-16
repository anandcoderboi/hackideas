// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiU8je_qBq5qTprsIa8VrQ2HaG4ImCucE",
  authDomain: "hackideas-80546.firebaseapp.com",
  projectId: "hackideas-80546",
  storageBucket: "hackideas-80546.appspot.com",
  messagingSenderId: "1029397221657",
  appId: "1:1029397221657:web:8428a99ab8dcab90617588",
  measurementId: "G-MXGZCH3MFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);