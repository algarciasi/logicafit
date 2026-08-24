import Hero from '../components/Hero'
import DemoPreview from '../components/DemoPreview'
import HowItWorks from '../components/HowItWorks'
import About from '../components/About'
import PricingTeaser from '../components/PricingTeaser'
import FinalCta from '../components/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <DemoPreview />
      <HowItWorks />
      <About />
      <PricingTeaser />
      <FinalCta />
    </>
  )
}