import React, { useState, useEffect } from 'react';
import { getActiveApproachCards } from '../../services/home/approachCardService';
import { API_BASE_URL } from '../../config/api';

const getColorConfig = (index) => {
  const configs = [
    { bgLetter: 'text-blue-100', badge: 'text-blue-700', stat: 'text-blue-700' },
    { bgLetter: 'text-orange-100', badge: 'text-orange-400', stat: 'text-orange-400' },
    { bgLetter: 'text-lime-100', badge: 'text-lime-500', stat: 'text-lime-500' },
  ];
  return configs[index % configs.length];
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${imagePath}`;
};

function WhyChooseUs() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getActiveApproachCards();
        let data = response.data || response;
        if (Array.isArray(data)) {
          const activeCards = data
            .filter((card) => card.isActive !== false)
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setCards(activeCards);
        }
      } catch (err) {
        console.error('Error in WhyChooseUs:', err);
        setError('Failed to load approach cards');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="max-w-[1500px] mx-auto px-14 text-center text-gray-500">
          Loading...
        </div>
      </section>
    );
  }

  if (error || cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="text-center mb-10 lg:mb-14">
          <span className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-sm font-bold">
            Why Choose E2E HRC
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 mt-5">
            What makes us different
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {cards.map((card, index) => {
            const colors = getColorConfig(index);
            const imageElement = (
              <img
                src={getImageUrl(card.image)}
                alt={card.title}
                className="w-full h-[420px] object-cover rounded-3xl"
              />
            );

            const bgLetter = card.title ? card.title.charAt(0).toUpperCase() : '';

            const contentElement = (
              <div className="relative bg-[#f7f9fc] rounded-3xl p-14 overflow-hidden min-h-[420px]">
                <span className={`absolute right-14 top-6 text-[300px] leading-none font-extrabold ${colors.bgLetter}`}>
                  {bgLetter}
                </span>

                <div className="relative z-10">
                  <p className={`text-sm ${colors.badge} font-extrabold uppercase tracking-widest`}>
                    {card.badgeText}
                  </p>

                  <h3 className="text-4xl font-extrabold text-blue-700 mt-6">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-8 mt-6 max-w-2xl">
                    {card.description}
                  </p>

                  <div className="flex gap-12 mt-8">
                    {card.stat1Value && card.stat1Label && (
                      <div>
                        <h4 className={`text-3xl font-extrabold ${colors.stat}`}>
                          {card.stat1Value}
                        </h4>
                        <p className="text-gray-500">{card.stat1Label}</p>
                      </div>
                    )}

                    {card.stat2Value && card.stat2Label && (
                      <div>
                        <h4 className={`text-3xl font-extrabold ${colors.stat}`}>
                          {card.stat2Value}
                        </h4>
                        <p className="text-gray-500">{card.stat2Label}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <React.Fragment key={card._id || index}>
                {index % 2 === 0 ? (
                  <>
                    {imageElement}
                    {contentElement}
                  </>
                ) : (
                  <>
                    {contentElement}
                    {imageElement}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
