import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/hospitals';

export const hospitalLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Hospital login error:', error);
    throw error;
  }
};

export const hospitalSignup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error('Hospital signup error:', error);
    throw error;
  }
};
