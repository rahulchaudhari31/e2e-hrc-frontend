import axios from 'axios';

const API_BASE = '/api';

/**
 * Fetch Employee Journey section data (active only)
 * Returns: { section: {...}, cards: [...] }
 */
export const getEmployeeJourney = async () => {
  try {
    const response = await axios.get(`${API_BASE}/employee-journey`, { withCredentials: true });
    
    // Check if the response indicates success
    if (response.data?.success === false) {
      console.warn('Employee Journey data not available');
      return null;
    }
    
    // Return the data from the response
    // Response structure: { success: true, data: { section: {...}, cards: [...] } }
    return response.data?.data || response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Employee Journey endpoint not found (404)');
      return null;
    }
    console.error('Error fetching Employee Journey data:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  getEmployeeJourney,
};
