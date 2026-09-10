import axios from 'axios';

const API_BASE = '/api';

export const getApproachCards = async () => {
  const response = await axios.get(`${API_BASE}/approach-cards`);
  return response.data;
};

export const createApproachCard = async (cardData, imageFile) => {
  const formData = new FormData();

  Object.entries(cardData || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await axios.post(`${API_BASE}/admin/approach-cards`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return response.data;
};

export const updateApproachCard = async (id, cardData, imageFile) => {
  const formData = new FormData();

  Object.entries(cardData || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await axios.put(`${API_BASE}/admin/approach-cards/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return response.data;
};

export const deleteApproachCard = async (id) => {
  const response = await axios.delete(`${API_BASE}/admin/approach-cards/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
