import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import manufacturingImg from "../../assets/images/sectors/manuifacturing.jpg";
import healthcareImg from "../../assets/images/sectors/healthcare.jpg";
import engineeringImg from "../../assets/images/sectors/engineering.jpg";
import constructionImg from "../../assets/images/sectors/construction.jpg";
import logisticsImg from "../../assets/images/sectors/logistics.jpg";
import financeImg from "../../assets/images/sectors/finance.jpg";
import educationImg from "../../assets/images/sectors/education.jpg";

const fallbackIndustries = [
  { name: "Manufacturing", image: manufacturingImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Healthcare", image: healthcareImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Engineering", image: engineeringImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Construction", image: constructionImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Logistics", image: logisticsImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Finance", image: financeImg, description: "Tailored recruitment solutions for this sector." },
  { name: "Education", image: educationImg, description: "Tailored recruitment solutions for this sector." },
];

const normalizeServices = (services = []) => {
  return [...services]
    .filter((service) => service.isActive !== false)
    .sort((a, b) => {
      const orderA = Number(a.displayOrder ?? a.order ?? 0);
      const orderB = Number(b.displayOrder ?? b.order ?? 0);
      return orderA - orderB;
    });
};

function Sectors() {
  const scrollRef = useRef(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/services");
        if (isMounted) {
          const apiServices = normalizeServices(response?.data?.data || []);
          if (apiServices.length > 0) {
            setServices(apiServices);
          } else {
            setServices(fallbackIndustries);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setServices(fallbackIndustries);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (el) {
      const amount = el.clientWidth * 0.5;
      el.scrollBy({ left: -amount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (el) {
      const amount = el.clientWidth * 0.5;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 lg:py-20 px-4 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 lg:mb-10 lg:pl-[51px] lg:pr-[32px] gap-4">
          <div className="lg:w-[629.76px]">
            <span className="inline-flex items-center bg-[#C8D96F] text-[#004CA5] font-body font-semibold text-[12px] px-3 py-[6px] rounded-full mb-2">
              Industries We Serve
            </span>
            <h2 className="font-heading font-[800] text-2xl sm:text-3xl lg:text-[36px] lg:leading-[40px] tracking-[0px] text-[#004CA5]">
              Deep expertise across 25+ sectors
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-[8px] lg:w-[96px]">
            <button
              onClick={scrollLeft}
              className="w-[44px] h-[44px] rounded-full border-[1.6px] border-[#004CA5] bg-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={18} strokeWidth={1.5} className="text-[#004CA5]" />
            </button>
            <button
              onClick={scrollRight}
              className="w-[44px] h-[44px] rounded-full border-[1.6px] border-[#004CA5] bg-transparent flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <FiChevronRight size={18} strokeWidth={1.5} className="text-[#004CA5]" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-6 overflow-hidden pb-4 -mx-4 px-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-[280px] min-w-[280px] h-[420px] rounded-[20px] overflow-hidden animate-pulse bg-gray-200 shadow-[0px_4px_20px_0px_#00000014]"
              />
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {services.map((service, index) => {
              const name = service.name || service.title;
              const image = service.image || fallbackIndustries[index % fallbackIndustries.length]?.image;

              return (
                <div
                  key={service._id || service.id || name}
                  className="group relative w-[280px] h-[420px] min-w-[280px] rounded-[20px] overflow-hidden cursor-pointer snap-start bg-transparent shadow-[0px_4px_20px_0px_#00000014]"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#004CA5] via-[#2b6cb0] to-[#77c0f4] text-center text-sm font-semibold text-white">
                      {name}
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0, 15, 40, 0.9) 30%, rgba(0, 15, 40, 0.35) 100%)" }} />
                  <div className="absolute left-0 top-0 w-[280px] h-[420px] flex flex-col justify-end items-start p-7">
                    <div className="w-[224px] pb-2">
                      <h3 className="font-heading font-bold text-[20px] leading-[28px] text-white">{name}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Sectors;
