import axios from 'axios';

export const getEmployerHowWeWorkSteps = async () => {
  try {
    const response = await axios.get('/api/employer-how-we-work-steps');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('How We Work steps not found (404). Returning null.');
      return null;
    }
    console.error('Error fetching how we work steps:', error);
    throw error;
  }
};
