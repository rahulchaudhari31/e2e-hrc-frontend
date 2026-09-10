import React from "react";

const cards = [
  {
    id: 1,
    title: "Industry Expertise",
    description:
      "In-depth knowledge across multiple sectors ensures we understand your specific technical and cultural requirements.",
    iconWidth: "28.52px",
    iconHeight: "30px",
    gridArea: "card1",
    iconType: "globe",
  },
  {
    id: 2,
    title: "Global Talent Network",
    description:
      "Access to a vast, pre-vetted pool of skilled professionals not just locally, but from across the globe.",
    iconWidth: "30px",
    iconHeight: "30px",
    gridArea: "card2",
    iconType: "shield",
  },
  {
    id: 3,
    title: "Compliance Focused",
    description:
      "Strict adherence to legal and ethical recruitment standards, mitigating risk for your business.",
    iconWidth: "24px",
    iconHeight: "30px",
    gridArea: "card3",
    iconType: "check",
  },
  {
    id: 4,
    title: "Fast & Efficient Hiring",
    description:
      "Streamlined processes and agile methodologies designed to save you time and cost without compromising on quality.",
    iconWidth: "29.97px",
    iconHeight: "24px",
    gridArea: "card4",
    iconType: "bolt",
    hasImage: true,
  },
  {
    id: 5,
    title: "Dedicated Account Managers",
    description:
      "Personalised support throughout your entire recruitment journey, acting as an extension of your team.",
    iconWidth: "30px",
    iconHeight: "27px",
    gridArea: "card5",
    iconType: "wrench",
  },
];

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

export default function WhyChooseSection() {
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
            top: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "766px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              Why Choose E2E HRC?
            </h2>
          </div>
          <div
            style={{
              width: "766px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              Delivering excellence through dedicated service and unparalleled market knowledge.
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
          {/* Row 1 - 3 cards */}
          {/* Card 1: Industry Expertise */}
          <div
            style={{
              position: "absolute",
              width: "404px",
              height: "244px",
              left: "0px",
              top: "0px",
              background: "#FFFFFF",
              border: "1px solid #C9DB82",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "28.52px", height: "30px" }}>
              {getIcon("globe")}
            </div>
            <div
              style={{
                width: "338px",
                height: "28px",
                paddingTop: "4px",
              }}
            >
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
                Industry Expertise
              </h3>
            </div>
            <div style={{ width: "338px", height: "96px" }}>
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
                In-depth knowledge across multiple sectors ensures we understand your specific technical and cultural requirements.
              </p>
            </div>
          </div>

          {/* Card 2: Global Talent Network */}
          <div
            style={{
              position: "absolute",
              height: "244px",
              left: "428px",
              right: "428px",
              top: "0px",
              background: "#FFFFFF",
              border: "1px solid #C9DB82",
              borderRadius: "24px",
              padding: "32px 32px 56px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "30px", height: "30px" }}>
              {getIcon("shield")}
            </div>
            <div
              style={{
                width: "338px",
                height: "28px",
                paddingTop: "4px",
              }}
            >
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
                Global Talent Network
              </h3>
            </div>
            <div style={{ width: "338px", height: "72px" }}>
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
                Access to a vast, pre-vetted pool of skilled professionals not just locally, but from across the globe.
              </p>
            </div>
          </div>

          {/* Card 3: Compliance Focused */}
          <div
            style={{
              position: "absolute",
              height: "244px",
              left: "856px",
              right: "0px",
              top: "0px",
              background: "#FFFFFF",
              border: "1px solid #C9DB82",
              borderRadius: "24px",
              padding: "32px 32px 56px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "24px", height: "30px" }}>
              {getIcon("check")}
            </div>
            <div
              style={{
                width: "338px",
                height: "28px",
                paddingTop: "4px",
              }}
            >
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
                Compliance Focused
              </h3>
            </div>
            <div style={{ width: "338px", height: "72px" }}>
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
                Strict adherence to legal and ethical recruitment standards, mitigating risk for your business.
              </p>
            </div>
          </div>

          {/* Row 2 - 2 cards */}
          {/* Card 4: Fast & Efficient Hiring (with image) */}
          <div
            style={{
              position: "absolute",
              height: "230px",
              left: "0px",
              right: "428px",
              top: "278px",
              background: "#FFFFFF",
              border: "1px solid #C9DB82",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "32px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                width: "459.11px",
                height: "124px",
              }}
            >
              <div style={{ width: "29.97px", height: "24px" }}>
                {getIcon("bolt")}
              </div>
              <div
                style={{
                  width: "459.11px",
                  height: "28px",
                  paddingTop: "4px",
                }}
              >
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
                  Fast & Efficient Hiring
                </h3>
              </div>
              <div style={{ width: "459.11px", height: "48px" }}>
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
                  Streamlined processes and agile methodologies designed to save you time and cost without compromising on quality.
                </p>
              </div>
            </div>
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
                alt="Fast Hiring"
                style={{
                  width: "245.55px",
                  height: "160px",
                  objectFit: "cover",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          {/* Card 5: Dedicated Account Managers */}
          <div
            style={{
              position: "absolute",
              height: "230px",
              left: "856px",
              right: "0px",
              top: "278px",
              background: "#FFFFFF",
              border: "1px solid #C9DB82",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "30px", height: "27px" }}>
              {getIcon("wrench")}
            </div>
            <div
              style={{
                width: "338px",
                height: "28px",
                paddingTop: "4px",
              }}
            >
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
                Dedicated Account Managers
              </h3>
            </div>
            <div style={{ width: "338px", height: "72px" }}>
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
                Personalised support throughout your entire recruitment journey, acting as an extension of your team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
