import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyVivcom } from '@/components/WhyVivcom'
import { Testimonials } from '@/components/Testimonials'
import { About } from '@/components/About'
import { Vendors } from '@/components/Vendors'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { MessageCircle } from 'lucide-react'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyVivcom />
        <Testimonials />
        <About />
        <Vendors />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/61402229561?text=Hi%20VIVCOM%2C%20I%27d%20like%20a%20quote%20for..."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-vivcom-green text-white shadow-lg hover:brightness-110 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  )
}

export default App
