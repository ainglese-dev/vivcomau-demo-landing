import { Button } from '@/components/ui/button'
import { ShieldCheck, Zap, Server, ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { trackCallClick } from '@/lib/analytics'

const PHONE_E164 = '+61402229561'
const PHONE_DISPLAY = '+61 402 229 561'

const trustBadges = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Zap, label: '12+ Years Experience' },
  { icon: Server, label: 'Multi-Vendor Certified' },
]

export function Hero() {
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-black"
    >
      {/* Background video / poster */}
      {!prefersReducedMotion ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-background.webm" type="video/webm" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-poster.jpg)' }}
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50" />

      {/* Subtle decorative blob */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full blur-3xl z-[1] bg-white/5" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center py-4 md:py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 border bg-vivcom-green/15 border-vivcom-green/30 text-vivcom-green">
            <span className="flex h-2 w-2 rounded-full bg-vivcom-green" />
            Full-Stack Technology Services in Sydney
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-8 leading-[1.1] text-white">
            From physical installs to{' '}
            <span className={cn('text-transparent bg-clip-text bg-gradient-to-r from-vivcom-green to-white')}>
              enterprise automation.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-slate-200">
            VIVCOM bridges the gap between local low-voltage installations
            and advanced IT consulting. We secure your premises and automate
            your infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full gap-2 bg-vivcom-green hover:bg-vivcom-green/90 text-vivcom-dark-blue">
              <a href="#contact">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/50 text-white bg-white/10 hover:bg-white/20">
              <a href={`tel:${PHONE_E164}`} onClick={() => trackCallClick()}>
                Call Now &middot; {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 md:gap-16">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 font-medium text-slate-200">
              <Icon className="w-5 h-5 text-vivcom-green" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
