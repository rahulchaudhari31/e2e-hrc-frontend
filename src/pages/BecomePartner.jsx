import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/becomepartner/HeroSection';
import PartnerFormSection from '../components/becomepartner/PartnerFormSection';
import BuiltOnTrustSection from '../components/becomepartner/BuiltOnTrustSection';
import NetworkMapSection from '../components/becomepartner/NetworkMapSection';

export default function BecomePartner() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PartnerFormSection />
      <BuiltOnTrustSection />
      <NetworkMapSection />
      <Footer />
    </div>
  );
}
