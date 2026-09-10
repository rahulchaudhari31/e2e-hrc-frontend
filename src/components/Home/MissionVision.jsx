import React, { useEffect, useState } from "react";
import { getHomeMissionVision } from "../../services/homeSectionsService";

function MissionIcon() {
  return (
    <div className="relative" style={{ width: "80px", height: "96px", padding: "0 0 16px" }}>
      <div
        className="absolute"
        style={{ left: 0, right: 0, top: 0, bottom: "16px", background: "rgba(255, 185, 82, 0.3)", filter: "blur(12px)", borderRadius: "9999px", zIndex: 0 }}
      />
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "80px", height: "80px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "24px",
          zIndex: 1,
        }}
      >
        <div className="flex items-center justify-center" style={{ width: "64px", height: "64px", background: "#005CB9", borderRadius: "12px" }}>
          <svg width="19" height="22" viewBox="0 0 19 22" fill="none">
            <path d="M9.5 0L11.837 7.163L19 9.5L11.837 11.837L9.5 19L7.163 11.837L0 9.5L7.163 7.163L9.5 0Z" fill="#C6D8FF" />
            <circle cx="9.5" cy="9.5" r="3" fill="#C6D8FF" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function VisionIcon() {
  return (
    <div className="relative" style={{ width: "80px", height: "96px", padding: "0 0 16px" }}>
      <div
        className="absolute"
        style={{ left: 0, right: 0, top: 0, bottom: "16px", background: "rgba(255, 185, 82, 0.3)", filter: "blur(12px)", borderRadius: "9999px", zIndex: 0 }}
      />
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "80px", height: "80px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "24px",
          zIndex: 1,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" />
          <circle cx="24" cy="24" r="8" fill="white" />
          <path d="M24 4V8M24 40V44M4 24H8M40 24H44" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function MissionVision() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        setLoading(true);
        const response = await getHomeMissionVision();
        setData(response?.data || null);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionVision();
  }, []);

  if (!loading && (!data || data.isActive === false)) {
    return null;
  }

  const missionTitle = data?.missionTitle || "Our Mission";
  const missionDescription = data?.missionDescription || "";
  const visionTitle = data?.visionTitle || "Our Vision";
  const visionDescription = data?.visionDescription || "";
  const visionImage = data?.visionImage || "";

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: "1213px", padding: "59px 0 67px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div
            className="relative flex flex-col justify-center"
            style={{
              padding: "48px",
              gap: "16px",
              background: "#FFFFFF",
              border: "1px solid rgba(194, 198, 212, 0.3)",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.02)",
              borderRadius: "24px",
              isolation: "isolate",
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{ right: "0.5px", top: "1px", width: "164px", height: "164px", opacity: 0.05, zIndex: 1, padding: "32px" }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100" fill="#191C1E">
                <circle cx="50" cy="50" r="50" />
              </svg>
            </div>

            <div className="relative" style={{ zIndex: 0 }}>
              <MissionIcon />
              <div style={{ width: "48px", height: "4px", background: "#FFB952", borderRadius: "9999px", marginTop: "16px" }} />
              <h3
                className="mt-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "36px",
                  lineHeight: "40px",
                  letterSpacing: "-0.9px",
                  color: "#000000",
                }}
              >
                {missionTitle}
              </h3>
              <p
                className="mt-4"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "29px",
                  color: "#000000",
                }}
              >
                {loading ? "Loading content..." : missionDescription}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="relative flex flex-col justify-center"
            style={{
              padding: "48px",
              gap: "16px",
              borderRadius: "24px",
              isolation: "isolate",
              overflow: "hidden",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
            }}
          >
            <div className="absolute inset-0" style={{ zIndex: 0 }}>
              {visionImage ? (
                <img src={visionImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: "#00458D" }} />
              )}
            </div>

            <div
              className="absolute inset-0"
              style={{
                background: "rgba(0, 69, 141, 0.6)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                zIndex: 1,
              }}
            />

            <div className="relative" style={{ zIndex: 2 }}>
              <VisionIcon />
              <div style={{ width: "48px", height: "4px", background: "#FFB952", borderRadius: "9999px", marginTop: "16px" }} />
              <h3
                className="mt-2"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "36px",
                  lineHeight: "40px",
                  letterSpacing: "-0.9px",
                  color: "#FFFFFF",
                }}
              >
                {visionTitle}
              </h3>
              <p
                className="mt-4"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "29px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {loading ? "Loading content..." : visionDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
