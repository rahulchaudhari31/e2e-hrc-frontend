import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/employer/Hero'
import HowWeWork from '../components/employer/HowWeWork'
import Sectors from "../components/Home/Sectors"
import FAQSection from '../components/employer/FAQSection'
import Testimonials from '../components/employer/Testimonials'

const Employer = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HowWeWork/>
    <Sectors/>
    <FAQSection/>
    <Testimonials/>
    <Footer/>
    </>
  )
}

export default Employer