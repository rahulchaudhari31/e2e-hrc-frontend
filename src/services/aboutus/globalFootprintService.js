import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getActiveGlobalFootprint = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about/global-footprint`);
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching global footprint:', error);
    return null;
  }
};

export default { getActiveGlobalFootprint };