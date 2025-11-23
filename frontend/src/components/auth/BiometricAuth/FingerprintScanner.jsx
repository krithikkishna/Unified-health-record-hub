// src/components/FingerprintScanner.jsx

import React, { useState } from 'react';
import { FaFingerprint } from 'react-icons/fa';
import styles from './FingerprintScanner.module.scss';

const FingerprintScanner = ({ onAuthenticated }) => {
  const [scanning, setScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = () => {
    if (scanning || authenticated) return;

    setScanning(true);
    setError(null);

    setTimeout(() => {
      const success = Math.random() > 0.2;

      setScanning(false);
      if (success) {
        setAuthenticated(true);
        onAuthenticated?.();
      } else {
        setError('Fingerprint not recognized. Please try again.');
      }
    }, 2000);
  };

  const resetScan = () => {
    setAuthenticated(false);
    setError(null);
  };

  return (
    <div className={styles.scanner}>
      <h3>Fingerprint Authentication</h3>

      <div
        className={`${styles.fingerprintIcon} ${
          scanning ? styles.scanning : ''
        } ${authenticated ? styles.authenticated : ''}`}
        onClick={handleScan}
      >
        <FaFingerprint size={64} />
      </div>

      <p className={styles.message}>
        {scanning && 'Scanning...'}
        {authenticated && 'Authenticated ✅'}
        {error && (
          <>
            <span className={styles.error}>{error}</span>
            <br />
            <button onClick={resetScan} className={styles.retryBtn}>
              Retry
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default FingerprintScanner;
