import { API_BASE_URL } from 'api/base';
import axios from 'axios';

const api_url = API_BASE_URL
export const register = async (userData) => {
  try {
    const response = await axios.post(api_url + 'users/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};