import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/doctors';

export const doctorLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Doctor login error:', error);
    throw error;
  }
};

export const doctorSignup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error('Doctor signup error:', error);
    throw error;
  }
};
