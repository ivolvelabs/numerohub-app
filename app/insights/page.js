// app/insights/page.js (guarded with auth check)
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import insightData from "@/data/insightData";
import { motion } from "motion/react";
import DomainCard from "@/components/DomainCard";

const domainOrder = [
  "Health",
  "Mental",
  "Spiritual",
  "Love",
  "Finance",
  "Affirmation",
];

export default function InsightsPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/results");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-fit min-h-screen w-full overflow-hidden p-[20px] pb-24">
      <img
        src="/images/insight-illustration.png"
        alt="Insights Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-numerohub-primary/30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 m-auto p-6 max-w-6xl w-full bg-white/20 rounded-2xl border backdrop-blur-xs border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-numerohub-bg text-center mb-4">
          Daily Domain Insights 🌌
        </h2>
        <p className="text-white/90 text-center mb-10">
          Tailored to your core numerology and today’s energies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainOrder.map((domain) => {
            const insight = insightData[domain];
            // console.log(insight + "insight");
            const isLocked = insight?.premium && !user?.premium;
            // console.log(isLocked + "isLocked");
            const actualInsight = isLocked ? "" : `${insight.text}`;
            // console.log(actualInsight + "actualInsight");

            return (
              <DomainCard
                key={domain}
                title={domain}
                content={actualInsight}
                locked={isLocked}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}