import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FHIRProvider } from "./contexts/FHIRContext";

import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import ToastContainer from "./components/common/ToastContainer";

import "./styles/main.scss";

// Lazy-loaded pages
const WelcomePage = lazy(() => import("./pages/Welcomepage"));
const Dashboard = lazy(() => import("./pages/PatientPortal/Dashboard"));
const MedicalHistory = lazy(() => import("./pages/PatientPortal/MedicalHistory"));
const PatientManagement = lazy(() => import("./pages/HospitalPortal/PatientManagement"));
const ClinicalTools = lazy(() => import("./pages/HospitalPortal/ClinicalTools"));
const UserManagement = lazy(() => import("./pages/AdminPortal/UserManagement"));
const SystemHealth = lazy(() => import("./pages/AdminPortal/SystemHealth"));
const Unauthorized = lazy(() => import("./pages/ErrorPages/Unauthorized"));
const NotFound = lazy(() => import("./pages/ErrorPages/404"));

const App = () => {
  const location = useLocation();
  
  // Normalize pathname
  const currentPath = location.pathname.toLowerCase();
  const publicRoutes = ["/", "/unauthorized"];
  const isPublicRoute = publicRoutes.includes(currentPath);

  return (
    <FHIRProvider>
      <ThemeProvider>
        <div className="app-container">
          {!isPublicRoute && <Header />}
          <div className="main-content">
            {!isPublicRoute && <Sidebar />}
            <div className={`page-content ${isPublicRoute ? "public-page" : ""}`}>
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />

                  {/* Now-unprotected routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/medical-history" element={<MedicalHistory />} />
                  <Route path="/patient-management" element={<PatientManagement />} />
                  <Route path="/clinical-tools" element={<ClinicalTools />} />
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/system-health" element={<SystemHealth />} />

                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          {!isPublicRoute && <Footer />}
          <ToastContainer />
        </div>
      </ThemeProvider>
    </FHIRProvider>
  );
};

export default App;