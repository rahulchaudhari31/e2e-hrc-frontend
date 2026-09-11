import axios from "axios";

export const getConnectSection = async () => {
  try {
    const response = await axios.get("/api/connect-section");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching connect section:", error);
    return null;
  }
};

export const getHeadOffice = async () => {
  try {
    const response = await axios.get("/api/v1/head-office");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching head office:", error);
    return null;
  }
};

export const getContactCard = async () => {
  try {
    const response = await axios.get("/api/v1/contact-card");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching contact card:", error);
    return null;
  }
};

export default {
  getConnectSection,
  getHeadOffice,
  getContactCard,
};