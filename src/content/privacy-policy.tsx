/* LEGAL NOTICE: This is a template for illustration purposes.
   It must be reviewed by a qualified legal professional before publication. */

export function PrivacyPolicyContent() {
  return (
    <div className="space-y-6 text-sm text-foreground">
      <p className="text-xs text-muted-foreground italic">
        Draft template — requires legal review before go-live.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">1. About This Policy</h3>
      <p>
        VIVCOM PTY LTD (&ldquo;VIVCOM&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal information
        in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
        This policy explains how we collect, use, disclose, and store your personal information.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">2. Information We Collect</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Contact details</strong> — name, email address, phone number, and company name submitted via our contact form.</li>
        <li><strong>Service interest</strong> — the type of service you are enquiring about.</li>
        <li><strong>Marketing attribution</strong> — UTM parameters (utm_source, utm_medium, utm_campaign) from the URL you arrived from.</li>
        <li><strong>Usage data</strong> — anonymised analytics collected via Cloudflare Web Analytics (no cookies, no personal data).</li>
        <li><strong>Cookies</strong> — see our Cookie Policy for details on optional analytics and marketing cookies.</li>
      </ul>

      <h3 className="text-vivcom-dark-blue font-semibold">3. How We Use Your Information</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>To respond to your enquiry and provide a quote for our services.</li>
        <li>To route your enquiry to the appropriate service team.</li>
        <li>To measure and improve the effectiveness of our advertising (Google Ads).</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h3 className="text-vivcom-dark-blue font-semibold">4. Disclosure to Third Parties</h3>
      <p>We may share your personal information with:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Cloudflare, Inc.</strong> — website hosting and analytics (US-based).</li>
        <li><strong>Google LLC</strong> — advertising measurement via Google Ads (US-based).</li>
        <li><strong>VIV53 LLC</strong> — our consulting partner based in Miami, FL, USA. Enquiries related to consulting and automation services (Data Centre Automation, Cybersecurity & Compliance, Cloud Infrastructure) may be shared with VIV53 for fulfilment.</li>
      </ul>
      <p>
        By submitting an enquiry for consulting services, you consent to the cross-border transfer of your
        information to the United States for the purpose of service delivery.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">5. Data Storage & Security</h3>
      <p>
        We take reasonable steps to protect your personal information from misuse, interference, loss,
        and unauthorised access. Form submissions are transmitted via encrypted HTTPS connections.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">6. Access & Correction</h3>
      <p>
        You have the right to request access to, or correction of, the personal information we hold about you.
        Contact us at the details below to make a request.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">7. Complaints</h3>
      <p>
        If you believe we have breached the APPs, you may lodge a complaint with us. If you are not satisfied
        with our response, you may escalate to the Office of the Australian Information Commissioner (OAIC)
        at <span className="font-medium">www.oaic.gov.au</span>.
      </p>

      <h3 className="text-vivcom-dark-blue font-semibold">8. Contact</h3>
      <p>
        VIVCOM PTY LTD<br />
        Sydney, NSW, Australia<br />
        Email: <a href="mailto:contact@vivcom.com.au" className="text-vivcom-blue hover:underline">contact@vivcom.com.au</a>
      </p>

      <p className="text-xs text-muted-foreground">Last updated: April 2026</p>
    </div>
  )
}
