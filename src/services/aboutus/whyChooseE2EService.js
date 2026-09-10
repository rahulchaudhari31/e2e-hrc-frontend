import axios from 'axios';

const API_BASE = '/api';

const normalize = (resp) => {
  if (!resp) return null;
  const d = resp.data ?? resp;
  return { data: d.data ?? d };
};

export const getWhyChooseE2E = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/why-choose`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { data: { section: null, cards: [] } };
    }
    throw err;
  }
};

export default {
  getWhyChooseE2E,
};

