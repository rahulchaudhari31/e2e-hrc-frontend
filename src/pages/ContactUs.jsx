import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/contactus/HeroSection';
import ContactFormSection from '../components/contactus/ContactFormSection';
import GlobalNetworkSection from '../components/contactus/GlobalNetworkSection';
import '../components/contactus/ContactUs.css';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar variant="home" />
      <HeroSection />
      <ContactFormSection />
      <GlobalNetworkSection />
      <Footer />
    </div>
  );
}
