import axios from 'axios';

export const getEmployerHowWeWorkSection = async () => {
  try {
    const response = await axios.get('/api/employer-how-we-work-section');
    return response?.data?.data ?? response?.data ?? null;
  } catch (error) {
    console.error('Error fetching employer how we work section:', error);
    return null;
  }
};

export default { getEmployerHowWeWorkSection };