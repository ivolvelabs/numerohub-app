// components/NumberCard.js
import React from "react";

const NumberCard = ({ title, number, insight, isDeeper = false }) => {
  const numberSizeClass = isDeeper ? "text-3xl" : "text-4xl";
  return (
    <div className="bg-numerohub-secondary/10 p-4 rounded-lg shadow-sm flex flex-col items-center">
      <p className="text-gray-600 font-medium">{title}</p>
      <p className={`${numberSizeClass} font-extrabold text-numerohub-primary`}>
        {number}
      </p>
      <p className="text-sm text-gray-700 mt-2">{insight}</p>
    </div>
  );
};

export default NumberCard;
