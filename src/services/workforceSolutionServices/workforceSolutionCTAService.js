import axios from 'axios';

/**
 * Fetch active Workforce Solution CTA record
 * Returns: Single CTA object or null if not found
 */
export const getWorkforceSolutionCTA = async () => {
  try {
    const response = await axios.get('/api/workforce-solutions/cta');

    // Handle different possible response structures
    const data = response.data?.data || response.data?.cta || response.data;

    // Return the first active CTA or null
    if (Array.isArray(data)) {
      const activeCTA = data.find((cta) => cta.isActive === true);
      return activeCTA || null;
    }

    // If data is an object, check if it's active
    if (data && typeof data === 'object' && data.isActive === true) {
      return data;
    }

    return null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('CTA data not found (404)');
      return null;
    }
    console.error('Error fetching CTA data:', error);
    throw error;
  }
};

export default {
  getWorkforceSolutionCTA,
};
