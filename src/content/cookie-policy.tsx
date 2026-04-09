/* LEGAL NOTICE: This is a template for illustration purposes.
   It must be reviewed by a qualified legal professional before publication. */

export function CookiePolicyContent() {
  return (
    <div className="space-y-6 text-sm text-foreground">
      <p className="text-xs text-muted-foreground italic">
        Draft template — requires legal review before go-live.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">1. What Are Cookies?</h3>
      <p>
        Cookies are small text files placed on your device when you visit a website. They help the site
        remember your preferences and understand how you interact with it.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">2. Cookies We Use</h3>

      <h4 className="text-vivcom-dark-blue font-medium">Essential Cookies</h4>
      <p>
        These cookies are required for the website to function. They include your cookie consent preference
        stored in your browser&rsquo;s local storage. They cannot be disabled.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>vivcom-cookie-consent</strong> — stores your cookie consent preferences (local storage).</li>
      </ul>

      <h4 className="text-vivcom-dark-blue font-medium">Analytics Cookies</h4>
      <p>
        When you consent, we use Cloudflare Web Analytics to understand how visitors interact with our site.
        Cloudflare Web Analytics is privacy-first and does not use cookies or collect personal data by default.
      </p>

      <h4 className="text-vivcom-dark-blue font-medium">Marketing Cookies</h4>
      <p>
        When you consent, we may load Google Ads conversion tracking (gtag.js) which sets cookies to measure
        the effectiveness of our advertising campaigns. These cookies are set by Google and are subject to
        Google&rsquo;s privacy policy.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>_gcl_au</strong> — Google Ads conversion linker.</li>
        <li><strong>_ga, _gid</strong> — Google Analytics (if enabled via Google Ads).</li>
      </ul>

      <h3 className="text-vivcom-dark-blue font-semibold">3. Managing Your Preferences</h3>
      <p>
        You can change your cookie preferences at any time using the &ldquo;Cookie Settings&rdquo; option in our website footer.
        You can also delete cookies through your browser settings.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">4. Third-Party Cookies</h3>
      <p>
        Some cookies are placed by third-party services that appear on our pages. We do not control these
        cookies. Please refer to the respective third-party privacy policies:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Google Ads — <span className="text-vivcom-blue">policies.google.com/privacy</span></li>
        <li>Cloudflare — <span className="text-vivcom-blue">cloudflare.com/privacypolicy</span></li>
      </ul>

      <h3 className="text-vivcom-dark-blue font-semibold">5. Contact</h3>
      <p>
        If you have questions about our use of cookies, contact VIVCOM PTY LTD at{' '}
        <a href="tel:+61402229561" className="text-vivcom-blue hover:underline">0402 229 561</a>.
      </p>

      <p className="text-xs text-muted-foreground">Last updated: April 2026</p>
    </div>
  )
}
