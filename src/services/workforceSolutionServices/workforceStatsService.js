import axios from 'axios';

export const getWorkforceStatsData = async () => {
  try {
    const response = await axios.get('/api/workforce-solution/employer-hero');
    const payload = response.data || {};
    if (payload.data && payload.data.stats) {
      return payload.data.stats;
    }
    return [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error('Error fetching workforce stats data:', error);
    throw error;
  }
};
