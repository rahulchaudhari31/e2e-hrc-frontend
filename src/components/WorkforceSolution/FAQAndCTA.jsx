import { useState, useEffect } from 'react';
import { ChevronDown, Users, Globe, User } from 'lucide-react';
import { useScrollReveal } from '../common/useScrollReveal';
import { getWorkforceSolutionFAQs } from '../../services/workforceSolutionServices/workforceSolutionFAQService';
import { getWorkforceSolutionCTA } from '../../services/workforceSolutionServices/workforceSolutionCTAService';

export default function FAQAndCTA() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, visible] = useScrollReveal();
  const [faqs, setFaqs] = useState([]);
  const [cta, setCTA] = useState(null);
  const [isFAQLoading, setIsFAQLoading] = useState(true);
  const [isCTALoading, setIsCTALoading] = useState(true);
  const [faqError, setFaqError] = useState(null);
  const [ctaError, setCtaError] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Fetch FAQs
    const fetchFAQs = async () => {
      setIsFAQLoading(true);
      setFaqError(null);
      try {
        const data = await getWorkforceSolutionFAQs();
        if (mounted) setFaqs(data);
      } catch (error) {
        if (mounted) setFaqError(error.message || 'Failed to load FAQs');
      } finally {
        if (mounted) setIsFAQLoading(false);
      }
    };

    // Fetch CTA
    const fetchCTA = async () => {
      setIsCTALoading(true);
      setCtaError(null);
      try {
        const data = await getWorkforceSolutionCTA();
        if (mounted) setCTA(data);
      } catch (error) {
        if (mounted) setCtaError(error.message || 'Failed to load CTA');
      } finally {
        if (mounted) setIsCTALoading(false);
      }
    };

    // Call both in parallel
    fetchFAQs();
    fetchCTA();

    return () => {
      mounted = false;
    };
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqContent = isFAQLoading ? (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse">
          <div className="w-full px-6 py-4 flex items-center justify-between text-left">
            <div className="h-5 bg-gray-200 rounded-full w-3/4" />
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  ) : faqError ? (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
      <p className="text-gray-500 text-sm">Failed to load FAQs.</p>
    </div>
  ) : !faqs.length ? (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
      <p className="text-gray-500 text-sm">No FAQs available at the moment.</p>
    </div>
  ) : (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id || index}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-base font-semibold text-blue-900 pr-4">
              {faq.question || 'Question not available'}
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
              {faq.answer || 'Answer not available'}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const ctaContent = isCTALoading ? (
    <div className="relative w-full rounded-3xl p-8 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-2xl animate-pulse">
      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <div className="h-10 bg-white/20 rounded-full w-5/6" />
          <div className="h-4 bg-white/20 rounded-full w-full" />
          <div className="h-4 bg-white/20 rounded-full w-4/5" />
        </div>
        <div className="h-12 bg-white/20 rounded-full w-40" />
      </div>
    </div>
  ) : ctaError ? (
    <div className="relative w-full rounded-3xl p-8 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-2xl">
      <p className="text-blue-100 text-sm">Failed to load CTA.</p>
    </div>
  ) : !cta ? (
    <div className="relative w-full rounded-3xl p-8 bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-2xl">
      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Build Your Workforce</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Call to action content is not available at the moment.
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
    <div className="relative w-full bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
      {/* Right side icons */}
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

      {/* Content */}
      <div className="space-y-6 pr-4">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            {cta.ctaTitle || 'Build Your Workforce'}
          </h2>
          {cta.ctaDescription && (
            <p className="text-blue-100 text-sm leading-relaxed">
              {cta.ctaDescription}
            </p>
          )}
        </div>

        {cta.buttonText && (
          <CTAButton link={cta.buttonLink} text={cta.buttonText} />
        )}
      </div>
    </div>
  );

  return (
    <section id="faq" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto reveal ${visible ? 'visible' : ''}`}
      >
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
    </section>
  );
}

// Helper component to handle link navigation
function CTAButton({ link, text }) {
  const isExternalLink = link && (link.startsWith('http://') || link.startsWith('https://'));

  if (isExternalLink) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 group"
      >
        {text}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    );
  }

  if (link) {
    return (
      <a
        href={link}
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 group"
      >
        {text}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    );
  }

  // If no link, render button without href
  return (
    <button
      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 group"
    >
      {text}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}
