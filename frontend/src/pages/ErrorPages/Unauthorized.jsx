import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import styles from "@/styles/Unauthorized.module.scss";
import Button from "@/components/ui/Button";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedirect = () => {
    if (!user) {
      navigate("/login");
    } else {
      // Redirect based on role if needed
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "patient":
          navigate("/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  return (
    <div className={styles.unauthorized}>
      <div className={styles.icon}>
        <FaLock size={80} />
      </div>
      <h1>403 - Unauthorized</h1>
      <p>You don’t have permission to access this page.</p>
      <Button onClick={handleRedirect}>
        {user ? "Go to Dashboard" : "Login"}
      </Button>
    </div>
  );
};

export default Unauthorized;
