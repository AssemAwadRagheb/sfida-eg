import React from "react";

const GenderIndicator = ({ gender }) => {
  // Define the symbols, labels, and colors for each gender
  const genderData = {
    M: { symbol: "♂", label: "رجالي", color: "bg-blue-300" }, // Male (lighter blue)
    F: { symbol: "♀", label: "نسائي", color: "bg-pink-300" }, // Female (lighter pink)
  };

  // If gender is "B" (both), render two labels
  if (gender === "l") {
    return (
      <div className="flex gap-2">
        <div
          className={`inline-flex items-center justify-center w-24 h-8 rounded-full text-white text-sm font-bold  ${genderData.M.color}`}
        >
          {genderData.M.symbol} {genderData.M.label} {/* Male symbol + label */}
        </div>
        <div
          className={`inline-flex items-center justify-center w-24 h-8 rounded-full text-white text-sm font-bold ${genderData.F.color}`}
        >
          {genderData.F.symbol} {genderData.F.label}{" "}
          {/* Female symbol + label */}
        </div>
      </div>
    );
  }

  // For single gender (male or female), render one label
  const { symbol, label, color } = genderData[gender] || {
    symbol: "",
    label: "",
    color: "white", // Lighter gray for unknown gender
  };

  return (
    <div
      className={`inline-flex items-center gap-2 justify-center w-24 h-8 rounded-full text-white text-sm font-bold ${color}`}
    >
      {symbol} {label} {/* Display the symbol + label */}
    </div>
  );
};

export default GenderIndicator;
