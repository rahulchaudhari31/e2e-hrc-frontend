import { useEffect, useState } from 'react';
import heroBg from '../../assets/images/background coonecting reqrirment/background become a partner.jpg';
import { getRecruitmentPartnerHero } from '../../services/becomePartnerService';

export default function HeroSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let mounted = true;
    getRecruitmentPartnerHero().then((data) => {
      if (mounted && data) setHero(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const title = hero?.title || 'Become Our';
  const highlight = hero?.highlightText || 'Trusted';
  const subtitle = hero?.subtitle || 'Recruitment Partner';
  const bg = hero?.backgroundImage || heroBg;

  return (
    <section
      className="relative flex items-center px-4 md:px-16"
      style={{
        height: 201,
        background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg}) center / cover no-repeat`,
        borderTop: '1px solid #EAE8E7',
      }}
    >
      <div
        className="w-full max-w-[1344px]"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <h1
          className="text-white text-[28px] md:text-[48px]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            lineHeight: '28px',
            margin: 0,
          }}
        >
          {title} <span style={{ color: '#F39308' }}>{highlight}</span> {subtitle}
        </h1>
      </div>
    </section>
  );
}