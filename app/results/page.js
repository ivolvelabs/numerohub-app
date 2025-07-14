// app/results/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNumerology } from "@/context/NumerologyContext"; // Changed import path
import { generateInsight } from "@/lib/numerologyUtils"; // Changed import path
import { numerologyInsightsData } from "@/data/numerologyInsights"; // Changed import path
import NumberCard from "@/components/NumberCard"; // Changed import path

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
      <div className="flex-grow flex items-center justify-center p-4 text-gray-600">
        Loading insights or redirecting...
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-numerohub-primary mb-6">
          Your Numerology Blueprint Unveiled! ✨
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Hello,{" "}
          <span className="font-semibold text-numerohub-accent">
            {userData.name}
          </span>
          ! Here are your core and deeper numerology numbers, and their
          insights:
        </p>

        <h3 className="text-xl font-bold text-numerohub-primary mt-8 mb-4">
          Core Numbers:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                ? `Meaning: ${insights.compound.meaning}. Summary: ${insights.compound.summary}. Advice: ${insights.compound.advice}.`
                : "N/A"
            }
          />
        </div>

        <h3 className="text-xl font-bold text-numerohub-primary mt-8 mb-4">
          Deeper Numbers:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <NumberCard
            title="Destiny Number"
            number={userData.destinyNumber}
            insight={insights.destiny}
            isDeeper={true}
          />
          <NumberCard
            title="Soul Number"
            number={userData.soulNumber}
            insight={insights.soul}
            isDeeper={true}
          />
          <NumberCard
            title="Personality Number"
            number={userData.personalityNumber}
            insight={insights.personality}
            isDeeper={true}
          />
          <NumberCard
            title="Name Number"
            number={userData.nameNumber}
            insight={insights.name}
            isDeeper={true}
          />
        </div>
      </div>
    </div>
  );
}
