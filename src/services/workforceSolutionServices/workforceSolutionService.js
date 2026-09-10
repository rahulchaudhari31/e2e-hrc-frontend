import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const normalizeImageUrl = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return `${API_BASE_URL}${value}`;
  return value;
};

/**
 * Fetches public workforce solutions.
 * Returns { section: {...} | null, cards: [...] }
 */
export const getPublicWorkforceSolutions = async () => {
  try {
    const response = await axios.get('/api/workforce-solutions');
    const payload = response.data || {};
    const raw = payload.data || {};

    const section = raw.section || null;
    const cards = Array.isArray(raw.cards) ? raw.cards : [];

    // Normalize any image URLs on cards (future-proofing)
    const normalizedCards = cards.map((card) => ({
      ...card,
      imageUrl: card.imageUrl ? normalizeImageUrl(card.imageUrl) : '',
    }));

    // Sort by order field (backend already sorts, ensures client-side consistency)
    normalizedCards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { section, cards: normalizedCards };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { section: null, cards: [] };
    }
    console.error('Error fetching public workforce solutions:', error);
    throw error;
  }
};
