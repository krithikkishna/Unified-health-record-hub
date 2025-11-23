import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/styles/NotFound.module.scss";
import Button from "@/components/ui/Button";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(user ? "/dashboard" : "/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className={styles.notFound} role="alert" aria-label="404 Page Not Found">
      <div className={styles.icon}>
        <FaExclamationTriangle size={80} />
      </div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting you in 3 seconds...</p>

      <Button
        onClick={() => navigate(user ? "/dashboard" : "/login")}
        aria-label="Go to main page"
      >
        Go Now
      </Button>
    </div>
  );
};

export default NotFound;
