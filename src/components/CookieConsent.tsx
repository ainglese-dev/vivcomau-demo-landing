import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react'
import { PrivacyPolicyDialog } from '@/components/legal/PrivacyPolicyDialog'
import { CookiePolicyDialog } from '@/components/legal/CookiePolicyDialog'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'vivcom-cookie-consent'

function getStoredPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const stored = getStoredPreferences()
    if (!stored) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveAndClose = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    setIsVisible(false)
    // TODO: Initialize analytics/marketing scripts based on prefs
  }

  const handleAcceptAll = () =>
    saveAndClose({ essential: true, analytics: true, marketing: true })

  const handleDecline = () =>
    saveAndClose({ essential: true, analytics: false, marketing: false })

  const handleSavePreferences = () =>
    saveAndClose({ ...preferences, essential: true })

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-4 md:left-6 z-50 w-[calc(100%-2rem)] md:w-full max-w-sm bg-background p-6 rounded-2xl shadow-2xl border border-border animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-vivcom-green/10 flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5 text-vivcom-green" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-vivcom-dark-blue mb-1">
            We value your privacy
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            We use cookies to enhance your experience and analyse our traffic.{' '}
            <CookiePolicyDialog>
              <button className="text-vivcom-blue hover:underline font-medium">
                Cookie Policy
              </button>
            </CookiePolicyDialog>
            {' · '}
            <PrivacyPolicyDialog>
              <button className="text-vivcom-blue hover:underline font-medium">
                Privacy Policy
              </button>
            </PrivacyPolicyDialog>
          </p>
        </div>
      </div>

      {/* Granular preferences toggle */}
      <button
        onClick={() => setShowPreferences(!showPreferences)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-vivcom-dark-blue font-medium mb-4 transition-colors"
      >
        Manage preferences
        {showPreferences ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>

      {showPreferences && (
        <div className="space-y-3 mb-4 p-3 bg-muted/50 rounded-lg border border-border">
          <PreferenceToggle
            label="Essential"
            description="Required for the site to function"
            checked
            disabled
          />
          <PreferenceToggle
            label="Analytics"
            description="Help us understand site usage"
            checked={preferences.analytics}
            onChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
          />
          <PreferenceToggle
            label="Marketing"
            description="Google Ads conversion tracking"
            checked={preferences.marketing}
            onChange={(v) => setPreferences((p) => ({ ...p, marketing: v }))}
          />
          <Button
            size="sm"
            className="w-full"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 w-full">
        <Button variant="outline" className="flex-1" onClick={handleDecline}>
          Decline
        </Button>
        <Button
          className="flex-1 bg-vivcom-green hover:bg-vivcom-green/90 text-vivcom-dark-blue font-semibold"
          onClick={handleAcceptAll}
        >
          Accept All
        </Button>
      </div>
    </div>
  )
}

function PreferenceToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <div>
        <span className="text-sm font-medium text-vivcom-dark-blue">
          {label}
        </span>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-border text-vivcom-blue focus:ring-vivcom-light-blue disabled:opacity-50"
      />
    </label>
  )
}
