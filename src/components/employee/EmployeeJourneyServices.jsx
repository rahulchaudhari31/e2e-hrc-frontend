import React, { useState, useEffect } from 'react';
import { BriefcaseBusiness } from "lucide-react";
import { getEmployeeJourney } from '../../services/employee/employeeJourneyService';

const EmployeeJourneyServices = () => {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEmployeeJourney();
  }, []);

  const fetchEmployeeJourney = async () => {
    try {
      setIsLoading(true);
      const data = await getEmployeeJourney();

      // Handle response: { section: {...}, cards: [...] }
      if (data && data.section) {
        setSection({
          badgeText: data.section.badgeText || 'TRUSTED DIGITAL SOLUTIONS FOR YOUR BUSINESS',
          sectionTitle: data.section.sectionTitle || 'Why choose Our Employee Journey Services?',
          isActive: data.section.isActive !== false
        });

        // Filter active cards, sort by order
        const sortedCards = (data.cards || [])
          .filter(card => card.isActive !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        setCards(sortedCards);
      } else {
        setSection(null);
        setCards([]);
      }
    } catch (err) {
      console.error('Error fetching Employee Journey:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render section if no data, loading, error, or section is inactive
  if (isLoading || error || !section || !section.isActive || cards.length === 0) {
    return null;
  }

  // Render cards in 2-column layout (left/right alternating)
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < cards.length; i += 2) {
      rows.push({
        left: cards[i],
        right: cards[i + 1] || null,
        leftIndex: i,
        rightIndex: i + 1
      });
    }
    return rows;
  };

  const rows = renderRows();

  return (
    <div className="w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-green-400 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-gray-600 text-sm font-semibold tracking-wide mb-4">
            {section.badgeText}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            {section.sectionTitle}
          </h1>
        </div>
    
        {/* Services Grid */}
        <div className="space-y-px">
          {rows.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`}>
              <div className={`flex divide-x divide-gray-400 ${row.right ? 'border-b border-gray-400' : ''}`}>
                {/* Left Column */}
                {row.left && (
                  <div className="flex-1 flex items-center gap-8 p-8 pl-0">
                    <div className="flex-shrink-0">
                      {React.createElement(BriefcaseBusiness, {
                        size: 48,
                        className: 'text-gray-700'
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {row.left.title}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Right Column */}
                {row.right && (
                  <div className="flex-1 flex items-center gap-8 p-8 pl-12">
                    <div className="flex-shrink-0">
                      {React.createElement(BriefcaseBusiness, {
                        size: 48,
                        className: 'text-gray-700'
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {row.right.title}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Empty right column if odd number of items */}
                {!row.right && (
                  <div className="flex-1 flex items-center gap-8 p-8 pl-12">
                    {/* Empty */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeJourneyServices;