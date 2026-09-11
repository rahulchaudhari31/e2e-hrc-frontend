import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export const getEmployeeHRCWhyChoose = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee/hrc-why-choose`);
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching employee HRC why choose:', error);
    return null;
  }
};

export default { getEmployeeHRCWhyChoose };