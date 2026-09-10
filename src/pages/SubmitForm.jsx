import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactFormCard from '../components/Home/ContactFormCard';

const CONTENT = {
  employee: {
    badge: 'Job Opportunities',
    headingLine1: 'Submit Your',
    highlight: 'CV',
    headingLine2: 'With Confidence',
    description:
      'Looking for your next opportunity? Submit your CV below and our employee team will get back to you shortly.',
  },
  employer: {
    badge: 'Hiring Solutions',
    headingLine1: 'Submit a',
    highlight: 'Vacancy',
    headingLine2: 'Today',
    description:
      'Looking to hire exceptional talent? Tell us about your vacancy and our team will get back to you shortly.',
  },
};

export default function SubmitForm({ variant = 'employee' }) {
  const cfg = CONTENT[variant] || CONTENT.employee;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <section className="relative w-full bg-[#0b3a91] py-16 px-4 sm:px-6 lg:px-12 overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {cfg.badge}
            </span>

            <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-6">
              {cfg.headingLine1}{" "}
              <span className="text-amber-400">{cfg.highlight}</span>
              <br />
              {cfg.headingLine2}
            </h2>

            <p className="text-white/80 text-base sm:text-lg max-w-md mb-8">
              {cfg.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-amber-400 text-[#0b3a91] font-semibold px-6 py-3 rounded-full">
                Response within 24 hours
              </span>
              <span className="inline-flex items-center gap-2 bg-transparent border border-white/40 text-white font-semibold px-6 py-3 rounded-full">
                Dedicated consultant assigned
              </span>
            </div>
          </div>

          <ContactFormCard type={variant} />
        </div>
      </section>
      <Footer />
    </div>
  );
}