import axios from 'axios';

export const getHeroData = async () => {
  try {
    const response = await axios.get('/api/hero/home');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error fetching hero data:', error);
    throw error;
  }
};
