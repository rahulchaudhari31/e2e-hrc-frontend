import { useState, useEffect } from 'react';
import { getPublicWorkforceSolutions } from '../../services/workforceSolutionServices/workforceSolutionService';

export default function WorkforceSolutions() {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use section data for the header, with sensible fallbacks
  const badgeText = section?.badgeText || 'What We Offer';
  const titleLine1 = section?.titleLine1 || 'Need highly';
  const highlightedTitle = section?.highlightedTitle || 'Skilled staff?';
  const description = section?.description || 'Connect with us to find the right talent for your organization.';

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getPublicWorkforceSolutions();
        if (!cancelled) {
          setSection(data.section);
          setCards(data.cards);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => { cancelled = true; };
  }, []);

  return (
    <section id="solutions" className="bg-gray-100 py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            {badgeText}
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-blue-900 mb-4">
            {titleLine1} <span className="text-orange-500">{highlightedTitle}</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <span
              className="w-8 h-8 rounded-full border-4 border-blue-900 border-t-transparent animate-spin"
              aria-label="Loading"
            />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <p className="text-center text-gray-500 text-sm py-8">
            Something went wrong. Please try again later.
          </p>
        )}

        {/* Empty state */}
        {!loading && !error && cards.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            No solutions available at the moment.
          </p>
        )}

        {/* Grid */}
        {!loading && !error && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={card._id || index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4
                           hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <span className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold" aria-hidden="true">
                    {index + 1}
                  </span>
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg text-blue-900 leading-snug">
                    {card.cardTitle}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.cardDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
