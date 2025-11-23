import { useState } from "react";

/**
 * Custom hook for handling biometric authentication like fingerprint and face recognition.
 * This simulates authentication behavior. Replace with real biometric APIs (WebAuthn, camera, etc.) as needed.
 */
const useBiometric = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [authError, setAuthError] = useState(null);

  const simulateAuthentication = async (type, delay) => {
    setIsAuthenticating(true);
    setAuthError(null);
    setAuthSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const success = Math.random() > 0.2;
      if (success) {
        setAuthSuccess(true);
      } else {
        throw new Error(`${type} authentication failed.`);
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const authenticateFingerprint = () => simulateAuthentication("Fingerprint", 1500);

  const authenticateFace = () => simulateAuthentication("Face recognition", 2000);

  const reset = () => {
    setAuthSuccess(false);
    setAuthError(null);
    setIsAuthenticating(false);
  };

  return {
    isAuthenticating,
    authSuccess,
    authError,
    authenticateFingerprint,
    authenticateFace,
    reset,
  };
};

export default useBiometric;
