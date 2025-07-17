// context/NumerologyContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const NumerologyContext = createContext(null);

export const useNumerology = () => {
  const context = useContext(NumerologyContext);
  if (!context) {
    throw new Error("useNumerology must be used within a NumerologyProvider");
  }
  return context;
};

export function NumerologyProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("numerohubUserData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const value = {
    userData,
    setUserData: (data) => {
      setUserData(data);
      localStorage.setItem("numerohubUserData", JSON.stringify(data));
    },
  };

  return (
    <NumerologyContext.Provider value={value}>
      {children}
    </NumerologyContext.Provider>
  );
}
