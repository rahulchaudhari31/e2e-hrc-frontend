import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/becomePartner/HeroSection';
import PartnerFormSection from '../components/becomePartner/PartnerFormSection';
import BuiltOnTrustSection from '../components/becomePartner/BuiltOnTrustSection';
import NetworkMapSection from '../components/becomePartner/NetworkMapSection';

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
