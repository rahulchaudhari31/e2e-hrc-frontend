import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getEmployeeCandidateCTA = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee/candidate-cta`);
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching employee candidate CTA:', error);
    return null;
  }
};

export default { getEmployeeCandidateCTA };