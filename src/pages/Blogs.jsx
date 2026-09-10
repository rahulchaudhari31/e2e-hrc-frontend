
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogBanner from '../components/blogs/BlogBanner';
import FeaturedArticle from '../components/blogs/FeaturedArticle';
import BlogPostsGrid from '../components/blogs/BlogPostsGrid';
import '../components/blogs/Blogs.css';

export default function Blogs() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <BlogBanner />
      <FeaturedArticle />
      <BlogPostsGrid />
      <Footer />
    </div>
  );
}
