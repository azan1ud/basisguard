import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BasisGuard vs CoinTracker: Cost Basis Correction Compared",
  description:
    "Compare BasisGuard and CoinTracker for fixing 1099-DA cost basis errors. See pricing, features, and which crypto tax tool is right for your situation.",
  keywords: [
    "BasisGuard vs CoinTracker",
    "CoinTracker alternative",
    "1099-DA cost basis",
    "crypto tax comparison",
    "CoinTracker pricing",
    "fix 1099-DA",
    "Form 8949 generator",
    "crypto tax calculator",
    "Coinbase tax tool",
  ],
  openGraph: {
    title: "BasisGuard vs CoinTracker: Cost Basis Correction Compared",
    description:
      "Side-by-side comparison of BasisGuard and CoinTracker for correcting missing cost basis on IRS Form 1099-DA.",
    type: "article",
    url: "https://basisguard.com/compare/basisguard-vs-cointracker",
  },
};

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-danger inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PartialIcon() {
  return (
    <svg className="w-5 h-5 text-amber inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

export default function BasisGuardVsCoinTrackerPage() {
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
          <div className="mb-3">
            <span className="inline-block bg-emerald/10 text-emerald-dark text-xs font-semibold px-3 py-1 rounded-full">
              Comparison
            </span>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-3">
            BasisGuard vs CoinTracker: Cost Basis Correction Compared
          </h1>
          <p className="text-slate mb-8">
            CoinTracker is one of the most popular crypto tax platforms. But is it the right tool for fixing
            your 1099-DA? Here&apos;s how it stacks up against BasisGuard.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Quick Answer</h2>
              <p>
                <strong>CoinTracker</strong> is a well-established crypto portfolio and tax platform, known
                for its deep Coinbase integration and real-time portfolio tracking. It handles everything
                from daily price alerts to year-end tax reports across multiple countries.
              </p>
              <p className="mt-3">
                <strong>BasisGuard</strong> is laser-focused on one critical problem: your 1099-DA has
                missing or zero cost basis, and you need a corrected Form 8949 before you file. If that&apos;s
                your situation, BasisGuard is faster, cheaper, and built specifically for this task.
              </p>
            </section>

            {/* Comparison Table */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Feature Comparison</h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-btn overflow-hidden">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-4 py-3 font-semibold">Feature</th>
                      <th className="text-center px-4 py-3 font-semibold">BasisGuard</th>
                      <th className="text-center px-4 py-3 font-semibold">CoinTracker</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Pricing Model</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-emerald-dark">One-time payment</span>
                        <br />
                        <span className="text-xs text-slate">$19.99 &ndash; $69.99</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">Annual subscription</span>
                        <br />
                        <span className="text-xs text-slate">$59 &ndash; $599/year</span>
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">1099-DA Focus</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Core purpose</span></td>
                      <td className="px-4 py-3 text-center"><PartialIcon /> <span className="text-xs text-slate ml-1">Part of larger suite</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Setup Time</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-emerald-dark">~2 minutes</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">20&ndash;45 minutes</span>
                        <br />
                        <span className="text-xs text-slate">(connect wallets &amp; exchanges)</span>
                      </td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Cost Basis Methods (FIFO/LIFO/HIFO)</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Form 8949 Generation</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">With corrections</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">One-Time Payment (No Subscription)</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                      <td className="px-4 py-3 text-center"><CrossIcon /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Free Analysis Before Paying</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Full mismatch report</span></td>
                      <td className="px-4 py-3 text-center"><PartialIcon /> <span className="text-xs text-slate ml-1">25 free transactions</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Exchange Support</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">Major US exchanges</span>
                        <br />
                        <span className="text-xs text-slate">+ any CSV import</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-emerald-dark">300+ integrations</span>
                        <br />
                        <span className="text-xs text-slate">+ wallet tracking</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Coinbase Integration</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">CSV import</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Deep native integration</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Real-Time Portfolio Tracking</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">DeFi / NFT Support</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">Not the focus</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">CPA / Accountant Access</td>
                      <td className="px-4 py-3 text-center"><PartialIcon /> <span className="text-xs text-slate ml-1">Shareable report</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Dedicated CPA portal</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">1099-DA Mismatch Detection</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Automatic</span></td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">Manual reconciliation</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BasisGuard Advantages */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Where BasisGuard Wins</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Up to 90% Cheaper</h4>
                  <p className="text-sm">
                    CoinTracker&apos;s most popular plan costs <strong>$199/year</strong>. BasisGuard&apos;s
                    Standard plan is <strong>$39.99 once</strong>. Over 3 tax years, that&apos;s $597 vs $39.99
                    &mdash; a savings of over $550.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Designed for the 1099-DA Problem</h4>
                  <p className="text-sm">
                    CoinTracker generates tax reports from your full transaction history. BasisGuard starts
                    with the problem: your 1099-DA has wrong cost basis. It detects every mismatch and
                    generates the corrected forms automatically.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">No Account Required to Start</h4>
                  <p className="text-sm">
                    Upload your 1099-DA and see the full mismatch analysis before creating an account or
                    entering any payment information. CoinTracker requires signup and exchange syncing before
                    you see anything useful.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Faster Time to Resolution</h4>
                  <p className="text-sm">
                    With CoinTracker, you need to connect all exchanges, wait for syncing, review and classify
                    transactions, then generate reports. BasisGuard: upload your 1099-DA, upload your exchange
                    CSV, get corrected Form 8949. Done in 2 minutes.
                  </p>
                </div>
              </div>
            </section>

            {/* CoinTracker Advantages */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Where CoinTracker Wins</h2>
              <p>
                CoinTracker has real strengths that are worth considering if they match your needs:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Coinbase partnership</strong> &mdash; CoinTracker has the deepest Coinbase
                  integration of any tax tool. If you primarily use Coinbase, the seamless data syncing is
                  genuinely convenient.
                </li>
                <li>
                  <strong>Real-time portfolio tracking</strong> &mdash; track your holdings, gains, and
                  losses throughout the year with a polished dashboard, not just at tax time.
                </li>
                <li>
                  <strong>300+ integrations</strong> &mdash; connects to more exchanges, wallets, and
                  blockchains than almost any other tool on the market.
                </li>
                <li>
                  <strong>CPA portal</strong> &mdash; a dedicated interface for accountants and CPAs to
                  access your data, making it easier to work with a tax professional.
                </li>
                <li>
                  <strong>Tax optimization</strong> &mdash; actively suggests tax-saving strategies like
                  tax-loss harvesting and optimal accounting methods throughout the year.
                </li>
              </ul>
            </section>

            {/* Who Should Choose */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose BasisGuard?</h2>
              <div className="bg-emerald/5 border border-emerald/20 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose BasisGuard if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>You received a 1099-DA with missing or zero cost basis and need it corrected</li>
                  <li>You want the fastest path to a corrected Form 8949</li>
                  <li>You don&apos;t want to pay hundreds of dollars per year for features you don&apos;t need</li>
                  <li>You want to see your potential tax savings before paying anything</li>
                  <li>You already filed and need to generate a corrected Form 8949 for an amended return</li>
                  <li>You don&apos;t need portfolio tracking or tax-loss harvesting tools</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose CoinTracker?</h2>
              <div className="bg-navy/5 border border-navy/10 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose CoinTracker if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>You primarily use Coinbase and want seamless native integration</li>
                  <li>You want year-round portfolio tracking with a polished dashboard</li>
                  <li>You trade across many exchanges and want automatic API syncing</li>
                  <li>You work with a CPA who needs direct access to your crypto data</li>
                  <li>You need DeFi and NFT transaction tracking</li>
                  <li>You want proactive tax optimization suggestions throughout the year</li>
                </ul>
              </div>
            </section>

            {/* Pricing Comparison */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Pricing Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-3">BasisGuard</h4>
                  <ul className="text-sm space-y-2">
                    <li>Starter: <span className="font-mono font-semibold">$19.99</span> <span className="text-slate">(up to 50 transactions)</span></li>
                    <li>Standard: <span className="font-mono font-semibold">$39.99</span> <span className="text-slate">(up to 500 transactions)</span></li>
                    <li>Pro: <span className="font-mono font-semibold">$69.99</span> <span className="text-slate">(unlimited transactions)</span></li>
                    <li className="pt-2 text-emerald-dark font-semibold">One-time payment. No subscription.</li>
                  </ul>
                </div>
                <div className="border rounded-card p-5 bg-gray-50">
                  <h4 className="font-semibold text-charcoal mb-3">CoinTracker</h4>
                  <ul className="text-sm space-y-2">
                    <li>Free: <span className="font-mono font-semibold">$0</span> <span className="text-slate">(25 transactions, no forms)</span></li>
                    <li>Base: <span className="font-mono font-semibold">$59/yr</span> <span className="text-slate">(100 transactions)</span></li>
                    <li>Prime: <span className="font-mono font-semibold">$199/yr</span> <span className="text-slate">(1,000 transactions)</span></li>
                    <li>Ultra: <span className="font-mono font-semibold">$599/yr</span> <span className="text-slate">(10,000 transactions)</span></li>
                    <li className="pt-2 text-slate font-semibold">Renews annually. Per tax year.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Worth noting:</strong> CoinTracker&apos;s free tier (25 transactions) does not
                  include downloadable tax forms. To actually file with corrected cost basis, you need a paid
                  plan. BasisGuard shows your full mismatch analysis for free and only charges when you download
                  the corrected forms.
                </p>
              </div>
            </section>

            {/* Verdict */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Bottom Line</h2>
              <p>
                CoinTracker is an excellent platform if you want a full-featured crypto tax and portfolio
                management solution, especially if you&apos;re a Coinbase user. But for the specific problem of
                fixing missing cost basis on your 1099-DA, it&apos;s like hiring an entire accounting firm to
                correct one form.
              </p>
              <p className="mt-3">
                BasisGuard is purpose-built for exactly this situation. Upload your 1099-DA, connect your
                exchange data, and get a corrected Form 8949 &mdash; all in about 2 minutes and for a one-time
                fee that&apos;s a fraction of CoinTracker&apos;s annual subscription.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Don&apos;t Overpay on Your Crypto Taxes</h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and see exactly how much you&apos;d overpay &mdash; free, in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Try BasisGuard Free &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate px-4">
          <p>
            This comparison is based on publicly available information as of March 2026. CoinTracker is a
            trademark of CoinTracker, Inc. BasisGuard is not affiliated with, endorsed by, or sponsored by
            CoinTracker. Pricing and features may change. Always verify current details on each
            provider&apos;s website.
          </p>
          <p className="mt-2">
            BasisGuard provides tax tools, not tax advice. Consult a qualified tax professional for guidance
            specific to your situation.
          </p>
        </div>
      </main>
    </div>
  );
}
