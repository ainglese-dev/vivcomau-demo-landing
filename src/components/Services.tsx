import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, Tv, Network, ServerCog, ShieldAlert, Cloud } from 'lucide-react'

const localServices = [
  {
    id: 'cctv',
    title: 'CCTV & Security Systems',
    description:
      'Security camera and alarm system installation for homes and offices. Remote monitoring setup with long-term warranty.',
    icon: Camera,
  },
  {
    id: 'av',
    title: 'Audio Visual Installation',
    description:
      'TV wall mounting, cable concealment, home theater, and professional office conference room setups.',
    icon: Tv,
  },
  {
    id: 'telecom',
    title: 'Telecom & Cabling',
    description:
      'Structured cabling (Cat6/6A, fiber), data point installation, and office network troubleshooting.',
    icon: Network,
  },
]

const consultingServices = [
  {
    id: 'automation',
    title: 'Network & DC Automation',
    description:
      'Datacenter fabric design (VXLAN EVPN, ACI), Infrastructure as Code (Ansible, Terraform), and legacy migration.',
    icon: ServerCog,
  },
  {
    id: 'compliance',
    title: 'Compliance & AI Governance',
    description:
      'US compliance verticals (HIPAA, PCI-DSS), industrial security (IEC 62443), and ISO 42001 AI Governance advisory.',
    icon: ShieldAlert,
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description:
      'AWS/Azure architecture, Kubernetes infrastructure, CI/CD pipeline design, and hybrid cloud connectivity.',
    icon: Cloud,
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
      className="border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
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
