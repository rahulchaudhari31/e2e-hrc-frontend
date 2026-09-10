import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/employee/HeroSection';
import EmployeeJourneyServices from '../components/employee/EmployeeJourneyServices';
import TestimonialsCarousel from '../components/employee/TestimonialsCarousel';
import WhyChooseE2E from '../components/employee/WhyChooseE2E';
import Sectors from "../components/Home/Sectors"
import './Employee.css';
import FAQAndCTA from '../components/employee/FAQSection';

import { useRef } from 'react';


export default function Employee() {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = 300;
    trackRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
<>
      <Navbar />

      {/* ===== C. HERO SECTION ===== */}
      <HeroSection />

      <EmployeeJourneyServices></EmployeeJourneyServices>
      {/* ===== E. WHAT MAKES US DIFFERENT ===== */}
      <WhyChooseE2E />
      <Sectors />
      <FAQAndCTA />

      {/* ===== G. TESTIMONIALS (Now handled inside TestimonialsCarousel) ===== */}
      <TestimonialsCarousel speed={30} />

      <Footer />
      </>
  )}
