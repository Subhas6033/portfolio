import React from 'react'
import { KEYFRAMES } from '../../Components/ui'
import Hero from './sections/Hero'
import ToolsTicker from './sections/ToolsTicker'
import Projects from './sections/Projects'
import About from './sections/About'
import Services from './sections/Services'
import FeaturedWork from './sections/FeaturedWork'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import CTABanner from './sections/CTABanner'

const Home = () => (
  <>
    <style>{KEYFRAMES}</style>
    <div className="bg-zinc-950">
      <Hero />
      <ToolsTicker />
      <Projects />
      <About />
      <Services />
      <FeaturedWork />
      {/* <Testimonials /> */}
      <FAQ />
      <CTABanner />
    </div>
  </>
)

export default Home
