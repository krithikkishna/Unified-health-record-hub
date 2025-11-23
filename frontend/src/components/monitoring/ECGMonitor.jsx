import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const generateECGData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({ time: i, value: Math.sin(i / 2) * 100 + Math.random() * 20 });
  }
  return data;
};

const ECGMonitor = () => {
  const [ecgData, setEcgData] = useState(generateECGData());
  const [anomalyDetected, setAnomalyDetected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEcgData(prevData => {
        const newValue = Math.sin(prevData.length / 2) * 100 + Math.random() * 20;
        const isAnomalous = newValue > 120 || newValue < -120;

        if (isAnomalous) setAnomalyDetected(true);

        const newData = [...prevData.slice(1)];
        newData.push({ time: prevData[prevData.length - 1].time + 1, value: newValue });
        return newData;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const clearAlert = () => setAnomalyDetected(false);

  return (
    <Card className="p-4 relative">
      <h3 className="text-lg font-semibold mb-4 text-center">ECG Monitor</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={ecgData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide />
          <YAxis domain={[-150, 150]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <AnimatePresence>
        {anomalyDetected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl shadow-md flex items-center gap-2 z-10"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Anomaly detected in ECG</span>
            <button
              onClick={clearAlert}
              className="ml-2 text-sm underline hover:text-red-800"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ECGMonitor;
