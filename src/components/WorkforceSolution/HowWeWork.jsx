import { useState, useEffect } from 'react';
import { FiBriefcase, FiTarget, FiSearch, FiClipboard, FiSettings, FiUsers } from 'react-icons/fi';
import { getPublicHowWeWork } from '../../services/workforceSolutionServices/howWeWorkService';

// Static icon mapping based on step index
const ICON_MAP = [
  FiBriefcase,
  FiTarget,
  FiSearch,
  FiClipboard,
  FiSettings,
  FiUsers,
];

const getIconForStep = (index) => {
  return ICON_MAP[index % ICON_MAP.length];
};

export default function HowWeWork() {
  const [section, setSection] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHowWeWorkData = async () => {
      try {
        setIsLoading(true);
        const data = await getPublicHowWeWork();
        
        if (data.section && data.steps && data.steps.length > 0) {
          setSection(data.section);
          setSteps(data.steps);
        } else {
          // No active section or steps found
          setSection(null);
          setSteps([]);
        }
      } catch (err) {
        console.error('Failed to fetch How We Work data:', err);
        // Don't break the page - use null/empty state
        setSection(null);
        setSteps([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHowWeWorkData();
  }, []);

  // If loading, show loading state
  if (isLoading) {
    return (
      <section id="how-we-work" className="bg-gray-50 py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">Loading...</p>
            <h2 className="font-bold text-3xl md:text-4xl text-blue-900">How We Work</h2>
          </div>
        </div>
      </section>
    );
  }

  // If no section or no steps, hide the section
  if (!section || steps.length === 0) {
    return null;
  }

  return (
    <section id="how-we-work" className="bg-gray-50 py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">
            {section.badgeText}
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-blue-900">
            {section.sectionTitle}
          </h2>
        </div>

        <div className="relative">
          {/* Dashed connector — desktop only */}
          <div className="hidden lg:block absolute top-[22px] left-[calc(100%/12)] right-[calc(100%/12)]
                          border-t-2 border-dashed border-orange-400 opacity-60 z-0" aria-hidden="true" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
            {steps.map((step, index) => {
              const Icon = getIconForStep(index);
              return (
                <div
                  key={step._id || `step-${index}`}
                  className="relative z-10 flex flex-col items-center text-center gap-3"
                >
                  <span className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center shadow-md
                                   hover:bg-blue-800 transition-colors duration-200">
                    <Icon size={20} className="text-white" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-600 text-xs font-medium">{step.stepNumber}</span>
                    <span className="font-semibold text-sm text-blue-900 leading-snug">{step.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
