// app/onboarding/page.js
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
} from "@/lib/numerologyUtils"; // Changed import path
import { useNumerology } from "@/context/NumerologyContext"; // Changed import path

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserData } = useNumerology();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !dob) {
      setError("Please enter both your Name and Date of Birth to proceed.");
      return;
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      setError("Please enter a valid Date of Birth (e.g., YYYY-MM-DD).");
      return;
    }

    const day = dobDate.getDate();

    const birthNumber = calculateBirthNumber(day);
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
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-numerohub-primary mb-6 text-center">
          Tell Us About Yourself ✍️
        </h2>
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Your Full Name (at birth)
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-numerohub-primary focus:border-transparent transition duration-200"
              placeholder="e.g., John David Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-numerohub-primary focus:border-transparent transition duration-200"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-numerohub-accent hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Calculate My Numbers!
          </button>
        </form>
      </div>
    </div>
  );
}
