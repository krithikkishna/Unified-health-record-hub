import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col justify-between bg-white shadow-md p-4 w-64">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-6">UHRH</h1>
        
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/users" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Users size={20} />
            <span>Users</span>
          </Link>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">1. Audit Logs</h2>
            <Link to="/audit-logs" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FileText size={20} />
              <span>View Logs</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <footer className="text-xs text-gray-400 space-y-2">
        <p className="text-center">eCard Hub. All rights reserved.</p>
        <div className="flex justify-between text-blue-500">
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
