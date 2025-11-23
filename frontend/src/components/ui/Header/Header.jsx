import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button";
import { Menu, User, LogOut, Shield } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  // Remove all auth-related functionality
  const isAuthenticated = true; // Set to true to show all links by default
  const user = { role: "admin" }; // Mock user data for demonstration

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          UHRH
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 flex items-center gap-1">
            <User className="w-4 h-4" />
            Guest User
          </span>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-red-600 hover:bg-red-100"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Exit
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;