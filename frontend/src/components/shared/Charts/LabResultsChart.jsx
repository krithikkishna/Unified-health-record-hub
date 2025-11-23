// src/components/charts/LabResultsChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./charts.module.scss"; // ✅ Use as module

const LabResultsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Lab Results Over Time</h3>
        <p className="text-center text-gray-500">No lab data to display.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Lab Results Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <YAxis
            label={{ value: "Measurement", angle: -90, position: "insideLeft" }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(2)}`, name]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="creatinine"
            stroke="#ff6b6b"
            strokeWidth={2}
            name="Creatinine (mg/dL)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="hemoglobin"
            stroke="#1e90ff"
            strokeWidth={2}
            name="Hemoglobin (g/dL)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="glucose"
            stroke="#2ecc71"
            strokeWidth={2}
            name="Glucose (mg/dL)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LabResultsChart;
