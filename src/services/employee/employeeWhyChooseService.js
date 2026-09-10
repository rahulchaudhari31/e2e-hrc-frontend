import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getPublicEmployeeWhyChoose = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee-why-choose`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Employee Why Choose data:',
      error.response?.data || error.message
    );
    throw error;
  }
};
