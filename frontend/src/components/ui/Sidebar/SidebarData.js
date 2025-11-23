// SidebarData.js
import { Home, Activity, ClipboardList } from "lucide-react";

export const sidebarLinks = {
  admin: [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Users", path: "/users", icon: ClipboardList },
    { name: "Audit Logs", path: "/audit", icon: Activity },
  ],
  doctor: [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Vitals", path: "/vitals", icon: Activity },
    { name: "ECG", path: "/ecg", icon: Activity },
    { name: "Prescriptions", path: "/prescriptions", icon: ClipboardList },
    { name: "Lab Results", path: "/lab-results", icon: ClipboardList },
    { name: "CKD Risk", path: "/predict/ckd", icon: Activity },
    { name: "Diabetes Risk", path: "/predict/diabetes", icon: Activity },
  ],
  patient: [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Vitals", path: "/vitals", icon: Activity },
    { name: "Lab Results", path: "/lab-results", icon: ClipboardList },
  ],
};
