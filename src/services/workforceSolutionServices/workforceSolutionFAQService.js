import axios from 'axios';

/**
 * Fetch active Workforce Solution FAQ records
 * Returns: Array of FAQ objects sorted by order
 */
export const getWorkforceSolutionFAQs = async () => {
  try {
    const response = await axios.get('/api/workforce-solutions/faq');

    // Handle different possible response structures
    const data = response.data?.data || response.data?.faqs || response.data || [];

    // Ensure we return an array
    if (Array.isArray(data)) {
      // Filter only active FAQs and sort by order
      return data.filter((faq) => faq.isActive === true).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('FAQ data not found (404)');
      return [];
    }
    console.error('Error fetching FAQ data:', error);
    throw error;
  }
};

export default {
  getWorkforceSolutionFAQs,
};
