import { useEffect, useState } from "react";
import { getMissionVision } from "../../services/aboutus/missionVisionService";
import flagImg from "../../assets/images/Career Growth imgs/flag.png";
import missionImg from "../../assets/images/Career Growth imgs/mission.png";
import eyeImg from "../../assets/images/Career Growth imgs/eye.jpg";

const MissionVision = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await getMissionVision();
        const activeItems = (response?.data || [])
          .filter((item) => item.isActive !== false)
          .sort((a, b) => Number(a.displayOrder ?? a.order ?? 0) - Number(b.displayOrder ?? b.order ?? 0));
        setItems(activeItems);
      } catch {
        // fallback defaults used below
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const mission = items.find((i) => i.type === "mission") || {
    title: "Our Mission",
    description: "To empower businesses globally by connecting them with exceptional talent, fostering environments where both organizations and individuals can thrive and achieve their maximum potential through strategic workforce alignment.",
  };

  const vision = items.find((i) => i.type === "vision") || {
    title: "Our Vision",
    description: "To be the undisputed global leader in specialized recruitment consultancy, recognized universally for our uncompromising integrity, innovative methodologies, and unparalleled success in building the workforce of tomorrow.",
  };

  const renderIcon = (imgSrc, imgW, imgH, isVision) => (
    <div style={{ position: "relative", width: "80px", height: "96px", paddingBottom: "16px", isolation: "isolate" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, bottom: "16px",
        background: "rgba(255, 185, 82, 0.3)", filter: "blur(12px)",
        borderRadius: "9999px", zIndex: 0,
      }} />
      <div style={{
        position: "relative", width: "80px", height: "80px",
        display: "flex", justifyContent: "center", alignItems: "center",
        background: isVision ? "#f2f2f2" : "rgba(255, 255, 255, 0.1)",
        border: isVision ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: isVision ? "none" : "blur(6px)",
        borderRadius: isVision ? "14px" : "24px",
        zIndex: 1, boxSizing: "border-box", overflow: "hidden",
      }}>
        {isVision ? (
          <img src={imgSrc} alt="" style={{ width: `${imgW}px`, height: `${imgH}px`, objectFit: "cover" }} />
        ) : (
          <div style={{
            width: "64px", height: "64px", background: "#005CB9",
            borderRadius: "12px", display: "flex",
            justifyContent: "center", alignItems: "center",
          }}>
            <img src={imgSrc} alt="" style={{ width: `${imgW}px`, height: `${imgH}px`, objectFit: "contain" }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section style={{
      width: "1440px", maxWidth: "100%",
      padding: "59px 113.5px 67px",
      background: "#FFFFFF",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
    }}>
      <div style={{ width: "1213px", maxWidth: "100%", height: "438.25px", position: "relative" }}>

        {/* Mission Card */}
        <div style={{
          position: "absolute", height: "438.25px",
          left: "0px", right: "622.5px", top: "0px",
          background: "#FFFFFF",
          border: "1px solid rgba(194, 198, 212, 0.3)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.02)",
          borderRadius: "24px", padding: "48px",
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "16px",
          boxSizing: "border-box", isolation: "isolate",
        }}>
          {/* Decorative corner icon — mission.png at 100x100, 5% opacity */}
          <div style={{
            position: "absolute", width: "164px", height: "164px",
            right: "0.5px", top: "1px", opacity: 0.05, padding: "32px",
            boxSizing: "border-box", zIndex: 1,
          }}>
            <img
              src={missionImg}
              alt=""
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          </div>

          {/* Content Container */}
          <div style={{
            position: "relative", width: "100%", height: "343px",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", gap: "16px", zIndex: 0,
          }}>
            {renderIcon(flagImg, 18.75, 21.25, false)}
            <div style={{ width: "48px", height: "4px", background: "#FFB952", borderRadius: "9999px" }} />
            <div style={{ width: "100%", height: "48px", padding: "8px 0px 0px", boxSizing: "border-box" }}>
              <h3 style={{
                margin: 0, fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: "36px", lineHeight: "40px",
                letterSpacing: "-0.9px", color: "#000000",
              }}>
                {mission.title}
              </h3>
            </div>
            <div style={{ width: "100%", height: "147px", padding: 0 }}>
              <p style={{
                margin: 0, fontFamily: "'Inter', sans-serif",
                fontWeight: 400, fontSize: "18px", lineHeight: "29px",
                color: "#000000", wordWrap: "break-word",
              }}>
                {mission.description}
              </p>
            </div>
          </div>
        </div>

        {/* Vision Card */}
        <div style={{
          position: "absolute", height: "439px",
          left: "622.5px", right: "0px", top: "0px",
          background: "#00458D99",
          boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
          borderRadius: "24px", padding: "48px",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start",
        }}>
          {/* Content Container */}
          <div style={{
            width: "100%", height: "343px",
            display: "flex", flexDirection: "column",
            alignItems: "flex-start", padding: "0px", gap: "16px",
            zIndex: 1,
          }}>
            {/* Icon with Glow */}
            <div style={{
              width: "80px", height: "96px",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", padding: "0px 0px 16px",
              position: "relative", isolation: "isolate",
            }}>
              <div style={{
                position: "absolute", left: "0px", right: "0px", top: "0px", bottom: "16px",
                background: "rgba(255, 185, 82, 0.3)", filter: "blur(12px)",
                borderRadius: "9999px", zIndex: 0,
              }} />
              <div style={{
                position: "relative", width: "80px", height: "80px",
                display: "flex", flexDirection: "row",
                justifyContent: "center", alignItems: "center",
                padding: "0px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px)", borderRadius: "24px",
                boxSizing: "border-box", zIndex: 1, overflow: "hidden",
              }}>
                <img src={eyeImg} alt="" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
              </div>
            </div>

            {/* Decorative Accent Line */}
            <div style={{ width: "48px", height: "4px", background: "#FFB952", borderRadius: "9999px" }} />

            {/* Heading 3 */}
            <div style={{
              width: "100%", height: "48px",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", padding: "8px 0px 0px",
              boxSizing: "border-box",
            }}>
              <h3 style={{
                margin: 0, width: "100%", height: "40px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: "36px", lineHeight: "40px",
                letterSpacing: "-0.9px", color: "#FFFFFF",
                display: "flex", alignItems: "center",
              }}>
                {vision.title}
              </h3>
            </div>

            {/* Container — description */}
            <div style={{
              width: "100%", height: "147px",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", padding: "0px",
            }}>
              <p style={{
                margin: 0, width: "100%", height: "147px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400, fontSize: "18px", lineHeight: "29px",
                color: "rgba(255, 255, 255, 0.9)",
                display: "flex", alignItems: "center",
                wordWrap: "break-word",
              }}>
                {vision.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
