// context/NumerologyContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

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

  const value = {
    userData,
    setUserData,
  };

  return (
    <NumerologyContext.Provider value={value}>
      {children}
    </NumerologyContext.Provider>
  );
}
