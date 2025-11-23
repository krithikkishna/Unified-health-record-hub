import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

axios.post('http://localhost:5000/api/login', {
  email,
  password,
  role
})

const login = async (credentials) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials);
  return res.data;
};

export default {
  login,
};
