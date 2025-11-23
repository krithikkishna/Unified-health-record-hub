import { createContext, useContext, useEffect, useState } from "react";
import FHIRAPI from "/src/api/fhirAPI.js";
import { useAuth } from "./AuthContext";

const FHIRContext = createContext();

export const FHIRProvider = ({ children }) => {
  const { token } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatientData = async (patientId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await FHIRAPI.getPatientById(patientId);
      setPatientData(data);
    } catch (err) {
      console.error("Error fetching patient data:", err);
      setError("Failed to fetch patient data.");
    } finally {
      setLoading(false);
    }
  };

  const createObservation = async (observation) => {
    try {
      await FHIRAPI.createObservation(observation);
    } catch (err) {
      console.error("Error creating observation:", err);
      setError("Failed to create observation.");
    }
  };

  const updatePatient = async (patientId, updates) => {
    try {
      await FHIRAPI.updatePatient(patientId, updates);
    } catch (err) {
      console.error("Error updating patient:", err);
      setError("Failed to update patient.");
    }
  };

  // Optional: auto-fetch patient data based on token/session
  useEffect(() => {
    // preload logic or token refresh if needed
  }, [token]);

  return (
    <FHIRContext.Provider
      value={{
        patientData,
        loading,
        error,
        fetchPatientData,
        createObservation,
        updatePatient,
      }}
    >
      {children}
    </FHIRContext.Provider>
  );
};

export const useFHIR = () => useContext(FHIRContext);
