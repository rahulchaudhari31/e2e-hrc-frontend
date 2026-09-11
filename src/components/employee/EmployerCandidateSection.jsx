import { useEffect, useState } from "react";
import icon1 from '../../assets/images/Career Growth imgs/icon 1.png';
import icon2 from '../../assets/images/Career Growth imgs/icon 2.png';
import { getEmployeeCandidateCTA } from "../../services/employee/employeeCandidateCTAService";

const defaultEmployer = {
  badgeLabel: "For Employers",
  badgeIcon: icon1,
  headingLine1: "Find Your",
  headingAccent: "Next Star",
  headingRest: "Hire",
  baseColor: "#FFFFFF",
  accentColor: "#F39308",
  description:
    "Tailored recruitment and workforce solutions designed to help you build high-performing teams across every sector.",
  descriptionColor: "#FFFFFF",
  bg: "#C9DB82",
  buttonText: "Explore",
  buttonLink: "#",
};

const defaultEmployee = {
  badgeLabel: "For Employee",
  badgeIcon: icon2,
  headingLine1: "Discover Your",
  headingAccent: "Dream",
  headingRest: "Career",
  baseColor: "#004CA5",
  accentColor: "#F39308",
  description:
    "Explore opportunities that match your skills, experience and ambitions. We connect you with employers who value your potential.",
  descriptionColor: "#004CA5",
  bg: "#FFFFFF",
  buttonText: "Explore",
  buttonLink: "#",
};

const layout = [
  { id: "employer", left: 55, contentLeft: 84, buttonLeft: 541 },
  { id: "employee", left: 735, contentLeft: 764, buttonLeft: 1221 },
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

export default function EmployerCandidateSection() {
  const [employerCard, setEmployerCard] = useState(defaultEmployer);
  const [employeeCard, setEmployeeCard] = useState(defaultEmployee);

  useEffect(() => {
    let isMounted = true;
    getEmployeeCandidateCTA().then((data) => {
      if (!isMounted || !data) return;
      if (data.employerCard) {
        setEmployerCard({
          badgeLabel: data.employerCard.badgeLabel || defaultEmployer.badgeLabel,
          badgeIcon: data.employerCard.badgeIcon || icon1,
          headingLine1: data.employerCard.headingLine1 || '',
          headingAccent: data.employerCard.headingAccent || '',
          headingRest: data.employerCard.headingRest || '',
          baseColor: data.employerCard.baseColor || "#FFFFFF",
          accentColor: data.employerCard.accentColor || "#F39308",
          description: data.employerCard.description || '',
          descriptionColor: data.employerCard.descriptionColor || "#FFFFFF",
          bg: data.employerCard.bg || "#C9DB82",
          buttonText: data.employerCard.buttonText || 'Explore',
          buttonLink: data.employerCard.buttonLink || '#',
        });
      }
      if (data.employeeCard) {
        setEmployeeCard({
          badgeLabel: data.employeeCard.badgeLabel || defaultEmployee.badgeLabel,
          badgeIcon: data.employeeCard.badgeIcon || icon2,
          headingLine1: data.employeeCard.headingLine1 || '',
          headingAccent: data.employeeCard.headingAccent || '',
          headingRest: data.employeeCard.headingRest || '',
          baseColor: data.employeeCard.baseColor || "#004CA5",
          accentColor: data.employeeCard.accentColor || "#F39308",
          description: data.employeeCard.description || '',
          descriptionColor: data.employeeCard.descriptionColor || "#004CA5",
          bg: data.employeeCard.bg || "#FFFFFF",
          buttonText: data.employeeCard.buttonText || 'Explore',
          buttonLink: data.employeeCard.buttonLink || '#',
        });
      }
    });
    return () => { isMounted = false; };
  }, []);

  const cards = [
    { id: "employer", ...defaultEmployer, ...employerCard },
    { id: "employee", ...defaultEmployee, ...employeeCard },
  ];

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
        {cards.map((card) => {
          const pos = layout.find((l) => l.id === card.id);
          if (!pos) return null;
          const isEmployee = card.id === "employee";
          return (
            <div key={card.id}>
              <div
                style={{
                  position: "absolute",
                  width: 650,
                  height: 334,
                  left: pos.left,
                  top: 0,
                  background: card.bg,
                  ...(isEmployee
                    ? { border: "1px solid #FFFFFF", boxSizing: "border-box" }
                    : {}),
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: pos.contentLeft,
                  top: 47.74,
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 12px",
                  gap: 8,
                  background: "#FFFFFF",
                  border: "0.8px solid #F39308",
                  borderRadius: 9999,
                  boxSizing: "border-box",
                }}
              >
                {card.badgeIcon && (
                  <img
                    src={card.badgeIcon}
                    alt=""
                    style={{ width: 14, height: 14, display: "block" }}
                  />
                )}
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
                  {card.badgeLabel}
                </span>
              </div>

              <h2
                style={{
                  position: "absolute",
                  left: pos.contentLeft,
                  top: 86,
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: "45px",
                  color: card.baseColor,
                  margin: 0,
                }}
              >
                {card.headingLine1}
                <br />
                <span style={{ color: card.accentColor }}>
                  {card.headingAccent}
                </span>{" "}
                <span style={{ color: card.baseColor }}>
                  {card.headingRest}
                </span>
              </h2>

              <p
                style={{
                  position: "absolute",
                  left: pos.contentLeft,
                  top: 195.77,
                  width: 519,
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

              <a
                href={card.buttonLink}
                style={{
                  position: "absolute",
                  left: pos.buttonLeft,
                  top: 267,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "12px 24px",
                  gap: 8,
                  background: "#F39308",
                  borderRadius: 9999,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  {card.buttonText}
                </span>
                <ArrowIcon />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}