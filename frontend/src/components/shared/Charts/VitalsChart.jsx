// src/components/charts/VitalsChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import { chartColors } from "@/config/chartStyles";
import styles from "./charts.module.scss"; // ✅ Fixed SCSS module import

const VitalsChart = ({ data = [] }) => {
  return (
    <div className={styles.chartContainer}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={styles.chartTitle}>Vitals Trend</h3>
        <CSVLink data={data} filename="vitals-data.csv">
          <Button variant="outline" size="sm">Export CSV</Button>
        </CSVLink>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No vitals data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) =>
                new Date(ts).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              labelFormatter={(label) =>
                `Time: ${new Date(label).toLocaleTimeString()}`
              }
            />
            <Legend />
            <ReferenceLine
              y={100}
              stroke={chartColors.danger}
              strokeDasharray="3 3"
              label="High HR"
            />
            <ReferenceLine
              y={140}
              stroke={chartColors.danger}
              strokeDasharray="3 3"
              label="High BP"
            />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke={chartColors.primary}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="bloodPressure"
              stroke={chartColors.success}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke={chartColors.warning}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VitalsChart;
