import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('Predictive API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Main Predict Function
const predictDiseases = async (data, params = {}) => {
  try {
    const response = await api.post("/predictive/predict", data, { params });
    return response.data;
  } catch (error) {
    console.error("Prediction failed at /predictive/predict:", error);
    throw new Error("Prediction failed. Please check backend route or server.");
  }
};

// Diabetes Prediction
export const predictDiabetesRisk = (biomarkerData, params = {}) => {
  return predictDiseases(biomarkerData, params);
};

// History
export const getPredictionHistory = async (patientId) => {
  try {
    const response = await api.get(`/predictive/history/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    throw new Error(error.response?.data?.error || 'Error fetching prediction history');
  }
};

// Save
export const savePrediction = async (patientId, predictionData, notes = '') => {
  try {
    const payload = {
      predictions: predictionData.predictions,
      features: predictionData.features || {},
      notes
    };
    const response = await api.post(`/predictive/save/${patientId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error saving prediction:', error);
    throw new Error(error.response?.data?.error || 'Error saving prediction');
  }
};

// Delete
export const deletePrediction = async (predictionId) => {
  try {
    const response = await api.delete(`/predictive/${predictionId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting prediction:', error);
    throw new Error(error.response?.data?.error || 'Error deleting prediction');
  }
};

// Details
export const getPredictionDetails = async (predictionId) => {
  try {
    const response = await api.get(`/predictive/details/${predictionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction details:', error);
    throw new Error(error.response?.data?.error || 'Error fetching prediction details');
  }
};

// Add Notes
export const addPredictionNotes = async (predictionId, notes) => {
  try {
    const response = await api.patch(`/predictive/${predictionId}/notes`, { notes });
    return response.data;
  } catch (error) {
    console.error('Error adding prediction notes:', error);
    throw new Error(error.response?.data?.error || 'Error adding prediction notes');
  }
};

// Stats
export const getPredictionStats = async (patientId) => {
  try {
    const response = await api.get(`/predictive/stats/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction stats:', error);
    throw new Error(error.response?.data?.error || 'Error fetching prediction statistics');
  }
};

export default {
  predictDiseases,
  predictDiabetesRisk,
  getPredictionHistory,
  savePrediction,
  deletePrediction,
  getPredictionDetails,
  addPredictionNotes,
  getPredictionStats
};
