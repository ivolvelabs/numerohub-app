// context/UserContext.jsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const isPremium = data.premium || false;
            const enhancedUser = {
              ...firebaseUser,
              premium: isPremium,
            };
            setUser(enhancedUser);
          } else {
            setDoc(userRef, { premium: false });
          }
        });
        setLoading(false);
        return () => unsubscribe();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
