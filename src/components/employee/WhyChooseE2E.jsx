import { useEffect, useState } from 'react';
import { getPublicEmployeeWhyChoose } from '../../services/employee/employeeWhyChooseService';

const getImageUrl = (image) => {
  if (!image) return '/images/employee/client2.png';
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  return image.startsWith('/') ? image : `/${image}`;
};

export default function WhyChooseE2E() {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeWhyChoose = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getPublicEmployeeWhyChoose();

        // Normalize response structure
        const payload = response?.data || response;
        const sectionData =
          payload?.section ||
          payload?.employeeWhyChooseSection ||
          payload?.whyChooseSection ||
          null;
        const cardsData =
          payload?.cards ||
          payload?.employeeWhyChooseCards ||
          payload?.whyChooseCards ||
          [];

        setSection(sectionData);
        setCards(Array.isArray(cardsData) ? cardsData : []);
      } catch (err) {
        console.error('Failed to fetch Employee Why Choose section:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeWhyChoose();
  }, []);

  // Hide section if inactive or no data
  if (!section?.isActive || loading || error) {
    return null;
  }

  // Filter active cards and sort by order
  const visibleCards = [...cards]
    .filter((card) => card?.isActive !== false)
    .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0));

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20" style={{ background: 'url(/images/employee/background.jpg) center/cover no-repeat' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Badge */}
        {section?.badgeText && (
          <p
            className="text-center font-[Poppins] text-base uppercase tracking-[1.6px] mb-2"
            style={{
              background: 'linear-gradient(49.52deg, #1295D4 -4.12%, #7EC443 85.04%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {section.badgeText}
          </p>
        )}

        {/* Title */}
        {section?.sectionTitle && (
          <h2 className="text-center font-[Poppins] font-bold text-[26px] sm:text-[36px] text-[#00264B] mb-8 sm:mb-12 md:mb-[60px]">
            {section.sectionTitle}
          </h2>
        )}

        {/* Cards Grid - Dynamic alternating layout */}
        {visibleCards.map((card, index) => {
          const isImageLeft = index % 2 === 0;
          const eyebrowColor = isImageLeft ? '#F39308' : '#004CA5';
          const statColor = isImageLeft ? '#F39308' : '#004CA5';

          return (
            <div 
              key={card?._id || index} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch ${index < visibleCards.length - 1 ? 'mb-10' : ''}`}
            >
              {/* Image Block */}
              <div 
                className={`order-1 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'} overflow-hidden rounded-[16px]`}
              >
                <img
                  src={getImageUrl(card?.image)}
                  alt={card?.title || 'Employee Why Choose'}
                  className="w-full h-[250px] lg:h-[420px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/employee/client2.png';
                  }}
                />
              </div>

              {/* Content Block */}
              <div 
                className={`order-2 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'} bg-[#F8FAFC] rounded-[16px] p-8 sm:p-14 flex flex-col justify-center relative overflow-hidden`}
              >
                {/* Decorative R for odd cards */}
                {!isImageLeft && (
                  <span
                    className="absolute font-[Poppins] font-extrabold text-[233px] text-[#F39308] opacity-5 leading-none pointer-events-none"
                    style={{ bottom: '-20px', right: '-20px' }}
                  >
                    R
                  </span>
                )}

                {/* Eyebrow Text */}
                {card?.eyebrowText && (
                  <p
                    className="font-[Poppins] text-base uppercase tracking-[1.6px] mb-2"
                    style={{ color: eyebrowColor }}
                  >
                    {card.eyebrowText}
                  </p>
                )}

                {/* Title */}
                {card?.title && (
                  <h3 className="font-[Poppins] font-bold text-[26px] sm:text-[36px] text-[#00264B] mb-4 leading-tight">
                    {card.title}
                  </h3>
                )}

                {/* Description */}
                {card?.description && (
                  <p className="font-[Inter] text-base text-[#43474F] leading-relaxed mb-6">
                    {card.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex gap-6 sm:gap-12">
                  {card?.stat1Value && card?.stat1Label && (
                    <div>
                      <p className="font-['Hanken_Grotesk'] font-bold text-[24px] sm:text-[30px]" style={{ color: statColor }}>
                        {card.stat1Value}
                      </p>
                      <p className="font-[Inter] text-xs uppercase text-[#43474F] mt-0.5">
                        {card.stat1Label}
                      </p>
                    </div>
                  )}
                  {card?.stat2Value && card?.stat2Label && (
                    <div>
                      <p className="font-['Hanken_Grotesk'] font-bold text-[24px] sm:text-[30px]" style={{ color: statColor }}>
                        {card.stat2Value}
                      </p>
                      <p className="font-[Inter] text-xs uppercase text-[#43474F] mt-0.5">
                        {card.stat2Label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}