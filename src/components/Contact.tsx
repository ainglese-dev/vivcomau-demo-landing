import { useEffect, useMemo, useRef, useState } from 'react'
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

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, params: {
        sitekey: string
        callback: (token: string) => void
        'error-callback'?: () => void
        'expired-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
      }) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export function Contact() {
  const [honeypot, setHoneypot] = useState('')
  const [formLoadTime] = useState(() => Date.now())
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: 'idle' })

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileError, setTurnstileError] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.defer = true
    script.onload = () => {
      if (turnstileRef.current && window.turnstile) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA',
          callback: (token) => { setTurnstileToken(token); setTurnstileError(false) },
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => { setTurnstileToken(null); setTurnstileError(true) },
        })
      }
    }
    document.head.appendChild(script)
    return () => {
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
      document.head.removeChild(script)
    }
  }, [])

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

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault()

    if (honeypot) return
    if (Date.now() - formLoadTime < 3000) return

    if (!turnstileToken) {
      setTurnstileError(true)
      return
    }

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      service: String(fd.get('service') ?? ''),
      message: String(fd.get('message') ?? ''),
      utm_source: utmParams.source,
      utm_medium: utmParams.medium,
      utm_campaign: utmParams.campaign,
      website: honeypot,
      turnstileToken,
    }

    setSubmitState({ kind: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setSubmitState({
          kind: 'error',
          message: data.error ?? 'Something went wrong. Please try again.',
        })
        return
      }
      trackFormSubmission()
      setSubmitState({ kind: 'success' })
      form.reset()
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
      setTurnstileToken(null)
    } catch {
      setSubmitState({
        kind: 'error',
        message: 'Network error. Please try again or call us directly.',
      })
    }
  }

  const isSubmitting = submitState.kind === 'submitting'

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
                  <Input id="name" name="name" placeholder="John Doe" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    maxLength={120}
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
                    maxLength={30}
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

              <div className="space-y-2 mb-6">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  className="min-h-[120px]"
                  maxLength={2000}
                />
              </div>

              {/* Turnstile widget */}
              <div className="mb-6 flex flex-col items-center">
                <div ref={turnstileRef} />
                {turnstileError && (
                  <p className="mt-2 text-sm text-destructive">
                    Please complete the security check.
                  </p>
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
                disabled={isSubmitting}
                className="w-full text-base h-12 whitespace-nowrap bg-black text-white hover:bg-zinc-800"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>

              {submitState.kind === 'success' && (
                <p className="mt-4 text-sm text-green-700" role="status">
                  Thanks — we received your message and will be in touch shortly.
                </p>
              )}
              {submitState.kind === 'error' && (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {submitState.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
