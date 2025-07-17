// app/premium/page.js
"use client";

import React from "react";
import { motion } from "motion/react";

import { useUser } from "@/context/UserContext";
import { setUserPremium } from "@/lib/setPremium";

const plans = [
  {
    title: "Weekly Access",
    price: "₹99",
    duration: "7 days of premium insights",
  },
  {
    title: "Monthly Access",
    price: "₹199",
    duration: "30 days full access",
  },
  {
    title: "3-Month Plan",
    price: "₹399",
    duration: "Best value for consistent users",
  },
];

export default function PremiumPage() {
  const { user } = useUser();

  const handlePremium = async (plan) => {
    if (user) {
      await setUserPremium(user.uid);
      alert(`You have successfully purchased the ${plan.title}!`);
    } else {
      alert("Please log in to purchase a premium plan.");
    }
  };
  return (
    <div className="relative flex flex-col h-fit min-h-screen w-full overflow-hidden p-[20px] pb-24">
      <img
        src="/images/premium-illustration.png"
        alt="Premium Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-numerohub-primary/30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 m-auto p-6 max-w-3xl w-full bg-white/20 rounded-2xl border backdrop-blur-sm border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-numerohub-bg mb-6">
          Unlock Premium 🔓
        </h2>
        <p className="text-white/90 text-center mb-10">
          Access deeper life insights, affirmations, and exclusive content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-6 text-center text-white shadow-md"
            >
              <h3 className="text-xl font-bold text-numerohub-accent mb-2">
                {plan.title}
              </h3>
              <p className="text-2xl font-bold mb-1">{plan.price}</p>
              <p className="text-sm mb-4">{plan.duration}</p>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full hover:scale-105 transition-all" onClick={() => handlePremium(plan)}>
                Purchase
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
