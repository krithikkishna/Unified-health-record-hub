import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:15200/api/login',
  withCredentials: true,
});


// Add request interceptor to attach token if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // or set custom if needed
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to catch errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Handle unauthorized access globally
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access – maybe redirect to login?');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
