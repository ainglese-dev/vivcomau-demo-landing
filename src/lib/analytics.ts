/**
 * Google Ads (gtag.js) integration + conversion tracking + UTM capture.
 *
 * Configure via Vite env vars (set in Cloudflare Pages project settings):
 *   - VITE_GOOGLE_ADS_ID              e.g. AW-1234567890
 *   - VITE_CONVERSION_LABEL_FORM      conversion label from Google Ads UI
 *
 * Both are inlined into the client bundle at build time — safe for public IDs
 * only. Never use VITE_* for secrets (use Cloudflare Worker secrets instead).
 */

const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID ?? ''
const CONVERSION_LABEL_FORM = import.meta.env.VITE_CONVERSION_LABEL_FORM ?? ''
const UTM_STORAGE_KEY = 'vivcom-utm'
const UTM_ALLOWED = /^[A-Za-z0-9_\-.~]+$/
const UTM_MAX_LEN = 200

function isConfigured(): boolean {
  return /^AW-\d+$/.test(GOOGLE_ADS_ID)
}

// ---------------------------------------------------------------------------
// Script loader
// ---------------------------------------------------------------------------

export function loadGtag(): void {
  if (!isConfigured()) {
    console.warn('[analytics] VITE_GOOGLE_ADS_ID is not set; gtag not loaded.')
    return
  }
  if (document.getElementById('gtag-script')) return

  const script = document.createElement('script')
  script.id = 'gtag-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ADS_ID)

  captureUtmParams()
}

// ---------------------------------------------------------------------------
// Conversion events
// ---------------------------------------------------------------------------

export function trackFormSubmission(): void {
  if (!isConfigured() || !CONVERSION_LABEL_FORM) return
  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL_FORM}`,
  })
}


// ---------------------------------------------------------------------------
// UTM parameter capture
// ---------------------------------------------------------------------------

function sanitizeUtm(value: string | null): string | null {
  if (!value) return null
  const trimmed = value.slice(0, UTM_MAX_LEN)
  return UTM_ALLOWED.test(trimmed) ? trimmed : null
}

function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search)
  const utm = {
    source: sanitizeUtm(params.get('utm_source')),
    medium: sanitizeUtm(params.get('utm_medium')),
    campaign: sanitizeUtm(params.get('utm_campaign')),
    term: sanitizeUtm(params.get('utm_term')),
    content: sanitizeUtm(params.get('utm_content')),
  }
  if (Object.values(utm).some(Boolean)) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm))
  }
}

export function getUtmParams(): Record<string, string | null> | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Consent-based initialisation
// ---------------------------------------------------------------------------

export function initAnalytics(prefs: {
  analytics: boolean
  marketing: boolean
}): void {
  if (prefs.marketing) {
    loadGtag()
  }
}
