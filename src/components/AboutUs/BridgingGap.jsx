import React, { useEffect, useState } from "react";
import { getAboutInfo } from "../../services/aboutServices";

const BridgingGap = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAboutInfo();
        setSectionData(response?.data || null);
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section style={{ width: "100%", maxWidth: "1440px", margin: "0 auto", padding: "60px 113.5px", background: "#FFFFFF", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
          <div style={{ width: "200px", height: "20px", background: "#E2E8F0", borderRadius: "4px" }} />
          <div style={{ width: "100%", height: "40px", background: "#E2E8F0", borderRadius: "4px" }} />
          <div style={{ width: "100%", height: "80px", background: "#E2E8F0", borderRadius: "4px" }} />
        </div>
      </section>
    );
  }

  const heading = sectionData?.heading || "Bridging the Gap Between Ambition and Achievement";
  const description = sectionData?.description || "Since our inception, E2E HRC has been more than just a matching service. We are strategic growth partners. We specialize in deep-market intelligence, identifying the unique DNA of organizations and the professionals who can lead them into the next decade.";
  const features = [
    sectionData?.feature1 || "Personalized consultancy that prioritizes culture and fit.",
    sectionData?.feature2 || "Unrivaled access to passive talent pools globally.",
    sectionData?.feature3 || "Data-driven screening processes for precision matching.",
  ].filter((f) => f && f.toString().trim() !== "");

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "60px 113.5px",
        background: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "60px",
          width: "100%",
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        {/* Left side - Image */}
        <div
          style={{
            width: "500px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "500px",
              height: "420px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(194,198,212,0.2)",
            }}
          >
            <img
              src={sectionData?.image || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"}
              alt="Bridging the Gap"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            minWidth: 0,
          }}
        >
          {/* Heading */}
          <h2
            style={{
              margin: 0,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "36px",
              lineHeight: "48px",
              letterSpacing: "-0.48px",
              color: "#191C1E",
            }}
          >
            {heading}
          </h2>

          {/* Blue underline */}
          <div style={{ width: "64px", height: "4px", background: "#00458D" }} />

          {/* Description */}
          <p
            style={{
              margin: 0,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "28px",
              color: "#424752",
              marginTop: "8px",
            }}
          >
            {description}
          </p>

          {/* Feature bullets */}
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {features.map((feature, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#424752",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "8px",
                    height: "8px",
                    marginTop: "10px",
                    background: "#00458D",
                    borderRadius: "2px",
                  }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BridgingGap;
