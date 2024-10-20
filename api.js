import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Update this if your server runs on a different URL or port

// Signup function
export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    return response.data; // Success message
  } catch (error) {
    throw error.response.data; // Return the error message
  }
};

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Success message
  } catch (error) {
    throw error.response.data; // Return the error message
  }
};
