import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getActiveApproachCards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/approach-cards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching approach cards:', error);
    throw error.response?.data || new Error('Failed to fetch approach cards');
  }
};
