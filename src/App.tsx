import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyVivcom } from '@/components/WhyVivcom'
import { Testimonials } from '@/components/Testimonials'
import { About } from '@/components/About'
import { Vendors } from '@/components/Vendors'
import { UrgentCTA } from '@/components/UrgentCTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyVivcom />
        <Testimonials />
        <UrgentCTA />
        <About />
        <Vendors />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />

    </>
  )
}

export default App
