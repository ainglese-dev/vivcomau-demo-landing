# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Replacement landing page for **vivcom.com.au** — a Sydney low-voltage / telecom company (VIVCOM PTY LTD, owned by Juan) that is merging its install services with the IT consulting / automation capabilities of **VIV53 LLC** (Miami). Single-page site, deployed to a Cloudflare Pages preview URL first for stakeholder review, then DNS cutover from the existing WordPress site.

The customer sees **one brand (VIVCOM)**. Internal routing between Juan (Sydney installs) and VIV53 (remote consulting) is invisible to visitors but matters for lead routing — see PRD §13.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite 8 (TypeScript) |
| Styling | Tailwind CSS v4 (Vite plugin, no PostCSS) + shadcn/ui (Nova preset, Radix base) |
| Package manager | pnpm (via corepack); Node 20 LTS pinned in `.nvmrc` |
| Path alias | `@/*` → `./src/*` (set in both `tsconfig.json`/`tsconfig.app.json` and `vite.config.ts`) |
| Hosting | Cloudflare Pages (preview → prod via DNS cutover) |
| Forms | Cloudflare Workers **or** Formspree (decision pending — PRD §11 item 6) |
| Analytics | Cloudflare Web Analytics |
| Ads | Google Ads via gtag.js (Cloudflare Zaraz vs direct snippet — PRD §11 item 15) |

Tailwind/shadcn was chosen specifically to share design DNA with viv53.com — the two sites should "feel like siblings" (PRD §7.2).

Note: PRD §6 originally specified React 18, but the scaffold uses React 19 / Vite 8 / TS 6 because that is what `pnpm create vite@latest --template react-ts` produces as of April 2026.

## Architectural Big Picture

### Two-tier service architecture (load-bearing — PRD §9.1)

The single page deliberately splits services into **two visually distinct tiers**, and this split drives both UX and SEO/Ads strategy. Do not collapse them:

- **Tier 1 — Local Installs** (CCTV, AV, Telecom/Cabling): residential/local intent, appears first on the page, primary Google Ads landing target. Optimized for keywords like "CCTV installation Sydney".
- **Tier 2 — Consulting & Automation** (DC Automation, Compliance/AI, Cloud/DevOps): B2B/enterprise intent, delivered remotely by VIV53. Secondary ad group.

A homeowner clicking a "CCTV Sydney" ad must not have to scroll past enterprise jargon — and vice versa. Anchor links like `#cctv` and `#automation` are intended ad landing targets.

### Page sections (PRD §5)

Navbar → Hero (dual CTA) → Services (two tiers) → Why VIVCOM → Testimonials → About → Contact (form + WhatsApp + click-to-call + map) → Footer. Single-page; navbar links are anchor scrolls.

### Conversion paths (PRD §8)

Three conversion actions, each tracked separately in Google Ads so ad groups can optimize independently:
1. Contact form submission (fields per PRD §8.1; includes a service-interest dropdown that determines lead routing)
2. WhatsApp click → `wa.me/61402229561` with pre-filled message
3. Click-to-call → `tel:+61402229561`

Form must capture `utm_source`, `utm_medium`, `utm_campaign` from the URL and pass them through with the submission.

### SEO baseline (PRD §9.2)

Semantic HTML5, meta + OG + Twitter Card tags, **Schema.org `LocalBusiness`** for VIVCOM Sydney and **`ProfessionalService`** for the consulting tier, sitemap.xml + robots.txt.

### Performance targets (PRD §2)

LCP < 2s, PageSpeed ≥ 90. Treat these as hard constraints when choosing dependencies and image strategy.

## Brand Constraints

- Preserve existing VIVCOM logo and color palette (extract from current WordPress site — exact hex pending, PRD §11 item 2). Do not invent brand colors.
- Align typography and component rhythm with viv53.com so the two sites read as siblings (PRD §7.2).
- VIV53 services are rendered **under the VIVCOM brand**, not as a visible sub-brand (PRD §7.2, §13).

## Open Decisions (check before assuming)

PRD §11 lists 15 pending items. The ones most likely to affect implementation choices:
- **#6** Form backend (Formspree vs Cloudflare Worker) — affects how the contact form is wired
- **#15** Zaraz vs direct gtag.js — affects how analytics/ads are loaded
- **#1, #2** Logo SVG and exact brand hex — blocking for any final styling
- **#10** Lead routing logic (which form submissions get forwarded to VIV53 vs Juan only)

If you need to make progress before these are resolved, pick a sensible default and flag it explicitly rather than silently committing to one.

## Commands

| Command                    | Purpose                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm install`             | Install dependencies                                                                 |
| `pnpm dev`                 | Vite-only dev server at <http://localhost:5173> — UI iteration, no Worker or D1     |
| `pnpm build`               | Type-check (`tsc -b`) + production build to `dist/`                                 |
| `pnpm preview`             | Apply local DB migration → build → full Worker stack at <http://localhost:8787>     |
| `pnpm deploy`              | Apply remote DB migration → build → deploy to Cloudflare                            |
| `pnpm db:migrate:local`    | Apply pending migrations to the local (`.wrangler/state/`) D1 database              |
| `pnpm db:migrate:remote`   | Apply pending migrations to the production D1 database                              |
| `pnpm lint`                | ESLint over the project                                                              |

Adding shadcn components: `pnpm dlx shadcn@latest add <component>` (e.g. `button`, `card`, `input`). Components land in [src/components/ui/](src/components/ui/).

## Current Scaffold State

The scaffold is minimal on purpose: only [src/components/Hero.tsx](src/components/Hero.tsx) exists as a real component (rendered from [src/App.tsx](src/App.tsx)). It proves Tailwind v4 + shadcn `Button` are wired and includes the real `tel:` and `wa.me` links from PRD §8 so the conversion paths work from day one. The remaining PRD §5 sections (Services, Why, Testimonials, About, Contact, Footer) are not yet built.

## Production Deployment Checklist

> Not releasing now — this checklist captures everything needed when cutting over from the demo Worker to `vivcom.com.au`.
>
> DNS approach: **NS delegation** — point nameservers to Cloudflare at the registrar (no domain transfer; registrar stays the same).

### A — Code changes (one dev session before cutover)

**1. Rename worker in `wrangler.jsonc`**

- Change `"name"` from `"vivcomau-demo-landing"` → `"vivcomau"`
- Add custom domain routes:

```jsonc
"routes": [
  { "pattern": "vivcom.com.au", "custom_domain": true },
  { "pattern": "www.vivcom.com.au", "custom_domain": true }
]
```

**2. Fix hardcoded demo URL — [`worker/admin.ts`](worker/admin.ts) line ~194**

Change logout redirect from `https://vivcomau-demo-landing.angel-inglese.workers.dev/` → `https://vivcom.com.au/`

This is the **only** hardcoded demo URL in the codebase. `robots.txt`, `sitemap.xml`, and the email HTML footer already reference `vivcom.com.au`.

### B — Cloudflare Dashboard (one-time setup, no code)

1. **Add zone:** Add `vivcom.com.au` as a new Cloudflare zone → get the two nameserver hostnames
2. **Cloudflare Access:** Create an Access application for `vivcom.com.au/admin`, add email policy (Angel + Juan)
3. **Worker secrets** — must re-provision after rename (secrets are scoped to worker name):

```bash
wrangler secret put TURNSTILE_SECRET_KEY
wrangler secret put NOTIFY_EMAILS        # comma-separated: juan@...,angel@...
wrangler secret put TELEGRAM_BOT_TOKEN   # optional
wrangler secret put TELEGRAM_CHAT_ID     # optional
```

1. **Build-time env vars** — set in Cloudflare dashboard or `.env`:

```sh
VITE_GOOGLE_ADS_ID=AW-XXXXXXXXXX
VITE_CONVERSION_LABEL_FORM=<label>
```

1. **Email sender:** Confirm `hello@vivnotify.com` is authorized in the Email Routing / Send Email binding for the `vivcomau` worker.

### C — Cutover day (in order)

1. At registrar: update nameservers to the Cloudflare hostnames from B-1
2. Wait for NS propagation (minutes to a few hours)
3. `pnpm deploy` — handles DB migrations + build + deploy; Wrangler auto-provisions TLS for the custom domain

**Smoke-test checklist:**

- [ ] `https://vivcom.com.au` loads with valid TLS
- [ ] `https://www.vivcom.com.au` loads (or redirects to apex)
- [ ] Contact form → email arrives + D1 row created
- [ ] `/admin` blocked for unauthenticated users (Cloudflare Access)
- [ ] Admin logout redirects to `https://vivcom.com.au/` (not old workers.dev URL)
- [ ] Google Ads conversion fires on form submit
- [ ] Turnstile challenge works on contact form
- [ ] PageSpeed ≥ 90 / LCP < 2s (Lighthouse on production URL)

### Notes

- `pnpm deploy` is the same command for production — no separate prod script needed.
- D1 database binding carries over unchanged; the DB ID in `wrangler.jsonc` is stable across the rename.
