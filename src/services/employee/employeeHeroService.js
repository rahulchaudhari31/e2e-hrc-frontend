import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getPublicEmployeeHero = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee-hero`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching Employee Hero data:', error);
    throw error.response?.data || new Error('Failed to fetch Employee Hero data');
  }
};
