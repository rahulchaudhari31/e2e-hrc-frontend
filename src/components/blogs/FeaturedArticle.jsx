import { useEffect, useState } from 'react';
import heroBg from '../../assets/images/our blog images/background every employer.jpg';
import { getFeaturedBlog, formatBlogDate } from '../../services/blog/blogService';

export default function FeaturedArticle() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    getFeaturedBlog().then((data) => {
      if (mounted && data) setPost(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const title = post?.title || 'Top 10 Hiring Trends Every Employer Should Know in 2026';
  const desc =
    post?.shortDescription ||
    'As the global talent landscape evolves, staying ahead of recruitment trends is crucial. From AI-driven candidate screening to shifting expectations around flexible work, discover what will shape the future of hiring.';
  const readTime = post?.readTime || '8 min read';
  const dateLabel = post?.publishedAt ? formatBlogDate(post.publishedAt) : '2 days ago';
  const cardBg = post?.image || heroBg;

  return (
    <>
      <style>{`
        .hero-card-img {
          width: 874.66px;
          height: 400px;
          flex-shrink: 0;
          flex: none;
          background: linear-gradient(to right, #F6F3F2 0%, #F6F3F2 10%, transparent 40%), url(${cardBg});
          background-size: 100% 100%, cover;
          background-position: 0 0, center;
          background-repeat: no-repeat;
        }
        .heading-overlap {
          margin-right: -240px;
          position: relative;
          z-index: 1;
        }
        .desc-overlap {
          margin-right: -200px;
          max-width: 689px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .hero-card-img {
            width: 100%;
            height: 250px;
            flex-shrink: 0;
            background: linear-gradient(to bottom, #F6F3F2 0%, transparent 30%), url(${cardBg});
            background-size: 100% 100%, cover;
            background-position: 0 0, center;
            background-repeat: no-repeat;
          }
          .heading-overlap {
            margin-right: 0;
          }
          .desc-overlap {
            margin-right: 0;
          }
        }
      `}</style>

      <section className="px-16 py-16 max-sm:px-4 max-sm:py-6 max-md:px-6 max-md:py-8">
        <div className="featured-card flex max-lg:flex-col rounded-3xl min-h-[400px] bg-[#F6F3F2] overflow-hidden">
          <div className="featured-card-text flex-1 max-lg:w-full p-12 max-sm:p-6 max-md:p-8 flex flex-col justify-center">
            <p className="font-body text-sm text-[#424752] mb-4">
              {dateLabel} &bull; {readTime}
            </p>
            <h2 className="featured-heading font-heading text-[36px] leading-[40px] tracking-normal max-sm:text-2xl max-sm:leading-8 text-[#1B1C1C] mb-5 heading-overlap break-words">
              {title}
            </h2>
            <p className="featured-desc font-body text-base leading-6 text-[#424752] desc-overlap">
              {desc}
            </p>
          </div>
          <div className="featured-card-img hero-card-img max-lg:hidden" role="img" aria-label={title} />
        </div>
      </section>
    </>
  );
}