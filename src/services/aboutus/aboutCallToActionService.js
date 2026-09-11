import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getActiveAboutCTA = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about/call-to-action`);
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching about call to action:', error);
    return null;
  }
};

export default { getActiveAboutCTA };