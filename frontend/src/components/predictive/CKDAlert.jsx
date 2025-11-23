// src/components/alerts/CKDAlert.jsx
import React from "react";

const CKDAlert = ({ riskLevel }) => {
  const getColor = () => {
    if (riskLevel === "high") return "#f87171";
    if (riskLevel === "medium") return "#facc15";
    return "#4ade80";
  };

  return (
    <div style={{
      backgroundColor: getColor(),
      padding: "12px",
      borderRadius: "8px",
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
    }}>
    </div>
  );
};

export default CKDAlert;
