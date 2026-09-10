import { useRef, useEffect, useState } from "react";
import backgroundImg from "../../assets/images/Career Growth imgs/background employerr.png";
import fordLogo from "../../assets/images/Career Growth imgs/ford 1.png";
import { getEmployerTestimonials } from "../../services/employer/employerTestimonialsService";

// Default fallback section for when API is not available
const DEFAULT_SECTION = {
  badgeText: "Testimonials",
  sectionTitle: "Trusted by Businesses Worldwide",
  sectionDescription:
    "Discover the stories and experiences of individuals and companies who have found success and excellence through Applyfier",
};

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

function TestimonialCard({ t }) {
  const logoSrc = t.companyLogo || fordLogo;
  
  return (
    <div
      className="testimonial-card"
      style={{
        position: "relative",
        minWidth: 530,
        height: 388,
        background: "#FFFFFF",
        borderRadius: 12,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "calc(50% - 200px)",
          top: 53,
          width: 402,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 30, height: 170 }}>
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "30px",
              color: "#000000",
              margin: 0,
            }}
          >
            {t.title}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "19px",
              color: "#000000",
              margin: 0,
            }}
          >
            {t.reviewText}
          </p>
        </div>
        <div
          style={{
            width: 400,
            height: 0,
            border: "1px solid rgba(0,0,0,0.25)",
            transform: "rotate(0.27deg)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: t.companyName === "Ford" ? "center" : "flex-start" }}>
          <img 
            src={logoSrc} 
            alt={t.companyName || "Company"} 
            style={{ height: 40, objectFit: "contain" }}
            onError={(e) => {
              e.target.src = fordLogo;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const trackRef = useRef(null);
  const scrollOffset = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployerTestimonials();

        if (data && data.data) {
          setSection(data.data.section || DEFAULT_SECTION);
          setTestimonials(data.data.cards || []);
        } else {
          setSection(DEFAULT_SECTION);
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError(err);
        setSection(DEFAULT_SECTION);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Animation loop - only runs when testimonials are available
  useEffect(() => {
    if (testimonials.length === 0 || loading) return;

    let lastTime = performance.now();
    const animate = (time) => {
      if (trackRef.current && !pausedRef.current) {
        const delta = time - lastTime;
        scrollOffset.current -= delta * 0.05;
        const cardWidth = 574;
        const totalWidth = testimonials.length * cardWidth;
        if (Math.abs(scrollOffset.current) >= totalWidth) {
          scrollOffset.current = 0;
        }
        trackRef.current.style.transform = `translateX(${scrollOffset.current}px)`;
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [testimonials, loading]);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const cardWidth = 574;
    pausedRef.current = true;
    if (dir === "left") {
      scrollOffset.current += cardWidth;
    } else {
      scrollOffset.current -= cardWidth;
    }
    trackRef.current.style.transform = `translateX(${scrollOffset.current}px)`;
    setTimeout(() => { pausedRef.current = false; }, 2000);
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1452,
        margin: "0 auto",
        padding: "43px 100px 59px",
        gap: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImg}) center/cover no-repeat`,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >

      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 80, borderTop: "1px solid #FFFFFF" }} />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  gap: 10,
                  background: "#FFFFFF",
                  borderRadius: 20,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "19px",
                  color: "#F39308",
                }}
              >
                {section?.badgeText || DEFAULT_SECTION.badgeText}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 36,
                lineHeight: "76px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {section?.sectionTitle || DEFAULT_SECTION.sectionTitle}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 568, width: "100%" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "19px",
                color: "#FFFFFF",
                maxWidth: 580,
                margin: 0,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              {section?.sectionDescription || DEFAULT_SECTION.sectionDescription}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, flex: 1 }}>
              <button
                onClick={() => scroll("left")}
                style={{
                  width: 40.97,
                  height: 40.97,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#EBEEF8",
                  border: "1px solid #004CA5",
                  borderRadius: 58.52,
                  cursor: "pointer",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
                aria-label="Previous"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => scroll("right")}
                style={{
                  width: 40.97,
                  height: 40.97,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#FFFFFF",
                  borderRadius: 58.52,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                aria-label="Next"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Continuous scroller */}
        <div className="testimonials-track-wrapper">
          <div className="testimonials-track" ref={trackRef}>
            {/* Show loading state */}
            {loading && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 388,
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Loading testimonials...
              </div>
            )}

            {/* Show error state */}
            {error && !loading && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 388,
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Failed to load testimonials. Please try again later.
              </div>
            )}

            {/* Show empty state */}
            {!loading && !error && testimonials.length === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 388,
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                No testimonials available at this time.
              </div>
            )}

            {/* Render testimonial cards */}
            {!loading && testimonials.length > 0 && (
              <>
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`${t._id || i}-${i}`} t={t} />
                ))}
                {/* Repeat for continuous loop effect */}
                {testimonials.map((t, i) => (
                  <TestimonialCard key={`${t._id || i}-repeat-${i}`} t={t} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }

        .testimonials-track-wrapper {
          overflow: hidden;
          width: 100%;
          padding: 10px 0;
        }

        .testimonials-track {
          display: flex;
          gap: 44px;
          width: max-content;
        }

        .testimonial-card {
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .testimonial-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>
    </section>
  );
}
