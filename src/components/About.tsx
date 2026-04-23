import { CheckCircle2 } from 'lucide-react'

const benefits = [
  '12+ years of local Sydney experience',
  'Fully licensed and insured professionals',
  'Enterprise-grade consulting capabilities',
  'Client-first values, enterprise results',
  'Multi-vendor certified engineers',
  'Long-term warranty on installations',
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivcom-green/10 text-vivcom-blue text-sm font-medium mb-6">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-vivcom-dark-blue mb-6">
              Local Roots. <br />
              <span className="text-vivcom-green">Global Expertise.</span>
            </h2>
            <div className="space-y-4 text-lg text-foreground mb-8">
              <p>
                VIVCOM has been a trusted name in Sydney for over 12 years,
                delivering high-quality low-voltage and telecom services. Founded
                in Sydney, we've built our reputation on reliability
                and craftsmanship.
              </p>
              <p>
                Today, VIVCOM has expanded its capabilities by partnering with
                VIV53 LLC (Miami), bringing enterprise IT consulting, datacenter
                automation, and compliance advisory to the Australian market.
              </p>
              <p className="font-medium text-vivcom-dark-blue">
                Whether you need a home security system or a VXLAN EVPN
                datacenter fabric, we are your full-stack technology partner.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-vivcom-green shrink-0 mt-0.5" />
                  <span className="text-vivcom-dark-blue text-sm font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                alt="VIVCOM engineers working in a datacenter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vivcom-dark-blue/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-xl mb-1">Trusted Specialists</p>
                <p className="text-white/80">12+ Years of Excellence</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-vivcom-green rounded-full opacity-10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-vivcom-blue rounded-full opacity-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
