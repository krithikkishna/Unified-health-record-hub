// src/components/charts/ECGChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./charts.module.scss";

const ECGChart = ({ data }) => {
  const maxSignal = Math.max(...data.map((d) => d.signal));
  const threshold = 1.2;

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>ECG Monitor</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={false} />
          <YAxis domain={[-1.5, 1.5]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="signal"
            stroke="#e63946"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
      {maxSignal > threshold && (
        <div className="text-red-600 font-semibold mt-2 text-sm text-center">
           Alert: Abnormal ECG signal amplitude detected!
        </div>
      )}
    </div>
  );
};

export default ECGChart;
