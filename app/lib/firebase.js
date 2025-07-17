import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyATmuWdy0epR1Ls4reiwCsn4BcKvrC5kz0",
  authDomain: "numerohub-app.firebaseapp.com",
  projectId: "numerohub-app",
  storageBucket: "numerohub-app.firebasestorage.app",
  messagingSenderId: "587589879399",
  appId: "1:587589879399:web:3d6cf4a43c686e142736c2",
  measurementId: "G-W4T5NM6TEG",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, auth, provider };
