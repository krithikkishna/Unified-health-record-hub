// src/components/Monitoring/DiabetesRisk.jsx
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const getRiskStatus = (score) => {
  if (score >= 0.8) return { label: 'Very High', color: 'bg-red-600' };
  if (score >= 0.6) return { label: 'High', color: 'bg-orange-500' };
  if (score >= 0.4) return { label: 'Moderate', color: 'bg-yellow-400' };
  return { label: 'Low', color: 'bg-green-500' };
};

const DiabetesRisk = ({ riskScore }) => {
  const { label, color } = getRiskStatus(riskScore || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl p-5 shadow-md space-y-3"
    >
      <div className="flex items-center space-x-2">
        <AlertCircle className="text-pink-500" />
        <h2 className="text-lg font-semibold">Diabetes Risk Assessment</h2>
      </div>
      <div>
        <p className="text-sm text-gray-700 mb-1">Current Risk Score: <span className="font-semibold">{(riskScore * 100).toFixed(1)}%</span> - <span className={`font-bold ${color}`}>{label}</span></p>
        <Progress value={riskScore * 100} className="h-3" indicatorClassName={color} />
      </div>
      {riskScore >= 0.6 && (
        <div className="text-sm text-red-600 mt-2">
          ⚠️ Patient may require further glucose tolerance testing and lifestyle intervention.
        </div>
      )}
    </motion.div>
  );
};

export default DiabetesRisk;
