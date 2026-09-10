import axios from 'axios';

const API_BASE = '/api';

export const getEmployeeCards = async () => {
  const response = await axios.get(`${API_BASE}/employeecard`, { withCredentials: true });
  return response.data;
};

export const createEmployeeCard = async (formData) => {
  const response = await axios.post(`${API_BASE}/admin/employeecard`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return response.data;
};

export const updateEmployeeCard = async (id, formData) => {
  const response = await axios.put(`${API_BASE}/admin/employeecard/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return response.data;
};

export const deleteEmployeeCard = async (id) => {
  const response = await axios.delete(`${API_BASE}/admin/employeecard/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateEmployeeCardImage = async (id, formData) => {
  const response = await axios.post(`${API_BASE}/admin/employeecard/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return response.data;
};
