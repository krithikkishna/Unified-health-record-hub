import apiClient from './apiClient';

const API_BASE = '/fhir';

// 🧑‍⚕️ Patient APIs
export const getAllPatients = async () => {
  const response = await apiClient.get(`${API_BASE}/patients`);
  return response.data;
};

export const searchPatients = async (query) => {
  const response = await apiClient.get(`${API_BASE}/patients`, {
    params: { name: query },
  });
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await apiClient.get(`${API_BASE}/patients/${id}`);
  return response.data;
};

export const getMedicalHistory = async (id) => {
  const response = await apiClient.get(`${API_BASE}/patients/${id}/medical-history`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await apiClient.post(`${API_BASE}/patients`, patientData);
  return response.data;
};

export const updatePatient = async (id, updatedData) => {
  const response = await apiClient.put(`${API_BASE}/patients/${id}`, updatedData);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await apiClient.delete(`${API_BASE}/patients/${id}`);
  return response.data;
};

// 📊 Observations
export const fetchObservations = async (patientId) => {
  const response = await apiClient.get(`${API_BASE}/observations`, {
    params: { patient: patientId },
  });
  return response.data;
};

// ✅ Default export (if needed)
export default {
  getAllPatients,
  searchPatients,
  getPatientById,
  getMedicalHistory,
  createPatient,
  updatePatient,
  deletePatient,
  fetchObservations,
};
