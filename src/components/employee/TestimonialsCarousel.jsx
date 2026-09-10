import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getEmployeeTestimonials } from '../../services/employee/employeeTestimonialsService';
import testimonialsbg from "../../assets/images/Testimonialbg.png";
import './TestimonialsCarousel.css';

/**
 * EmployeeTestimonialsSection
 * - Fetches testimonials section and cards from backend API
 * - Renders complete section with dynamic header and carousel
 * - Infinite seamless marquee scroll right-to-left
 * - Duplicates items internally for continuous loop
 * - Prev/Next buttons step one card at a time
 * - Desktop: pauses on hover, resumes on leave
 * - Mobile (<768px): single tap to stop, single tap to play
 * - Speed configurable via `speed` prop (seconds for one full cycle)
 */
const ChevronLeftIcon = () => (
  <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M8 1L1 8L8 15" stroke="#004CA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M1 1L8 8L1 15" stroke="#004CA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TestimonialsCarousel({ speed = 30 }) {
  const [testimonials, setTestimonials] = useState([]);
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const animRef = useRef(null);
  const timeoutRef = useRef(null);
  const [trackCycle, setTrackCycle] = useState(0);

  // Fetch testimonials on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getEmployeeTestimonials();

        if (!isMounted) return;

        // Normalize response data
        const payload = response?.data ?? response;
        const sectionData =
          payload?.section ||
          payload?.testimonialSection ||
          response?.section ||
          null;
        const cardsData =
          payload?.cards ||
          payload?.testimonials ||
          response?.cards ||
          (Array.isArray(payload) ? payload : []);

        // Filter active cards and sort by order
        const activeCards = Array.isArray(cardsData)
          ? cardsData
              .filter((item) => item?.isActive !== false)
              .sort((a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
          : [];

        setSection(sectionData);
        setTestimonials(activeCards);
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to load employee testimonials:', err.response?.data || err.message);
        setError('Unable to load testimonials.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle mobile/desktop detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
    setPaused(false);
  }, []);
  const toggle = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  }, []);

  // Measure the seamless loop cycle (half of the doubled track width)
  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        setTrackCycle(trackRef.current.scrollWidth / 2);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [testimonials.length]);

  // Drive the marquee with rAF so the buttons can offset it manually
  useEffect(() => {
    if (testimonials.length === 0 || loading || trackCycle <= 0) return;

    const pxPerMs = trackCycle / (speed * 1000);
    let lastTime = performance.now();

    const animate = (time) => {
      if (trackRef.current && !pausedRef.current) {
        const delta = time - lastTime;
        offsetRef.current -= delta * pxPerMs;
        if (Math.abs(offsetRef.current) >= trackCycle) {
          offsetRef.current += trackCycle;
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [testimonials.length, loading, speed, trackCycle]);

  const scrollCarousel = (dir) => {
    if (!trackRef.current || testimonials.length === 0) return;

    pausedRef.current = true;
    setPaused(true);
    clearTimeout(timeoutRef.current);

    const track = trackRef.current;
    const cycle = track.scrollWidth / 2;
    const firstCard = track.children[0];
    const cardWidth = firstCard ? firstCard.offsetWidth : 540;
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 44;
    const unit = cardWidth + gap;
    const minOffset = -Math.max(cycle - unit, 0);

    if (dir === 'left') {
      offsetRef.current = Math.min(offsetRef.current + unit, 0);
    } else {
      offsetRef.current = Math.max(offsetRef.current - unit, minOffset);
    }
    track.style.transform = `translateX(${offsetRef.current}px)`;

    timeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
      setPaused(false);
    }, 2000);
  };

  // If section is explicitly inactive, don't render
  if (!loading && section?.isActive === false) {
    return null;
  }

  // Duplicate items for seamless loop
  const loopItems =
    testimonials.length > 1
      ? [...testimonials, ...testimonials]
      : testimonials;

  const handlers = isMobile
    ? { onClick: toggle }
    : { onMouseEnter: pause, onMouseLeave: resume };

  return (
    <section
      className="emp-testimonials relative overflow-hidden"
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        backgroundImage: `url(${testimonialsbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "43px 80px 59px 80px",
        minHeight: "500px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.6)' }}
      />
      <div
        className="emp-testimonials-inner relative z-10 mx-auto flex flex-col"
        style={{ maxWidth: '1240px', gap: '50px' }}
      >
        {/* Section Header */}
        <div className="emp-testimonials-top flex flex-col" style={{ width: '100%', gap: '40px' }}>
          <div className="emp-testimonials-header flex flex-col" style={{ width: '100%', gap: '30px' }}>
            {/* Badge */}
            <div
              className="emp-testimonials-badge flex items-center"
              style={{ gap: '20px', height: '32px' }}
            >
              <div style={{ width: '80px', borderTop: '1px solid #FFFFFF' }} />
              <span
                className="bg-white inline-flex items-center justify-center"
                style={{
                  width: '135px',
                  height: '32px',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  gap: '10px',
                }}
              >
                <span
                  className="font-[Inter] text-[16px] leading-[19px] text-[#F39308]"
                  style={{ fontWeight: 400 }}
                >
                  {section?.badgeText || 'Testimonials'}
                </span>
              </span>
            </div>

            {/* Heading */}
            <h2
              className="emp-testimonials-heading font-[Poppins] font-semibold text-[36px] text-white m-0"
              style={{
                width: '100%',
                lineHeight: '76px',
                letterSpacing: '0%',
              }}
            >
              {section?.sectionTitle || 'What our candidates say'}
            </h2>
          </div>

          {/* Description + nav buttons */}
          <div className="emp-testimonials-controls flex items-start" style={{ width: '100%', gap: '568px' }}>
            <p
              className="emp-testimonials-desc font-[Inter] text-white m-0"
              style={{
                width: '100%',
                maxWidth: '580px',
                fontSize: '16px',
                lineHeight: '19px',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {section?.sectionDescription ||
                'Discover the stories and experiences of individuals and companies who have found success and excellence through Applyfier'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, flex: 1 }}>
              <button
                onClick={(e) => { e.stopPropagation(); scrollCarousel('left'); }}
                style={{
                  width: '40.97px',
                  height: '40.97px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#EBEEF8',
                  border: '1px solid #004CA5',
                  borderRadius: '58.52px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                }}
                aria-label="Previous"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); scrollCarousel('right'); }}
                style={{
                  width: '40.97px',
                  height: '40.97px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  borderRadius: '58.52px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                aria-label="Next"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Carousel */}
        {loading && (
          <div
            className="testimonials-carousel-loader"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTop: '3px solid white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        )}

        {error && (
          <div
            className="testimonials-error"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              color: 'white',
              fontSize: '16px',
            }}
          >
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div
            ref={carRef}
            className={`testimonials-carousel${paused ? ' paused' : ''}${isMobile ? ' is-mobile' : ''}`}
            style={{ '--scroll-speed': `${speed}s` }}
            {...handlers}
          >
            <div className="testimonials-track" ref={trackRef}>
              {loopItems.map((item, i) => {
                // Safe field mapping with fallbacks
                const title = item?.title || '';
                const reviewText = item?.reviewText || item?.quote || '';
                const companyName = item?.companyName || item?.reviewerCompany || '';
                const companyLogo = item?.companyLogo || '';

                // Generate unique key
                const uniqueKey = `${item._id || item.id}-${i}`;

                return (
                  <motion.div
                    key={uniqueKey}
                    whileHover={{ scale: 1.12, boxShadow: '0 24px 56px rgba(0,0,0,0.18)' }}
                    className="bg-white shrink-0 flex flex-col items-center testimonials-card"
                    style={{
                      width: 'min(85vw, 530px)',
                      minHeight: '388px',
                      borderRadius: '12px',
                      padding: '0px',
                    }}
                  >
                    <div
                      className="flex flex-col items-center testimonials-card-inner"
                      style={{ width: 'min(75vw, 400px)', gap: '30px', paddingTop: '55px' }}
                    >
                      <div
                        className="flex flex-col testimonials-card-text"
                        style={{ width: 'min(70vw, 368px)', gap: '30px' }}
                      >
                        <h3
                          className="font-[Poppins] font-medium text-black m-0 testimonials-card-title"
                          style={{
                            fontSize: '20px',
                            lineHeight: '30px',
                            letterSpacing: '0%',
                          }}
                        >
                          {title}
                        </h3>
                        <p
                          className="font-[Inter] text-black m-0 testimonials-card-quote"
                          style={{
                            width: 'min(68vw, 362px)',
                            fontSize: '16px',
                            lineHeight: '19px',
                            fontWeight: 400,
                          }}
                        >
                          {reviewText}
                        </p>
                      </div>
                      <div
                        className="testimonials-card-divider"
                        style={{
                          width: 'min(75vw, 400px)',
                          borderTop: '1px solid rgba(0,0,0,0.25)',
                          transform: 'rotate(0.27deg)',
                        }}
                      />
                      {companyLogo && (
                        <img
                          src={companyLogo}
                          alt={companyName || 'Company logo'}
                          className="h-auto object-contain"
                          style={{ width: '128.65px', maxHeight: '45.95px' }}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
