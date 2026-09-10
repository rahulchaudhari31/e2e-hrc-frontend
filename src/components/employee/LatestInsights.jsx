import ukImg from '../../assets/assets/Professionals/UK.jpg';
import strategyImg from '../../assets/assets/Professionals/strategy.jpg';
import workforceImg from '../../assets/assets/Professionals/workforceplanning.jpg';
import leadershipImg from '../../assets/assets/Professionals/leadership.jpg';

const defaultFeatured = {
  image: ukImg,
  category: 'Hiring Trends',
  title: 'Hiring Trends in the UK: What Employers Need to Know in 2025',
  description: 'From AI-driven screening to flexible working demands, the UK recruitment landscape is shifting rapidly. Here\'s what the data tells us about the year ahead.',
  author: 'Sarah Mitchell',
  readTime: '5 min read',
  date: '28 May 2025',
};

const defaultPosts = [
  {
    image: strategyImg,
    category: 'Strategy',
    categoryBg: '#FDECD2',
    categoryColor: '#C17800',
    title: 'Talent Acquisition Strategies That Actually Work',
    readTime: '4 min read',
    date: '20 May 2025',
  },
  {
    image: workforceImg,
    category: 'Workforce Planning',
    categoryBg: '#EFF5D6',
    categoryColor: '#5A7A00',
    title: 'Future Workforce Planning: Building Teams for Tomorrow',
    readTime: '6 min read',
    date: '12 May 2025',
  },
  {
    image: leadershipImg,
    category: 'Leadership',
    categoryBg: '#004CA5',
    categoryColor: '#C8D96F',
    title: 'Building High Performing Teams From Day One',
    readTime: '5 min read',
    date: '5 May 2025',
  },
];

function PersonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6C7.38071 6 8.5 4.88071 8.5 3.5C8.5 2.11929 7.38071 1 6 1C4.61929 1 3.5 2.11929 3.5 3.5C3.5 4.88071 4.61929 6 6 6Z" fill="currentColor" />
      <path d="M6 7C3.79086 7 2 8.79086 2 11H10C10 8.79086 8.20914 7 6 7Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6.5H10.5M10.5 6.5L6.5 2.5M10.5 6.5L6.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LatestInsights({
  featured = defaultFeatured,
  posts = defaultPosts,
  eyebrow = 'Latest Blog',
  heading = 'Career Growth Strategies for Professionals',
  ctaLabel = 'View All Blog',
  ctaHref = '#',
}) {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="mx-auto pl-[24px] pr-[24px] lg:pl-[124px] lg:pr-[32px]" style={{ maxWidth: '1440px' }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-10">
          <div>
            <span className="inline-flex items-center bg-[#EAF1FB] text-[#004CA5] font-body font-semibold text-[12px] leading-[16px] px-3 py-[6px] rounded-full mb-2">
              {eyebrow}
            </span>
            <h2 className="font-heading font-[800] text-[32px] lg:text-[36px] leading-[40px] text-[#004CA5]" style={{ maxWidth: '793px' }}>
              {heading}
            </h2>
          </div>
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 shrink-0 border-[1.6px] border-[#004CA5] text-[#004CA5] font-heading font-semibold text-[14px] leading-[20px] px-6 py-3 rounded-[999px] bg-transparent hover:bg-[#004CA5]/10 transition-colors duration-200 self-start lg:self-auto"
          >
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="#004CA5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-8" style={{ maxWidth: '1284px' }}>
          <div className="relative group rounded-2xl overflow-hidden cursor-pointer w-full lg:w-[532px] h-[400px] lg:h-[480px] shrink-0">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className="inline-flex items-center bg-[#004CA5] text-white font-body font-semibold text-[12px] leading-[16px] px-3 py-1 rounded-full mb-3">
                {featured.category}
              </span>
              <h3 className="text-white font-heading font-bold text-[24px] leading-[33px] mb-3" style={{ maxWidth: '460px' }}>
                {featured.title}
              </h3>
              <p className="text-[rgba(255,255,255,0.7)] font-body font-normal text-[14px] leading-[22.75px] mb-6" style={{ maxWidth: '460px' }}>
                {featured.description}
              </p>
              <div className="flex items-center justify-between w-full" style={{ maxWidth: '460px' }}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.7)] font-body text-[12px]">
                    <PersonIcon />
                    <span>{featured.author}</span>
                  </div>
                  <span className="text-[rgba(255,255,255,0.7)]">·</span>
                  <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.7)] font-body text-[12px]">
                    <ClockIcon />
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="text-[rgba(255,255,255,0.7)]">·</span>
                  <span className="text-[rgba(255,255,255,0.7)] font-body text-[12px]">{featured.date}</span>
                </div>
                <a href="#" className="inline-flex items-center gap-1 font-heading font-semibold text-[12px] leading-[16px] text-[#C8D96F] hover:underline">
                  Read More
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 flex-1 min-w-0">
            {posts.map((post) => (
              <div key={post.title} className="flex flex-col sm:flex-row rounded-2xl overflow-hidden cursor-pointer group bg-[#FAFAFA] sm:h-[134px]">
                <div className="w-full sm:w-[144px] h-[180px] sm:h-full shrink-0 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2 p-5 sm:pl-0 min-w-0">
                  <span
                    className="self-start inline-flex items-center font-body font-semibold text-[12px] leading-[16px] px-2.5 py-1 rounded-full"
                    style={{ background: post.categoryBg, color: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                  <h4 className="font-heading font-bold text-[16px] leading-[22px] text-[#004CA5] line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[#6B6B6B] font-body text-[12px]">
                    <ClockIcon />
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
            <a
              href={ctaHref}
              className="lg:hidden inline-flex items-center justify-center gap-2 border-[1.6px] border-[#004CA5] text-[#004CA5] font-heading font-semibold text-[14px] px-6 py-3 rounded-[999px] hover:bg-[#004CA5]/10 transition-colors duration-200 mt-2"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
