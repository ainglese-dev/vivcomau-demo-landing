import { Mail, MapPin } from 'lucide-react'
import { PrivacyPolicyDialog } from '@/components/legal/PrivacyPolicyDialog'
import { CookiePolicyDialog } from '@/components/legal/CookiePolicyDialog'

export function Footer() {
  return (
    <footer className="bg-black text-white/70 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img src="/vivcom-logo.svg" alt="VIVCOM" className="h-10 w-auto" />
            </div>
            <p className="text-white/50 mb-6 max-w-md">
              Full-stack technology services for Sydney and beyond. From physical
              security installations to enterprise network automation and
              compliance.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>ABN: 30 667 158 938</span>
              <span>&middot;</span>
              <span>Licensed & Insured</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#cctv" className="hover:text-vivcom-green transition-colors">
                  Security Cameras
                </a>
              </li>
              <li>
                <a href="#wireless" className="hover:text-vivcom-green transition-colors">
                  Wireless & Wi-Fi
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-vivcom-green transition-colors">
                  Security & Alarm Systems
                </a>
              </li>
              <li>
                <a href="#telecom" className="hover:text-vivcom-green transition-colors">
                  Network & Data Cabling
                </a>
              </li>
              <li>
                <a href="#automation" className="hover:text-vivcom-green transition-colors">
                  Data Centre Automation
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-vivcom-green transition-colors">
                  Cybersecurity & Compliance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-vivcom-green shrink-0" />
                <a
                  href="mailto:contact@vivcom.com.au"
                  className="hover:text-white transition-colors"
                >
                  contact@vivcom.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vivcom-green shrink-0" />
                <span>
                  Sydney, Australia
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
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <PrivacyPolicyDialog>
              <button className="hover:text-white transition-colors">
                Privacy Policy
              </button>
            </PrivacyPolicyDialog>
            <CookiePolicyDialog>
              <button className="hover:text-white transition-colors">
                Cookie Policy
              </button>
            </CookiePolicyDialog>
          </div>
        </div>
      </div>
    </footer>
  )
}
