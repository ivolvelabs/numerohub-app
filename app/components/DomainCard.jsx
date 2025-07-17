// components/DomainCard.jsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DomainCard({ title, content, locked }) {
  const router = useRouter();
function getRandomPlaceholder() {
  const placeholders = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    "Nunc ultrices velit ut semper varius. Integer fermentum orci nec commodo. Integer fermentum orci nec commodo.",
    "Curabitur sit amet sapien in metus mattis varius non nec lorem.",
  ];
  return placeholders[Math.floor(Math.random() * placeholders.length)];
}
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-sm shadow-2xl text-white transition-all duration-300 flex flex-col gap-3 h-max relative"
    >
      {/* Locked Badge */}
      {locked && (
        <div className="absolute top-3 right-3 bg-black/50 px-3 py-1 rounded-full flex items-center gap-1 text-xs text-white">
          <Lock className="w-4 h-4" /> Locked
        </div>
      )}

      {/* Title */}
      <h3 className="text-center text-xl font-bold text-numerohub-accent mb-2">
        {title}
      </h3>

      {/* Content */}
      <p
        className={`text-sm text-white/90 whitespace-pre-line ${
          locked ? "blur-sm text-white/40 italic" : ""
        }`}
      >
        {locked ? getRandomPlaceholder() : content}
      </p>

      {/* Buy Premium Button */}
      {locked && (
        <button
          onClick={() => router.push("/premium")}
          className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-full text-sm glow-shimmer-button"
        >
          Buy Premium
        </button>
      )}
    </motion.div>
  );
}
