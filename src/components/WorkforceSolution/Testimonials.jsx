import { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import { useScrollReveal } from '../common/useScrollReveal';
import { getPublicTestimonials } from '../../services/workforceSolutionServices/testimonialService';

export default function Testimonials() {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await getPublicTestimonials();
      console.log(data)
      
      if (data && data.section && data.cards) {
        setSection(data.section);
        // Sort cards by order
        const sortedCards = (data.cards || [])
          .filter(card => card.isActive !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCards(sortedCards);
      } else {
        setSection(null);
        setCards([]);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render section if no data or loading
  if (isLoading || error || !section || cards.length === 0) {
    return null;
  }

  const delayClass = ['', 'reveal-delay-2', 'reveal-delay-3'];

  return (
    <section id="testimonials" className="bg-white py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'visible' : ''}`}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-[#f5a623]">
            {section.badgeText || 'What Our Clients Say'}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0f2a52]">
            {section.sectionTitle || 'Trusted by Businesses Worldwide'}
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card._id || `${card.companyName}-${i}`}
              className={`border border-gray-100 rounded-xl p-6 flex flex-col gap-5
                         shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-200
                         reveal ${delayClass[i % 3]} ${cardsVisible ? 'visible' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading font-bold text-[#0f2a52] text-lg leading-none">
                    {card.companyName}
                  </p>
                  <p className="text-[#5a6472] text-xs tracking-widest uppercase mt-1">
                    {card.companyCategory}
                  </p>
                </div>
                <span className="text-7xl font-serif leading-none text-gray-100 select-none -mt-2" aria-hidden="true">"</span>
              </div>

              <p className="text-[#5a6472] text-sm leading-relaxed flex-1">
                "{card.reviewText}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <span className="w-9 h-9 rounded-full bg-bg-section flex items-center justify-center shrink-0" aria-hidden="true">
                  <FiUser size={15} className="text-text-body" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-[#0f2a52] text-m leading-none">
                    {card.reviewerName}
                  </p>
                  <p className="text-[#5a6472] text-xs mt-1">
                    {card.reviewerCompany || card.reviewerDesignation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {cards.length > 0 && (
          <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Testimonial navigation">
            {cards.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-200 ${
                  active === i ? 'bg-accent w-6 h-3' : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}