import React from "react";
import FingerprintScanner from "./FingerprintScanner";
import FaceRecognition from "./FaceRecognition";
import styles from "@/styles/BiometricAuthCard.module.scss";

const BiometricAuthCard = ({
  onFingerprintAuthenticated,
  onFaceAuthenticated,
}) => {
  return (
    <div className={styles.biometricAuthCard}>
      <h4 className={styles.title}>Biometric Authentication</h4>
      <div className={styles.biometricOptions}>
        <FingerprintScanner onAuthenticated={onFingerprintAuthenticated} />
        <FaceRecognition onAuthenticated={onFaceAuthenticated} />
      </div>
    </div>
  );
};

export default BiometricAuthCard;
