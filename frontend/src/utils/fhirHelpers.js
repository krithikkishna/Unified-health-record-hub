// utils/fhirHelpers.js

// Get full name from FHIR Patient resource
export const getPatientName = (patient) => {
    if (!patient || !patient.name || patient.name.length === 0) return 'Unknown';
  
    const nameObj = patient.name[0];
    const firstName = nameObj.given?.[0] || '';
    const lastName = nameObj.family || '';
    return `${firstName} ${lastName}`.trim();
  };
  
  // Get gender with fallback
  export const getPatientGender = (patient) => {
    return patient?.gender ? capitalize(patient.gender) : 'Not specified';
  };
  
  // Get birth date with formatting
  export const getPatientDOB = (patient) => {
    if (!patient?.birthDate) return 'Unknown';
    return new Date(patient.birthDate).toLocaleDateString();
  };
  
  // Capitalize string
  export const capitalize = (str) =>
    typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  
  // Extract latest vital observation by type (e.g., 'heart-rate')
  export const extractLatestObservation = (observations, code) => {
    if (!Array.isArray(observations)) return null;
  
    const match = observations.find((obs) =>
      obs.code?.coding?.some((c) => c.code === code)
    );
  
    return match?.valueQuantity?.value || null;
  };
  
  // Format address
  export const formatAddress = (address) => {
    if (!address || address.length === 0) return 'N/A';
  
    const addr = address[0];
    return [addr.line?.join(', '), addr.city, addr.state, addr.postalCode]
      .filter(Boolean)
      .join(', ');
  };
  
  // Extract contact information
  export const getContactInfo = (telecom = []) => {
    const phone = telecom.find((t) => t.system === 'phone')?.value || 'N/A';
    const email = telecom.find((t) => t.system === 'email')?.value || 'N/A';
    return { phone, email };
  };
  
  // Extract allergies
  export const getAllergies = (allergyList = []) =>
    allergyList.map((entry) => entry.code?.text || 'Unknown');
  
  