// components/UserBadge.jsx
"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { User } from "lucide-react";

export default function UserBadge() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 shadow-md">
        <User className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}
