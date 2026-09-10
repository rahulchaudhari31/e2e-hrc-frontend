import axios from 'axios';

/**
 * Fetch Testimonials section data (active section + active cards)
 * Returns: { section: { badgeText, sectionTitle, isActive }, cards: [...] }
 */
export const getPublicTestimonials = async () => {
  try {
    const response = await axios.get('/api/testimonials');
    
    // Check if the response indicates success
    if (response.data?.success === false) {
      console.warn('Testimonials section not found or not active');
      return null;
    }
    
    // Return the data from the response
    return response.data?.data || response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Testimonials section not found (404)');
      return null;
    }
    console.error('Error fetching testimonials data:', error);
    throw error;
  }
};

export default {
  getPublicTestimonials,
};
