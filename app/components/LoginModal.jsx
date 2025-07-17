// components/LoginModal.jsx
"use client";

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";

import { useUser } from "@/context/UserContext";

export default function LoginModal({ onSuccess }) {
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      onSuccess?.(user);
    } catch (error) {
      console.error("Google Sign-in error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="p-6 bg-white/20 rounded-xl border border-white/30 backdrop-blur-md shadow-2xl text-center w-[90%] max-w-sm text-white">
        <h2 className="text-2xl font-bold text-numerohub-accent mb-4">
          Sign In to Unlock Your Full Blueprint
        </h2>
        <p className="mb-6 text-sm">
          View deeper numbers, life insights & unlock personalized content.
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-6 rounded-full font-bold text-white shadow-md hover:scale-105 transition-all"
        >
          <LogIn className="w-5 h-5" /> Sign in with Google
        </button>
      </div>
    </motion.div>
  );
}
