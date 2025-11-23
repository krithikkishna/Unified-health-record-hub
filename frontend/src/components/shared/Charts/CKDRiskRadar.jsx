// src/components/charts/CKDRiskRadar.jsx
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
import styles from "./charts.module.scss"; // Import as module

const CKDRiskRadar = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>CKD Risk Factors</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart outerRadius={130} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="factor" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar
            name="Risk Score"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CKDRiskRadar;
