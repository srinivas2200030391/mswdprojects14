// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_HyrbLSxMzsIxtZ74cpD0JsiGz9VZrAs",
  authDomain: "mswdbankingapp.firebaseapp.com",
  projectId: "mswdbankingapp",
  storageBucket: "mswdbankingapp.appspot.com",
  messagingSenderId: "717258132710",
  appId: "1:717258132710:web:c5a0e3ee879d8aa4723f27",
  measurementId: "G-W6G5J8PNSW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
