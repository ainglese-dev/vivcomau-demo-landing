import { Button } from '@/components/ui/button'
import { ShieldCheck, Zap, Server } from 'lucide-react'

const PHONE_E164 = '+61402229561'
const PHONE_DISPLAY = '+61 402 229 561'
const WHATSAPP_URL =
  'https://wa.me/61402229561?text=Hi%20VIVCOM%2C%20I%27d%20like%20a%20quote%20for...'

const trustBadges = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Zap, label: '12+ Years Experience' },
  { icon: Server, label: 'Multi-Vendor Certified' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
    >
      {/* Subtle brand gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-vivcom-green/5 via-white to-vivcom-blue/5" />

      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Sydney &middot; Est. 2013
      </p>
      <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-vivcom-dark-blue sm:text-5xl md:text-6xl">
        Full-stack technology services for homes, offices, and datacenters.
      </h1>
      <p className="mt-6 max-w-2xl text-balance text-lg text-foreground sm:text-xl">
        From CCTV and structured cabling to network automation and AI governance
        — VIVCOM delivers on-site installs across Sydney and remote consulting
        worldwide.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <a href="#contact">Get a Free Quote</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={`tel:${PHONE_E164}`}
            aria-label={`Call VIVCOM at ${PHONE_DISPLAY}`}
          >
            Call Now &middot; {PHONE_DISPLAY}
          </a>
        </Button>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        or message us on WhatsApp
      </a>

      {/* Trust badges */}
      <div className="mt-12 pt-8 border-t border-border flex flex-wrap justify-center gap-8 md:gap-16">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-vivcom-dark-blue font-medium"
          >
            <Icon className="w-5 h-5 text-vivcom-blue" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
