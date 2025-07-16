// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATmuWdy0epR1Ls4reiwCsn4BcKvrC5kz0",
  authDomain: "numerohub-app.firebaseapp.com",
  projectId: "numerohub-app",
  storageBucket: "numerohub-app.firebasestorage.app",
  messagingSenderId: "587589879399",
  appId: "1:587589879399:web:3d6cf4a43c686e142736c2",
  measurementId: "G-W4T5NM6TEG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
