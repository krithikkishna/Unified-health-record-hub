import axios from "axios";

// Base URL for your backend API
const API_BASE = "http://localhost:5000/api";

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // if using cookies for auth
});

// 🔐 Auth-related calls
const login = async (credentials) => {
  const res = await apiClient.post("/login", credentials);
  return res.data;
};

const register = async (userData) => {
  const response = await apiClient.post("/register", userData);
  return response.data;
};

const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

// 🛠️ Admin-level user management
const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

const updateUserRole = async (userId, newRole) => {
  const response = await apiClient.put(`/users/${userId}/role`, {
    role: newRole,
  });
  return response.data;
};

// Export all functions
export {
  login,
  register,
  getProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
};

// Default export (optional)
export default {
  login,
  register,
  getProfile,
  getAllUsers,
  deleteUser,
  updateUserRole,
};
