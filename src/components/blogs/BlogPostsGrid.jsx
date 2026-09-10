import { FiCalendar, FiClock } from 'react-icons/fi';

import executiveImg from '../../assets/images/our blog images/executive search.jpg';
import complianceImg from '../../assets/images/our blog images/compliance.png';
import cultureImg from '../../assets/images/our blog images/culture.jpg';
import datadrivenImg from '../../assets/images/our blog images/requirement.jpg';
import trendingIcon from '../../assets/images/icon trending now/trendinng now.png';
import expertIcon from '../../assets/images/icon trending now/expert categories.png';
import industryIcon from '../../assets/images/icon trending now/industry resources.png';
import techSalaryIcon from '../../assets/images/icon trending now/tech salary guide.png';
import recruitmentIcon from '../../assets/images/exepert categories/reqirtement.png';
import executiveCatIcon from '../../assets/images/exepert categories/executive.png';
import complianceCatIcon from '../../assets/images/exepert categories/HR compliance.png';
import talentIcon from '../../assets/images/exepert categories/talent analytics.png';
import leadershipIcon from '../../assets/images/exepert categories/leadership.png';
import arrowIcon from '../../assets/images/exepert categories/arrow.png';

const articles = [
  {
    tag: 'Executive Search',
    title: 'Navigating Leadership Transitions in Fast-Growing Tech Firms',
    desc: 'A comprehensive guide to managing executive turnover and ensuring smooth transitions during periods of rapid company growth.',
    date: 'April 8, 2026',
    readTime: '5 min read',
    image: executiveImg,
  },
  {
    tag: 'Compliance',
    title: '2026 Employment Law Updates: What HR Teams Need to Know',
    desc: 'Stay compliant with our breakdown of the latest employment regulations affecting businesses across the UK and EMEA regions.',
    date: 'April 3, 2026',
    readTime: '6 min read',
    image: complianceImg,
  },
  {
    tag: 'Culture',
    title: 'Building Remote-First Cultures That Actually Work',
    desc: 'Strategies for maintaining team cohesion, productivity, and wellbeing when your workforce is distributed across time zones.',
    date: 'March 29, 2026',
    readTime: '7 min read',
    image: cultureImg,
  },
  {
    tag: 'Recruitment',
    title: 'Data-Driven Hiring: Metrics That Truly Matter',
    desc: 'Move beyond time-to-fill and cost-per-hire. Discover the new metrics that indicate true recruitment success.',
    date: 'March 21, 2026',
    readTime: '4 min read',
    image: datadrivenImg,
  },
];

const categories = [
  { name: 'Recruitment Strategy', icon: recruitmentIcon, w: 20, h: 20 },
  { name: 'Executive Search', icon: executiveCatIcon, w: 20.5, h: 19.5 },
  { name: 'HR Compliance', icon: complianceCatIcon, w: 18, h: 19 },
  { name: 'Talent Analytics', icon: talentIcon, w: 18, h: 18 },
  { name: 'Leadership Development', icon: leadershipIcon, w: 24, h: 12 },
];

export default function BlogPostsGrid() {
  return (
    <section className="blog-grid-section bg-[#F7F9FB] px-16 py-20 max-sm:px-4 max-sm:py-10 max-md:px-6 max-md:py-12">
      <div className="blog-grid-layout flex gap-10 max-lg:flex-col max-w-[1440px] mx-auto">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <h2 className="font-heading font-semibold text-3xl max-sm:text-2xl text-[#1B1C1C]">
              All blog posts
            </h2>
            <a href="#" className="font-['Hanken_Grotesk',sans-serif] text-base text-[#003679]">
              View All &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
            {articles.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-[#EAE8E7] rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/85 backdrop-blur rounded-full font-['Hanken_Grotesk',sans-serif] font-bold text-[11px] tracking-[0.96px] uppercase text-[#1B1C1C]">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="blog-article-title font-heading text-xl leading-7 text-[#1B1C1C] mb-3">
                    {item.title}
                  </h3>
                  <p className="blog-article-desc font-body text-sm leading-5 text-[#424752] mb-5 flex-1">
                    {item.desc}
                  </p>
                  <div className="border-t border-[#EAE8E7] pt-4 flex items-center gap-4 font-body text-xs text-[#424752]">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={14} aria-hidden="true" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock size={14} aria-hidden="true" />
                      {item.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="blog-aside w-[377px] shrink-0 max-lg:w-full flex flex-col gap-8">
          <div className="bg-white border border-[#EAE8E7] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-[7.99px] mb-5 h-7">
              <img src={trendingIcon} alt="Trending Now" style={{ width: 16, height: 19 }} />
              <h3 className="font-heading font-semibold text-xl text-[#1B1C1C]">Trending Now</h3>
            </div>
            <div className="py-4 border-b border-[#EAE8E7] first:pt-0 last:border-b-0 last:pb-0">
              <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-[11px] tracking-[0.96px] uppercase text-[#003679] mb-1">
                Career
              </p>
              <p className="font-['Hanken_Grotesk',sans-serif] text-sm leading-5 text-[#1B1C1C]">
                How to Retain Top Performers in a Competitive Market
              </p>
            </div>
            <div className="py-4 border-b border-[#EAE8E7] first:pt-0 last:border-b-0 last:pb-0">
              <p className="font-['Hanken_Grotesk',sans-serif] font-bold text-[11px] tracking-[0.96px] uppercase text-[#003679] mb-1">
                Executive Search
              </p>
              <p className="font-['Hanken_Grotesk',sans-serif] text-sm leading-5 text-[#1B1C1C]">
                The Rise of the Fractional Executive: Is It Right for You?
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EAE8E7] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-[7.99px] mb-5 h-7">
              <img src={expertIcon} alt="Expert Categories" style={{ width: 19, height: 20 }} />
              <h3 className="font-heading font-semibold text-xl text-[#1B1C1C]">Expert Categories</h3>
            </div>
            <p className="font-body text-sm leading-5 text-[#424752] mb-4">
              Explore deeper insights across our core consultancy pillars.
            </p>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-[#F7F9FB]"
                >
                  <div className="flex items-center" style={{ gap: '11.99px' }}>
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{ width: cat.w, height: cat.h }}
                    />
                    <span className="font-['Inter',sans-serif] font-medium text-sm leading-5 text-[#1B1C1C]">
                      {cat.name}
                    </span>
                  </div>
                  <img src={arrowIcon} alt="arrow" style={{ width: 9.33, height: 9.33 }} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#EAE8E7] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-[7.99px] mb-5 h-7">
              <img src={industryIcon} alt="Industry Resources" style={{ width: 21.5, height: 16 }} />
              <h3 className="font-heading font-semibold text-xl text-[#1B1C1C]">Industry Resources</h3>
            </div>
            <div className="flex items-center gap-3 h-[62px]">
              <div className="w-[32.67px] h-[35.67px] bg-[rgba(0,54,121,0.1)] rounded-md flex items-center justify-center shrink-0" style={{ padding: '8px 8px 11px 8px' }}>
                <img src={techSalaryIcon} alt="Tech Salary Guide" style={{ width: 16.67, height: 16.67 }} />
              </div>
              <div className="w-[161px] h-9 flex flex-col justify-center">
                <p className="font-['Inter',sans-serif] font-medium text-sm leading-5 text-[#1B1C1C]">
                  2026 Tech Salary Guide
                </p>
                <p className="font-['Source_Sans_3',sans-serif] text-xs leading-4 text-[#424752]">
                  PDF &bull; 4.2 MB
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
