import axios from 'axios';

const API_BASE = process.env.REACT_APP_API;

// Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE}/patient/login`, { email, password });
  return response.data;
};

// Register user
export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_BASE}/patient/register`, { email, password });
  return response.data;
};
