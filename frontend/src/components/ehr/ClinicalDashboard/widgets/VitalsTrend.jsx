
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import styles from "./styles.module.scss";

const VitalsTrend = () => {
  const [data, setData] = useState([]);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    let interval;
    if (tracking) {
      interval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const newEntry = {
          time: timestamp,
          heartRate: 60 + Math.floor(Math.random() * 40),
          bp: 110 + Math.floor(Math.random() * 20),
          spo2: 95 + Math.floor(Math.random() * 5),
          temp: 97 + Math.random() * 2
        };
        setData(prev => [...prev.slice(-19), newEntry]); // keep last 20 records
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tracking]);

  const handleExport = () => {
    const csv = [
      "Time,Heart Rate,Blood Pressure,SpO2,Temperature",
      ...data.map(d =>
        `${d.time},${d.heartRate},${d.bp},${d.spo2},${d.temp.toFixed(1)}`
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vitals_trend_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <div className={styles.header}>
          <h2 className={styles.title}>📊 Vitals Trend</h2>
          <div className={styles.controls}>
            <Button variant="default" onClick={() => setTracking(!tracking)}>
              {tracking ? "Pause" : "Track"}
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-1 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip formatter={(value, name) => {
              if (name === "Temp (°F)") return [`${value.toFixed(1)}°F`, name];
              if (name === "SpO₂") return [`${value}%`, name];
              if (name === "Heart Rate") return [`${value} bpm`, name];
              if (name === "BP (Sys)") return [`${value} mmHg`, name];
              return [value, name];
            }} />
            <Legend />
            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate" dot={false} />
            <Line type="monotone" dataKey="bp" stroke="#3b82f6" strokeWidth={2} name="BP (Sys)" dot={false} />
            <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={2} name="SpO₂" dot={false} />
            <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temp (°F)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VitalsTrend;
