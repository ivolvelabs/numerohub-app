// app/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateUniversalDayNumber } from "@/lib/numerologyUtils";
import { numerologyInsightsData } from "@/data/numerologyInsights";
import { motion } from "motion/react";

export default function Home() {
  const router = useRouter();
  const [universalDayInsight, setUniversalDayInsight] = useState("");

  useEffect(() => {
    const num = calculateUniversalDayNumber();
    const found = numerologyInsightsData.universalDayInsights.find(
      (u) => u.number === num
    );
    setUniversalDayInsight(
      found?.insight || "No universal insight found for today."
    );
  }, []);

  const start = () => router.push("/onboarding");

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden p-[20px]">
      {/* Background */}
      <img
        src="/images/splash-illustration.png"
        alt="Mystical splash"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-numerohub-primary/30" />

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 m-auto p-8 max-w-md w-full bg-white/20 rounded-2xl border backdrop-blur-sm border-white/30 shadow-2xl text-center"
      >
        <h1 className="text-4xl font-bold text-numerohub-primary drop-shadow-md mb-4">
          Welcome to Numerohub! 🔮
        </h1>
        <p className="text-lg text-numerohub-text/90 mb-6">
          Your personalized numerology platform delivering daily, weekly, and
          life‑based insights.
        </p>
        <div className="bg-white/30 p-4 rounded-xl mb-6">
          <h3 className="text-xl font-semibold text-numerohub-accent mb-2">
            Today’s Universal Insight:
          </h3>
          <p className="text-numerohub-text/90">{universalDayInsight}</p>
        </div>
        <motion.button
          onClick={start}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden w-full py-3 px-6 rounded-full font-bold text-white
             bg-numerohub-accent glow-shimmer-button"
        >
          <span className="relative z-10">
            Get Started (Calculate My Numbers)
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
