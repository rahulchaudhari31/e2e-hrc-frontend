import { useState, useEffect, useRef } from "react";
import heroImgPlaceholder from "../../assets/images/hero.png";
import { getHeroData } from "../../services/heroService";

function useCountUp(target, duration, delay = 0) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    let cancelled = false;
    const timer = setTimeout(() => {
      const animate = (timestamp) => {
        if (cancelled) return;
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDone(true);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return { count, done };
}

function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      <div className="animate-pulse mx-auto" style={{ maxWidth: "1440px", padding: "2px 53.5px 79px", height: "638px" }}>
        <div className="h-6 bg-gray-200 rounded-full w-72 mt-16" />
        <div className="space-y-3 mt-6">
          <div className="h-14 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-14 bg-gray-200 rounded-lg w-2/3" />
        </div>
        <div className="space-y-2 mt-6">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-2/5" />
        </div>
        <div className="flex gap-4 pt-2 mt-6">
          <div className="h-13 bg-gray-200 rounded-full w-48" />
          <div className="h-13 bg-gray-200 rounded-full w-48" />
        </div>
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <section className="min-h-[320px] flex items-center justify-center" style={{ background: "#FFFFFF" }}>
      <div className="text-center py-20 px-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">Hero content is currently unavailable. Please try again later.</p>
      </div>
    </section>
  );
}

const DEFAULT_STATS = [
  { label: "CLIENTS", value: "100+" },
  { label: "CANDIDATES", value: "100+" },
  { label: "YEARS OF EXPERIENCE", value: "25+" },
  { label: "OFFICES", value: "4" },
];

const parseStatValue = (raw) => {
  const str = String(raw ?? "").trim();
  const match = str.match(/^([\d]+(?:\.[\d]+)?)(.*)$/);
  if (!match) return { num: 0, suffix: str || "+" };
  const num = parseFloat(match[1]);
  return { num: Number.isFinite(num) ? num : 0, suffix: match[2] };
};

const buildTitle = (title, highlight) => {
  const t = title?.trim() || "Connecting Talent. Building Futures.";
  const h = highlight?.trim();
  if (!h) {
    return { firstLine: t, secondLine: null };
  }

  const idx = t.indexOf(h);
  if (idx === -1) {
    return { firstLine: t, secondLine: null };
  }

  const before = t.slice(0, idx);
  const mid = t.slice(idx, idx + h.length);
  const rest = t.slice(idx + h.length);

  let boundary = -1;
  for (const sep of [". ", "; ", ": ", "/ "]) {
    const i = before.lastIndexOf(sep);
    if (i > boundary) boundary = i;
  }
  if (boundary === -1) boundary = before.lastIndexOf(" ");

  if (boundary >= 0) {
    return {
      firstLine: before.slice(0, boundary + 1),
      secondLine: { pre: before.slice(boundary + 1), mid, rest },
    };
  }

  return { firstLine: before, secondLine: { pre: "", mid, rest } };
};

function AnimatedStat({ target, suffix = "+", label, containerWidth, duration = 1500, delay = 0 }) {
  const { count, done } = useCountUp(target, duration, delay);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: "0px 0px 24px", width: containerWidth, height: "72px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
    }}>
      <span style={{
        fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "28px", lineHeight: "32px",
        color: "#004CA5", display: "flex", alignItems: "center", height: "32px",
        marginLeft: "-64px",
        transform: done ? "scale(1.12)" : "scale(1)",
        transition: "transform 0.3s ease-out",
      }}>
        {count}{suffix}
      </span>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px", width: containerWidth, height: "16px" }}>
        <span style={{
          fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "16px",
          display: "flex", alignItems: "center", letterSpacing: "0.5px",
          textTransform: "uppercase", color: "#43474F",
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await getHeroData();
        if (res && res.data) {
          console.log(res.data)
          setHeroData(res.data);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (isLoading) return <HeroSkeleton />;
  if (hasError) return <HeroFallback />;
  if (!heroData || heroData.isActive === false) return null;

  const imageSrc = heroData.heroImage || heroImgPlaceholder;

  const badgeText = heroData.subtitle || "Connecting Talent. Building Futures.";
  const { firstLine, secondLine } = buildTitle(heroData.title, heroData.highlightedText);
  const description =
    heroData.description ||
    "Helping UK employers find exceptional talent and helping candidates discover opportunities to grow and thrive in their careers.";
  const buttonText = heroData.buttonText || "Hire Talent";

  const rawStats = Array.isArray(heroData.stats) && heroData.stats.length > 0
    ? heroData.stats
    : DEFAULT_STATS;
  const displayStats = rawStats.map((stat) => ({
    ...stat,
    parsed: parseStatValue(stat.value),
  }));

  return (
    <section className="relative" style={{ width: "100%", maxWidth: "1440px", height: "638px", margin: "0 auto", padding: "2px 53.5px 79px", boxSizing: "border-box", zIndex: 2 }}>

      <div style={{ position: "relative", width: "100%", maxWidth: "1333px", height: "636px" }}>

        {/* ── Right column: Image Content ── */}
        <div style={{ position: "absolute", height: "572px", left: "685px", right: "16px", top: "64px" }}>
          {/* Decorative Background */}
          <div style={{ position: "absolute", width: "519px", height: "519px", left: "calc(50% - 519px/2 - 18px)", top: "calc(50% - 519px/2 - 54.5px)", background: "#C2D760", opacity: 0.33, borderRadius: "9999px" }} />
          <div style={{ position: "absolute", width: "419px", height: "419px", left: "calc(50% - 419px/2)", top: "calc(50% - 419px/2 - 40.5px)", boxSizing: "border-box", border: "1px dashed #C2D760", borderRadius: "9999px" }} />

          <div style={{ position: "absolute", width: "697px", left: "calc(50% - 697px/2 - 40px)", top: "0", bottom: "14.16%" }}>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-2xl" />
            )}
            <img
              src={imageSrc}
              alt={heroData.title || "Hero Image"}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { e.target.src = heroImgPlaceholder; setImgLoaded(true); }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.5s" }}
            />
          </div>
        </div>

        {/* ── Left column: Text Content ── */}
        <div style={{ position: "absolute", height: "572px", left: "5px", right: "696px", top: "64px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px 0px 41px", gap: "24px" }}>

          {/* Badge */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "4px 12px", gap: "6px", width: "291.94px", height: "24px", background: "#C9DB82", borderRadius: "9999px", flex: "none", order: 0 }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "9999px", background: "#166534", flex: "none", order: 0 }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 600, fontSize: "12px", lineHeight: "16px", color: "#166534", flex: "none", order: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {badgeText}
            </span>
          </div>

          {/* Heading */}
          <div style={{ width: "632px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px", flex: "none", order: 1 }}>
            <h1 style={{ margin: 0, fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 800, fontSize: "60px", lineHeight: "60px", letterSpacing: "-1px", color: "#004CA5", width: "632px", height: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", flex: "none", order: 0, alignSelf: "stretch", flexGrow: 0 }}>
              <span>{firstLine}</span>
              {secondLine && (
                <span>
                  {secondLine.pre}
                  {secondLine.mid && <span style={{ color: "#F39308" }}>{secondLine.mid}</span>}
                  {secondLine.rest}
                </span>
              )}
            </h1>
          </div>

          {/* Description */}
          <div style={{ width: "632px", height: "88px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0px", flex: "none", order: 2 }}>
            <p style={{ margin: 0, fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 400, fontSize: "18px", lineHeight: "29px", color: "#000000", maxWidth: "514px" }}>
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "8px 0px", gap: "16px", width: "632px", flex: "none", order: 3 }}>
            <a
              href={heroData.buttonLink || "#"}
              style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                padding: "12px 32px 12px 28px", gap: "8px",
                minWidth: "200px",
                background: "#F39308", borderRadius: "9999px",
                fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 600,
                fontSize: "16px", lineHeight: "24px", color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              {buttonText}
              <span style={{ marginLeft: "4px" }}>→</span>
            </a>
            <button
              style={{
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                padding: "12px 32px",
                width: "200px", height: "52px",
                background: "transparent", border: "2px solid #004CA5", borderRadius: "9999px",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0px",
                textAlign: "center",
                color: "#004CA5",
                width: "145px",
                height: "24px",
                whiteSpace: "nowrap",
              }}>
                Find Opportunities
              </span>
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0px 3px 8px", gap: "10px", width: "632px", borderTop: "1px solid #F3F4F6", flex: "none", order: 4, boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", padding: "0px", gap: "24px", minHeight: "70px" }}>
              {displayStats.map((stat, index) => (
                <AnimatedStat
                  key={`${stat.label}-${index}`}
                  target={stat.parsed.num}
                  suffix={stat.parsed.suffix}
                  label={String(stat.label || "").toUpperCase()}
                  containerWidth={Math.min(Math.max(96, String(stat.label || "").length * 7 + 42), 140)}
                  duration={800}
                  delay={100 + index * 150}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;