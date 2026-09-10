import { useEffect, useState, useRef } from "react";
import { getTestimonials } from "../../services/aboutus/testimonialService";
import companyLogo from "../../assets/images/Career Growth imgs/global.png"
const fallbackTestimonials = [
  {
    _id: "1",
    testimonialTitle: "Efficient and Effective Hiring Process!",
    review: "The efficiency of Applyfier's hiring process is commendable. The platform's intuitive interface, combined with the customizable criteria for candidate ranking, makes it easy to identify the right fit for our company. It's a game-changer for businesses seeking quality hires.",
    companyName: "Ford",
  },
  {
    _id: "2",
    testimonialTitle: "Top-Notch Talent at Our Fingertips!",
    review: "As an employer, finding top-notch talent is crucial for our success. Applyfier has been our go-to platform for hiring. The automated candidate ranking system significantly simplified our hiring process, and we were able to connect with exceptional candidates who have become valuable assets to our team.",
    companyName: "Disney",
  },
  {
    _id: "3",
    testimonialTitle: "Top-Notch Talent at Our Fingertips!",
    review: "As an employer, finding top-notch talent is crucial for our success. Applyfier has been our go-to platform for hiring. The automated candidate ranking system significantly simplified our hiring process, and we were able to connect with exceptional candidates who have become valuable assets to our team.",
    companyName: "Disney"
  },
  {
    _id: "4",
    testimonialTitle: "Efficient and Effective Hiring Process!",
    review: "The efficiency of Applyfier's hiring process is commendable. The platform's intuitive interface, combined with the customizable criteria for candidate ranking, makes it easy to identify the right fit for our company. It's a game-changer for businesses seeking quality hires.",
    companyName: "Ford",

  },
  {
    _id: "5",
    testimonialTitle: "Top-Notch Talent at Our Fingertips!",
    review: "As an employer, finding top-notch talent is crucial for our success. Applyfier has been our go-to platform for hiring. The automated candidate ranking system significantly simplified our hiring process, and we were able to connect with exceptional candidates who have become valuable assets to our team.",
    companyName: "Disney",

  },
];

const ChevronLeftIcon = () => (
  <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M8 1L1 8L8 15" stroke="#9A72F9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M1 1L8 8L1 15" stroke="#FCF6F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function TestimonialCard({ t }) {
  const brand = t.companyName || "";
  const isFord = brand.toLowerCase().includes("ford");

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
        marginTop: 50,
      }}
    >
      {/* Inner bg */}
      <div
        style={{
          position: "absolute",
          width: 484,
          height: 388,
          background: "rgba(255,255,255,0.5)",
          borderRadius: 12,
          left: 0,
          top: 0,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 277.8,
          left: "calc(50% - 200px)",
          top: 35,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          zIndex: 1,
        }}
      >

        <div style={{ display: "flex", flexDirection: "column", gap: 0, width: 368, height: 170 }}>
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
            {t.testimonialTitle}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "19px",
              color: "#000000",
              margin: 0,
              marginTop: 6,
            }}
          >
            {t.review}
          </p>
        </div>
        {/* Divider */}
        <div
          style={{
            width: 400,
            height: 0,
            border: "1px solid rgba(0,0,0,0.25)",
            transform: "rotate(0.27deg)",
          }}
        />
              <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
        >
          <img
            src={companyLogo}
            alt="companyLogo"
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
            }}
          />

          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#2A2A2A",
            }}
          >
            {t.companyName}
          </span>
        </div>
      </div>
    </div>
  );
}

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        const activeItems = (response?.data || [])
          .filter((item) => item.isActive !== false)
          .sort((a, b) => Number(a.displayOrder ?? a.order ?? 0) - Number(b.displayOrder ?? b.order ?? 0));

        if (activeItems.length > 0) {
          const withLogos = activeItems.map((item) => {
            const brand = (item.companyName || "").toLowerCase();
            if (brand.includes("ford")) return { ...item, logo: fordLogo };
            if (brand.includes("disney") || brand.includes("disnep")) return { ...item, logo: disneyLogo };
            return item;
          });
          setItems(withLogos);
        } else {
          setItems(fallbackTestimonials);
        }
      } catch {
        setItems(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const displayItems = isLoading ? fallbackTestimonials : items;
  const doubled = [...displayItems, ...displayItems];
  const trackRef = useRef(null);
  const scrollOffset = useRef(0);
  const animRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time) => {
      if (trackRef.current && !pausedRef.current) {
        const delta = time - lastTime;
        scrollOffset.current -= delta * 0.05;
        const cardWidth = 574;
        const totalWidth = displayItems.length * cardWidth;
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
  }, [displayItems.length]);

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
        width: "1440px",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "43px 100px 63px",
        gap: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "linear-gradient(49.52deg, #1295D4 -4.12%, #7EC443 85.04%)",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Frame 334 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 30, width: 403, height: 87 }}>
            {/* Frame 292 - Label row */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20, width: 235, height: 32 }}>
              <div style={{ width: 80, height: 0, borderTop: "1px solid #FFFFFF" }} />
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
                  height: 32,
                }}
              >
                Testimonials
              </span>
            </div>
            {/* Heading */}
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 36,
                lineHeight: "76px",
                color: "#000000",
                margin: 0,
                width: 403,
                height: 25,
              }}
            >
              What They Are Saying
            </h2>
          </div>

          {/* Frame 843 - Description + nav */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 568, width: "100%", height: 40.97 }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "19px",
                color: "#2A2A2A",
                maxWidth: 580,
                margin: 0,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              Discover the stories and experiences of individuals and companies who have found success and excellence through Applyfier
            </p>
            {/* Frame 842 - Nav buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, width: 91.93, height: 40.97, flexShrink: 0 }}>
              {/* Left button */}
              <button
                onClick={() => scroll("left")}
                style={{
                  width: 40.97,
                  height: 40.97,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "11.7px 17.56px",
                  gap: 11.7,
                  background: "#EBEEF8",
                  border: "1px solid #9A72F9",
                  borderRadius: 58.52,
                  cursor: "pointer",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
                aria-label="Previous"
              >
                <ChevronLeftIcon />
              </button>
              {/* Right button */}
              <button
                onClick={() => scroll("right")}
                style={{
                  width: 40.97,
                  height: 40.97,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "11.7px 17.56px",
                  gap: 11.7,
                  background: "#000000",
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
            {doubled.map((t, i) => (
              <TestimonialCard key={`${t._id || i}-${i}`} t={t} />
            ))}
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
};

export default Testimonials;
