import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import { getPublicEmployeeHero } from '../../services/employee/employeeHeroService';

const FALLBACK = {
  badgeText: 'Find Jobs That Match Your Skills',
  titleLine1: 'Connecting Talent with Opportunity',
  description: 'Find your ideal role, upload your CV, and connect with leading employers across multiple industries.',
  leftTopImage: 'https://images.unsplash.com/photo-1713947506170-f9c01bcf7be7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  leftBottomImage: 'https://images.unsplash.com/photo-1713946598432-9bb1f09acf9b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  rightImage: 'https://images.unsplash.com/photo-1622977318832-82321bdd509f?q=80&w=903&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const [hero, setHero] = useState(FALLBACK);

  // Fetch hero data from the public API
  useEffect(() => {
    getPublicEmployeeHero()
      .then((res) => {
        // res is null when API returns 404 (no active record yet)
        if (res?.data) {
          setHero({
            badgeText: res.data.badgeText || FALLBACK.badgeText,
            titleLine1: res.data.titleLine1 || FALLBACK.titleLine1,
            description: res.data.description || FALLBACK.description,
            leftTopImage: res.data.leftTopImage || FALLBACK.leftTopImage,
            leftBottomImage: res.data.leftBottomImage || FALLBACK.leftBottomImage,
            rightImage: res.data.rightImage || FALLBACK.rightImage,
          });
        }
        // If res is null (404), the FALLBACK state is kept as-is
      })
      .catch(() => {
        // On any network/server error keep FALLBACK — no crash
      });
  }, []);

  // Responsive scale effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const wrapper = container.parentElement;
      if (!wrapper) return;
      if (window.innerWidth < 768) {
        container.style.transform = '';
        container.style.marginBottom = '';
        return;
      }
      const wrapperWidth = wrapper.clientWidth;
      const scale = Math.min(1, wrapperWidth / 1440);
      if (scale < 1) {
        container.style.transform = `scale(${scale})`;
        container.style.marginBottom = `${-520 * (1 - scale)}px`;
      } else {
        container.style.transform = '';
        container.style.marginBottom = '';
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section className="hero-wrapper">
      <div className="hero-scroll-wrap">
        <div className="hero-container" ref={containerRef}>

          {/* Dashed Brackets (L-shaped, behind hexagons) */}
          <div className="dash-bracket-left"></div>
          <div className="dash-bracket-right"></div>

          {/* Left-Top Hexagon Cluster (small) */}
          <div className="hex-bg-1"></div>
          <img src={hero.leftTopImage} alt="" className="hero-img-1" loading="lazy" />

          {/* Center-Left Hexagon Cluster (large) */}
          <div className="hex-bg-2"></div>
          <img src={hero.leftBottomImage} alt="" className="hero-img-2" loading="lazy" />

          {/* Right Hexagon Cluster (large) */}
          <div className="hex-bg-3"></div>
          <img src={hero.rightImage} alt="" className="hero-img-3" loading="lazy" />

          {/* Solid Green Hexagon Dots (left) */}
          <div className="hex-dot hex-dot-1"></div>
          <div className="hex-dot hex-dot-2"></div>

          {/* Gradient Hexagon Dots (bottom-right) */}
          <div className="hex-dot-gradient hex-dot-gradient-1"></div>
          <div className="hex-dot-gradient hex-dot-gradient-2"></div>

          {/* Center Text Content */}
          <div className="hero-eyebrow">{hero.badgeText}</div>

          <div className="hero-heading-wrap">
            <h1 className="hero-heading">{hero.titleLine1}</h1>
          </div>

          <p className="hero-subtext">{hero.description}</p>

        </div>
      </div>
    </section>
  );
}
