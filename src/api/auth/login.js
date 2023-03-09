import { API_BASE_URL } from 'api/base';
import axios from 'axios';

const API_URL = API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, { email, password });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};
