import type { Env } from './index'

const ALLOWED_SERVICES = new Set([
  'cctv',
  'telecom',
  'wireless',
  'security',
  'automation',
  'compliance',
  'cloud',
  'other',
  '',
])

const LIMITS = {
  name: 100,
  email: 120,
  phone: 30,
  service: 20,
  message: 2000,
  utm: 200,
  captcha: 10,
} as const

type Payload = {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  website?: string
  captcha?: string
  captcha_expected?: string
  turnstileToken?: string
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function sanitize(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  // Strip ASCII control characters (keep \t \n \r) to prevent log/header injection.
  // eslint-disable-next-line no-control-regex
  return v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, max)
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= LIMITS.email
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  })
  const data = (await res.json()) as { success: boolean }
  return data.success === true
}


export async function handleContact(request: Request, env: Env): Promise<Response> {
  const ct = request.headers.get('content-type') ?? ''
  if (!ct.includes('application/json')) {
    return json(415, { error: 'Content-Type must be application/json' })
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }

  // Honeypot — bots fill hidden fields
  if (body.website && body.website.trim() !== '') {
    return json(204, {})
  }

  // Turnstile (optional until key is provisioned)
  if (env.TURNSTILE_SECRET_KEY) {
    if (!body.turnstileToken) {
      return json(400, { error: 'Missing Turnstile token' })
    }
    const ip = request.headers.get('CF-Connecting-IP') ?? ''
    const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, ip)
    if (!ok) return json(403, { error: 'Turnstile verification failed' })
  }

  const name = sanitize(body.name, LIMITS.name)
  const email = sanitize(body.email, LIMITS.email)
  const phone = sanitize(body.phone, LIMITS.phone)
  const service = sanitize(body.service, LIMITS.service).toLowerCase()
  const message = sanitize(body.message, LIMITS.message)
  const utm_source = sanitize(body.utm_source, LIMITS.utm)
  const utm_medium = sanitize(body.utm_medium, LIMITS.utm)
  const utm_campaign = sanitize(body.utm_campaign, LIMITS.utm)

  if (!name) return json(400, { error: 'Name is required' })
  if (!isEmail(email)) return json(400, { error: 'Valid email is required' })
  if (service && !ALLOWED_SERVICES.has(service)) {
    return json(400, { error: 'Invalid service' })
  }

  // Client-side math CAPTCHA: server re-checks if client supplied expected sum
  if (body.captcha !== undefined && body.captcha_expected !== undefined) {
    const answer = sanitize(body.captcha, LIMITS.captcha)
    const expected = sanitize(body.captcha_expected, LIMITS.captcha)
    if (!answer || !expected || answer !== expected) {
      return json(400, { error: 'Incorrect security check' })
    }
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? ''
  const ua = request.headers.get('User-Agent') ?? ''

  try {
    await env.DB.prepare(
      `INSERT INTO submissions
         (name, email, phone, service, message, utm_source, utm_medium, utm_campaign, ip, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        name,
        email,
        phone || null,
        service || null,
        message || null,
        utm_source || null,
        utm_medium || null,
        utm_campaign || null,
        ip,
        ua
      )
      .run()
  } catch (err) {
    console.error('[contact] D1 insert failed', err)
  }

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const lines = [
      `🔔 <b>New VIVCOM lead</b>`,
      ``,
      `👤 <b>${name}</b>`,
      `📧 ${email}`,
      phone ? `📞 ${phone}` : null,
      service ? `🔧 ${service}` : null,
      message ? `\n💬 ${message}` : null,
      (utm_source || utm_medium || utm_campaign)
        ? `\n📊 ${[utm_source, utm_medium, utm_campaign].filter(Boolean).join(' / ')}`
        : null,
    ].filter((l) => l !== null).join('\n')

    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN.trim()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID.trim(), text: lines, parse_mode: 'HTML' }),
      })
      if (!tgRes.ok) console.error('[contact] Telegram error', tgRes.status, await tgRes.text())
    } catch (err) {
      console.error('[contact] Telegram notify failed', err)
    }
  }

  return json(200, { ok: true })
}
