// lib/setPremium.js
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const setUserPremium = async (uid) => {
  await setDoc(doc(db, "users", uid), { premium: true }, { merge: true });
  localStorage.setItem("premium", "true");
};
