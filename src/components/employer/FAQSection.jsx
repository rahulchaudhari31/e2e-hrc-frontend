import React, { useEffect, useState } from 'react';
import { ChevronDown, Users, Globe, User } from 'lucide-react';
import { getEmployerFAQs } from '../../services/employer/employerFAQService';
import getEmployerCTAs  from '../../services/employer/employerCTAService';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [cta, setCta] = useState(null);
  const [loadingFAQs, setLoadingFAQs] = useState(true);
  const [loadingCTA, setLoadingCTA] = useState(true);
  const [faqError, setFaqError] = useState(false);
  const [ctaError, setCtaError] = useState(false);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const response = await getEmployerFAQs();
        const items = response?.data || [];
        const activeFaqs = items
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setFaqs(activeFaqs);
      } catch (error) {
        setFaqError(true);
      } finally {
        setLoadingFAQs(false);
      }
    };

    const loadCTA = async () => {
      try {
        const response = await getEmployerCTAs();
        const activeCta = response?.data || null;
        setCta(activeCta);
      } catch (error) {
        setCtaError(true);
      } finally {
        setLoadingCTA(false);
      }
    };

    loadFAQs();
    loadCTA();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqContent = loadingFAQs ? (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="w-full px-6 py-4 flex items-center justify-between text-left">
            <div className="h-5 bg-gray-200 rounded-full w-3/4" />
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>
          <div className="px-6 pb-4 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded-full w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded-full w-5/6" />
          </div>
        </div>
      ))}
    </div>
  ) : !faqs.length ? (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
      <p className="text-gray-500">Employer FAQs are not available at the moment.</p>
      {faqError && <p className="mt-3 text-sm text-red-500">Unable to load FAQ data right now.</p>}
    </div>
  ) : (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id || index}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-base font-semibold text-blue-900 pr-4">
              {faq.question}
            </span>
            <ChevronDown
              size={24}
              className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-200">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const ctaContent = loadingCTA ? (
    <div className="relative w-full max-w-xl rounded-3xl p-8 bg-linear-to-br from-blue-700 to-blue-900 text-white shadow-2xl animate-pulse">
      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <div className="h-10 bg-white/20 rounded-full w-5/6" />
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-4/5" />
        </div>
        <div className="h-12 bg-white/20 rounded-full w-40" />
      </div>
    </div>
  ) : !cta ? (
    <div className="relative w-full max-w-xl rounded-3xl p-8 bg-linear-to-br from-blue-700 to-blue-900 text-white shadow-2xl">
      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Employer CTA</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            The call-to-action content is not available at the moment.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full opacity-50 cursor-not-allowed"
        >
          Coming Soon
          <span>→</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="relative w-full max-w-xl bg-linear-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
      <div className="absolute top-6 right-4 space-y-7">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <Users size={24} className="text-blue-200" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <Globe size={24} className="text-blue-200" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <User size={24} className="text-blue-200" />
        </div>
      </div>

      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            {cta.ctaTitle}
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            {cta.ctaDescription}
          </p>
        </div>

        <a
          href={cta.buttonLink || '#'}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 group"
        >
          {cta.buttonText}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Section - FAQ */}
          <div className="space-y-6">
            <div className="text-sm font-semibold tracking-wide text-amber-500 uppercase">
              Frequently Asked Questions
            </div>
            {faqContent}
          </div>

          {/* Right Section - CTA Card */}
          <div className="flex items-center justify-center lg:justify-end">
            {ctaContent}
          </div>
        </div>
      </div>
    </div>
  );
}
