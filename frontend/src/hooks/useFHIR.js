import { useContext } from "react";
import { FHIRContext } from "@/context/FHIRContext";

/**
 * Custom hook to access the FHIR client from context.
 * @returns {Object} - The FHIR client and connection status.
 */
const useFHIR = () => {
  const context = useContext(FHIRContext);

  if (!context) {
    throw new Error("useFHIR must be used within a FHIRProvider");
  }

  return context;
};

export default useFHIR;
