// app/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateUniversalDayNumber } from "@/lib/numerologyUtils"; // Changed import path
import { numerologyInsightsData } from "@/data/numerologyInsights"; // Changed import path

export default function Home() {
  const router = useRouter();
  const [universalDayInsight, setUniversalDayInsight] = useState("");

  useEffect(() => {
    const universalNum = calculateUniversalDayNumber();
    const insight =
      numerologyInsightsData.universalDayInsights.find(
        (u) => u.number === universalNum
      )?.insight || "No universal insight found for today.";
    setUniversalDayInsight(insight);
  }, []);

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-200">
        <h1 className="text-4xl font-bold text-numerohub-primary mb-4">
          Welcome to Numerohub! 🔮
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your personalized numerology platform, delivering daily, weekly, and
          life-based insights.
        </p>
        <p className="text-md text-gray-500 mb-4">
          Discover your core numbers and unlock the secrets of your destiny.
        </p>
        <div className="bg-numerohub-secondary/10 p-4 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold text-numerohub-primary mb-2">
            Today's Universal Insight:
          </h3>
          <p className="text-gray-800 text-base">{universalDayInsight}</p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleStartOnboarding}
            className="w-full bg-numerohub-accent hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Get Started (Calculate My Numbers)
          </button>
        </div>
      </div>
    </div>
  );
}
