import { Shield, Award, Clock, Globe } from 'lucide-react'

const features = [
  {
    title: '12+ Years Experience',
    description: 'Over a decade of hands-on experience in the Sydney market.',
    icon: Clock,
  },
  {
    title: 'Licensed & Insured',
    description:
      'Fully certified professionals ensuring compliance and safety.',
    icon: Shield,
  },
  {
    title: 'Multi-Vendor Certified',
    description:
      'Expertise across Cisco, Juniper, Arista, and major security brands.',
    icon: Award,
  },
  {
    title: 'Local & Global Reach',
    description:
      'On-site in Sydney, remote consulting worldwide via VIV53.',
    icon: Globe,
  },
]

export function WhyVivcom() {
  return (
    <section id="why" className="py-16 bg-vivcom-green/5 border-y border-vivcom-green/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-vivcom-blue" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
