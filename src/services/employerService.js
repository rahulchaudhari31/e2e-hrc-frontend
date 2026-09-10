import axios from 'axios';

const normalizeImageUrl = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL || ''}${value}`;
  return value;
};

const normalizeHeroPayload = (payload) => {
  if (!payload?.data) return payload;

  const image = payload.data.heroImage || payload.data.image || payload.data.imageurl || '';
  payload.data.image = normalizeImageUrl(image);
  payload.data.heroImage = payload.data.image;
  payload.data.imageurl = payload.data.image;
  return payload;
};

export const getEmployerHero = async () => {
  try {
    const response = await axios.get('/api/employer/hero');
    return normalizeHeroPayload(response.data || {});
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const createEmployerHero = async (formData) => {
  const response = await axios.post('/api/admin/employer/hero', formData, {
    withCredentials: true,
  });
  return response.data;
};

export const updateEmployerHero = async (id, formData) => {
  const response = await axios.put(`/api/admin/employer/hero/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};
