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
  const emailCell = `<a href="mailto:${esc(s.email)}?subject=Re%3A%20VIVCOM%20enquiry" class="link">${esc(s.email)}</a>`
  const phoneCell = s.phone
    ? `<a href="tel:${esc(s.phone)}" class="link">${esc(s.phone)}</a>`
    : ''
  return `<tr>
    ${td(date, 'mono')}
    ${td(s.name)}
    <td class="mono">${emailCell}</td>
    <td>${phoneCell}</td>
    <td>${serviceLabel ? `<span class="badge">${esc(serviceLabel)}</span>` : ''}</td>
    <td class="msg">${esc(s.message)}</td>
    ${td([s.utm_source, s.utm_medium, s.utm_campaign].filter(Boolean).join(' / '))}
    ${td(s.ip, 'mono')}
  </tr>`
}

function tableHead(): string {
  return `<thead><tr>
    <th>Date (UTC)</th><th>Name</th><th>Email</th><th>Phone</th>
    <th>Service</th><th>Message</th><th>UTMs</th><th>IP</th>
  </tr></thead>`
}

function section(title: string, entries: Submission[], open: boolean): string {
  const badge = `<span class="section-count">${entries.length}</span>`
  const body = entries.length > 0
    ? entries.map(row).join('\n')
    : '<tr><td colspan="8" class="empty">No entries.</td></tr>'
  return `<details${open ? ' open' : ''}>
  <summary>${title} ${badge}</summary>
  <div class="wrap">
  <table>
  ${tableHead()}
  <tbody>
  ${body}
  </tbody>
  </table>
  </div>
</details>`
}

function page(sections: string, count: number): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>VIVCOM — Submissions</title>
<link rel="icon" href="/vivcom-favicon.png">
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
  .topbar-logo { display: flex; align-items: center; gap: .75rem }
  .topbar-logo img { height: 28px; filter: brightness(0) invert(1) }
  .topbar-label {
    font-size: .75rem; font-weight: 500; letter-spacing: .06em;
    text-transform: uppercase; color: rgba(255,255,255,.5);
  }
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
  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .subhead { font-size: .85rem; color: #666 }
  .export-btn {
    font-size: .8rem; font-weight: 600;
    color: #004aad; text-decoration: none;
    border: 1px solid #004aad; border-radius: 6px;
    padding: .3rem .8rem;
    transition: background .15s, color .15s;
  }
  .export-btn:hover { background: #004aad; color: #fff }

  /* Sections */
  details { margin-bottom: 1.75rem }
  summary {
    display: flex; align-items: center; gap: .5rem;
    cursor: pointer; font-weight: 600; font-size: .9rem;
    padding: .5rem 0; user-select: none; color: #002352;
    list-style: none;
  }
  summary::-webkit-details-marker { display: none }
  summary::before { content: '▶'; font-size: .6rem; color: #00c2cb; transition: transform .15s }
  details[open] > summary::before { transform: rotate(90deg) }
  .section-count {
    background: #00c2cb; color: #fff;
    border-radius: 999px; font-size: .7rem;
    padding: .1rem .45rem; font-weight: 700;
  }

  /* Table */
  .wrap { overflow-x: auto; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,.1); margin-top: .5rem }
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
  .empty { text-align: center; padding: 2rem; color: #999; font-size: .83rem }
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
  .link { color: #004aad; text-decoration: none }
  .link:hover { text-decoration: underline }
</style>
</head>
<body>
<header class="topbar">
  <div class="topbar-logo">
    <img src="/vivcom-logo.svg" alt="VIVCOM">
    <span class="topbar-label">Admin</span>
  </div>
  <a href="/cdn-cgi/access/logout?redirect_url=https://vivcomau-demo-landing.angel-inglese.workers.dev/" class="logout">Log out</a>
</header>
<div class="content">
  <div class="toolbar">
    <p class="subhead">${count} submission${count === 1 ? '' : 's'} &middot; showing last 200 &middot; ordered newest first</p>
    <a href="?export=csv" class="export-btn">&#8595; Export CSV</a>
  </div>
  ${sections}
</div>
</body>
</html>`
}

function toCsv(results: Submission[]): string {
  const header = 'id,created_at,name,email,phone,service,message,utm_source,utm_medium,utm_campaign,ip,user_agent'
  const csvEsc = (v: string | number | null | undefined): string => {
    if (v == null) return ''
    const s = String(v)
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }
  const rows = results.map(s =>
    [s.id, s.created_at, s.name, s.email, s.phone, s.service, s.message,
     s.utm_source, s.utm_medium, s.utm_campaign, s.ip, s.user_agent]
      .map(csvEsc).join(',')
  )
  return [header, ...rows].join('\r\n')
}

export async function handleAdmin(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)

    const { results } = await env.DB.prepare(
      'SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200'
    ).all<Submission>()

    if (url.searchParams.get('export') === 'csv') {
      const filename = `vivcom-submissions-${new Date().toISOString().slice(0, 10)}.csv`
      return new Response(toCsv(results), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    const todayUTC = new Date().toISOString().slice(0, 10)
    const weekAgoUTC = new Date(Date.now() - 6 * 86_400_000).toISOString().slice(0, 10)

    const todayEntries = results.filter(s => s.created_at.slice(0, 10) === todayUTC)
    const weekEntries = results.filter(
      s => s.created_at.slice(0, 10) >= weekAgoUTC && s.created_at.slice(0, 10) < todayUTC
    )
    const olderEntries = results.filter(s => s.created_at.slice(0, 10) < weekAgoUTC)

    const sections = [
      section('Today', todayEntries, true),
      section('This Week', weekEntries, weekEntries.length > 0),
      section('Older', olderEntries, false),
    ].join('\n')

    return new Response(page(sections, results.length), {
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
