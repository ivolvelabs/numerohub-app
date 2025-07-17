// lib/setPremium.js
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";


export const setUserPremium = async (uid) => {
  await setDoc(doc(db, "users", uid), { premium: true }, { merge: true });
};
