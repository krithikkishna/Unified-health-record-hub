import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import VitalsTrend from "@/components/monitoring/VitalsTrend";
import CKDAlert from "@/components/predictive/CKDAlert";
import DiabetesRisk from "@/components/predictive/DiabetesRisk";
import LabResults from "@/components/data/LabResults";
import ECGMonitor from "@/components/monitoring/ECGMonitor";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
      },
    }),
  };

  const cardStyle =
    "bg-white shadow-lg p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300";

  return (
    <div className="p-8 space-y-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {user?.name || "User"} 
          </h1>
          <p className="text-gray-500 text-lg mt-1">
            Here’s your health overview and predictions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {["VitalsTrend", "ECGMonitor", "LabResults", "CKDAlert", "DiabetesRisk"].map((component, i) => (
          <motion.div
            className={cardStyle}
            key={component}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariant}
          >
            {component === "VitalsTrend" && (
              <>
                <h2 className="text-xl font-semibold mb-3">Vital Signs </h2>
                <VitalsTrend />
              </>
            )}
            {component === "ECGMonitor" && (
              <>
                <h2 className="text-xl font-semibold mb-3">ECG Monitor </h2>
                <ECGMonitor />
              </>
            )}
            {component === "LabResults" && (
              <>
                <h2 className="text-xl font-semibold mb-3">Recent Lab Results</h2>
                <LabResults />
              </>
            )}
            {component === "CKDAlert" && (
              <>
                <h2 className="text-xl font-semibold mb-3">CKD Prediction</h2>
                <CKDAlert />
              </>
            )}
            {component === "DiabetesRisk" && (
              <>
                <h2 className="text-xl font-semibold mb-3">Diabetes Risk Predictor</h2>
                <DiabetesRisk />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
