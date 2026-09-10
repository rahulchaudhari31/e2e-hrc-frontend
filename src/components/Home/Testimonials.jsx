import React, { useEffect, useRef, useState } from "react";
import { getHomeTestimonials } from "../../services/homeSectionsService";

function Testimonials() {
  const scrollRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await getHomeTestimonials();
        setData(response?.data || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 574;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!loading && (!data || data.isActive === false)) {
    return null;
  }

  const sectionTitle = data?.sectionTitle || "Testimonials";
  const sectionHeading = data?.sectionHeading || "What They Are Saying";
  const sectionDescription = data?.sectionDescription || "";
  const items = data?.items?.filter(i => i.isActive !== false) || [];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(49.52deg, #1295D4 -4.12%, #7EC443 85.04%)",
        padding: "43px 0 63px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1240px", padding: "0 20px" }}>
        {/* Header */}
        <div className="flex flex-col" style={{ gap: "40px" }}>
          <div className="flex flex-col" style={{ gap: "30px" }}>
            <div className="flex items-center" style={{ gap: "20px" }}>
              <div style={{ width: "80px", height: "0px", borderTop: "1px solid #FFFFFF" }} />
              <div
                className="inline-flex items-center justify-center"
                style={{
                  padding: "10px 20px",
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#F39308",
                }}
              >
                {loading ? "Testimonials" : sectionTitle}
              </div>
            </div>

            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "56px",
                color: "#000000",
              }}
            >
              {loading ? "What They Are Saying" : sectionHeading}
            </h2>
          </div>

          <div className="flex items-end justify-between">
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                color: "#2A2A2A",
                maxWidth: "580px",
              }}
            >
              {loading ? "Discover the stories and experiences of individuals and companies who have found success and excellence through Applyfier" : sectionDescription}
            </p>

            <div className="hidden sm:flex items-center" style={{ gap: "10px" }}>
              <button
                onClick={() => scroll("left")}
                className="flex items-center justify-center"
                style={{
                  width: "40.97px",
                  height: "40.97px",
                  background: "#EBEEF8",
                  border: "1px solid #9A72F9",
                  borderRadius: "58.52px",
                  cursor: "pointer",
                  transform: "scaleX(-1)",
                }}
              >
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                  <path d="M1 1L8 8L1 15" stroke="#9A72F9" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex items-center justify-center"
                style={{
                  width: "40.97px",
                  height: "40.97px",
                  background: "#000000",
                  borderRadius: "58.52px",
                  cursor: "pointer",
                }}
              >
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
                  <path d="M1 1L8 8L1 15" stroke="#FCF6F6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar mt-10"
          style={{ gap: "44px", paddingBottom: "10px" }}
        >
          {items.map((t, idx) => (
            <div
              key={t._id || idx}
              className="flex-shrink-0 bg-white rounded-xl relative flex flex-col items-center justify-center"
              style={{ width: "530px", height: "388px", borderRadius: "12px" }}
            >
              <div
                className="flex flex-col items-center justify-center"
                style={{ width: "400px", gap: "30px" }}
              >
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: "#000000",
                    width: "100%",
                  }}
                >
                  {t.title}
                </h3>

                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#000000",
                    width: "100%",
                  }}
                >
                  {t.quote}
                </p>

                <div
                  style={{
                    width: "400px",
                    height: "0px",
                    borderTop: "1px solid rgba(0, 0, 0, 0.25)",
                    transform: "rotate(0.27deg)",
                  }}
                />

                <div className="flex items-center self-start" style={{ gap: "16px" }}>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background: "#2A2A2A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#000000",
                      }}
                    >
                      {t.clientName || "Verified Client"}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {t.clientCompany || "E2E Consultancy"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
