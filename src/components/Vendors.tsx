import { Card, CardContent } from '@/components/ui/card'

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
    <section className="py-16 bg-muted/30 border-y border-border">
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

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-border shadow-sm bg-background">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-vivcom-dark-blue mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-vivcom-blue" />
                Low Voltage & Physical Install
              </h3>
              <div className="flex flex-wrap gap-2">
                {lowVoltageVendors.map((vendor) => (
                  <span
                    key={vendor}
                    className="px-3 py-1.5 bg-muted text-vivcom-dark-blue text-sm font-medium rounded-md border border-border"
                  >
                    {vendor}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm bg-background">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-vivcom-dark-blue mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-vivcom-green" />
                Networking & Automation
              </h3>
              <div className="flex flex-wrap gap-2">
                {networkingVendors.map((vendor) => (
                  <span
                    key={vendor}
                    className="px-3 py-1.5 bg-muted text-vivcom-dark-blue text-sm font-medium rounded-md border border-border"
                  >
                    {vendor}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
