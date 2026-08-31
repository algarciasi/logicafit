// ─── Secciones nuevas (rediseño en curso) ─────────────────────────────────────
import Hero from '../components/Hero'
import Manifesto from '../components/Manifiesto'
import AppShowcase from '../components/AppShowcase'

// ─── Secciones antiguas (pendientes de revisar antes de incluir) ───────────────
// import HowItWorks from '../components/HowItWorks'
// import DemoPreview from '../components/DemoPreview'
// import StravaShowcase from '../components/StravaShowcase'
// import About from '../components/About'
// import RunningGuideGift from '../components/RunningGuideGift'
// import AccompanimentSection from '../components/AccompanimentSection'
// import TrustSection from '../components/TrustSection'
// import PricingTeaser from '../components/PricingTeaser'
// import FinalCta from '../components/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <AppShowcase />

      {/* El resto de la Home se añade tras revisión visual de estas 3 secciones */}
    </>
  )
}