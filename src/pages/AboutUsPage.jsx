import React from "react";
import Hero from "../components/AboutUs/Hero.jsx";
import BridgingGap from "../components/AboutUs/BridgingGap.jsx";
import WhoWeAre from "../components/AboutUs/WhoWeAre.jsx";
import WhyChooseUs from "../components/AboutUs/WhyChooseUs.jsx";
import MissionVision from "../components/AboutUs/MissionVision.jsx";
import Testimonials from "../components/AboutUs/Testimonials.jsx";
import GlobalFootprint from "../components/AboutUs/GlobalFootprint.jsx";
import CallToAction from "../components/AboutUs/CallToAction.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUsPage = () => {
  return (
    <main className="font-sans">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <BridgingGap />
      <WhyChooseUs />
      <MissionVision />
      <Testimonials />
      <GlobalFootprint />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default AboutUsPage;
