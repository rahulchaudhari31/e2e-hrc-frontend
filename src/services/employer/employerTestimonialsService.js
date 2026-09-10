import axios from 'axios';

const normalizeImageUrl = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL || ''}${value}`;
  return value;
};

export const getEmployerTestimonials = async () => {
  try {
    const response = await axios.get('/api/employer/testimonials');
    const payload = response.data || {};
    
    if (payload.data) {
      // Normalize section logo if needed
      if (payload.data.section) {
        payload.data.section = {
          ...payload.data.section,
        };
      }
      
      // Normalize card logos
      if (Array.isArray(payload.data.cards)) {
        payload.data.cards = payload.data.cards.map((card) => ({
          ...card,
          companyLogo: normalizeImageUrl(card.companyLogo),
        }));
      }
    }
    
    return payload;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching employer testimonials:', error);
    throw error;
  }
};
