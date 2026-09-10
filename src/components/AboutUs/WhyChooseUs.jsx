import { useEffect, useState } from "react";
import { getWhyChooseE2E } from "../../services/aboutus/whyChooseE2EService";
import hiringImg from "../../assets/images/Career Growth imgs/hiring.jpg";

const getIcon = (type) => {
  const color = "#00458D";
  switch (type) {
    case "globe":
      return (
        <svg width="29" height="24" viewBox="0 0 29 24" fill="none">
          <circle cx="14.5" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
          <line x1="4.5" y1="12" x2="24.5" y2="12" stroke={color} strokeWidth="1.5" />
          <ellipse cx="14.5" cy="12" rx="5" ry="10" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "shield":
      return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M15 3L4 8v7c0 6.5 4.7 12.6 11 14 6.3-1.4 11-7.5 11-14V8L15 3z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M11 15l3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "check":
      return (
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" stroke={color} strokeWidth="2" fill="none" />
          <path d="M7 15l4 4 6-8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bolt":
      return (
        <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
          <path d="M18 2L6 14h8l-2 8 12-12h-8l2-8z" fill={color} />
        </svg>
      );
    case "wrench":
      return (
        <svg width="30" height="27" viewBox="0 0 30 27" fill="none">
          <path d="M22 4a6 6 0 00-8.5 8.5L4 22l2 2 9.5-9.5A6 6 0 0022 4z" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="22" cy="4" r="3" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    default:
      return null;
  }
};

const WhyChooseUs = () => {
  const [items, setItems] = useState([]);
  const [section, setSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await getWhyChooseE2E();
        const data = res?.data ?? {};
        
        // Extract section and cards from response
        const responseSection = data.section || null;
        const responseCards = Array.isArray(data.cards) ? data.cards : [];
        
        // Filter active cards and sort by displayOrder
        const active = responseCards
          .filter((card) => card && (card.isActive === undefined ? true : card.isActive))
          .sort((a, b) => (Number(a.displayOrder || 0) - Number(b.displayOrder || 0)));
        
        if (mounted) {
          setSection(responseSection);
          setItems(active);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
          setSection(null);
          setItems([]);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Return nothing if loading or error or no items
  if (isLoading || error || !items || items.length === 0) {
    return null;
  }

  const headerTitle = section?.sectionTitle || "Why Choose E2E HRC?";
  const headerDesc = section?.sectionDescription || "Delivering excellence through dedicated service and unparalleled market knowledge.";

  return (
    <section
      style={{
        width: "1440px",
        maxWidth: "100%",
        background: "#F3F1ED",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "1324px",
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative",
          height: "692px",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "absolute",
            maxWidth: "768px",
            height: "64px",
            left: "256px",
            right: "302px",
            top: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "40px",
          }}
        >
          <div style={{ width: "766px", height: "24px", display: "flex", justifyContent: "center" }}>
            <h2
              style={{
                margin: 0,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "36px",
                lineHeight: "24px",
                color: "#0F172A",
                whiteSpace: "nowrap",
              }}
            >
              {headerTitle}
            </h2>
          </div>
          <div style={{ width: "766px", height: "24px", display: "flex", justifyContent: "center" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#424752",
              }}
            >
              {headerDesc}
            </p>
          </div>
        </div>

        {/* Cards container */}
        <div
          style={{
            position: "absolute",
            height: "508px",
            left: "32px",
            right: "32px",
            top: "128px",
          }}
        >
          {items.map((card, index) => {
            // Calculate positions based on index
            const row = Math.floor(index / 3);
            const col = index % 3;
            const topPos = row * 278;
            const leftPos = col * 428;
            
            // Determine if this is a multi-column card (first card in first row is wider)
            const isFirstCard = index === 0;
            const width = isFirstCard ? "404px" : null;
            const height = row === 0 ? "244px" : "230px";
            const right = col === 2 ? "0px" : null;
            const flexDir = index === 3 ? "row" : "column";
            const hasImage = index === 3;
            const padding = hasImage ? "32px" : (col === 1 || col === 2) ? "32px 32px 56px" : "32px";
            
            return (
              <div
                key={card._id || index}
                style={{
                  position: "absolute",
                  ...(width ? { width } : {}),
                  height,
                  left: `${leftPos}px`,
                  ...(right ? { right } : {}),
                  top: `${topPos}px`,
                  background: "#FFFFFF",
                  border: "1px solid #C9DB82",
                  borderRadius: "24px",
                  padding,
                  display: "flex",
                  flexDirection: flexDir,
                  alignItems: "flex-start",
                  gap: flexDir === "row" ? "32px" : "12px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px",
                    ...(flexDir === "row" ? { width: "459.11px", height: "124px", flexShrink: 0 } : {}),
                  }}
                >
                  <div style={{ width: card.image ? "28.52px" : "30px", height: card.image ? "30px" : "30px" }}>
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title || "Card icon"} 
                        style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                      />
                    ) : (
                      getIcon(index)
                    )}
                  </div>
                  <div style={{ width: flexDir === "row" ? "459.11px" : "338px", height: "28px", paddingTop: "4px" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#0F172A",
                      }}
                    >
                      {card.title || ""}
                    </h3>
                  </div>
                  <div style={{ width: flexDir === "row" ? "459.11px" : "338px", height: hasImage ? "48px" : ((col === 1 || col === 2) && row === 0) ? "72px" : "96px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#424752",
                      }}
                    >
                      {card.description || ""}
                    </p>
                  </div>
                </div>
                {hasImage && (
                  <div
                    style={{
                      width: "245.55px",
                      height: "160px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#ECEEF0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={hiringImg}
                      alt="Card image"
                      style={{
                        width: "245.55px",
                        height: "160px",
                        objectFit: "cover",
                        opacity: 0.8,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
