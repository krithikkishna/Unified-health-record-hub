// fhir-test-data.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const FHIR_BASE_URL = process.env.FHIR_BASE_URL || 'https://fhir.uhrh.com/r4';

const seedFHIRData = async () => {
  try {
    console.log('🚀 Seeding FHIR test data...');

    // Example: Patient resource
    const patientData = {
      resourceType: 'Patient',
      name: [{ use: 'official', family: 'Doe', given: ['John'] }],
      gender: 'male',
      birthDate: '1985-06-01',
      address: [{ city: 'Chennai', country: 'India' }]
    };

    const patientRes = await axios.post(`${FHIR_BASE_URL}/Patient`, patientData, {
      headers: { 'Content-Type': 'application/fhir+json' }
    });
    const patientId = patientRes.data.id;
    console.log(`✅ Patient created: ID = ${patientId}`);

    // Example: Observation - CKD Stage
    const observationData = {
      resourceType: 'Observation',
      status: 'final',
      category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'laboratory' }] }],
      code: {
        coding: [{ system: 'http://loinc.org', code: '33914-3', display: 'Albumin/Creatinine [Ratio] in Urine' }],
        text: 'Urine ACR'
      },
      subject: { reference: `Patient/${patientId}` },
      effectiveDateTime: new Date().toISOString(),
      valueQuantity: {
        value: 120,
        unit: 'mg/g',
        system: 'http://unitsofmeasure.org',
        code: 'mg/g'
      }
    };

    const obsRes = await axios.post(`${FHIR_BASE_URL}/Observation`, observationData, {
      headers: { 'Content-Type': 'application/fhir+json' }
    });
    console.log(`🧪 Observation created: ID = ${obsRes.data.id}`);

    // You can add Conditions, Medications, etc. similarly

    console.log('🎉 FHIR test data seeded successfully.');

  } catch (err) {
    console.error('❌ Failed to seed FHIR data:', err.response?.data || err.message);
  }
};

seedFHIRData();
