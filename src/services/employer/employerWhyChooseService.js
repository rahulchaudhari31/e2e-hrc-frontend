import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getEmployerWhyChoose = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employer/why-choose`);
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching employer why choose:', error);
    return null;
  }
};

export default { getEmployerWhyChoose };