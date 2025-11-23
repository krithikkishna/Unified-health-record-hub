import apiClient from './apiClient';

// 🔧 Get backend system health status
export const getSystemHealth = async () => {
  try {
    const response = await apiClient.get('/admin/system-health');
    return response.data;
  } catch (error) {
    console.error('System Health Fetch Error:', error);
    throw error;
  }
};

// Optional default export (useful for grouped imports)
export default {
  getSystemHealth,
};
