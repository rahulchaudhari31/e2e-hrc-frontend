import React, { useState, useEffect } from 'react';
import { Clock, Users, FileText, Globe } from 'lucide-react';
import Heroimage from "../../assets/images/image hero.jpg"
import { FiAward, FiUsers, FiCheckCircle, FiGlobe } from "react-icons/fi";
import styles from "../common/WorkforceHeroSection.module.css";

import { getWorkforceHeroData } from '../../services/workforceSolutionServices/workforceHeroService';
import { getWorkforceStatsData } from '../../services/workforceSolutionServices/workforceStatsService';

const fallbackStats = [
  { icon: FiAward, value: "18+", label: "Years Experience" },
  { icon: FiUsers, value: "450+", label: "Clients Served" },
  { icon: FiCheckCircle, value: "12K+", label: "Placements" },
  { icon: FiGlobe, value: "4", label: "Global Offices" },
];

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hero, stats] = await Promise.all([
          getWorkforceHeroData(),
          getWorkforceStatsData()
        ]);
        if (hero) setHeroData(hero);
        if (stats && stats.length > 0) {
          setStatsData(stats.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      } catch (err) {
        console.error("Failed to fetch workforce solution hero data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12 px-6 md:px-12 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </section>
    );
  }

  // Fallbacks
  const badgeText = heroData?.badgeText || "Strategic • Flexible • Global";
  const titleLine1 = heroData?.titleLine1 || "Workforce Solutions";
  const highlightedTitle = heroData?.highlightedTitle || "That Drive Business Growth";
  const description = heroData?.description || "At E2E Human Resource Consultancy, we provide end-to-end workforce solutions that help organisations attract, recruit, manage, and retain exceptional talent.";
  const displayImage = heroData?.image || Heroimage;
  const displayStats = statsData.length > 0 ? statsData : fallbackStats;

  const getIcon = (index) => {
    const icons = [FiAward, FiUsers, FiCheckCircle, FiGlobe];
    return icons[index % icons.length];
  };

  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="border-2 border-orange-400 text-orange-500 text-sm font-semibold px-6 py-2 rounded-full uppercase tracking-wider">
                {badgeText}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-blue-900">{titleLine1}</span>
                <br />
                <span className="text-orange-500">{highlightedTitle}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Image Placeholder */}
          <div className="hidden md:block">
            <div className="relative">
              <img
                src={displayImage}
                alt="Professional workspace"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className={styles.statsCard} role="list" aria-label="Company statistics">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon || getIcon(index);
            return (
              <div key={stat.label || index} className={styles.statItem} role="listitem">
                <span className={styles.statIcon} aria-hidden="true">
                  <Icon size={22} />
                </span>
                <strong className={styles.statValue}>{stat.value}</strong>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
