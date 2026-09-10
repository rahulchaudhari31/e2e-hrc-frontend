import axios from "axios";

export const getContactCta = async () => {
  try {
    const response = await axios.get("/api/contact-cta");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error("Error fetching Contact CTA data:", error);
    throw error;
  }
};
