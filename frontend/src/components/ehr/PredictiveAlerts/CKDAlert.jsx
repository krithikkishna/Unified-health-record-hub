import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const CKDAlert = ({ riskLevel, onAction }) => {
  const isHighRisk = riskLevel === 'high' || riskLevel >= 0.7;

  if (!isHighRisk) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-md flex items-start space-x-4"
    >
      <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-800 text-lg">High CKD Risk Detected</h4>
        <p className="text-sm">
          This patient has a high likelihood of Chronic Kidney Disease. Immediate attention is
          recommended. Please review lab data and schedule follow-up diagnostics.
        </p>
        {onAction && (
          <button
            onClick={onAction}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
          >
            View Full Report
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CKDAlert;
