import { useEffect, useState } from "react";
import logoREC from "../../assets/images/logo REC.png";
import logoICO from "../../assets/images/LOGO ICO.png";
import logoBSI from "../../assets/images/LOGOI bsi.png";
import logoBCI from "../../assets/images/LOGO BCI.png";
import logoECO from "../../assets/images/LOGO ECO.png";
import { getTrustedBySection, getTrustedByLogos } from "../../services/trustedByService";

const fallbackLogos = [
  { name: "REC", image: logoREC, width: "210px", height: "60.84px", containerWidth: "234px", paddingLeft: "4px" },
  { name: "ICO", image: logoICO, width: "60px", height: "60px", containerWidth: "116px", paddingLeft: "32px" },
  { name: "BSI", image: logoBSI, width: "97px", height: "60px", containerWidth: "161px", paddingLeft: "44px" },
  { name: "ECO", image: logoECO, width: "60px", height: "60px", containerWidth: "116px", paddingLeft: "32px" },
  { name: "BCI", image: logoBCI, width: "97px", height: "60px", containerWidth: "161px", paddingLeft: "44px" },
];

function TrustedClients() {
  const [logos, setLogos] = useState(fallbackLogos);
  const [section, setSection] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [sectionData, logoData] = await Promise.all([
          getTrustedBySection(),
          getTrustedByLogos(),
        ]);

        if (!isMounted) return;

        if (sectionData) {
          setSection(sectionData);
        }

        if (logoData.length > 0) {
          setLogos(
            logoData.map((logo) => ({
              id: logo._id,
              name: logo.companyName || "Partner",
              image: logo.logo,
              websiteUrl: logo.websiteUrl,
              width: "auto",
              height: "48px",
              containerWidth: "auto",
              paddingLeft: "20px",
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load trusted by section:", error);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const allLogos = [...logos, ...logos, ...logos, ...logos];

  const badgeText = section?.badgeText || "Trusted By";
  const titleText = section?.title || "Leading organisations across the UK choose E2E HRC.";

  return (
    <section className="w-full bg-white py-6 lg:py-0 lg:h-[226px]">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col lg:flex-row items-center gap-4 lg:gap-0 px-5 sm:px-8 lg:px-[92px]">
        {/* Left side - Text */}
        <div className="lg:w-[260px] lg:h-[70px] flex-shrink-0 text-center lg:text-left">
          <span
            className="uppercase text-[#004CA5] block"
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "1.2px",
            }}
          >
            {badgeText}
          </span>
          <p
            className="text-[#004CA5] mt-2 lg:mt-0"
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "23px",
            }}
          >
            {titleText}
          </p>
        </div>

        {/* Right side - Logo scroll */}
        <div className="overflow-hidden flex-1 w-full" style={{ height: "69px" }}>
          <div className="trusted-clients-track flex items-center" style={{ gap: "12px" }}>
            {allLogos.map((logo, index) => (
              <div
                key={`${logo.id || logo.name}-${index}`}
                className="flex items-center flex-shrink-0 bg-[#F5F5F5] border border-[#E5E5E5]"
                style={{
                  width: logo.containerWidth || "auto",
                  height: "68px",
                  borderRadius: "40px",
                  padding: `4px 20px 4px ${logo.paddingLeft || "20px"}`,
                  gap: "4px",
                }}
              >
                {logo.websiteUrl ? (
                  <a
                    href={logo.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={logo.name}
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      style={{ width: logo.width || "auto", height: logo.height || "44px", maxWidth: "160px", maxHeight: "52px", objectFit: "contain" }}
                    />
                  </a>
                ) : (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    style={{ width: logo.width || "auto", height: logo.height || "44px", maxWidth: "160px", maxHeight: "52px", objectFit: "contain" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .trusted-clients-track {
          display: flex;
          gap: 12px;
          animation: scrollLogos 25s linear infinite;
          width: max-content;
        }
        .trusted-clients-track:hover {
          animation-play-state: paused;
        }
        @keyframes scrollLogos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

export default TrustedClients;