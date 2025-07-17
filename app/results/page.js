// app/results/page.js
"use client";

import React, { useState, useEffect } from "react";
import { useNumerology } from "@/context/NumerologyContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";
import NumberCard from "@/components/NumberCard";

import { motion } from "motion/react";
import { generateInsight } from "@/lib/numerologyUtils";
import { numerologyInsightsData } from "@/data/numerologyInsights";

export default function ResultsPage() {
  const { userData } = useNumerology();
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [insights, setInsights] = useState({});

  useEffect(() => {
    if (userData) {
      setInsights({
        birth: generateInsight(userData.birthNumber, "birthNumberInsights"),
        lifePath: generateInsight(
          userData.lifePathNumber,
          "lifePathNumberInsights"
        ),
        compound: numerologyInsightsData.compoundNumberInsights.find(
          (c) => c.number === userData.compoundNumber
        ),
        destiny: generateInsight(
          userData.destinyNumber,
          "destinyNumberInsights"
        ),
        soul: generateInsight(userData.soulNumber, "soulNumberInsights"),
        personality: generateInsight(
          userData.personalityNumber,
          "personalityNumberInsights"
        ),
        name: generateInsight(userData.nameNumber, "nameNumberInsights"),
      });
    }
  }, [userData]);

  const handleSeeInsights = () => {
    if (!user) setShowLogin(true);
    else router.push("/insights");
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-fit min-h-screen w-full overflow-hidden p-[20px] pb-24">
      <img
        src="/images/report-illustration.png"
        alt="Report Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-numerohub-primary/30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 m-auto p-8 max-w-6xl w-full bg-white/20 rounded-2xl border backdrop-blur-sm border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-numerohub-bg text-center mb-6">
          Your Numerology Blueprint ✨
        </h2>
        <p className="text-white/90 text-center mb-10">
          Hello,{" "}
          <span className="font-semibold text-numerohub-text">
            {userData.name}
          </span>{" "}
          — here are your core numbers:
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <NumberCard
            title="Birth Number"
            number={userData.birthNumber}
            insight={insights.birth}
          />
          <NumberCard
            title="Life Path Number"
            number={userData.lifePathNumber}
            insight={insights.lifePath}
          />
          <NumberCard
            title="Compound Number"
            number={userData.compoundNumber}
            insight={
              insights.compound
                ? `Meaning: ${insights.compound.meaning}\nSummary: ${insights.compound.summary}`
                : "Insight not found."
            }
          />
        </div>

        {!user && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg glow-shimmer-button"
            >
              Unlock Full Report
            </button>
          </div>
        )}

        {user && (
          <>
            <h3 className="text-xl font-bold text-numerohub-bg mb-4">
              Deeper Numbers:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <NumberCard
                title="Destiny Number"
                number={userData.destinyNumber}
                insight={insights.destiny}
              />
              <NumberCard
                title="Soul Number"
                number={userData.soulNumber}
                insight={insights.soul}
              />
              <NumberCard
                title="Personality Number"
                number={userData.personalityNumber}
                insight={insights.personality}
              />
              <NumberCard
                title="Name Number"
                number={userData.nameNumber}
                insight={insights.name}
              />
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSeeInsights}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg glow-shimmer-button"
              >
                See Daily Life Insights
              </motion.button>
            </div>
          </>
        )}
      </motion.div>

      {showLogin && <LoginModal onSuccess={() => setShowLogin(false)} />}
    </div>
  );
}
