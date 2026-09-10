import axios from 'axios';

const API_BASE = '/api';

const normalize = (resp) => {
  if (!resp) return null;
  const d = resp.data ?? resp;
  return { data: d.data ?? d };
};

// ─── HOME WHO WE ARE ─────────────────────────────────────────────────────────

export const getHomeWhoWeAre = async () => {
  try {
    const res = await axios.get(`${API_BASE}/home/who-we-are`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const saveHomeWhoWeAre = async (data) => {
  if (data && data._id) {
    const res = await axios.put(`${API_BASE}/admin/home/who-we-are/${data._id}`, data, {
      withCredentials: true,
    });
    return normalize(res);
  }

  const formData = new FormData();
  formData.append('title', data.title || '');
  formData.append('description1', data.description1 || '');
  formData.append('description2', data.description2 || '');
  formData.append('description3', data.description3 || '');
  formData.append('experienceYears', data.experienceYears || '');
  formData.append('experienceLabel', data.experienceLabel || '');
  formData.append('isActive', data.isActive === false ? 'false' : 'true');
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }

  const res = await axios.post(`${API_BASE}/admin/home/who-we-are`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const uploadHomeWhoWeAreImage = async (imageFile, id = null) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const url = id ? `${API_BASE}/admin/home/who-we-are/${id}/image` : `${API_BASE}/admin/home/who-we-are`;
  const res = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const deleteHomeWhoWeAre = async (id) => {
  const res = await axios.delete(`${API_BASE}/admin/home/who-we-are/${id}`, {
    withCredentials: true,
  });
  return normalize(res);
};

// ─── HOME MISSION & VISION ───────────────────────────────────────────────────

export const getHomeMissionVision = async () => {
  try {
    const res = await axios.get(`${API_BASE}/home/mission-vision`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const saveHomeMissionVision = async (data) => {
  if (data && data._id) {
    const res = await axios.put(`${API_BASE}/admin/home/mission-vision/${data._id}`, data, {
      withCredentials: true,
    });
    return normalize(res);
  }

  const formData = new FormData();
  formData.append('missionTitle', data.missionTitle || 'Our Mission');
  formData.append('missionDescription', data.missionDescription || '');
  formData.append('visionTitle', data.visionTitle || 'Our Vision');
  formData.append('visionDescription', data.visionDescription || '');
  formData.append('isActive', data.isActive === false ? 'false' : 'true');
  if (data.visionImage instanceof File) {
    formData.append('visionImage', data.visionImage);
  }

  const res = await axios.post(`${API_BASE}/admin/home/mission-vision`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const uploadHomeMissionVisionImage = async (imageFile, id = null) => {
  const formData = new FormData();
  formData.append('visionImage', imageFile);
  const url = id ? `${API_BASE}/admin/home/mission-vision/${id}/image` : `${API_BASE}/admin/home/mission-vision`;
  const res = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const deleteHomeMissionVision = async (id) => {
  const res = await axios.delete(`${API_BASE}/admin/home/mission-vision/${id}`, {
    withCredentials: true,
  });
  return normalize(res);
};

// ─── HOME TESTIMONIALS ───────────────────────────────────────────────────────

export const getHomeTestimonials = async () => {
  try {
    const res = await axios.get(`${API_BASE}/home/testimonials`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const getHomeTestimonialsAll = async () => {
  const res = await axios.get(`${API_BASE}/admin/home/testimonials`, {
    withCredentials: true,
  });
  return normalize(res);
};

export const saveHomeTestimonials = async (data) => {
  if (data && data._id) {
    const res = await axios.put(`${API_BASE}/admin/home/testimonials/${data._id}`, data, {
      withCredentials: true,
    });
    return normalize(res);
  }

  const res = await axios.post(`${API_BASE}/admin/home/testimonials`, data, {
    withCredentials: true,
  });
  return normalize(res);
};

export const deleteHomeTestimonials = async (id) => {
  const res = await axios.delete(`${API_BASE}/admin/home/testimonials/${id}`, {
    withCredentials: true,
  });
  return normalize(res);
};

// ─── HOME GLOBAL PRESENCE ────────────────────────────────────────────────────

export const getHomeGlobalPresence = async () => {
  try {
    const res = await axios.get(`${API_BASE}/home/global-presence`);
    return normalize(res);
  } catch (err) {
    if (err.response && err.response.status === 404) return null;
    throw err;
  }
};

export const saveHomeGlobalPresence = async (data) => {
  if (data && data._id) {
    const res = await axios.put(`${API_BASE}/admin/home/global-presence/${data._id}`, data, {
      withCredentials: true,
    });
    return normalize(res);
  }

  const formData = new FormData();
  formData.append('title', data.title || 'Our Global Footprint');
  formData.append('description', data.description || '');
  formData.append('locations', JSON.stringify(data.locations || []));
  formData.append('isActive', data.isActive === false ? 'false' : 'true');
  if (data.mapImage instanceof File) {
    formData.append('mapImage', data.mapImage);
  }

  const res = await axios.post(`${API_BASE}/admin/home/global-presence`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const uploadHomeGlobalPresenceMap = async (imageFile, id = null) => {
  const formData = new FormData();
  formData.append('mapImage', imageFile);
  const url = id ? `${API_BASE}/admin/home/global-presence/${id}/image` : `${API_BASE}/admin/home/global-presence`;
  const res = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return normalize(res);
};

export const deleteHomeGlobalPresence = async (id) => {
  const res = await axios.delete(`${API_BASE}/admin/home/global-presence/${id}`, {
    withCredentials: true,
  });
  return normalize(res);
};
