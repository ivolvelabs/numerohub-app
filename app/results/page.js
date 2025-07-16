"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNumerology } from "@/context/NumerologyContext";
import { generateInsight } from "@/lib/numerologyUtils";
import { numerologyInsightsData } from "@/data/numerologyInsights";
import NumberCard from "@/components/NumberCard";
import { motion } from "motion/react";

export default function ResultsPage() {
  const router = useRouter();
  const { userData } = useNumerology();

  const [insights, setInsights] = useState({
    birth: "",
    lifePath: "",
    compound: "",
    destiny: "",
    soul: "",
    personality: "",
    name: "",
  });

  useEffect(() => {
    if (!userData) {
      router.push("/onboarding");
      return;
    }

    setInsights({
      birth: generateInsight(userData.birthNumber, "birthNumberInsights"),
      lifePath: generateInsight(
        userData.lifePathNumber,
        "lifePathNumberInsights"
      ),
      compound: numerologyInsightsData.compoundNumberInsights.find(
        (c) => c.number === userData.compoundNumber
      ),
      destiny: generateInsight(userData.destinyNumber, "destinyNumberInsights"),
      soul: generateInsight(userData.soulNumber, "soulNumberInsights"),
      personality: generateInsight(
        userData.personalityNumber,
        "personalityNumberInsights"
      ),
      name: generateInsight(userData.nameNumber, "nameNumberInsights"),
    });
  }, [userData, router]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading insights or redirecting...
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
          — here are your core & deeper numbers:
        </p>

        <h3 className="text-xl font-bold text-numerohub-bg mb-4">
          Core Numbers:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                ? `Meaning: ${insights.compound.meaning}\nSummary: ${insights.compound.summary}\nAdvice: ${insights.compound.advice}`
                : "N/A"
            }
          />
        </div>

        <h3 className="text-xl font-bold text-numerohub-bg mb-4">
          Deeper Numbers:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NumberCard
            title="Destiny Number"
            number={userData.destinyNumber}
            insight={insights.destiny}
            isDeeper
          />
          <NumberCard
            title="Soul Number"
            number={userData.soulNumber}
            insight={insights.soul}
            isDeeper
          />
          <NumberCard
            title="Personality Number"
            number={userData.personalityNumber}
            insight={insights.personality}
            isDeeper
          />
          <NumberCard
            title="Name Number"
            number={userData.nameNumber}
            insight={insights.name}
            isDeeper
          />
        </div>
      </motion.div>
    </div>
  );
}
