import axios from 'axios';

const normalizeImageUrl = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL || ''}${value}`;
  return value;
};

export const getEmployerHeroData = async () => {
  try {
    const response = await axios.get('/api/employer/hero');
    const payload = response.data || {};
    if (payload.data) {
      const image = payload.data.heroImage || payload.data.image || payload.data.imageurl || '';
      payload.data.image = normalizeImageUrl(image);
      payload.data.heroImage = payload.data.image;
      payload.data.imageurl = payload.data.image;
    }
    return payload;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching employer hero data:', error);
    throw error;
  }
};
