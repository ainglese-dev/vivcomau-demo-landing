# VIVCOM.COM.AU — Landing Page Redesign PRD

**Version:** 1.2
**Date:** April 8, 2026
**Author:** Angel (VIV53) for VIVCOM PTY LTD
**Status:** Draft — pending Juan review

---

## 1. Overview

Replace the existing WordPress site at vivcom.com.au with a modern, fast, single-page landing site built on React + Vite and hosted on Cloudflare Pages. The demo will be deployed to a Cloudflare Pages preview URL for stakeholder review before cutting over DNS.

VIVCOM is a Sydney-based low-voltage and telecom services company (12+ years), owned by Juan. The new site merges VIVCOM's existing physical install services with the IT consulting and automation capabilities of VIV53 LLC (Miami, co-owned by Angel + Alfredo — Juan's cousins). The result: a single expanded storefront under vivcom.com.au covering everything from CCTV installation to datacenter automation — positioning VIVCOM as a full-stack technology services provider for the Australian market.

> **Scaffolding note:** The React+Vite project will be initialized via Claude Code in VS Code, not from this PRD session.

---

## 2. Goals

| # | Goal | Success Metric |
|---|------|----------------|
| G1 | Replace slow WordPress site with a fast, modern landing page | LCP < 2s, PageSpeed ≥ 90 |
| G2 | Generate inbound leads from Sydney residential and SMB customers | Contact form submissions + WhatsApp/call clicks tracked |
| G3 | Position VIVCOM as full-stack: physical installs + automation/consulting | Distinct service sections covering both portfolios |
| G4 | Maintain brand consistency with existing VIVCOM identity | Existing logo, color palette preserved |
| G5 | Surface VIV53 consulting capabilities under the VIVCOM brand | Automation, compliance, and AI governance services visible and clearly described |

---

## 3. Target Audience

- **Primary:** Sydney homeowners needing CCTV, alarm systems, or TV/AV installation
- **Secondary:** Sydney SMBs needing network cabling, telecom consulting, or office AV setups
- **Tertiary:** Mid-market / enterprise companies (AU or international) needing DC automation, network consulting, or compliance advisory
- **Quaternary:** Property managers / builders needing subcontractor for low-voltage work

---

## 4. Service Sections

### 4.1 CCTV & Security Systems
- Security camera installation (home & office)
- Alarm system installation
- Remote monitoring setup
- Cost-effective solutions with long-term warranty

### 4.2 Audio Visual Installation
- TV wall mounting
- Cable concealment
- Home theater / multi-room audio
- Office AV / conference room setups

### 4.3 Telecom & Network Services
- Structured cabling (Cat6/6A, fiber)
- Network consulting & design
- Data point installation
- Office network setup and troubleshooting

### 4.4 Network & DC Automation (via VIV53)
- Datacenter fabric design (VXLAN EVPN, ACI, NDFC)
- Network automation & Infrastructure as Code (Ansible, Terraform, pyATS)
- Multi-vendor consulting (Cisco, Juniper, Arista)
- Legacy migration (SONET, TDM, Frame Relay, ATM)
- Campus & wireless architecture (C9800, Meraki)

### 4.5 Compliance & AI Governance (via VIV53)
- US compliance verticals: HIPAA/HITECH, PCI-DSS, FFIEC/SOX
- Industrial security: IEC 62443, NIST CSF
- ISO 42001:2023 AI Governance advisory
- Security posture assessment & remediation

### 4.6 Cloud & DevOps (via VIV53)
- AWS / Azure architecture & migration
- Kubernetes infrastructure (CKA-level)
- CI/CD pipeline design
- Hybrid cloud connectivity

---

## 5. Page Structure (Single-Page Layout)

```
┌─────────────────────────────────────────┐
│  NAVBAR — Logo | Services | About |     │
│          Testimonials | Contact         │
├─────────────────────────────────────────┤
│  HERO                                   │
│  Headline + subtext + dual CTA          │
│  ("Get a Free Quote" / "Call Now")      │
│  Tagline: full-stack tech services      │
├─────────────────────────────────────────┤
│  SERVICES — Two tiers visually:         │
│                                         │
│  ┌─ LOCAL INSTALLS (Juan) ───────────┐  │
│  │ CCTV | AV | Telecom/Cabling      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─ CONSULTING & AUTOMATION (VIV53) ─┐  │
│  │ DC Automation | Compliance/AI |   │  │
│  │ Cloud & DevOps                    │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Each: Icon + short desc + CTA          │
├─────────────────────────────────────────┤
│  WHY VIVCOM (trust signals)             │
│  12+ yrs | Licensed & Insured |         │
│  Sydney-wide | International reach |    │
│  Multi-vendor certified | Warranty      │
├─────────────────────────────────────────┤
│  TESTIMONIALS (carousel or grid)        │
│  Real customer quotes from current site │
├─────────────────────────────────────────┤
│  ABOUT / STORY                          │
│  Local roots + global expertise         │
│  Juan (Sydney) + VIV53 team (Miami)     │
│  "Family business, enterprise results"  │
├─────────────────────────────────────────┤
│  CONTACT                                │
│  Form (name, email, phone, service,     │
│  message) + WhatsApp button +           │
│  Click-to-call + Google Maps embed      │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  Logo | Links | ABN | Socials |         │
│  hello@vivcom.com.au | +61402229561     │
└─────────────────────────────────────────┘
```

---

## 6. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 + Vite | Fast DX, familiar stack, matches VIV53 |
| Styling | Tailwind CSS + shadcn/ui | Rapid iteration, shared with VIV53 |
| Hosting (demo) | Cloudflare Pages | Free, fast, global CDN |
| Hosting (prod) | Cloudflare Pages | Same — cut DNS when approved |
| Forms | Cloudflare Workers or Formspree | Serverless form handler |
| Analytics | Cloudflare Web Analytics | Privacy-first, free |
| Ads | Google Ads (gtag.js via Zaraz) | Conversion tracking per service tier |
| Domain | vivcom.com.au (existing) | DNS cutover post-approval |
| WhatsApp | wa.me link with pre-filled message | Zero backend needed |

---

## 7. Brand Guidelines

### 7.1 Existing VIVCOM Identity (preserve)
- **Logo:** Current VIVCOM logo (extract from WordPress site or request SVG from Juan)
- **Colors:** Extract from current site — primary blues/darks (TBD exact hex after asset extraction)
- **Tone:** Professional, approachable, Sydney local, trustworthy

### 7.2 VIV53 Design DNA (integrated)
- Typography system: align font families with viv53.com for brand cohesion
- Component patterns: similar card layouts, CTA button styles, spacing rhythm
- Both sites should feel like siblings — same family, different personalities
- VIV53 services rendered under VIVCOM brand, not as a separate sub-brand

---

## 8. Conversion & Lead Capture

### 8.1 Contact Form Fields
- Full name (required)
- Email (required)
- Phone (optional)
- Service interest (dropdown: CCTV & Security / AV Installation / Telecom & Cabling / Network Automation / Compliance & AI / Cloud & DevOps / Other)
- Message (textarea, optional)
- Submit → thank-you state + email notification to hello@vivcom.com.au

### 8.2 WhatsApp CTA
- Floating button (bottom-right) + section CTA
- Link: `https://wa.me/61402229561?text=Hi%20VIVCOM%2C%20I%27d%20like%20a%20quote%20for...`

### 8.3 Click-to-Call
- Mobile: `tel:+61402229561`
- Desktop: display number prominently

---

## 9. SEO & Google Ads Strategy

### 9.1 Two-Tier Service Architecture (SEO rationale)

The page uses two visually distinct service tiers to avoid confusing both users and search engines:

- **Tier 1 — Local Installs** (CCTV, AV, Cabling): optimized for local/residential intent keywords ("CCTV installation Sydney", "TV mounting near me"). These appear first on the page and are the primary Google Ads landing targets.
- **Tier 2 — Consulting & Automation** (DC Automation, Compliance, Cloud): optimized for B2B/enterprise intent keywords ("network automation consulting Australia", "datacenter fabric design"). Secondary ad group or organic-only initially.

This separation ensures a homeowner clicking a "CCTV Sydney" ad sees relevant content immediately without scrolling past enterprise jargon — and vice versa.

### 9.2 SEO Baseline
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`)
- Meta tags: title, description, Open Graph, Twitter Card
- Schema.org LocalBusiness structured data (Sydney, services, phone, email)
- Schema.org ProfessionalService for consulting tier
- Alt text on all images
- Sitemap.xml + robots.txt on Cloudflare Pages

### 9.3 Google Ads Integration
- Google Ads tag (gtag.js) loaded via Cloudflare Zaraz or direct snippet
- Conversion tracking on: form submission, WhatsApp click, call click
- Separate conversion actions per tier so ad groups can optimize independently
- UTM parameter support — form captures `utm_source`, `utm_medium`, `utm_campaign` from URL and passes through with submission
- Consider dedicated anchor links for ad landing: `vivcom.com.au/#cctv`, `vivcom.com.au/#automation`

---

## 10. Deployment Plan

```
Phase 1 — Demo (Week 1-2)
  └─ Build on React+Vite
  └─ Deploy to Cloudflare Pages preview URL
  └─ Share link with Juan for review

Phase 2 — Iterate (Week 2-3)
  └─ Incorporate feedback
  └─ Finalize content and images
  └─ Performance audit (Lighthouse)

Phase 3 — Go Live (Week 3-4)
  └─ Point vivcom.com.au DNS to Cloudflare Pages
  └─ SSL auto-provisioned by Cloudflare
  └─ Verify forms, analytics, WhatsApp flow
  └─ Verify Google Ads conversion tracking fires correctly
  └─ Decommission WordPress hosting
```

---

## 11. Open Items / Decisions Needed

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | SVG logo file from Juan | Juan | ⏳ Pending |
| 2 | Exact brand hex colors (extract from WP or get brand guide) | Angel | ⏳ Pending |
| 3 | Professional photos (jobs, team) or use stock? | Juan | ⏳ Decision |
| 4 | ABN number for footer | Juan | ⏳ Pending |
| 5 | Google Maps embed — exact service area or office address? | Juan | ⏳ Pending |
| 6 | Form backend: Formspree (fast) vs Cloudflare Worker (custom) | Angel | ⏳ Decision |
| 7 | Google Business Profile link (if exists) | Juan | ⏳ Pending |
| 8 | Testimonials — reuse from current site or get fresh ones? | Juan | ⏳ Decision |
| 9 | VIV53 service descriptions — copy/content for automation, compliance, cloud sections | Angel | ⏳ Pending |
| 10 | Lead routing logic — which form submissions go to VIV53 vs Juan only? | Angel + Juan | ⏳ Decision |
| 11 | Legal: "Powered by VIV53" or "in partnership with" — any attribution needed on site? | Angel + Juan | ⏳ Decision |
| 12 | VIV53 team bios / headshots for About section? | Angel + Alfredo | ⏳ Decision |
| 13 | Google Ads account — existing or new? Get Ads ID from Juan | Juan | ⏳ Pending |
| 14 | Google Ads keyword plan — which Tier 1 services to run ads for first? | Juan + Angel | ⏳ Decision |
| 15 | Cloudflare Zaraz vs direct gtag.js for ads/analytics loading? | Angel | ⏳ Decision |

---

## 12. Optional Skills / Future Enhancements

| Priority | Feature | Effort | Notes |
|----------|---------|--------|-------|
| P1 | Multi-language (EN/中文) | Medium | Sydney market — significant Chinese-speaking population |
| P2 | Before/after project gallery | Low | Lightbox component, lazy-loaded images |
| P3 | Online quote calculator | Medium | Service type + area + complexity → ballpark price |
| P4 | Blog/news section | Medium | Could use Cloudflare Workers + KV or markdown files |
| P5 | Google Reviews integration | Low | Pull reviews via Places API or static embed |
| P6 | Booking/scheduling widget | Medium | Calendly embed or custom with Supabase |
| P7 | Service area map (Sydney suburbs) | Low | Interactive SVG or Google Maps polygon |
| P8 | WhatsApp Business API (chatbot) | High | Auto-reply, quote requests, appointment scheduling |
| P9 | Shared VIV component library (npm) | High | Reusable across VIV53 + VIVCOM sites |

---

## 13. Merged Service Portfolio — Who Delivers What

| Service Area | Delivered by | Engagement Model |
|-------------|-------------|-----------------|
| CCTV & Security | Juan / VIVCOM (Sydney) | Local, on-site |
| AV / TV Mounting | Juan / VIVCOM (Sydney) | Local, on-site |
| Structured Cabling | Juan / VIVCOM (Sydney) | Local, on-site |
| SMB Network Setup | Juan / VIVCOM (Sydney) | Local, on-site |
| DC Automation & Fabric Design | Angel + Alfredo / VIV53 (Miami) | Remote + travel if needed |
| Network Consulting (Enterprise) | Angel + Alfredo / VIV53 (Miami) | Remote + travel if needed |
| Compliance & AI Governance | Angel + Alfredo / VIV53 (Miami) | Remote advisory |
| Cloud & DevOps | Angel + Alfredo / VIV53 (Miami) | Remote |
| Legacy Migration | Angel + Alfredo / VIV53 (Miami) | Remote + on-site |

> **Key:** The customer sees ONE brand (VIVCOM). The internal routing (Juan vs VIV53) is invisible to them. Lead routing by service type should be defined before go-live — form submissions tagged with VIV53-category services get forwarded to Angel + Alfredo in addition to hello@vivcom.com.au.

### 13.1 Relationship with viv53.com

- viv53.com remains VIV53 LLC's own site (Miami entity, Americas market)
- vivcom.com.au is VIVCOM PTY LTD's site (AU entity, APAC market)
- VIV53 services appear on BOTH sites — different geographies, same capabilities
- No exclusivity conflict: VIV53 can serve AU clients through VIVCOM and US/LATAM clients directly

---

## 14. Security Review & Hardening

*Reviewed: 2026-04-22. Full plan archived at `~/.claude/plans/help-me-review-security-ticklish-lollipop.md`.*

### 14.1 Findings

#### Critical (block production)

- **C1. Contact form had no backend** — `handleSubmit` ran client-side checks but didn't POST anywhere. ✅ Fixed in Bucket A.
- **C2. Google Ads ID was a placeholder** — `AW-XXXXXXXXXX` hardcoded; production would 404 on the injected gtag script. ✅ Fixed in Bucket A (env-var + `AW-\d+` guard).
- **C3. No security headers** — missing CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. ✅ Fixed in Bucket A (`public/_headers`).

#### High

- **H4. Dependency vulnerability — `hono <4.12.14`** (moderate, GHSA-458j-xx4x-4375) via `shadcn > @modelcontextprotocol/sdk > hono`. Not exploitable at runtime (we don't SSR with hono), but ships as transitive prod dep. ⏳ Open (Bucket B4).
- **H5. `shadcn` CLI listed under `dependencies`** instead of `devDependencies`. Root cause of H4. ⏳ Open (Bucket B4).
- **H6. Cloudflare beacon token hardcoded in `index.html`** — not secret by design, but preview and prod share the same analytics bucket. ⏳ Deferred (user decision).

#### Medium

- **M7. No rate limit / Turnstile on form endpoint** — server-side validation + honeypot + re-checked math CAPTCHA are in place, but no abuse-prevention binding. Worker is ready to verify Turnstile once a key is provisioned. ⏳ Open.
- **M8. UTM parameter validation** — now allowlisted to `[A-Za-z0-9_\-.~]`, capped at 200 chars on both client and server. ✅ Fixed in Bucket A.
- **M9. External assets without SRI** — Cloudflare beacon and Unsplash images. ⏳ Open (Bucket B6 / C8).

#### Low / Info

- **L10. Referrer-Policy / Permissions-Policy** — ✅ Now covered by `public/_headers`.
- **L11. No dependency-audit in CI** — no GitHub Actions, no Renovate/Dependabot. ⏳ Open (Bucket C9, C10).
- **L12. Dynamic `<script>` injection for gtag** — standard pattern, URL hardcoded to Google, gated by consent. CSP in `_headers` already whitelists `googletagmanager.com`. ✅ Acceptable.
- **L13. `pnpm preview` runs wrangler dev** — intentional; Worker routes need live exercise. Document in CLAUDE.md (Bucket C11).

#### Verified NOT present (audited clean)

- No `dangerouslySetInnerHTML`, `eval()`, `new Function()`, or raw `innerHTML` writes anywhere in `src/`.
- No `target="_blank"` without `rel="noopener noreferrer"`.
- No `.env`, `.dev.vars`, `*.key`, `*.pem`, or `wrangler.toml` tracked in git.
- `.gitignore` correctly excludes `.env*`, `.dev.vars*`, `.wrangler/`, `dist/`, `node_modules/`.
- No source maps in `dist/`.
- No hardcoded API keys or tokens beyond the public CF beacon.
- Tel/WhatsApp numbers are static literals, not user-controllable.

### 14.2 Bucket A — Completed (2026-04-22, pre-cutover must-haves)

- [x] **A1.** `public/_headers` with CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP/CORP, immutable cache on `/assets/*`.
- [x] **A2.** Cloudflare Worker at `worker/index.ts` + `worker/contact.ts`. `POST /api/contact` validates all fields, strips control chars, enforces length caps, rejects filled honeypots, re-checks math-CAPTCHA server-side, and optionally verifies Turnstile. Stores submissions to D1.
- [x] **A2.** `wrangler.jsonc` — added `main: "worker/index.ts"`, `assets.binding: "ASSETS"`, non-secret `vars` placeholders. Secrets via `.dev.vars` / `wrangler secret put`.
- [x] **A2.** `tsconfig.worker.json` + project reference in `tsconfig.json`. Generated `worker-configuration.d.ts` via `pnpm wrangler types`.
- [x] **A2.** `Contact.tsx` — POST JSON to `/api/contact`, `submitting/success/error` states, `maxLength` on all inputs matching server limits. Replaced `useRef(Date.now())` with `useState` lazy init (fixes `react-hooks/purity` error).
- [x] **A3.** `src/lib/analytics.ts` — `GOOGLE_ADS_ID` / `CONVERSION_LABEL_FORM` come from `import.meta.env.VITE_*`, `AW-\d+` guard prevents misconfigured deploys from injecting a 404 script. UTM capture allowlists `[A-Za-z0-9_\-.~]` and caps length at 200.
- [x] **A3.** `.env.example` and `.dev.vars.example` documenting public Vite vars vs. Worker secrets.
- [x] **Verification:** `pnpm lint` clean, `pnpm build` green, `_headers` confirmed at `dist/client/_headers`.

### 14.3 Todo — Remaining security work

#### Manual, pre-deploy (operational)

- [ ] **Secrets:** Set `VITE_GOOGLE_ADS_ID` and `VITE_CONVERSION_LABEL_FORM` in Cloudflare Pages environment (once Juan provides them — Open Item #13).
- [ ] **Smoke test:** `pnpm preview`, then `curl -I http://localhost:8787/` to verify CSP/HSTS/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy are served.
- [ ] **End-to-end form test:** submit with valid data (expect 200 + gtag `conversion` event), with honeypot filled (expect 204/noop), with wrong CAPTCHA (expect 400), and within 3s of load (expect silent drop).
- [ ] **External scanners:** pass `https://securityheaders.com` and `https://observatory.mozilla.org` against the preview URL — target grade A or better before cutover.
- [ ] **Lighthouse** — confirm LCP < 2s (G1) and PageSpeed ≥ 90 haven't regressed from the added headers.
- [ ] **Decide:** single Cloudflare Web Analytics token (current) vs. separate preview/prod tokens (needs a Vite HTML transform).

#### Bucket B — Should land before cutover

- [ ] **B4.** Move `shadcn` from `dependencies` → `devDependencies` in `package.json`. Run `pnpm install` and confirm `pnpm audit --prod` reports 0 vulnerabilities.
- [ ] **B6.** Add SRI + `crossorigin="anonymous"` to the Cloudflare beacon `<script>` in `index.html`.
- [ ] **B7.** Wire all env vars through the Cloudflare Pages project config (not just `.dev.vars`) so preview and prod pick them up automatically on deploy.
- [ ] **Turnstile (client-side):** provision a Turnstile site, add the widget to `Contact.tsx`, include `cf-turnstile-response` in the POST payload. Worker is already ready to verify (`TURNSTILE_SECRET_KEY`).

#### Bucket C — Hygiene (post-cutover OK)

- [ ] **C8.** Self-host Unsplash images used in `Services.tsx` — removes a third-party CDN from the critical render path, shrinks `img-src` CSP, improves LCP.
- [ ] **C9.** Add a GitHub Action on PR: `pnpm install --frozen-lockfile && pnpm audit --audit-level=high && pnpm lint && pnpm build`. Gate merges on green.
- [ ] **C10.** Enable Renovate or Dependabot — monthly dependency PRs against `main`.
- [ ] **C11.** Update `CLAUDE.md` with: the `_headers` contract, which env vars are client-public (`VITE_*`) vs. server-secret, and the note that `pnpm preview` now exercises Wrangler not plain Vite.
- [ ] **Logging:** decide where contact submissions should be persisted beyond email (R2 bucket? KV? Workers Analytics Engine?) for auditability / deliverability fallback.

### 14.4 Rate-limiting

The Worker has no rate limit wired yet. Two paths — pick one before cutover:

1. **Cloudflare WAF rate-limiting rule** on the `vivcom.com.au/api/contact` path (dashboard-only, no code). Simpler; no binding churn.
2. **`ratelimits` binding in `wrangler.jsonc`** — programmatic, testable locally, but adds a binding to manage.

Recommendation: start with option 1 (e.g. 5 requests per minute per IP). Revisit if abuse patterns require per-field or per-session logic.

---

*End of PRD — ready for review and iteration.*