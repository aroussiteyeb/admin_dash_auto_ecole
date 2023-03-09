import axios from 'axios';
import { API_BASE_URL } from 'api/base';

const API_URL = API_BASE_URL;

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}users/getAll`)
        return response.data
    } catch (error) {
        console.error(error);
    }

}



