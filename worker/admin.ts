import type { Env } from './index'

const SERVICE_LABELS: Record<string, string> = {
  cctv: 'CCTV & Security Cameras',
  telecom: 'Network & Data Cabling',
  wireless: 'Wireless & Wi-Fi',
  security: 'Security & Alarm Systems',
  automation: 'Network Automation',
  compliance: 'Compliance & AI',
  cloud: 'Cloud & DevOps',
  other: 'Other',
}

type Submission = {
  id: number
  created_at: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  ip: string | null
  user_agent: string | null
}

function esc(v: string | null | undefined): string {
  if (!v) return ''
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function td(v: string | null | undefined, cls = ''): string {
  return `<td class="${cls}">${esc(v)}</td>`
}

function row(s: Submission): string {
  const date = s.created_at.replace('T', ' ').slice(0, 16)
  const serviceLabel = s.service ? (SERVICE_LABELS[s.service] ?? s.service) : null
  return `<tr>
    ${td(date, 'mono')}
    ${td(s.name)}
    ${td(s.email, 'mono')}
    ${td(s.phone)}
    <td>${serviceLabel ? `<span class="badge">${esc(serviceLabel)}</span>` : ''}</td>
    <td class="msg">${esc(s.message)}</td>
    ${td([s.utm_source, s.utm_medium, s.utm_campaign].filter(Boolean).join(' / '))}
    ${td(s.ip, 'mono')}
  </tr>`
}

function page(rows: string, count: number): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>VIVCOM — Submissions</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }
  body { font: 15px/1.5 system-ui, sans-serif; background: #f0f2f5; color: #111 }

  /* Top bar */
  .topbar {
    background: #002352;
    color: #fff;
    padding: .75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0,0,0,.25);
  }
  .topbar-title { font-size: 1rem; font-weight: 700; letter-spacing: .02em }
  .topbar-title span { color: #00c2cb; margin-right: .35rem }
  .logout {
    font-size: .8rem;
    color: #fff;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,.45);
    border-radius: 999px;
    padding: .3rem .85rem;
    transition: background .15s, border-color .15s;
  }
  .logout:hover { background: rgba(255,255,255,.15); border-color: #fff }

  /* Content */
  .content { padding: 1.75rem 1.5rem; max-width: 1400px; margin: 0 auto }
  .subhead { font-size: .85rem; color: #666; margin-bottom: 1.25rem }

  /* Table */
  .wrap { overflow-x: auto; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.1) }
  table { border-collapse: collapse; width: 100%; background: #fff; border-top: 3px solid #00c2cb }
  thead { background: #002352; color: #fff }
  th {
    padding: .65rem 1rem;
    text-align: left;
    font-size: .72rem;
    font-weight: 600;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: .05em;
  }
  td { padding: .55rem 1rem; font-size: .83rem; border-bottom: 1px solid #e8ecf0; vertical-align: top; max-width: 260px }
  tbody tr:nth-child(even) td { background: #fafbfc }
  tbody tr:last-child td { border-bottom: none }
  tbody tr:hover td { background: #f0f7ff !important }
  .mono { font-family: ui-monospace, monospace; font-size: .78rem; color: #333 }
  .msg { white-space: pre-wrap; word-break: break-word }
  .empty { text-align: center; padding: 3rem; color: #666 }
  .badge {
    display: inline-block;
    background: #e8f0fb;
    color: #004aad;
    border-radius: 999px;
    padding: .15rem .55rem;
    font-size: .72rem;
    font-weight: 500;
    white-space: nowrap;
  }
</style>
</head>
<body>
<header class="topbar">
  <span class="topbar-title"><span>&#9646;</span>VIVCOM Admin</span>
  <a href="/cdn-cgi/access/logout?redirect_url=https://vivcomau-demo-landing.angel-inglese.workers.dev/" class="logout">Log out</a>
</header>
<div class="content">
  <p class="subhead">${count} submission${count === 1 ? '' : 's'} &middot; showing last 200 &middot; ordered newest first</p>
  <div class="wrap">
  <table>
  <thead><tr>
    <th>Date (UTC)</th><th>Name</th><th>Email</th><th>Phone</th>
    <th>Service</th><th>Message</th><th>UTMs</th><th>IP</th>
  </tr></thead>
  <tbody>
  ${rows || '<tr><td colspan="8" class="empty">No submissions yet.</td></tr>'}
  </tbody>
  </table>
  </div>
</div>
</body>
</html>`
}

export async function handleAdmin(_request: Request, env: Env): Promise<Response> {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200'
    ).all<Submission>()
    const rows = results.map(row).join('\n')
    return new Response(page(rows, results.length), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(
      `<!doctype html><html><body style="font:14px monospace;padding:2rem"><h1>Admin error</h1><pre>${msg}</pre></body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  }
}
