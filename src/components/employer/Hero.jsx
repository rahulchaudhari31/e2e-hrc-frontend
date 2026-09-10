import { useEffect, useState } from "react";
import { getEmployerHeroData } from "../../services/employer/employerHeroService";

function HeroSkeleton() {
  return (
    <section style={{ background: "#000", minHeight: "491px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "87px 59px" }}>
        <div style={{ height: "36px", background: "rgba(255,255,255,0.1)", borderRadius: "9999px", width: "106px", marginBottom: "16px" }} />
        <div style={{ height: "60px", background: "rgba(255,255,255,0.1)", borderRadius: "8px", width: "75%", marginBottom: "16px" }} />
        <div style={{ height: "23px", background: "rgba(255,255,255,0.1)", width: "60%" }} />
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <section style={{ background: "#000", minHeight: "491px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Employer hero content is currently unavailable.</p>
    </section>
  );
}

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await getEmployerHeroData();
        if (res && res.data) {
          setHeroData(res.data);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadHero();
  }, []);

  if (isLoading) return <HeroSkeleton />;
  if (hasError) return <HeroFallback />;
  if (!heroData) return <HeroFallback />;

  const backgroundImage = heroData.image || null;

  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        maxWidth: "100%",
        height: "491px",
        background: backgroundImage
          ? `linear-gradient(0deg, rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${backgroundImage}) center/cover no-repeat`
          : "linear-gradient(0deg, rgba(0,0,0,0.58), rgba(0,0,0,0.58)) #000",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Content container */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          maxWidth: "500px",
          height: "254.8px",
          left: "73px",
          top: "236px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Heading 1 container */}
        <div style={{ position: "relative", width: "824px", height: "254.8px" }}>
          {/* "Employer Recruitment" - orange */}
          <div
            style={{
              position: "absolute",
              width: "824px",
              height: "47px",
              left: "0px",
              top: "-15px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "60px",
              lineHeight: "46.8px",
              letterSpacing: "0px",
              color: "#F39308",
            }}
          >
            Employer Recruitment
          </div>

          {/* Orange line - right below Employer Recruitment */}
          <div
            style={{
              position: "absolute",
              width: "289.64px",
              height: "5px",
              left: "0px",
              top: "52px",
              background: "#F39308",
              borderRadius: "5px",
            }}
          />

          {/* "Helping businesses hire the right talent." - white */}
          <div
            style={{
              position: "absolute",
              width: "627px",
              height: "159px",
              left: "1px",
              top: "68px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "60px",
              lineHeight: "76.8px",
              letterSpacing: "0px",
              color: "#FFFFFF",
            }}
          >
            Helping businesses hire the right talent.
          </div>
        </div>
      </div>
    </section>
  );
}
