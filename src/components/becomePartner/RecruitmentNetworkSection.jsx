import { useEffect, useRef, useState } from 'react';
import OfficeInfoCard from '../becomePartner/OfficeInfoCard';
import mapBg from '../../assets/becomepartner/Connecting Recruitment Partners background.png';

const officeData = {
  uk: {
    officeName: 'UK Head Office',
    address: ['Unit 2, 1204B Stratford Road, Hall Green,', 'Birmingham, B28 8AS, UK'],
    phone: '+44 (0) 121 778 2400',
    email: 'info@e2ehrc.co.uk',
    hours: 'Mon to Fri: 9AM to 6PM',
    aboutText: 'Our UK head office is located in Birmingham, easily accessible by road and public transport. Our team is available to assist you with all your recruitment needs.',
    directionsQuery: 'Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8AS, UK',
  },
  gcc: {
    officeName: 'GCC Hub',
    address: ['Level 14, Al Fattan Currency House,', 'Tower 2, DIFC, Dubai, UAE'],
    phone: '+971 4 123 4567',
    email: 'gcc@e2ehrc.co.uk',
    hours: 'Sun to Thu: 9AM to 6PM',
    aboutText: 'Our GCC hub in Dubai serves as the central operations base for the Middle East and North Africa region, providing comprehensive recruitment solutions across diverse industries.',
    directionsQuery: 'Level 14, Al Fattan Currency House, Tower 2, DIFC, Dubai, UAE',
  },
  europe: {
    officeName: 'Europe Hub',
    address: ['Friedrichstraße 68,', '10117 Berlin, Germany'],
    phone: '+49 30 1234 5678',
    email: 'europe@e2ehrc.co.uk',
    hours: 'Mon to Fri: 9AM to 6PM',
    aboutText: 'Our Berlin office connects clients and candidates across the European Union, with deep expertise in DACH and Nordics markets.',
    directionsQuery: 'Friedrichstraße 68, 10117 Berlin, Germany',
  },
  southasia: {
    officeName: 'South Asia Hub',
    address: ['91 Springboard, Sector 44,', 'Gurugram, Haryana 122003, India'],
    phone: '+91 124 456 7890',
    email: 'southasia@e2ehrc.co.uk',
    hours: 'Mon to Sat: 9AM to 6PM',
    aboutText: 'Our Gurugram office drives our South Asia operations, offering end-to-end recruitment services across India and neighbouring markets.',
    directionsQuery: '91 Springboard, Sector 44, Gurugram, Haryana 122003, India',
  },
};

const statsData = [
  { value: '18+', label: 'Years Exp' },
  { value: '450+', label: 'Clients' },
  { value: '12k+', label: 'Placements' },
  { value: '4', label: 'Regional Hubs' },
];

export default function RecruitmentNetworkSection() {
  const [activeOfficeCard, setActiveOfficeCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardTimers = useRef({});

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const makeHandleEnter = (id) => () => {
    if (cardTimers.current[id]) clearTimeout(cardTimers.current[id]);
    setActiveOfficeCard(id);
  };

  const makeHandleLeave = (id) => () => {
    cardTimers.current[id] = setTimeout(() => setActiveOfficeCard(null), 250);
  };

  const hideCard = () => setActiveOfficeCard(null);

  return (
<section className="bg-white py-10">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-16">
          <div className="flex flex-col items-center gap-12">
            {/* Map heading + subtext */}
            <div className="text-center max-w-[1072px]">
              <h2 className="font-['Hanken_Grotesk',sans-serif] font-bold text-[28px] leading-[34px] md:text-[48px] md:leading-[56px] tracking-[-0.56px] md:tracking-[-0.96px] text-[#004CA5] mb-4">
                Connecting Recruitment Partners Worldwide
              </h2>
              <p className="font-['Source_Sans_3',sans-serif] font-normal text-sm md:text-base leading-5 md:leading-6 text-[#424752] max-w-[672px] mx-auto">
                Our established global infrastructure enables seamless cross-border recruitment and market entry for our partners.
              </p>
            </div>

            <div className="relative w-full min-h-[385px] rounded-[24px] border border-[rgba(194,198,212,0.2)] bg-[#F2F4F6]">
              <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
                <img
                  src={mapBg}
                  alt="Our Recruitment Network Map"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: '0.3' }}
                />
              </div>

              {[
                { id: 'uk', label: 'UK Head Office', left: '45.01%', top: '30.06%', size: 'w-4 h-4', color: '#00458D', shadow: 'rgba(0,69,141,0.2)', focus: '#F39308', cardTop: -80 },
                { id: 'gcc', label: 'GCC Hub', left: '57.99%', top: '45.01%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
                { id: 'europe', label: 'Europe Hub', left: '50%', top: '35.05%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
                { id: 'southasia', label: 'South Asia Hub', left: '64.97%', top: '50%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
              ].map((m) => (
                <div key={m.id} className="absolute" style={{ left: m.left, top: m.top }}>
                  <button
                    tabIndex={0}
                    className={`relative ${m.size} rounded-full cursor-pointer hover:scale-125 transition-transform focus:outline-2 focus:outline-offset-2`}
                    style={{ background: m.color, boxShadow: `0 0 0 4px ${m.shadow}`, outlineColor: m.focus }}
                    aria-label={m.label}
                    onMouseEnter={makeHandleEnter(m.id)}
                    onMouseLeave={isMobile ? undefined : makeHandleLeave(m.id)}
                    onFocus={() => setActiveOfficeCard(m.id)}
                  >
                    <span className="sr-only">{m.label}</span>
                  </button>
                  <OfficeInfoCard
                    data={officeData[m.id]}
                    isVisible={activeOfficeCard === m.id}
                    isModal={isMobile}
                    style={{ right: 'calc(100% + 12px)', top: m.cardTop, zIndex: 100 }}
                    onClose={hideCard}
                    onMouseEnter={isMobile ? undefined : makeHandleEnter(m.id)}
                    onMouseLeave={isMobile ? undefined : makeHandleLeave(m.id)}
                  />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="w-full max-w-[1072px] flex flex-wrap justify-center items-start gap-8">
              {statsData.map((stat, i) => (
                <div key={i} className="text-center" style={{ flex: '1 1 40%', maxWidth: '244px' }}>
                  <p className="font-['Hanken_Grotesk'] font-bold text-[32px] leading-[38px] md:text-[48px] md:leading-[56px] tracking-[-0.64px] md:tracking-[-0.96px] text-[#004CA5]">
                    {stat.value}
                  </p>
                  <p className="font-['Hanken_Grotesk'] font-normal text-base leading-6 text-[#424752]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
