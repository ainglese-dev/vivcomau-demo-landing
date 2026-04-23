import { useMemo, useRef, useState } from 'react'
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
import { MapPin } from 'lucide-react'
import { trackFormSubmission, getUtmParams } from '@/lib/analytics'

function generateCaptcha() {
  return {
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1,
  }
}

export function Contact() {
  const [honeypot, setHoneypot] = useState('')
  const formLoadTime = useRef(Date.now())
  const [captcha, setCaptcha] = useState(generateCaptcha)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState(false)

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

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()

    // Honeypot: real users never fill this field
    if (honeypot) return

    // Time check: bots submit instantly; require ≥3s
    if (Date.now() - formLoadTime.current < 3000) return

    // Math CAPTCHA check
    if (parseInt(captchaAnswer) !== captcha.a + captcha.b) {
      setCaptchaError(true)
      setCaptcha(generateCaptcha())
      setCaptchaAnswer('')
      return
    }

    setCaptchaError(false)
    trackFormSubmission()
    // TODO: wire to Formspree or Cloudflare Worker (PRD §11 item 6)
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-foreground">
            Send us a message and we'll call you to discuss your project and arrange a meeting.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-muted/50 p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-black mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-vivcom-light-blue/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-vivcom-light-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Service Area
                    </p>
                    <p className="text-lg font-semibold text-black">
                      Sydney, Australia & Florida, United States
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
                      <SelectItem value="cctv">CCTV & Security Cameras</SelectItem>
                      <SelectItem value="telecom">Network & Data Cabling</SelectItem>
                      <SelectItem value="wireless">Wireless & Wi-Fi</SelectItem>
                      <SelectItem value="security">Security & Alarm Systems</SelectItem>
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

              {/* Math CAPTCHA */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="captcha">Security Check *</Label>
                <p className="text-sm text-muted-foreground">
                  What is {captcha.a} + {captcha.b}?
                </p>
                <Input
                  id="captcha"
                  name="captcha"
                  type="number"
                  placeholder="Enter the answer"
                  value={captchaAnswer}
                  onChange={e => { setCaptchaAnswer(e.target.value); setCaptchaError(false) }}
                  required
                />
                {captchaError && (
                  <p className="text-sm text-destructive">Incorrect answer, please try again.</p>
                )}
              </div>

              {/* Honeypot — hidden from real users, bots fill this */}
              <div
                aria-hidden="true"
                className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
                style={{ left: '-9999px', top: 'auto' }}
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12 whitespace-nowrap bg-black text-white hover:bg-zinc-800"
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
