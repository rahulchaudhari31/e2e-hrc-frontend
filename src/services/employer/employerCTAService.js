import axios from 'axios';

const getEmployerCTAs = async () => {
  try {
    const response = await axios.get('/api/employer-cta');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    const message = (error.response && (error.response.data?.message || error.response.data?.error)) || error.message;
    console.error('Error fetching employer CTA data:', message);
    throw new Error(message);
  }
};


export default getEmployerCTAs;
