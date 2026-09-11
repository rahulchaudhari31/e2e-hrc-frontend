import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiMapPin, FiClock, FiX, FiCompass } from 'react-icons/fi';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import OfficeInfoCard from '../OfficeInfoCard';
import { getLocations } from '../../services/becomePartnerService';

import mapBg from '../../assets/images/background coonecting reqrirment/Connecting Recruitment Partners background.png';

const defaultStatsData = [
  { value: '18+', label: 'Years Exp' },
  { value: '450+', label: 'Clients' },
  { value: '12k+', label: 'Placements' },
  { value: '4', label: 'Regional Hubs' },
];

const defaultMarkers = [
  { id: 'uk', label: 'UK Head Office', left: '45.01%', top: '30.06%', size: 'w-4 h-4', color: '#00458D', shadow: 'rgba(0,69,141,0.2)', focus: '#F39308', cardTop: -80 },
  { id: 'gcc', label: 'GCC Hub', left: '57.99%', top: '45.01%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
  { id: 'europe', label: 'Europe Hub', left: '50%', top: '35.05%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
  { id: 'southasia', label: 'South Asia Hub', left: '64.97%', top: '50%', size: 'w-3 h-3', color: '#FFB952', shadow: 'rgba(255,185,82,0.2)', focus: '#004CA5', cardTop: -80 },
];

const defaultOfficeData = {
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
    address: ['FriedrichstraÃŸe 68,', '10117 Berlin, Germany'],
    phone: '+49 30 1234 5678',
    email: 'europe@e2ehrc.co.uk',
    hours: 'Mon to Fri: 9AM to 6PM',
    aboutText: 'Our Berlin office connects clients and candidates across the European Union, with deep expertise in DACH and Nordics markets.',
    directionsQuery: 'FriedrichstraÃŸe 68, 10117 Berlin, Germany',
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

const mapLocationsToOfficeData = (locations) => {
  if (!Array.isArray(locations) || locations.length === 0) return defaultOfficeData;
  const merged = { ...defaultOfficeData };
  const slotIds = ['uk', 'europe', 'gcc', 'southasia'];
  locations.forEach((loc, i) => {
    if (i >= slotIds.length) return;
    const id = slotIds[i];
    const addr = Array.isArray(loc.address) && loc.address.length > 0 ? loc.address : merged[id].address;
    merged[id] = {
      officeName: loc.officeName || loc.title || merged[id].officeName,
      address: addr,
      phone: loc.phone || merged[id].phone,
      email: loc.email || merged[id].email,
      hours: loc.hours || loc.openingHours || merged[id].hours,
      aboutText: loc.aboutText || loc.aboutDescription || merged[id].aboutText,
      directionsQuery: loc.directionsQuery || merged[id].directionsQuery,
    };
  });
  return merged;
};

export default function NetworkMapSection() {
  const [locations, setLocations] = useState([]);
  const [activeOfficeCard, setActiveOfficeCard] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const cardTimers = useRef({});

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    let mounted = true;
    getLocations().then((list) => {
      if (mounted && Array.isArray(list) && list.length > 0) setLocations(list);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const officeData = useMemo(() => mapLocationsToOfficeData(locations), [locations]);

  const statsData = useMemo(() => {
    const head = locations.find((l) => l.type === 'headOffice') || locations[0];
    if (head && Array.isArray(head.stats) && head.stats.length === 4) return head.stats;
    return defaultStatsData;
  }, [locations]);

  const makeHandleEnter = useCallback((id) => () => {
    if (cardTimers.current[id]) clearTimeout(cardTimers.current[id]);
    setActiveOfficeCard(id);
  }, []);

  const makeHandleLeave = useCallback((id) => () => {
    cardTimers.current[id] = setTimeout(() => setActiveOfficeCard(null), 250);
  }, []);

  const hideCard = useCallback(() => setActiveOfficeCard(null), []);

  return (
    <>
      <section className="bg-white py-10">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-16">
          <div className="flex flex-col items-center gap-12">
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

              {defaultMarkers.map((m) => (
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

      {isMobile && activeOfficeCard && (() => {
        const d = officeData[activeOfficeCard];
        if (!d) return null;
        return createPortal(
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: '#FFF',
              display: 'flex', flexDirection: 'column',
              padding: 24, overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button
                onClick={hideCard}
                aria-label="Close"
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%', background: '#FFF', border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FiX size={20} color="#000" />
              </button>
            </div>

            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: '#004CA5', margin: 0, marginBottom: 20 }}>
              {d.officeName}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: FiMapPin, color: '#004CA5', content: (d.address || []).map((line, i) => (<span key={i}>{line}{i < d.address.length - 1 && <br />}</span>)) },
                { icon: FaPhoneAlt, color: '#004CA5', content: d.phone },
                { icon: FaEnvelope, color: '#004CA5', content: d.email },
                { icon: FiClock, color: '#004CA5', content: d.hours },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}><row.icon size={16} color={row.color} /></div>
                  <span style={{ fontSize: 15, lineHeight: 1.5, color: '#1B1C1C', fontFamily: "'Inter', sans-serif" }}>{row.content}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B1C1C', margin: 0, marginTop: 8, marginBottom: 12 }}>
              About this Office
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#424752', margin: 0, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
              {d.aboutText}
            </p>

            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(d.directionsQuery)}`, '_blank', 'noopener,noreferrer')}
              style={{
                width: '100%', padding: 14, borderRadius: 9999, background: '#004CA5',
                color: '#FFF', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16,
              }}
            >
              <FiCompass size={16} color="#FFF" />
              Get Directions
            </button>
          </div>,
          document.body
        );
      })()}
    </>
  );
}