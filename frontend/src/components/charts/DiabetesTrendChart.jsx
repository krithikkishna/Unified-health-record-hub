import React from "react";
import { AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const getRiskLevel = (riskScore) => {
  if (riskScore >= 0.8)
    return {
      level: "High",
      icon: <AlertTriangle className="text-red-600" />,
      borderClass: "border-red-500",
      textClass: "text-red-700",
    };
  if (riskScore >= 0.5)
    return {
      level: "Moderate",
      icon: <Activity className="text-yellow-500" />,
      borderClass: "border-yellow-500",
      textClass: "text-yellow-700",
    };
  return {
    level: "Low",
    icon: <CheckCircle className="text-green-600" />,
    borderClass: "border-green-500",
    textClass: "text-green-700",
  };
};

const DiabetesRisk = ({ riskScore = 0.32 }) => {
  const { level, icon, borderClass, textClass } = getRiskLevel(riskScore);

  return (
    <Card className={`p-4 border-l-4 shadow ${borderClass}`}>
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-md font-semibold">Diabetes Risk Alert</h3>
          <p className="text-sm text-gray-600">
            Risk Level: <strong className={textClass}>{level}</strong> ({(riskScore * 100).toFixed(1)}%)
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DiabetesRisk;
