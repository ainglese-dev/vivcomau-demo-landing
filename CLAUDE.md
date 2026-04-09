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

| Command          | Purpose                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| `pnpm install`   | Install dependencies                                                   |
| `pnpm dev`       | Local dev server at <http://localhost:5173>                            |
| `pnpm build`     | Type-check (`tsc -b`) + production build to `dist/`                    |
| `pnpm preview`   | Serve the built `dist/` locally to sanity-check the production output  |
| `pnpm lint`      | ESLint over the project                                                |

Adding shadcn components: `pnpm dlx shadcn@latest add <component>` (e.g. `button`, `card`, `input`). Components land in [src/components/ui/](src/components/ui/).

## Current Scaffold State

The scaffold is minimal on purpose: only [src/components/Hero.tsx](src/components/Hero.tsx) exists as a real component (rendered from [src/App.tsx](src/App.tsx)). It proves Tailwind v4 + shadcn `Button` are wired and includes the real `tel:` and `wa.me` links from PRD §8 so the conversion paths work from day one. The remaining PRD §5 sections (Services, Why, Testimonials, About, Contact, Footer) are not yet built.
