import axios from "axios";

export const getTrustedBySection = async () => {
  try {
    const response = await axios.get("/api/trusted-by");
    return response.data?.data || null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error("Error fetching trusted by section:", error);
    return null;
  }
};

export const getTrustedByLogos = async () => {
  try {
    const response = await axios.get("/api/trusted-by/logos");
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching trusted by logos:", error);
    return [];
  }
};