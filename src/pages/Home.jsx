import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import DemoPreview from '../components/DemoPreview'
import StravaShowcase from '../components/StravaShowcase'
import About from '../components/About'
import RunningGuideGift from '../components/RunningGuideGift'
import AccompanimentSection from '../components/AccompanimentSection'
import TrustSection from '../components/TrustSection'
import PricingTeaser from '../components/PricingTeaser'
import FinalCta from '../components/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <DemoPreview />
      <StravaShowcase />
      <About />
      <RunningGuideGift />
      <AccompanimentSection />
      <TrustSection />
      <PricingTeaser />
      <FinalCta />
    </>
  )
}