import axios from 'axios';

export const getEmployerFAQs = async () => {
  try {
    const response = await axios.get('/api/employer-faq');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    const message = (error.response && (error.response.data?.message || error.response.data?.error)) || error.message;
    console.error('Error fetching employer FAQ data:', message);
    throw new Error(message);
  }
};
