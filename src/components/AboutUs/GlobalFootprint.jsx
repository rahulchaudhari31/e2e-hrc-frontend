import { useState, useRef, useCallback, useEffect } from "react";
import mapImg from "../../assets/images/live map.png";

const officeData = {
  uk: {
    name: "UK Head Office",
    address: "Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8AS, UK",
    phone: "+44 (0) 121 778 2400",
    email: "info@e2ehrc.co.uk",
    hours: "Mon to Fri: 9AM to 6PM",
    about: "Our UK head office is located in Birmingham, easily accessible by road and public transport.",
    query: "Unit 2, 1204B Stratford Road, Hall Green, Birmingham, B28 8AS, UK",
  },
  gcc: {
    name: "GCC Hub",
    address: "Level 14, Al Fattan Currency House, Tower 2, DIFC, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "gcc@e2ehrc.co.uk",
    hours: "Sun to Thu: 9AM to 6PM",
    about: "Our GCC hub in Dubai serves as the central operations base for the Middle East and North Africa region.",
    query: "Level 14, Al Fattan Currency House, Tower 2, DIFC, Dubai, UAE",
  },
  europe: {
    name: "Europe Hub",
    address: "Friedrichstrasse 68, 10117 Berlin, Germany",
    phone: "+49 30 1234 5678",
    email: "europe@e2ehrc.co.uk",
    hours: "Mon to Fri: 9AM to 6PM",
    about: "Our Berlin office connects clients and candidates across the European Union.",
    query: "Friedrichstrasse 68, 10117 Berlin, Germany",
  },
  india: {
    name: "South Asia Hub",
    address: "91 Springboard, Sector 44, Gurugram, Haryana 122003, India",
    phone: "+91 124 456 7890",
    email: "southasia@e2ehrc.co.uk",
    hours: "Mon to Sat: 9AM to 6PM",
    about: "Our Gurugram office drives our South Asia operations, offering end-to-end recruitment services.",
    query: "91 Springboard, Sector 44, Gurugram, Haryana 122003, India",
  },
};

const markers = [
  { id: "uk", label: "UK Head Office", left: "45.01%", top: "30.06%", color: "#00458D", shadow: "rgba(0,69,141,0.2)", focus: "#F39308", primary: true },
  { id: "gcc", label: "GCC Hub", left: "57.99%", top: "45.01%", color: "#FFB952", shadow: "rgba(255,185,82,0.2)", focus: "#004CA5" },
  { id: "europe", label: "Europe Hub", left: "50%", top: "35.05%", color: "#FFB952", shadow: "rgba(255,185,82,0.2)", focus: "#004CA5" },
  { id: "india", label: "South Asia Hub", left: "64.97%", top: "50%", color: "#FFB952", shadow: "rgba(255,185,82,0.2)", focus: "#004CA5" },
];

/* ── SVG icons ── */
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004CA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004CA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004CA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004CA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const CompassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── info card ── */
function OfficeCard({ data, visible, pos, onEnter, onLeave, onClose }) {
  if (!visible || !data) return null;
  return (
    <div
      role="tooltip"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        zIndex: 100,
        width: 340,
        maxWidth: "90vw",
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: "0 16px 40px rgba(0,0,0,.16)",
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity .2s ease, transform .2s ease",
        pointerEvents: "auto",
      }}
    >
      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute", top: 12, right: 12,
          width: 32, height: 32, borderRadius: "50%",
          background: "#fff", border: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,.08)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
        }}
      >
        <CloseIcon />
      </button>

      {/* office name */}
      <h3 style={{ margin: 0, marginBottom: 16, fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 20, color: "#004CA5" }}>
        {data.name}
      </h3>

      {/* info rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <InfoRow icon={<MapPinIcon />}>{data.address}</InfoRow>
        <InfoRow icon={<PhoneIcon />}>{data.phone}</InfoRow>
        <InfoRow icon={<MailIcon />}>{data.email}</InfoRow>
        <InfoRow icon={<ClockIcon />}>{data.hours}</InfoRow>
      </div>

      {/* about */}
      <p style={{ margin: "16px 0 0", fontSize: 13, lineHeight: "20px", color: "#424752", fontFamily: "'Inter',sans-serif" }}>
        {data.about}
      </p>

      {/* directions button */}
      <button
        onClick={() => {
          const q = encodeURIComponent(data.query);
          window.open(`https://maps.google.com/?q=${q}`, "_blank", "noopener,noreferrer");
        }}
        style={{
          width: "100%", marginTop: 16, padding: "12px 16px", borderRadius: 999,
          background: "#004CA5", color: "#fff", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
          transition: "background .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#003b82"}
        onMouseLeave={e => e.currentTarget.style.background = "#004CA5"}
      >
        <CompassIcon /> Get Directions
      </button>
    </div>
  );
}

function InfoRow({ icon, children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <span style={{ fontSize: 13, lineHeight: "18px", color: "#1B1C1C", fontFamily: "'Inter',sans-serif" }}>{children}</span>
    </div>
  );
}

/* ── main component ── */
export default function GlobalFootprint() {
  const [active, setActive] = useState(null);
  const timerRef = useRef({});

  const enter = useCallback((id) => {
    if (timerRef.current[id]) clearTimeout(timerRef.current[id]);
    setActive(id);
  }, []);

  const leave = useCallback((id) => {
    timerRef.current[id] = setTimeout(() => setActive(null), 250);
  }, []);

  const hide = useCallback(() => setActive(null), []);

  useEffect(() => () => Object.values(timerRef.current).forEach(clearTimeout), []);

  return (
    <section
      style={{
        width: "1440px", maxWidth: "100%", margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "48px 0 47px", gap: "44px",
        background: "#FFFFFF", fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 32px", gap: "16px", maxWidth: 768 }}>
        <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: 36, lineHeight: "56px", letterSpacing: "-0.48px", color: "#191C1E", textAlign: "center" }}>
          Our Global Footprint
        </h2>
        <p style={{ margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18, lineHeight: "28px", color: "#424752", textAlign: "center", maxWidth: 672 }}>
          Connecting talent across borders with localized expertise and global reach.
        </p>
      </div>

      {/* map */}
      <div style={{ position: "relative", width: "100%", maxWidth: 1196, minHeight: 385, borderRadius: 24, border: "1px solid rgba(194,198,212,0.2)", background: "#F2F4F6", overflow: "visible" }}>
        {/* background image */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden", pointerEvents: "none" }}>
          <img src={mapImg} alt="Global Map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        </div>

        {/* markers */}
        {markers.map((m) => {
          const isActive = active === m.id;
          return (
            <div key={m.id} style={{ position: "absolute", left: m.left, top: m.top, zIndex: isActive ? 50 : 10 }}>
              <button
                tabIndex={0}
                aria-label={m.label}
                onMouseEnter={() => enter(m.id)}
                onMouseLeave={() => leave(m.id)}
                onFocus={() => enter(m.id)}
                onBlur={() => hide()}
                style={{
                  position: "relative",
                  width: m.primary ? 18 : 14,
                  height: m.primary ? 18 : 14,
                  borderRadius: "50%",
                  background: m.color,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  boxShadow: `0 0 0 4px ${m.shadow}`,
                  transition: "transform .2s ease, box-shadow .2s ease",
                  outlineColor: m.focus,
                  outlineWidth: 2,
                  outlineOffset: 3,
                  outlineStyle: isActive ? "auto" : "none",
                }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.25)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                onFocusCapture={e => e.currentTarget.style.transform = "scale(1.25)"}
                onBlurCapture={e => e.currentTarget.style.transform = "scale(1)"}
              >
                {m.primary && (
                  <div style={{ position: "absolute", inset: -5, borderRadius: "50%", border: `2px solid ${m.color}`, opacity: .3 }} />
                )}
              </button>

              {/* label — hidden when ANY marker is active */}
              <div style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 6,
                whiteSpace: "nowrap",
                padding: "3px 10px",
                background: "#fff",
                borderRadius: 6,
                boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                fontFamily: "Inter, sans-serif",
                fontWeight: m.primary ? 600 : 500,
                fontSize: 11,
                color: m.primary ? "#1F2937" : "#00458D",
                transition: "opacity .2s",
                opacity: active ? 0 : 1,
                pointerEvents: "none",
              }}>
                {m.label}
              </div>

              {/* info card */}
              <OfficeCard
                data={officeData[m.id]}
                visible={isActive}
                pos={{ right: "calc(100% + 14px)", top: -20 }}
                onEnter={() => enter(m.id)}
                onLeave={() => leave(m.id)}
                onClose={hide}
              />
            </div>
          );
        })}
      </div>

      <style>{`
        @media(max-width:768px){
          section > div:last-of-type{padding:0 16px}
        }
      `}</style>
    </section>
  );
}
