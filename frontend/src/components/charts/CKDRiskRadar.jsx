import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const CKDRiskRadar = ({ data }) => {
  const radarData = data || [
    { factor: "GFR", value: 75 },
    { factor: "Albumin", value: 60 },
    { factor: "Blood Pressure", value: 90 },
    { factor: "Diabetes", value: 80 },
    { factor: "Age", value: 50 },
    { factor: "BMI", value: 70 },
  ];

  const isEmpty = !radarData || radarData.length === 0;

  // Calculate average to determine color
  const average =
    radarData.reduce((sum, item) => sum + item.value, 0) / radarData.length;

  const riskColor =
    average > 75
      ? "#dc2626" // High risk - red
      : average > 50
      ? "#facc15" // Moderate risk - yellow
      : "#22c55e"; // Low risk - green

  if (isEmpty) {
    return (
      <Card className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-4">CKD Risk Radar</h3>
        <p>No data available to display the radar chart.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">CKD Risk Radar</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="factor" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Risk Factor"
            dataKey="value"
            stroke={riskColor}
            fill={riskColor}
            fillOpacity={0.6}
            isAnimationActive={true}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CKDRiskRadar;
