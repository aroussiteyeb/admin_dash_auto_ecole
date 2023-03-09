import { API_BASE_URL } from "api/base";
import axios from "axios";

const api_url = API_BASE_URL;

export const activate = async (activateData) => {
  try {
    const response = await axios.patch(api_url + "users/activate", activateData);
    console.log(response)
    return response.data;
    
  } catch (error) {
    console.log(error.response.data)
    return error.response
    //throw new Error(error.response.data.message);
  }
};
