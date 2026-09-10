import axios from 'axios';

const API_BASE = '/api';

const normalize = (resp) => {
  if (!resp) return null;
  const d = resp.data ?? resp;
  return { data: d.data ?? d };
};

export const getAboutHero = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/hero`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const getWhoWeAre = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/who-we-are`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const createWhoWeAre = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE}/admin/about/who-we-are`, payload, {
      withCredentials: true,
    });
    return normalize(res);
  } catch (err) {
    throw err;
  }
};

export const updateWhoWeAre = async (id, payload) => {
  try {
    const res = await axios.put(`${API_BASE}/admin/about/who-we-are/${id}`, payload, {
      withCredentials: true,
    });
    return normalize(res);
  } catch (err) {
    throw err;
  }
};

export const uploadWhoWeAreImage = async (imageFile, id = null) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const url = id ? `${API_BASE}/admin/about/who-we-are/${id}/image` : `${API_BASE}/admin/about/who-we-are`;
    const res = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    return normalize(res);
  } catch (err) {
    throw err;
  }
};

export const deleteWhoWeAre = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/admin/about/who-we-are/${id}`, {
      withCredentials: true,
    });
    return normalize(res);
  } catch (err) {
    throw err;
  }
};

export const getAboutInfo = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/bridging`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const getMissionVision = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/mission-vision`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const getTestimonials = async () => {
  try {
    const res = await axios.get(`${API_BASE}/about/testimonials`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export default {
  getAboutHero,
  getWhoWeAre,
  createWhoWeAre,
  updateWhoWeAre,
  uploadWhoWeAreImage,
  deleteWhoWeAre,
  getAboutInfo,
  getMissionVision,
  getTestimonials,
};
