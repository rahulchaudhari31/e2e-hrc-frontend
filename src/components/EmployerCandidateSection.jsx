import icon1 from '../assets/images/Career Growth imgs/icon 1.png';
import icon2 from '../assets/images/Career Growth imgs/icon 2.png';

const cardsData = [
  {
    id: "employer",
    badge: { icon: icon1, label: "For Employers" },
    heading: {
      line1: "Find Your",
      line2: { accent: "Next Star", rest: "Hire" },
      baseColor: "#FFFFFF",
      accentColor: "#FFFFFF",
    },
    description:
      "Tailored recruitment and workforce solutions designed to help you build high-performing teams across every sector.",
    descriptionColor: "#FFFFFF",
    buttonText: "Explore Solutions",
    bg: "#C9DB82",
    left: 55,
    contentLeft: 84,
    buttonLeft: 541,
  },
  {
    id: "employee",
    badge: { icon: icon2, label: "For Employee" },
    heading: {
      line1: "Discover Your",
      line2: { accent: "Dream", rest: "Career" },
      baseColor: "#004CA5",
      accentColor: "#004CA5",
    },
    description:
      "Explore opportunities that match your skills, experience and ambitions. We connect you with employers who value your potential.",
    descriptionColor: "#004CA5",
    buttonText: "Explore",
    bg: "#FFFFFF",
    left: 735,
    contentLeft: 764,
    buttonLeft: 1221,
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path
      d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875"
      stroke="#FFFFFF"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BadgeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M4.66667 11.6667H2.33333C1.96514 11.6667 1.61099 11.5202 1.34532 11.2545C1.07965 10.9888 0.933334 10.6347 0.933334 10.2667V2.33333C0.933334 1.96514 1.07965 1.61099 1.34532 1.34532C1.61099 1.07965 1.96514 0.933334 2.33333 0.933334H4.66667"
      stroke="#004CA5"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33333 1.4H11.6667C12.0349 1.4 12.389 1.54631 12.6547 1.81199C12.9204 2.07767 13.0667 2.43181 13.0667 2.8V10.7333C13.0667 11.1015 12.9204 11.4557 12.6547 11.7213C12.389 11.987 12.0349 12.1333 11.6667 12.1333H9.33333"
      stroke="#004CA5"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EmployerCandidateSection() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px 32px 29px 55px",
        width: "100%",
        maxWidth: 1440,
        height: 398,
        margin: "0 auto",
        boxSizing: "border-box",
        background: "#FFFFFF",
      }}
    >
      <div style={{ position: "relative", width: 1330, height: 334 }}>
        {cardsData.map((card) => (
          <div key={card.id}>
            {/* Card background */}
            <div
              style={{
                position: "absolute",
                width: 650,
                height: 334,
                left: card.left,
                top: 0,
                background: card.bg,
                boxSizing: "border-box",
                ...(card.id === "employee"
                  ? { border: "1px solid #FFFFFF" }
                  : {}),
              }}
            />

            {/* Badge */}
            <div
              style={{
                position: "absolute",
                left: card.contentLeft,
                top: 47.74,
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                gap: 8,
                width: 130.44,
                height: 29.59,
                background: "#FFFFFF",
                border: "0.8px solid #F39308",
                borderRadius: 9999,
                boxSizing: "border-box",
              }}
            >
              <BadgeIcon />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: "#004CA5",
                  whiteSpace: "nowrap",
                }}
              >
                {card.badge.label}
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                position: "absolute",
                left: card.contentLeft,
                top: 86,
                width: card.id === "employer" ? 252 : 261,
                height: card.id === "employer" ? 99.79 : 90,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: 36,
                lineHeight: "45px",
                color: card.heading.baseColor,
                margin: 0,
              }}
            >
              {card.heading.line1}
              <br />
              <span style={{ color: card.heading.accentColor }}>
                {card.heading.line2.accent}
              </span>{" "}
              <span style={{ color: card.heading.baseColor }}>
                {card.heading.line2.rest}
              </span>
            </h2>

            {/* Description */}
            <p
              style={{
                position: "absolute",
                left: card.contentLeft,
                top: 195.77,
                width: 519,
                height: 57.66,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "26px",
                color: card.descriptionColor,
                margin: 0,
              }}
            >
              {card.description}
            </p>

            {/* Explore button */}
            <a
              href="#"
              style={{
                position: "absolute",
                left: card.buttonLeft,
                top: "calc(50% - 44px/2 + 90px)",
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                gap: 8,
                width: 123,
                height: 44,
                background: "#F39308",
                borderRadius: 9999,
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "20px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                }}
              >
                {card.buttonText}
              </span>
              <ArrowIcon />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
