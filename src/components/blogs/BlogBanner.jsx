import { useEffect, useState } from 'react';
import bannerBg from '../../assets/images/our blog images/backround our blog.jpg';
import { getBlogHero } from '../../services/blog/blogService';

export default function BlogBanner() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let mounted = true;
    getBlogHero().then((data) => {
      if (mounted && data) setHero(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const bg = hero?.backgroundImage || bannerBg;
  const title = hero?.title || 'From Our';
  const highlight = hero?.highlightText || 'Blog';

  return (
    <>
      <style>{`
        .banner-overlay {
          background: url(${bg}) center center / cover no-repeat;
          opacity: 0.5;
        }
      `}</style>

      <section className="blog-banner-section relative h-[201px] bg-black overflow-hidden flex items-center border-t border-[#EAE8E7]">
        <div className="absolute inset-0 banner-overlay" />
        <div className="relative z-10 pl-16 max-sm:pl-6">
          <h1 className="font-heading font-extrabold text-6xl text-white max-sm:text-3xl max-md:text-4xl">
            {title} <span className="text-[#F39308]">{highlight}</span>
          </h1>
        </div>
      </section>
    </>
  );
}