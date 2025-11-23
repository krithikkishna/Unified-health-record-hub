// src/components/biometric/FaceRecognition.jsx

import React, { useState } from "react";

const FaceRecognition = ({ onRecognitionSuccess, onRecognitionFail }) => {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState("");

  const simulateFaceScan = () => {
    setScanning(true);
    setStatus("Scanning for face...");

    setTimeout(() => {
      const success = Math.random() > 0.25; // 75% chance of success
      setScanning(false);

      if (success) {
        setStatus("Face recognized!");
        onRecognitionSuccess?.("dummy-face-auth-token");
      } else {
        setStatus("Face not recognized. Try again.");
        onRecognitionFail?.();
      }
    }, 2500);
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p style={{ fontWeight: "500", marginBottom: "8px" }}>Facial Recognition</p>
      <button
        onClick={simulateFaceScan}
        disabled={scanning}
        style={{
          padding: "10px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: scanning ? "not-allowed" : "pointer",
        }}
      >
        {scanning ? "Scanning..." : "Scan Face"}
      </button>
      <p style={{ marginTop: "10px", color: status.includes("not") ? "red" : "green" }}>{status}</p>
    </div>
  );
};

export default FaceRecognition;
