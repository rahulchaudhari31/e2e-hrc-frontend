import axios from "axios";

export const getRecruitmentPartnerHero = async () => {
  try {
    const response = await axios.get("/api/recruitment-partner/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching recruitment partner hero:", error);
    return null;
  }
};

export const getRecruitmentPartnersSection = async () => {
  try {
    const response = await axios.get("/api/recruitment-partners/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching recruitment partners section:", error);
    return null;
  }
};

export const getPartnerTrust = async () => {
  try {
    const response = await axios.get("/api/partner-trust/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching partner trust:", error);
    return null;
  }
};

export const getLocations = async () => {
  try {
    const response = await axios.get("/api/locations/active");
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export default {
  getRecruitmentPartnerHero,
  getRecruitmentPartnersSection,
  getPartnerTrust,
  getLocations,
};