import axios from "axios";

export const getBlogHero = async () => {
  try {
    const response = await axios.get("/api/blog-hero/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching blog hero:", error);
    return null;
  }
};

export const getFeaturedBlog = async () => {
  try {
    const response = await axios.get("/api/featured-blog/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching featured blog:", error);
    return null;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get("/api/blogs");
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogCta = async () => {
  try {
    const response = await axios.get("/api/blog-cta/active");
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching blog CTA:", error);
    return null;
  }
};

export const formatBlogDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const estimateReadTime = (blog) => {
  const text = [
    blog?.paragraph1,
    blog?.paragraph2,
    blog?.paragraph3,
    blog?.paragraph4,
    blog?.paragraph5,
    blog?.paragraph6,
  ]
    .filter(Boolean)
    .join(" ");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.ceil(words / 200);
  return `${Math.max(minutes, 3)} min read`;
};

export default {
  getBlogHero,
  getFeaturedBlog,
  getBlogs,
  getBlogCta,
  formatBlogDate,
  estimateReadTime,
};