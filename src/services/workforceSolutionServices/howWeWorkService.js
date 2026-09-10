import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Fetches public How We Work data including section header and steps.
 * Returns { section: {...}, steps: [...] } or throws error if no active section
 * 
 * Response structure:
 * {
 *   success: true,
 *   data: {
 *     section: {
 *       _id: string,
 *       badgeText: string,
 *       sectionTitle: string,
 *       isActive: boolean,
 *       createdAt: string,
 *       updatedAt: string
 *     },
 *     steps: [
 *       {
 *         _id: string,
 *         stepNumber: string,
 *         title: string,
 *         order: number,
 *         isActive: boolean,
 *         createdAt: string,
 *         updatedAt: string
 *       }
 *     ]
 *   }
 * }
 */
export const getPublicHowWeWork = async () => {
  try {
    const response = await axios.get('/api/workforce-solutions/how-we-work');
    const payload = response.data || {};
    
    if (!payload.success) {
      throw new Error(payload.message || 'Failed to fetch How We Work data');
    }

    const data = payload.data || {};
    const section = data.section || null;
    const steps = Array.isArray(data.steps) ? data.steps : [];

    // Ensure steps are sorted by order (backend already does this, but ensure consistency)
    steps.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { section, steps };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // No active section found
      return { section: null, steps: [] };
    }
    console.error('Error fetching public How We Work data:', error);
    throw error;
  }
};

export default {
  getPublicHowWeWork
};
