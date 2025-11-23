import React from "react";

const CKDAlert = ({ riskLevel = "low", className = "" }) => {
  const getColor = () => {
    if (riskLevel === "high") return "#f87171";     // Red
    if (riskLevel === "medium") return "#facc15";   // Yellow
    return "#4ade80";                               // Green
  };

  const bgColor = getColor();

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        backgroundColor: bgColor,
        padding: "12px",
        borderRadius: "8px",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
      }}
      className={className}
    >

    </div>
  );
};

export default CKDAlert;
