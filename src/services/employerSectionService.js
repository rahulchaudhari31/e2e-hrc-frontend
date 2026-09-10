import axios from 'axios';

const API_BASE = '/api';

export const getEmployerSectionCards = async () => {
  const response = await axios.get(`${API_BASE}/employeecard`);
  return response.data;
};
