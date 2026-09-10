import { apiClient } from '../../config/api';

export const getLocationCards = async () => {
  try {
    const response = await apiClient.get('/location-cards');
    const cards = response?.data?.data ?? response?.data ?? [];

    if (!Array.isArray(cards)) {
      return [];
    }

    return cards
      .filter((card) => card?.isActive !== false)
      .sort((a, b) => {
        const orderA = Number(a?.displayOrder ?? a?.order ?? 0);
        const orderB = Number(b?.displayOrder ?? b?.order ?? 0);
        return orderA - orderB;
      });
  } catch (error) {
    console.error('Error fetching location cards:', error);
    throw error?.response?.data || new Error('Failed to fetch location cards');
  }
};
