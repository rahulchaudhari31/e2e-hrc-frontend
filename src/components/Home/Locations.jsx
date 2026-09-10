import React, { useEffect, useState } from 'react';
import locationIcon from "../../assets/images/Career Growth imgs/DUBAI LOCATION.png";
import arrowIcon from "../../assets/images/Career Growth imgs/arrrow.png";
import { getLocationCards } from '../../services/homeServices/locationCardService';
import { API_BASE_URL } from '../../config/api';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;

  const baseUrl = API_BASE_URL.replace(/\/api$/, '');
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLocations = async () => {
      try {
        const cards = await getLocationCards();
        if (isMounted) {
          setLocations(cards);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error in Locations:', err);
          setError('Unable to load locations right now.');
          setLocations([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocations();

    const intervalId = window.setInterval(fetchLocations, 15000);
    const handleFocus = () => fetchLocations();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const renderCards = () => {
    if (!locations.length) {
      return (
        <div className="mt-10 text-center text-gray-500 text-lg">
          No locations available.
        </div>
      );
    }

    return (
      <div className="mt-12 -mx-6 px-6">
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {locations.map((loc, index) => {
            const countryName = loc.contryname || loc.sectiontitle || 'Location';
            const cityName = loc.cityname || countryName;
            const cardColor = index % 2 === 0 ? '#004CA5' : '#F39308';

            return (
              <div
                key={loc._id || `${countryName}-${index}`}
                className="location-card snap-center relative flex-shrink-0 overflow-hidden"
                style={{
                  width: "344.59px",
                  height: "309.74px",
                  borderRadius: "12.91px",
                  background: "transparent",
                  boxShadow: "0px 2.58px 12.91px 0px rgba(0,0,0,0.08)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={getImageUrl(loc.image)}
                  alt={countryName}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 800,
                      fontSize: "31.08px",
                      lineHeight: "58.08px",
                      letterSpacing: "-1.29px",
                      color: "#FFFFFF",
                      textAlign: "center",
                      verticalAlign: "middle",
                      opacity: 0.87,
                      whiteSpace: "normal",
                      maxWidth: "245px",
                      textAlign: "center",
                    }}
                  >
                    {countryName}
                  </span>
                </div>

                <div
                  className="absolute bottom-0 left-0 flex flex-col items-start"
                  style={{
                    padding: "0 16px 7.74px 16px",
                    gap: "5.16px",
                  }}
                >
                  <div className="flex items-center" style={{ gap: "5.16px" }}>
                    <div
                      style={{
                        width: "18.07px",
                        height: "18.07px",
                        borderRadius: "17322056px",
                        background: cardColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={locationIcon}
                        alt=""
                        style={{ width: "8.39px", height: "8.39px" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "7.74px",
                        lineHeight: "10.32px",
                        letterSpacing: "0px",
                        color: "#FFFFFF",
                      }}
                    >
                      {cityName}
                    </span>
                  </div>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    style={{
                      gap: "4px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "7.74px",
                      lineHeight: "10.32px",
                      letterSpacing: "0px",
                      color: cardColor,
                      display: "inline-flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    Get Directions
                    <img
                      src={arrowIcon}
                      alt=""
                      style={{ width: "8px", height: "8px", flexShrink: 0 }}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-8 pb-20">
      <div className="text-center">
        <span className="bg-[#f4f7fb] text-[#004CA5] px-4 py-2 rounded-full text-sm font-medium">
          Our Locations
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004CA5] mt-3">
          Our Office Locations
        </h2>
      </div>

      {loading ? (
        <div className="mt-10 text-center text-gray-500 text-lg">Loading locations...</div>
      ) : error ? (
        <div className="mt-10 text-center text-gray-500 text-lg">{error}</div>
      ) : (
        renderCards()
      )}

      <style>{`
        div::-webkit-scrollbar { display: none; }
        .location-card {
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease;
          transform-origin: center center;
          cursor: pointer;
        }
        .location-card:hover {
          transform: scale(1.25);
          z-index: 10;
          box-shadow: 0px 30px 60px -15px rgba(0, 0, 0, 0.4);
        }
        .location-card img {
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .location-card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

export default Locations;
