"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  calculateBirthNumber,
  calculateLifePathNumber,
  calculateCompoundNumber,
  calculateDestinyNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculateNameNumber,
} from "@/lib/numerologyUtils";
import { useNumerology } from "@/context/NumerologyContext";
import { motion } from "motion/react";

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserData } = useNumerology();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !dob) {
      setError("Please enter both your Name and Date of Birth.");
      return;
    }

    const dateObj = new Date(dob);
    if (isNaN(dateObj.getTime())) {
      setError("Please enter a valid Date of Birth.");
      return;
    }

    const birthNumber = calculateBirthNumber(dateObj.getDate());
    const lifePathNumber = calculateLifePathNumber(dob);
    const compoundNumber = calculateCompoundNumber(dob);
    const destinyNumber = calculateDestinyNumber(name);
    const soulNumber = calculateSoulNumber(name);
    const personalityNumber = calculatePersonalityNumber(name);
    const nameNumber = calculateNameNumber(name);

    setUserData({
      name,
      dob,
      birthNumber,
      lifePathNumber,
      compoundNumber,
      destinyNumber,
      soulNumber,
      personalityNumber,
      nameNumber,
    });

    router.push("/results");
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden p-[20px]">
      <img
        src="/images/onboarding-illustration.png"
        alt="Onboarding Illustration"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-numerohub-primary/30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 m-auto p-8 max-w-md w-full bg-white/20 rounded-2xl border backdrop-blur-sm border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-numerohub-primary mb-6 text-center">
          Tell Us About Yourself ✍️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-white/90 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-numerohub-accent"
              placeholder="e.g., John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/90 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/70 border border-white/40 focus:outline-none focus:ring-2 focus:ring-numerohub-accent"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg glow-shimmer-button"
            type="submit"
          >
            Reveal My Core Numbers
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
