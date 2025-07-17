// components/NumberCard.jsx
"use client";

import React from "react";
import { motion } from "motion/react";

export default function NumberCard({ title, number, insight = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-sm shadow-2xl text-white transition-all duration-300 flex flex-col gap-3 h-max"
    >
      {/* Title */}
      <h3 className="text-center text-xl font-bold text-numerohub-accent">{title}</h3>

      {/* Number */}
      <div className="text-center text-4xl font-extrabold text-numerohub-primary">
        {number}
      </div>

      {/* Insight */}
      <p className="text-sm text-white/90 whitespace-pre-line">{insight}</p>
    </motion.div>
  );
}
