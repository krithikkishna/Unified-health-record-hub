import { useState } from "react";
import predictiveAPI from "@/api/predictiveAPI";

/**
 * Custom hook to handle predictive model API calls (e.g., CKD, Diabetes).
 */
const usePredictive = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Submits data to the selected predictive model and stores the result.
   * @param {Object} inputData - Input data for prediction (e.g., lab results, vitals).
   * @param {string} model - The predictive model type: 'ckd', 'diabetes', etc.
   */
  const predict = async (inputData, model = "ckd") => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      let res;
      switch (model) {
        case "diabetes":
          res = await predictiveAPI.predictDiabetes(inputData);
          break;
        case "ckd":
        default:
          res = await predictiveAPI.predictCKD(inputData);
          break;
      }

      if (res?.prediction != null) {
        setPrediction(res.prediction);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err?.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets the prediction and error state.
   */
  const reset = () => {
    setPrediction(null);
    setError(null);
  };

  return {
    predict,
    prediction,
    loading,
    error,
    reset,
  };
};

export default usePredictive;
