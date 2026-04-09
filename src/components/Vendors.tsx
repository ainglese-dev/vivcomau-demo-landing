const lowVoltageVendors = [
  'Hikvision',
  'Dahua',
  'Ubiquiti',
  'Axis',
  'Bosch',
  'CommScope',
]

const networkingVendors = [
  'Cisco',
  'Juniper',
  'Arista',
  'Palo Alto',
  'Fortinet',
  'AWS',
]

export function Vendors() {
  return (
    <section
      className="py-16 bg-muted/30 border-y border-border"
      aria-label="Trusted Vendors & Partners"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-vivcom-dark-blue mb-3">
            Trusted Vendors & Partners
          </h2>
          <p className="text-foreground">
            We work with industry-leading technology providers to deliver
            reliable solutions.
          </p>
        </div>

        <div className="space-y-10 max-w-5xl mx-auto">
          <TickerRow
            label="Low Voltage & Physical Install"
            vendors={lowVoltageVendors}
            dotColor="bg-vivcom-blue"
          />
          <TickerRow
            label="Networking & Automation"
            vendors={networkingVendors}
            dotColor="bg-vivcom-green"
            reverse
          />
        </div>
      </div>
    </section>
  )
}

function TickerRow({
  label,
  vendors,
  dotColor,
  reverse = false,
}: {
  label: string
  vendors: string[]
  dotColor: string
  reverse?: boolean
}) {
  // Triple the list for seamless looping on wide screens
  const repeated = [...vendors, ...vendors, ...vendors]

  return (
    <div>
      <h3 className="text-sm font-semibold text-vivcom-dark-blue mb-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        {label}
      </h3>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className={`flex gap-10 w-max hover:[animation-play-state:paused] ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {repeated.map((vendor, i) => (
            <span
              key={`${vendor}-${i}`}
              className="shrink-0 px-5 py-2.5 bg-background text-vivcom-dark-blue text-sm font-medium rounded-lg border border-border shadow-sm whitespace-nowrap"
            >
              {vendor}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
