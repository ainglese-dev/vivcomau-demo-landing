import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, Tv, Network, ServerCog, ShieldAlert, Cloud } from 'lucide-react'

const localServices = [
  {
    id: 'cctv',
    title: 'Security Camera Installation',
    description:
      'Protect your home and business with professional security camera systems. Includes remote monitoring setup, HD night vision, and a long-term installation warranty.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop',
  },
  {
    id: 'av',
    title: 'TV Mounting & Home Theatre',
    description:
      'Expert TV wall mounting with concealed cabling, surround sound setup, and professional conference room AV for offices.',
    icon: Tv,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
  },
  {
    id: 'telecom',
    title: 'Network & Data Cabling',
    description:
      'Structured cabling (Cat6/6A, fibre), data point installation, and office network troubleshooting by certified technicians.',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  },
]

const consultingServices = [
  {
    id: 'automation',
    title: 'Data Centre Automation',
    description:
      'Modernise your infrastructure with VXLAN EVPN fabric design, Infrastructure as Code (Ansible, Terraform), and legacy migration.',
    icon: ServerCog,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 'compliance',
    title: 'Cybersecurity & Compliance',
    description:
      'Navigate complex compliance frameworks — HIPAA, PCI-DSS, IEC 62443, and ISO 42001 AI Governance advisory for regulated industries.',
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description:
      'AWS and Azure architecture, Kubernetes platform engineering, CI/CD pipeline design, and hybrid cloud connectivity.',
    icon: Cloud,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  },
]

function ServiceCard({
  service,
  accentClass,
}: {
  service: (typeof localServices)[number]
  accentClass: string
}) {
  const Icon = service.icon
  return (
    <Card
      id={service.id}
      className="border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="pt-6">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${accentClass}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base text-foreground">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-vivcom-dark-blue mb-4">
            Our Services
          </h2>
          <p className="text-lg text-foreground">
            From local physical installations in Sydney to global enterprise
            consulting. We deliver end-to-end technology solutions.
          </p>
        </div>

        {/* Tier 1: Local Installs */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-vivcom-dark-blue">
              Local Installations
            </h3>
            <div className="h-px bg-border flex-1" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Sydney Area
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {localServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                accentClass="bg-vivcom-blue/10 text-vivcom-blue"
              />
            ))}
          </div>
        </div>

        {/* Tier 2: Consulting & Automation */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-vivcom-dark-blue">
              Consulting & Automation
            </h3>
            <div className="h-px bg-border flex-1" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Global Reach
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {consultingServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                accentClass="bg-vivcom-light-blue/10 text-vivcom-light-blue"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
