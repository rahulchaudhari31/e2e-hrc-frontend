import { apiClient } from '../../config/api';

/**
 * Fetch public employee testimonials
 * Returns both section and cards data
 */
export const getEmployeeTestimonials = async () => {
  try {
    const response = await apiClient.get('/employee/testimonials');
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching employee testimonials:',
      error.response?.data || error.message
    );
    throw error;
  }
};
