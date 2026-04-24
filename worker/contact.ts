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

function escHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildEmailHtml(params: {
  name: string; email: string; phone: string; service: string
  message: string; utm_source: string; utm_medium: string; utm_campaign: string
}): string {
  const { name, email, phone, service, message, utm_source, utm_medium, utm_campaign } = params
  const e = escHtml

  const fieldRows = [
    ['Name',    e(name)],
    ['Email',   `<a href="mailto:${e(email)}" style="color:#004aad;text-decoration:none">${e(email)}</a>`],
    phone   ? ['Phone',   `<a href="tel:${e(phone)}" style="color:#004aad;text-decoration:none">${e(phone)}</a>`]   : null,
    service ? ['Service', `<span style="background:#e8f0fb;color:#004aad;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600">${e(service)}</span>`] : null,
  ].filter(Boolean) as [string, string][]

  const tdLabel = `style="padding:10px 16px;color:#666666;font-size:13px;white-space:nowrap;vertical-align:top;width:80px;border-bottom:1px solid #f0f2f5"`
  const tdValue = `style="padding:10px 16px;color:#111;font-size:14px;vertical-align:top;border-bottom:1px solid #f0f2f5"`
  const rowsHtml = fieldRows.map(([l, v]) => `<tr><td ${tdLabel}>${l}</td><td ${tdValue}>${v}</td></tr>`).join('')

  const messageBlock = message ? `
    <div style="margin-top:20px">
      <div style="font-size:12px;font-weight:600;color:#666666;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Message</div>
      <div style="background:#f8f9fb;border-left:3px solid #00c2cb;border-radius:4px;padding:12px 16px;font-size:14px;color:#333;white-space:pre-wrap;line-height:1.6">${e(message)}</div>
    </div>` : ''

  const utmBlock = (utm_source || utm_medium || utm_campaign) ? `
    <div style="margin-top:14px;padding:10px 14px;background:#f0f2f5;border-radius:6px;font-size:12px;color:#666666">
      <span style="font-weight:600">UTMs:</span> ${e([utm_source, utm_medium, utm_campaign].filter(Boolean).join(' / '))}
    </div>` : ''

  return `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:system-ui,-apple-system,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2f5;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">
  <tr>
    <td style="background:#002352;padding:22px 28px;border-radius:10px 10px 0 0">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td><span style="color:#fff;font-size:20px;font-weight:700;letter-spacing:.08em">VIVCOM</span>
            <span style="display:inline-block;margin-left:10px;color:#00c2cb;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;vertical-align:middle">New Lead</span></td>
        <td align="right"><span style="color:rgba(255,255,255,.4);font-size:11px">vivcom.com.au</span></td>
      </tr></table>
    </td>
  </tr>
  <tr><td style="background:#00c2cb;height:3px;line-height:3px;font-size:0">&nbsp;</td></tr>
  <tr>
    <td style="background:#fff;padding:28px;border-radius:0 0 10px 10px">
      <h2 style="margin:0 0 20px;font-size:17px;color:#002352;font-weight:600">
        ${e(name)}${service ? ` <span style="color:#cad0d8;font-weight:400">/</span> <span style="color:#3274ba">${e(service)}</span>` : ''}
      </h2>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #f0f2f5;border-radius:8px;overflow:hidden">
        ${rowsHtml}
      </table>
      ${messageBlock}
      ${utmBlock}
    </td>
  </tr>
  <tr>
    <td style="padding:20px 0 4px;text-align:center;color:#cad0d8;font-size:12px">
      Sent via <a href="https://vivnotify.com" style="color:#00c2cb;text-decoration:none;font-weight:500">VIVNotify</a> &middot; Automated lead notification
    </td>
  </tr>
</table>
</td></tr></table>
</body></html>`
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

  if (env.EMAIL && env.NOTIFY_EMAILS) {
    const recipients = env.NOTIFY_EMAILS.split(',').map(s => s.trim()).filter(Boolean)
    const subject = `New VIVCOM lead — ${name}${service ? ` / ${service}` : ''}`
    const text = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      phone   ? `Phone:   ${phone}`   : null,
      service ? `Service: ${service}` : null,
      message ? `\nMessage:\n${message}` : null,
      (utm_source || utm_medium || utm_campaign)
        ? `\nUTMs: ${[utm_source, utm_medium, utm_campaign].filter(Boolean).join(' / ')}`
        : null,
    ].filter((l) => l !== null).join('\n')

    const html = buildEmailHtml({ name, email, phone, service, message, utm_source, utm_medium, utm_campaign })

    for (const to of recipients) {
      try {
        await env.EMAIL.send({
          from: { email: 'hello@vivnotify.com', name: 'VIVNotify' },
          to,
          subject,
          text,
          html,
        })
      } catch (err) {
        console.error(`[contact] email notify failed for ${to}`, err)
      }
    }
  }

  return json(200, { ok: true })
}
