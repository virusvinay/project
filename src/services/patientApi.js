import axios from 'axios';

// Base URL from environment variables for better portability
const API_BASE_URL = process.env.REACT_APP_API;

export const checkSession = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/session`, {
      email: localStorage.getItem("email"),
      sessionKey: localStorage.getItem("sessionKey")
    });
    return response.data;
  } catch (error) {
    console.error('Session check error:', error);
    throw error;
  }
};

export const patientLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const patientSignup = async ({ email, password }) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/users/register`, { email, password });
  return response.data;
};

