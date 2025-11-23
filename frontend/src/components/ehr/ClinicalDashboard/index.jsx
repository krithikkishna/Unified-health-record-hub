import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import roleWidgets from '@/config/roleWidgets';

import VitalsTrend from '@/components/Monitoring/VitalsTrend';
import ECGMonitor from '@/components/Monitoring/ECGMonitor';
import LabResults from '@/components/Monitoring/LabResults';
import Prescriptions from '@/components/Monitoring/Prescriptions';
import FingerprintScanner from '@/components/Biometrics/FingerprintScanner';
import FaceRecognition from '@/components/Biometrics/FaceRecognition';
import RoleSelector from '@/components/Auth/RoleSelector';

const widgetMap = {
  VitalsTrend: <VitalsTrend />,
  ECGMonitor: <ECGMonitor />,
  LabResults: <LabResults />,
  Prescriptions: <Prescriptions />,
  FingerprintScanner: <FingerprintScanner />,
  FaceRecognition: <FaceRecognition />,
  RoleSelector: <RoleSelector />,
  AdminControls: (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">🛠 Admin Controls</h2>
      <p className="text-sm text-gray-600">Manage roles, logs, system settings, etc.</p>
    </div>
  ),
};

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth.role);
  const widgets = roleWidgets[userRole] || [];

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {widgets.map((key) => widgetMap[key])}
      </motion.div>
    </div>
  );
};

export default Dashboard;
