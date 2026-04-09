/**
 * Google Ads (gtag.js) integration + conversion tracking + UTM capture.
 *
 * Placeholder IDs — replace once Juan provides the Google Ads account:
 *   - GOOGLE_ADS_ID  → AW-XXXXXXXXXX
 *   - Conversion labels in track* functions → from Google Ads UI
 */

const GOOGLE_ADS_ID = 'AW-XXXXXXXXXX'
const UTM_STORAGE_KEY = 'vivcom-utm'

// ---------------------------------------------------------------------------
// Script loader
// ---------------------------------------------------------------------------

export function loadGtag(): void {
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
  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/CONVERSION_LABEL_FORM`,
  })
}

export function trackWhatsAppClick(): void {
  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/CONVERSION_LABEL_WHATSAPP`,
  })
}

export function trackCallClick(): void {
  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/CONVERSION_LABEL_CALL`,
  })
}

// ---------------------------------------------------------------------------
// UTM parameter capture
// ---------------------------------------------------------------------------

function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search)
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
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
