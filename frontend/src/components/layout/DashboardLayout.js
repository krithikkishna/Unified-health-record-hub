import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md fixed top-0 left-0 h-full z-10">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
