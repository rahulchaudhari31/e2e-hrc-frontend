import { useEffect, useState } from "react";
import { getEmployerWhyChoose } from "../../services/employer/employerWhyChooseService";

const defaultSection = {
  sectionTitle: "Why Choose E2E HRC?",
  sectionDescription:
    "Delivering excellence through dedicated service and unparalleled market knowledge.",
};

const defaultCards = [
  {
    _id: "1",
    title: "Industry Expertise",
    description:
      "In-depth knowledge across multiple sectors ensures we understand your specific technical and cultural requirements.",
    icon: "globe",
  },
  {
    _id: "2",
    title: "Global Talent Network",
    description:
      "Access to a vast, pre-vetted pool of skilled professionals not just locally, but from across the globe.",
    icon: "shield",
  },
  {
    _id: "3",
    title: "Compliance Focused",
    description:
      "Strict adherence to legal and ethical recruitment standards, mitigating risk for your business.",
    icon: "check",
  },
  {
    _id: "4",
    title: "Fast & Efficient Hiring",
    description:
      "Streamlined processes and agile methodologies designed to save you time and cost without compromising on quality.",
    icon: "bolt",
    hasImage: true,
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80",
  },
  {
    _id: "5",
    title: "Dedicated Account Managers",
    description:
      "Personalised support throughout your entire recruitment journey, acting as an extension of your team.",
    icon: "wrench",
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

const cardPosition = (index) => {
  const cols = [0, 428, 856];
  if (index < cols.length) {
    return { left: cols[index], top: 0, width: 404, height: 244, horizontal: false };
  }
  const row = index - cols.length;
  const colIndex = row % 3;
  return { left: cols[colIndex], top: 278, width: 404, height: 230, horizontal: colIndex === 0 };
};

export default function WhyChooseSection() {
  const [section, setSection] = useState(defaultSection);
  const [cards, setCards] = useState(defaultCards);

  useEffect(() => {
    let isMounted = true;
    getEmployerWhyChoose().then((data) => {
      if (!isMounted || !data) return;
      if (data.section && data.section.sectionTitle) {
        setSection(data.section);
      }
      if (Array.isArray(data.cards) && data.cards.length > 0) {
        const active = data.cards
          .filter((c) => c.isActive !== false)
          .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
        if (active.length > 0) setCards(active);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <section
      style={{
        width: "1440px",
        maxWidth: "100%",
        background: "#F3F1ED",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "48px 32px 64px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1324, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: 36,
            lineHeight: "48px",
            color: "#0F172A",
          }}
        >
          {section.sectionTitle}
        </h2>
        <p
          style={{
            margin: "12px auto 40px",
            maxWidth: 768,
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            color: "#424752",
          }}
        >
          {section.sectionDescription}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card._id || `${card.title}-${index}`}
              style={{
                background: "#FFFFFF",
                border: "1px solid #C9DB82",
                borderRadius: 24,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxSizing: "border-box",
                textAlign: "left",
                minHeight: 244,
              }}
            >
              {card.hasImage && card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 12,
                    opacity: 0.8,
                  }}
                />
              ) : (
                <div style={{ width: 30, height: 30 }}>
                  {getIcon(card.icon || card.iconType)}
                </div>
              )}
              <h3
                style={{
                  margin: 0,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#0F172A",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#424752",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}