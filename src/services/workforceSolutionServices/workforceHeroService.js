import axios from 'axios';

const normalizeImageUrl = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL || ''}${value}`;
  return value;
};

export const getWorkforceHeroData = async () => {
  try {
    const response = await axios.get('/api/workforce-solution/employer-hero');
    const payload = response.data || {};
    if (payload.data) {
      payload.data.image = normalizeImageUrl(payload.data.heroImage || '');
    }
    return payload.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching workforce hero data:', error);
    throw error;
  }
};
