import axios from 'axios';

/**
 * Fetch How We Work section data (active only)
 * Returns: { employerSteps, employeeSteps, sectionTitle, sectionDescription }
 */
export const getHowWeWork = async () => {
  try {
    const response = await axios.get('/api/how-we-work');
    
    // Check if the response indicates success
    if (response.data?.success === false) {
      console.warn('How We Work section not found or not active');
      return null;
    }
    
    // Return the data from the response
    return response.data?.data || response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('How We Work section not found (404)');
      return null;
    }
    console.error('Error fetching How We Work data:', error);
    throw error;
  }
};

export default {
  getHowWeWork,
};
