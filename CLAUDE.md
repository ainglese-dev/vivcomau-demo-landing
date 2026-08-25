# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Replacement landing page for **vivcom.com.au** — a Sydney low-voltage / telecom company (VIVCOM PTY LTD, owned by Juan) that is merging its install services with the IT consulting / automation capabilities of **VIV53 LLC** (Miami). Single-page site, **live in production** on Cloudflare Workers at a custom domain — DNS cutover from the previous WordPress site is complete.

The customer sees **one brand (VIVCOM)**. VIVCOM (Juan, Sydney) and VIV53 (Alfredo, Miami) are separate, unrelated companies in a business alliance — not a merger or shared ownership; see [CONTEXT.md](CONTEXT.md) "VIVCOM / VIV53 relationship". Internal routing between the two is invisible to visitors. As currently built, lead notification does **not** split by service tier — every contact-form submission notifies a single fixed recipient list (Juan + Angel, the site operator), regardless of which service was selected. **Alfredo (VIV53's principal) is not currently on this list** — open question, see Open Decisions. See [CONTEXT.md](CONTEXT.md) for domain vocabulary (Tier 1/Tier 2, Smart Hands, Lead Routing) and [docs/adr/](docs/adr/) for recorded architectural decisions.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite 8 (TypeScript) |
| Styling | Tailwind CSS v4 (Vite plugin, no PostCSS) + shadcn/ui (Nova preset, Radix base) |
| Package manager | pnpm (via corepack); Node 20 LTS pinned in `.nvmrc` |
| Path alias | `@/*` → `./src/*` (set in both `tsconfig.json`/`tsconfig.app.json` and `vite.config.ts`) |
| Hosting | Cloudflare Workers — static assets + Worker, custom domain `vivcom.com.au` (cutover complete). Not Cloudflare Pages, despite earlier PRD drafts. |
| Forms | Cloudflare Worker (`worker/contact.ts`) + D1 — resolved, PRD §11 item 6 |
| Analytics | Cloudflare Web Analytics |
| Ads | Direct GTM snippet (`GTM-N358Q8ZN`), not Zaraz — resolved, PRD §11 item 15. Google Ads/GA4 tags are configured **inside GTM's dashboard**, not via a separate gtag.js+AW-ID code path — see `src/lib/analytics.ts` |

Tailwind/shadcn was chosen specifically to share design DNA with viv53.com — the two sites should "feel like siblings" (PRD §7.2).

Note: PRD §6 originally specified React 18, but the scaffold uses React 19 / Vite 8 / TS 6 because that is what `pnpm create vite@latest --template react-ts` produces as of April 2026.

## Architectural Big Picture

### Two-tier service architecture (load-bearing — PRD §9.1)

The single page deliberately splits services into **two visually distinct tiers**, and this split drives both UX and SEO/Ads strategy. Do not collapse them:

- **Tier 1 — Local Installs** (CCTV, AV, Telecom/Cabling, Smart Hands): residential/local intent, appears first on the page, primary Google Ads landing target. Optimized for keywords like "CCTV installation Sydney".
- **Tier 2 — Consulting & Automation** (DC Automation, Compliance/AI, Cloud/DevOps): B2B/enterprise intent, delivered remotely by VIV53. Secondary ad group.

A homeowner clicking a "CCTV Sydney" ad must not have to scroll past enterprise jargon — and vice versa. Anchor links like `#cctv` and `#automation` are intended ad landing targets.

### Page sections (PRD §5)

Actual current order: Navbar → Hero → Services (two tiers) → Why VIVCOM → Urgent CTA → About → Vendors → Contact (form + map) → Testimonials → Footer. Single-page; navbar links are anchor scrolls.

This deviates from the original PRD §5 order (which put Testimonials before About/Contact) and Hero now has a single CTA rather than the originally-specified dual CTA — both are deliberate, confirmed choices, not drift to "fix." WhatsApp and click-to-call are not currently anywhere on the page — see Conversion paths below.

### Conversion paths (PRD §8)

Three conversion actions were specified, intended to be tracked separately in Google Ads so ad groups can optimize independently. Current status:

1. **Contact form submission** — live. Fields per PRD §8.1, including a service-interest dropdown (`worker/contact.ts` `ALLOWED_SERVICES`). The dropdown does **not** currently drive lead routing — every submission notifies the same fixed `NOTIFY_EMAILS` recipient list (Juan + the VIV53 principal) regardless of selected service. Captures and passes through `utm_source`/`utm_medium`/`utm_campaign`. Conversion tracking fires via `dataLayer.push({ event: 'contact_form_submit' })` on success (`src/lib/analytics.ts`), caught by a trigger configured inside GTM — not via a separate gtag.js/AW-ID code path.
2. **WhatsApp click** (`wa.me/61402229561`) — **not built**. Blocked pending purchase of a corporate number through "Triconvey" (an Australian call-recording/summary provider) intended to also serve click-to-call.
3. **Click-to-call** (`tel:+61402229561`) — **not built** on any visitor-facing element (only used internally in `worker/admin.ts` and lead-notification emails). Same Triconvey-number blocker as WhatsApp.

### SEO baseline (PRD §9.2)

Semantic HTML5, meta + OG + Twitter Card tags, **Schema.org `LocalBusiness`** for VIVCOM Sydney and **`ProfessionalService`** for the consulting tier, sitemap.xml + robots.txt.

### Performance targets (PRD §2)

LCP < 2s, PageSpeed ≥ 90. Treat these as hard constraints when choosing dependencies and image strategy.

## Brand Constraints

- Preserve existing VIVCOM logo and color palette (extract from current WordPress site — exact hex pending, PRD §11 item 2). Do not invent brand colors.
- Align typography and component rhythm with viv53.com so the two sites read as siblings (PRD §7.2).
- VIV53 services are rendered **under the VIVCOM brand**, not as a visible sub-brand (PRD §7.2, §13).

## Open Decisions (check before assuming)

PRD §11 originally listed 15 pending items. Status as of the last full review:

**Resolved:**
- **#1** Logo SVG — real asset at `public/vivcom-logo.svg`
- **#2** Brand hex — customer-confirmed, applied as Tailwind tokens in `src/index.css`
- **#4** ABN — in `Footer.tsx`
- **#6** Form backend — Cloudflare Worker (`worker/contact.ts` + D1), not Formspree
- **#9** VIV53 service copy — written into `consultingServices` in `Services.tsx`
- **#10** Lead routing logic — resolved as flat, not tier-based: every submission notifies the same fixed `NOTIFY_EMAILS` list (Juan + Angel, the site operator), no per-service split. See [CONTEXT.md](CONTEXT.md) "Lead Routing".
- **#11** "Powered by VIV53" attribution — resolved by omission, matches the invisible-sub-brand directive
- **#15** Zaraz vs direct gtag.js — resolved as direct GTM snippet; Ads/GA4 tags are configured inside GTM's dashboard, not via `VITE_GOOGLE_ADS_ID`/`VITE_CONVERSION_LABEL_FORM` (those env vars and their code path are unused/dead, kept in case a non-GTM fallback is ever needed)

**Still open:**
- **#3** Photos — `Services.tsx` still uses Unsplash stock images for all service cards, including the new Smart Hands card
- **#5** Map/address — `Contact.tsx` uses an OpenStreetMap bounding box, not a Google Maps embed, and no exact office address
- **#7** Google Business Profile link — not referenced anywhere in the site
- **#12** VIV53 team bios/headshots — not present in `About.tsx`
- Also flagged (not an original PRD §11 item): `og-image.png` is referenced in `index.html`'s OG/Twitter/Schema.org tags but the file doesn't exist in `public/` — likely a broken social-share preview image
- Also flagged: `NOTIFY_EMAILS` currently notifies only Juan + Angel — **Alfredo (VIV53's principal, Miami) is not on the list**, so Tier 2 (consulting/automation) leads never reach VIV53 directly. Worth confirming whether that's intentional (e.g. Angel forwards manually) or a gap to fix

If you need to make progress before an open item is resolved, pick a sensible default and flag it explicitly rather than silently committing to one.

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

## Current Build State

All PRD §5 sections are built as real components under `src/components/`, rendered from [src/App.tsx](src/App.tsx) in the order given under Page sections above. Beyond the PRD §5 list, the build also includes `UrgentCTA.tsx`, `Vendors.tsx`, `CookieConsent.tsx`, and `legal/PrivacyPolicyDialog.tsx` / `legal/CookiePolicyDialog.tsx`.

Known gaps: WhatsApp and click-to-call conversion paths are not built (see Conversion paths above); several PRD §11 content items remain open (see Open Decisions above).

## Production Deployment Checklist

> ✅ **Cutover complete.** vivcom.com.au is live in production on Cloudflare Workers. This section is kept as a historical record of what cutover involved and a reference for the current production configuration — not a pending TODO list.
>
> DNS approach used: **NS delegation** — nameservers point to Cloudflare at the registrar (no domain transfer; registrar stayed the same).

### A — Code changes — done

**1. Worker renamed in `wrangler.jsonc`** ✅ — `"name": "vivcomau"`, with custom domain routes for `vivcom.com.au` and `www.vivcom.com.au`.

**2. Hardcoded demo URL fixed** ✅ — [`worker/admin.ts`](worker/admin.ts) logout redirect points to `https://vivcom.com.au/`, not the old `*.workers.dev` demo URL.

### B — Cloudflare Dashboard — status per last audit

1. **Zone added** ✅ — implied by the live custom domain routes
2. **Cloudflare Access on `/admin`** — not verifiable from the repo; confirm it's actually enforced
3. **Worker secrets** — per `wrangler secret list` (names only; values are never readable from the CLI):
   - `NOTIFY_EMAILS` ✅ set and confirmed correct — exactly Juan + the VIV53 principal, nothing else
   - `TURNSTILE_SECRET_KEY` ✅ set — Turnstile enforcement is active, not soft-failing
   - `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — not present; optional, presumably unused
   - `VITE_GTM_ID` — exists as a secret but is **dead**: `public/gtm-loader.js` hardcodes the GTM container ID directly, and `VITE_*` vars can't be read from a Worker secret at Vite build time anyway (they're inlined client-side from local `.env`/shell env at `pnpm deploy` time, which runs locally, not from Cloudflare). Left in place, not cleaned up.
4. **Build-time env vars (`VITE_GOOGLE_ADS_ID`, `VITE_CONVERSION_LABEL_FORM`)** — not set anywhere (not in `.env`, not in `wrangler.jsonc`, not a secret). This is expected: Ads/GA4 tracking is handled through GTM directly (see Tech Stack Ads note), so these vars and their code path in `src/lib/analytics.ts` are unused dead code, kept in case a non-GTM fallback is ever needed.
5. **Email sender** ✅ — `hello@vivcom.com.au` is used correctly in `worker/contact.ts`.

### C — Cutover day — done

Nameservers were pointed at Cloudflare, propagated, and `pnpm deploy` was run. Re-run this smoke-test checklist any time you're unsure production is healthy, not just at cutover:

- [ ] `https://vivcom.com.au` loads with valid TLS
- [ ] `https://www.vivcom.com.au` loads (or redirects to apex)
- [ ] Contact form → email arrives + D1 row created
- [ ] `/admin` blocked for unauthenticated users (Cloudflare Access)
- [ ] Admin logout redirects to `https://vivcom.com.au/` (not old workers.dev URL)
- [ ] Google Ads conversion fires on form submit — verify in GTM Preview mode; the site pushes `dataLayer.push({ event: 'contact_form_submit' })`, GTM owns the actual conversion trigger/tag
- [ ] Turnstile challenge works on contact form
- [ ] PageSpeed ≥ 90 / LCP < 2s (Lighthouse on production URL)

### Notes

- `pnpm deploy` is the same command for production — no separate prod script needed.
- D1 database binding carries over unchanged; the DB ID in `wrangler.jsonc` is stable across the rename.
