import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-vivcom-dark-blue text-white/70 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="font-bold text-2xl tracking-tighter text-white mb-4">
              VIV<span className="text-vivcom-green">COM</span>
            </div>
            <p className="text-white/50 mb-6 max-w-md">
              Full-stack technology services for Sydney and beyond. From physical
              security installations to enterprise network automation and
              compliance.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>ABN: Pending</span>
              <span>&middot;</span>
              <span>Licensed & Insured</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#cctv"
                  className="hover:text-vivcom-green transition-colors"
                >
                  CCTV & Security
                </a>
              </li>
              <li>
                <a
                  href="#av"
                  className="hover:text-vivcom-green transition-colors"
                >
                  Audio Visual
                </a>
              </li>
              <li>
                <a
                  href="#telecom"
                  className="hover:text-vivcom-green transition-colors"
                >
                  Telecom & Cabling
                </a>
              </li>
              <li>
                <a
                  href="#automation"
                  className="hover:text-vivcom-green transition-colors"
                >
                  Network Automation
                </a>
              </li>
              <li>
                <a
                  href="#compliance"
                  className="hover:text-vivcom-green transition-colors"
                >
                  Compliance & AI
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-vivcom-green shrink-0" />
                <a
                  href="tel:+61402229561"
                  className="hover:text-white transition-colors"
                >
                  +61 402 229 561
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-vivcom-green shrink-0" />
                <a
                  href="mailto:hello@vivcom.com.au"
                  className="hover:text-white transition-colors"
                >
                  hello@vivcom.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vivcom-green shrink-0" />
                <span>
                  Sydney, NSW
                  <br />
                  Australia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} VIVCOM PTY LTD. All rights
            reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Powered by{' '}
            <a
              href="https://viv53.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              VIV53
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
