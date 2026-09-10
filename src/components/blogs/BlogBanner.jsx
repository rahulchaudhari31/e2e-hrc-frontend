import bannerBg from '../../assets/images/our blog images/backround our blog.jpg';

export default function BlogBanner() {
  return (
    <>
      <style>{`
        .banner-overlay {
          background: url(${bannerBg}) center center / cover no-repeat;
          opacity: 0.5;
        }
      `}</style>

      <section className="blog-banner-section relative h-[201px] bg-black overflow-hidden flex items-center border-t border-[#EAE8E7]">
        <div className="absolute inset-0 banner-overlay" />
        <div className="relative z-10 pl-16 max-sm:pl-6">
          <h1 className="font-heading font-extrabold text-6xl text-white max-sm:text-3xl max-md:text-4xl">
            From Our <span className="text-[#F39308]">Blog</span>
          </h1>
        </div>
      </section>
    </>
  );
}
