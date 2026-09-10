import { useEffect, useMemo, useState } from 'react';
import { getEmployeeCards } from '../../services/employeeCardService';
import employeeIcon from '../../assets/images/Career Growth imgs/employee1.png';

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ServiceCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCards = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await getEmployeeCards();
        if (!isMounted) return;
        const responseCards = Array.isArray(response?.data) ? response.data : [];
        const activeCards = responseCards.filter((card) => card.isActive !== false);
        activeCards.sort((a, b) => {
          const orderA = Number(a.displayOrder ?? a.displayorder ?? a.order ?? 0);
          const orderB = Number(b.displayOrder ?? b.displayorder ?? b.order ?? 0);
          return orderA - orderB;
        });
        setCards(activeCards);
      } catch {
        if (isMounted) { setError(true); setCards([]); }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchCards();
    return () => { isMounted = false; };
  }, []);

  const sortedCards = useMemo(() => [...cards], [cards]);

  const fallbackCards = [
    {
      id: "employer",
      isEmployer: true,
      badgeText: "For Employers",
      line1: "Find Your",
      line2Accent: "Next Star",
      line2Rest: "Hire",
      description: "Tailored recruitment and workforce solutions designed to help you build high-performing teams across every sector.",
      buttonText: "Explore",
    },
    {
      id: "employee",
      isEmployer: false,
      badgeText: "For Employee",
      line1: "Discover Your",
      line2Accent: "Dream",
      line2Rest: "Career",
      description: "Explore opportunities that match your skills, experience and ambitions. We connect you with employers who value your potential.",
      buttonText: "Explore",
    },
  ];

  const displayCards = sortedCards.length > 0
    ? sortedCards.map((card) => ({
        id: card._id,
        isEmployer: card.cardType === 'employer',
        badgeText: card.badgeText || card.subtitle || (card.cardType === 'employer' ? 'For Employers' : 'For Employee'),
        line1: card.titleLine || (card.cardType === 'employer' ? 'Find Your' : 'Discover Your'),
        line2Accent: card.highlightedText || (card.cardType === 'employer' ? 'Next Star' : 'Dream'),
        line2Rest: card.cardType === 'employer' ? 'Hire' : 'Career',
        description: card.description || card.shortDescription || '',
        buttonText: card.buttonText || 'Explore',
      }))
    : fallbackCards;

  const renderCard = (card) => {
    const isEmployer = card.isEmployer;
    const bgColor = isEmployer ? '#C9DB82' : '#FFFFFF';
    const textColor = isEmployer ? '#FFFFFF' : '#004CA5';
    const descColor = isEmployer ? 'rgba(255,255,255,0.9)' : '#004CA5';

    return (
      <div
        key={card.id}
        className="w-full sm:flex-1"
        style={{
          background: bgColor,
          borderRadius: '20px',
          padding: 'clamp(24px, 4vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '334px',
          boxSizing: 'border-box',
        }}
      >
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '6px 14px',
          gap: '8px',
          background: '#FFFFFF',
          border: '0.8px solid #F39308',
          borderRadius: '9999px',
          width: 'fit-content',
          marginBottom: '24px',
        }}>
          <img src={employeeIcon} alt="" style={{ width: '14px', height: '14px' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px',
            color: '#004CA5',
          }}>
            {card.badgeText}
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '36px',
          lineHeight: '45px',
          color: textColor,
          margin: 0,
          marginBottom: '16px',
        }}>
          {card.line1}
          <br />
          <span style={{ color: isEmployer ? '#F39308' : '#004CA5' }}>{card.line2Accent}</span>{' '}
          <span style={{ color: textColor }}>{card.line2Rest}</span>
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '26px',
          color: descColor,
          margin: 0,
          marginBottom: '24px',
          maxWidth: '519px',
        }}>
          {card.description}
        </p>

        {/* Button - bottom right */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              gap: '8px',
              background: '#F39308',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}>
              {card.buttonText}
            </span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }} className="sm:px-8">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            {[1, 2].map((item) => (
              <div key={item} className="animate-pulse" style={{ padding: '24px', minHeight: '334px' }}>
                <div style={{ width: '130px', height: '30px', borderRadius: '9999px', background: '#e2e8f0', marginBottom: '24px' }} />
                <div style={{ width: '200px', height: '70px', background: '#e2e8f0', borderRadius: '8px', marginBottom: '16px' }} />
                <div style={{ width: '100%', maxWidth: '400px', height: '50px', background: '#e2e8f0', borderRadius: '8px', marginBottom: '24px' }} />
                <div style={{ width: '123px', height: '44px', borderRadius: '9999px', background: '#e2e8f0' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 32px', textAlign: 'center', color: '#64748B' }}>
          We could not load the cards right now. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <section style={{ background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px' }} className="sm:px-8">
        <div className="flex flex-col sm:flex-row gap-0">
          {displayCards.map((card) => renderCard(card))}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
