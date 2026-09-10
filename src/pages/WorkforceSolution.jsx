import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/WorkforceSolution/Hero'
import WorkforceSolutions from '../components/WorkforceSolution/WorkforceSolutions'
import HowWeWork from '../components/WorkforceSolution/HowWeWork'
import FAQAndCTA from '../components/WorkforceSolution/FAQAndCTA'
import Testimonials from '../components/WorkforceSolution/Testimonials'


const WorkforceSolution = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WorkforceSolutions />
      <HowWeWork />
      <FAQAndCTA />
      <Testimonials />
      <Footer />
    </>
  )
}

export default WorkforceSolution