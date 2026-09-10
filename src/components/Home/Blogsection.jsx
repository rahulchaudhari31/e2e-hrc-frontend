import { User, Clock, Calendar, ArrowRight } from "lucide-react";

const defaultPosts = {
  featured: {
    image: new URL("../../assets/images/Career Growth imgs/uk1.jpg", import.meta.url).href,
    badge: "Hiring Trends",
    title: "Hiring Trends in the UK: What Employers Need to Know in 2025",
    description:
      "From AI-driven screening to flexible working demands, the UK recruitment landscape is shifting rapidly.",
    author: "Sarah Mitchell",
    readTime: "5 min read",
    date: "28 May 2025",
    link: "#",
  },
  cards: [
    {
      image: new URL("../../assets/images/Career Growth imgs/strategy ..jpg", import.meta.url).href,
      badge: "Strategy",
      badgeBg: "#FFF4E0",
      badgeColor: "#C17800",
      title: "Talent Acquisition Strategies That Actually Work",
      readTime: "4 min read",
      date: "20 May 2025",
      link: "#",
    },
    {
      image: new URL("../../assets/images/Career Growth imgs/planning.jpg", import.meta.url).href,
      badge: "Workforce Planning",
      badgeBg: "#F0F7E0",
      badgeColor: "#5A7A00",
      title: "Future Workforce Planning: Building Teams for Tomorrow",
      readTime: "6 min read",
      date: "12 May 2025",
      link: "#",
    },
    {
      image: new URL("../../assets/images/Career Growth imgs/leadership ..jpg", import.meta.url).href,
      badge: "Leadership",
      badgeBg: "#004CA5",
      badgeColor: "#C8D96F",
      title: "Building High Performing Teams From Day One",
      readTime: "5 min read",
      date: "5 May 2025",
      link: "#",
    },
  ],
};

function FeaturedCard({ card }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "532px",
        height: "480px",
        minWidth: "532px",
        borderRadius: "20px",
        padding: "36px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 15, 40, 0.93) 35%, rgba(0, 15, 40, 0.3) 80%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div className="relative z-10" style={{ width: "460px" }}>
        {/* Badge */}
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "16px",
            backgroundColor: "#004CA5",
            color: "#FFFFFF",
            padding: "4px 12px",
            borderRadius: "9999px",
            display: "inline-block",
            width: "fit-content",
            marginBottom: "16px",
          }}
        >
          {card.badge}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "33px",
            color: "#FFFFFF",
            margin: 0,
            marginBottom: "12px",
            width: "460px",
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "23px",
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            marginBottom: "24px",
            width: "460px",
          }}
        >
          {card.description}
        </p>

        {/* Author + Date row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "460px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 400, lineHeight: "16px" }}>
              <User size={12} />
              {card.author}
            </span>
            <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 400, lineHeight: "16px" }}>
              <Clock size={12} />
              {card.readTime}
            </span>
          </div>
          <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 400, lineHeight: "16px" }}>
            <Calendar size={12} />
            {card.date}
          </span>
        </div>

        {/* Read More */}
        <a
          href={card.link}
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#C8D96F",
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Read More
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

function SmallCard({ card }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "20px",
        width: "532px",
        minHeight: "130px",
        backgroundColor: "#F8FAFC",
        borderRadius: "16px",
        flexShrink: 0,
      }}
    >
      {/* Image */}
      <div style={{ width: "144px", height: "130px", flexShrink: 0, borderRadius: "16px 0 0 16px", overflow: "hidden" }}>
        <img
          src={card.image}
          alt={card.title}
          style={{ width: "144px", height: "130px", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px 20px 20px 0",
          gap: "8px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Badge */}
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "16px",
            backgroundColor: card.badgeBg,
            color: card.badgeColor,
            padding: "4px 10px",
            borderRadius: "9999px",
            width: "fit-content",
          }}
        >
          {card.badge}
        </span>

        {/* Title */}
        <h4
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "19px",
            color: "#004CA5",
            margin: 0,
          }}
        >
          {card.title}
        </h4>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px", color: "#64748B", fontSize: "12px", fontFamily: "Inter, sans-serif", fontWeight: 400, lineHeight: "16px" }}>
          <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "4px" }}>
            <Clock size={11} />
            {card.readTime}
          </span>
          <span>·</span>
          <span style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "4px" }}>
            <Calendar size={11} />
            {card.date}
          </span>
        </div>
      </div>
    </div>
  );
}

function BlogSection({ posts = defaultPosts }) {
  const { featured, cards } = posts;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "13px 0 37px",
        width: "100%",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0 32px 0 124px",
          width: "100%",
          maxWidth: "1440px",
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            height: "84px",
          }}
        >
          {/* Left - Badge + Heading */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "16px",
                backgroundColor: "#E8EDF5",
                color: "#004CA5",
                padding: "6px 12px",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                width: "108.72px",
                justifyContent: "center",
              }}
            >
              Latest Blog
            </span>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "36px",
                lineHeight: "40px",
                color: "#004CA5",
                margin: 0,
                marginTop: "0",
                width: "793px",
              }}
            >
              Career Growth Strategies for Professionals
            </h2>
          </div>

          {/* Right - View All Button */}
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "12px 24px",
              gap: "8px",
              border: "1.6px solid #004CA5",
              borderRadius: "9999px",
              backgroundColor: "transparent",
              cursor: "pointer",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#004CA5",
              }}
            >
              View All Articles
            </span>
            <ArrowRight size={15} color="#004CA5" />
          </button>
        </div>

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "48px 0 0 0",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "480px", position: "relative" }}>
            {/* Featured Card */}
            <FeaturedCard card={featured} />

            {/* Small Cards Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "41px",
                position: "absolute",
                left: "556px",
                top: 0,
                width: "532px",
                height: "480px",
              }}
            >
              {cards.map((card, i) => (
                <SmallCard key={i} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
