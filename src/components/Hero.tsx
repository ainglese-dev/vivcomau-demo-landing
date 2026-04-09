import { Button } from '@/components/ui/button'
import { ShieldCheck, Zap, Server, ArrowRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useState, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'

const PHONE_E164 = '+61402229561'
const PHONE_DISPLAY = '+61 402 229 561'

const slideThemes = [
  {
    // Slide 1 — brand gradient
    bg: 'bg-gradient-to-br from-vivcom-dark-blue via-vivcom-blue to-vivcom-green',
    blob: 'bg-vivcom-green/20',
    badge: 'bg-vivcom-green/15 border-vivcom-green/30 text-vivcom-green',
    dot: 'bg-vivcom-green',
    heading: 'text-white',
    span: 'text-transparent bg-clip-text bg-gradient-to-r from-vivcom-green to-white',
    body: 'text-slate-200',
    primaryBtn: 'bg-vivcom-green hover:bg-vivcom-green/90 text-vivcom-dark-blue',
    outlineBtn: 'border-white/50 text-white bg-white/10 hover:bg-white/20',
    trust: 'text-slate-200',
    trustIcon: 'text-vivcom-green',
    border: 'border-white/20',
  },
  {
    // Slide 2 — dark blue, security
    bg: 'bg-vivcom-dark-blue',
    blob: 'bg-vivcom-light-blue/25',
    badge: 'bg-vivcom-light-blue/15 border-vivcom-light-blue/30 text-vivcom-light-blue',
    dot: 'bg-vivcom-light-blue',
    heading: 'text-white',
    span: 'text-vivcom-green',
    body: 'text-vivcom-grey',
    primaryBtn: 'bg-vivcom-green hover:bg-vivcom-green/90 text-vivcom-dark-blue',
    outlineBtn: 'border-vivcom-grey/40 text-vivcom-grey hover:bg-white/10',
    trust: 'text-vivcom-grey',
    trustIcon: 'text-vivcom-light-blue',
    border: 'border-white/20',
  },
  {
    // Slide 3 — light, enterprise
    bg: 'bg-gradient-to-br from-slate-50 via-white to-vivcom-grey/30',
    blob: 'bg-vivcom-blue/10',
    badge: 'bg-vivcom-blue/10 border-vivcom-blue/20 text-vivcom-blue',
    dot: 'bg-vivcom-blue',
    heading: 'text-vivcom-dark-blue',
    span: 'text-transparent bg-clip-text bg-gradient-to-r from-vivcom-blue to-vivcom-green',
    body: 'text-vivcom-body',
    primaryBtn: 'bg-vivcom-blue hover:bg-vivcom-blue/90 text-white',
    outlineBtn: 'border-vivcom-blue/30 text-vivcom-blue hover:bg-vivcom-blue/5',
    trust: 'text-vivcom-body',
    trustIcon: 'text-vivcom-blue',
    border: 'border-vivcom-grey',
  },
]

const trustBadges = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: Zap, label: '12+ Years Experience' },
  { icon: Server, label: 'Multi-Vendor Certified' },
]

export function Hero() {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()
  const [active, setActive] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setActive(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  const t = slideThemes[active] ?? slideThemes[0]

  return (
    <section
      id="hero"
      className={cn(
        'relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 transition-all duration-700',
        t.bg,
      )}
    >
      {/* Decorative blob */}
      <div
        className={cn(
          'absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full blur-3xl -z-10 transition-colors duration-700',
          t.blob,
        )}
      />

      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{ loop: true }}
          setApi={setApi}
        >
          <CarouselContent>
            {/* Slide 1: Brand Hero */}
            <CarouselItem>
              <div className="max-w-4xl mx-auto text-center py-4 md:py-10">
                <div
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-8 border',
                    slideThemes[0].badge,
                  )}
                >
                  <span className={cn('flex h-2 w-2 rounded-full', slideThemes[0].dot)} />
                  Full-Stack Technology Services in Sydney
                </div>

                <h1
                  className={cn(
                    'text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-8 leading-[1.1]',
                    slideThemes[0].heading,
                  )}
                >
                  From physical installs to{' '}
                  <span className={slideThemes[0].span}>enterprise automation.</span>
                </h1>

                <p className={cn('text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed', slideThemes[0].body)}>
                  VIVCOM bridges the gap between local low-voltage installations
                  and advanced IT consulting. We secure your premises and automate
                  your infrastructure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className={cn('rounded-full gap-2', slideThemes[0].primaryBtn)}>
                    <a href="#contact">
                      Get a Free Quote
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className={cn('rounded-full', slideThemes[0].outlineBtn)}>
                    <a href={`tel:${PHONE_E164}`}>
                      Call Now &middot; {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2: CCTV/Security — Text Left + Image Right */}
            <CarouselItem>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-4 md:py-10">
                <div className="text-left order-2 md:order-1">
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border',
                      slideThemes[1].badge,
                    )}
                  >
                    <span className={cn('flex h-2 w-2 rounded-full', slideThemes[1].dot)} />
                    Commercial & Residential
                  </div>
                  <h1 className={cn('text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]', slideThemes[1].heading)}>
                    Expert <span className={slideThemes[1].span}>CCTV & AV</span> Installations.
                  </h1>
                  <p className={cn('text-lg mb-8 leading-relaxed', slideThemes[1].body)}>
                    Protect your property with state-of-the-art security systems
                    and elevate your spaces with professional audio-visual setups.
                  </p>
                  <Button asChild size="lg" className={cn('rounded-full gap-2', slideThemes[1].primaryBtn)}>
                    <a href="#services">
                      Explore Services
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
                <div className="relative aspect-video md:aspect-square lg:aspect-video rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2 ring-1 ring-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop"
                    alt="Security camera installation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Automation — Image Left + Text Right */}
            <CarouselItem>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-4 md:py-10">
                <div className="relative aspect-video md:aspect-square lg:aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-vivcom-blue/10">
                  <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
                    alt="Data centre automation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-left md:pl-8">
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border',
                      slideThemes[2].badge,
                    )}
                  >
                    <span className={cn('flex h-2 w-2 rounded-full', slideThemes[2].dot)} />
                    Enterprise IT Consulting
                  </div>
                  <h1 className={cn('text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]', slideThemes[2].heading)}>
                    Next-Gen <span className={slideThemes[2].span}>Network Automation.</span>
                  </h1>
                  <p className={cn('text-lg mb-8 leading-relaxed', slideThemes[2].body)}>
                    Modernise your infrastructure with VXLAN EVPN fabrics,
                    Infrastructure as Code, and robust compliance frameworks.
                  </p>
                  <Button asChild size="lg" className={cn('rounded-full gap-2', slideThemes[2].primaryBtn)}>
                    <a href="#contact">
                      Consult with an Expert
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 lg:-left-12 bg-white/20 hover:bg-white/40 border-none shadow-md backdrop-blur-sm" />
            <CarouselNext className="-right-4 lg:-right-12 bg-white/20 hover:bg-white/40 border-none shadow-md backdrop-blur-sm" />
          </div>
        </Carousel>

        {/* Trust badges */}
        <div className={cn('mt-12 pt-8 border-t flex flex-wrap justify-center gap-8 md:gap-16 transition-colors duration-700', t.border)}>
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className={cn('flex items-center gap-2 font-medium transition-colors duration-700', t.trust)}
            >
              <Icon className={cn('w-5 h-5 transition-colors duration-700', t.trustIcon)} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
