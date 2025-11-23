import React from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import styles from "@/styles/Biometric.module.scss";

const FaceRecognition = ({ onScan, loading, success, error }) => {
  return (
    <div className={styles.biometricBox}>
      <h4 className={styles.title}>Face Recognition</h4>
      <button
        className={styles.scanButton}
        onClick={onScan}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Scan Face"}
      </button>

      {success && (
        <div className={styles.success} role="status">
          <CheckCircle size={18} />
          <span>Authentication successful</span>
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          <XCircle size={18} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
