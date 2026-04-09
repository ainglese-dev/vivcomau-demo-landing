import { useMemo, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { trackFormSubmission, trackCallClick, trackWhatsAppClick, getUtmParams } from '@/lib/analytics'

export function Contact() {
  const utmParams = useMemo(() => {
    const stored = getUtmParams()
    if (stored) {
      return {
        source: stored.source ?? '',
        medium: stored.medium ?? '',
        campaign: stored.campaign ?? '',
      }
    }
    const params = new URLSearchParams(window.location.search)
    return {
      source: params.get('utm_source') ?? '',
      medium: params.get('utm_medium') ?? '',
      campaign: params.get('utm_campaign') ?? '',
    }
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    trackFormSubmission()
    // TODO: wire to Formspree or Cloudflare Worker (PRD §11 item 6)
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-vivcom-dark-blue mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-foreground">
            Request a free quote or schedule a consultation. We typically respond
            within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-muted/50 p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-vivcom-dark-blue mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-vivcom-blue/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-vivcom-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Call Us
                    </p>
                    <a
                      href="tel:+61402229561"
                      onClick={() => trackCallClick()}
                      className="text-lg font-semibold text-vivcom-dark-blue hover:text-vivcom-blue transition-colors"
                    >
                      +61 402 229 561
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-vivcom-green/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-vivcom-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/61402229561?text=Hi%20VIVCOM%2C%20I%27d%20like%20a%20quote%20for..."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick()}
                      className="text-lg font-semibold text-vivcom-dark-blue hover:text-vivcom-green transition-colors"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-vivcom-light-blue/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-vivcom-light-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Service Area
                    </p>
                    <p className="text-lg font-semibold text-vivcom-dark-blue">
                      Sydney, NSW & Global Remote
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              className="bg-background p-8 rounded-2xl border border-border shadow-sm"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="utm_source" value={utmParams.source} />
              <input type="hidden" name="utm_medium" value={utmParams.medium} />
              <input type="hidden" name="utm_campaign" value={utmParams.campaign} />

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+61 400 000 000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Interest</Label>
                  <Select name="service">
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cctv">CCTV & Security</SelectItem>
                      <SelectItem value="av">AV Installation</SelectItem>
                      <SelectItem value="telecom">
                        Telecom & Cabling
                      </SelectItem>
                      <SelectItem value="automation">
                        Network Automation
                      </SelectItem>
                      <SelectItem value="compliance">
                        Compliance & AI
                      </SelectItem>
                      <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  className="min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12 whitespace-nowrap"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
