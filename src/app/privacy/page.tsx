import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — BasisGuard",
  description: "How BasisGuard collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-navy">
            Basis<span className="text-emerald">Guard</span>
          </Link>
          <Link href="/" className="text-sm text-slate hover:text-charcoal transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-card shadow-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-navy mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate mb-8">Last updated: February 23, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">1. Information We Collect</h2>
              <p>When you use BasisGuard, we may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Account Information:</strong> Email address and name when you create an account via Google sign-in or email registration.</li>
                <li><strong>Tax Documents:</strong> 1099-DA PDF files and CSV files you upload for analysis. These are processed to extract transaction data and are not permanently stored after your session.</li>
                <li><strong>Exchange Data:</strong> Read-only transaction history retrieved from connected exchange accounts (Coinbase, Kraken, Gemini, Binance). We only request read permissions and never access trading or withdrawal capabilities.</li>
                <li><strong>Payment Information:</strong> Payments are processed by Stripe. We do not store credit card numbers, CVVs, or full card details on our servers.</li>
                <li><strong>Usage Data:</strong> Anonymous analytics about how you use the application (pages visited, features used) via PostHog.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To analyze your 1099-DA data and calculate accurate cost basis</li>
                <li>To generate corrected Form 8949 and discrepancy reports</li>
                <li>To process payments via Stripe</li>
                <li>To save your reports to your dashboard for future access</li>
                <li>To improve our product and user experience</li>
                <li>To communicate with you about your account or important product updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">3. Exchange API Keys</h2>
              <p>
                When you connect an exchange account using API keys (Kraken, Gemini, Binance), your keys are used
                <strong> only once</strong> to retrieve your transaction history. API keys are transmitted over encrypted
                connections (TLS 1.3) and are <strong>never stored</strong> in our database. After your transaction data
                is retrieved, the keys are discarded from memory.
              </p>
              <p className="mt-2">
                For Coinbase, we use OAuth2 with read-only scopes. Your Coinbase credentials are never shared with us —
                authentication happens directly on Coinbase&apos;s servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">4. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data is encrypted in transit using TLS 1.2+ (256-bit encryption)</li>
                <li>Financial data is encrypted at rest in Firebase Firestore</li>
                <li>We use Firebase Security Rules to ensure users can only access their own data</li>
                <li>Our infrastructure runs on Vercel and Google Cloud (Firebase), both SOC 2 compliant</li>
                <li>We never request or store exchange withdrawal or trading permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">5. Data Retention</h2>
              <p>
                Uploaded PDF and CSV files are processed in memory and not permanently stored. Your analysis results
                and generated reports are saved to your account dashboard and retained until you delete them or close
                your account. You can request deletion of all your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">6. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Firebase (Google):</strong> Authentication and data storage</li>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Vercel:</strong> Application hosting</li>
                <li><strong>PostHog:</strong> Anonymous product analytics</li>
                <li><strong>CoinGecko:</strong> Historical cryptocurrency price data</li>
              </ul>
              <p className="mt-2">Each of these services has its own privacy policy governing their use of data.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data and account</li>
                <li>Export your data in a machine-readable format</li>
                <li>Opt out of analytics tracking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">8. Contact</h2>
              <p>
                For privacy-related questions or data requests, contact us at{" "}
                <a href="mailto:privacy@basisguard.com" className="text-emerald hover:text-emerald-dark">
                  privacy@basisguard.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
