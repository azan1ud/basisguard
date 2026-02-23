import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — BasisGuard",
  description: "Terms and conditions for using BasisGuard.",
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-navy mb-2">Terms of Service</h1>
          <p className="text-sm text-slate mb-8">Last updated: February 23, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using BasisGuard (&quot;the Service&quot;), operated by Avantware (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
                you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">2. Description of Service</h2>
              <p>
                BasisGuard is a tax analysis tool that helps cryptocurrency traders identify discrepancies between
                their IRS Form 1099-DA and their actual cost basis. The Service analyzes uploaded tax documents and
                exchange transaction history to generate corrected Form 8949 and discrepancy reports.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">3. Not Tax Advice</h2>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4">
                <p className="font-semibold text-amber-dark mb-2">Important Disclaimer</p>
                <p>
                  BasisGuard is <strong>not</strong> a tax advisor, CPA, attorney, or financial advisor. The information,
                  calculations, and reports provided by the Service are for <strong>informational and educational purposes only</strong> and
                  do not constitute tax, legal, or financial advice. You should consult a qualified tax professional
                  before making any tax filing decisions based on information provided by BasisGuard.
                </p>
              </div>
              <p className="mt-3">
                While we strive for accuracy, we do not guarantee that our calculations are error-free. Tax laws and
                regulations are complex and subject to change. You are solely responsible for the accuracy of your
                tax filings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">4. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must not share your account with others</li>
                <li>You must be at least 18 years old to use the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">5. Payments and Refunds</h2>
              <p>
                BasisGuard offers one-time payments (not subscriptions) processed securely through Stripe.
                Pricing tiers are based on transaction count:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Starter:</strong> $19.99 for up to 100 transactions</li>
                <li><strong>Pro:</strong> $39.99 for up to 1,000 transactions</li>
                <li><strong>Unlimited:</strong> $69.99 for unlimited transactions</li>
              </ul>
              <p className="mt-3">
                We offer a <strong>30-day money-back guarantee</strong>. If you are unsatisfied with the Service for any reason,
                contact us within 30 days of purchase for a full refund. Refund requests can be sent to{" "}
                <a href="mailto:support@basisguard.com" className="text-emerald hover:text-emerald-dark">support@basisguard.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">6. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Service for any illegal purpose or to facilitate tax fraud</li>
                <li>Upload malicious files or attempt to compromise the Service</li>
                <li>Reverse-engineer, decompile, or disassemble the Service</li>
                <li>Resell or redistribute reports generated by the Service</li>
                <li>Use automated tools to scrape or access the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">7. Intellectual Property</h2>
              <p>
                The Service, including its design, code, algorithms, and content, is owned by Avantware and protected
                by copyright and intellectual property laws. The reports generated for you are yours to keep, use, and
                share with your tax professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, BasisGuard and Avantware shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including but not limited to loss of profits,
                data, or tax penalties, resulting from your use of or inability to use the Service.
              </p>
              <p className="mt-2">
                Our total liability for any claim arising from the Service shall not exceed the amount you paid for the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">9. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. We will notify you of significant changes by
                email or through a notice on the Service. Continued use of the Service after changes constitutes
                acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware,
                United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">11. Contact</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:legal@basisguard.com" className="text-emerald hover:text-emerald-dark">
                  legal@basisguard.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
