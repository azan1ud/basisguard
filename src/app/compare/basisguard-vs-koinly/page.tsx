import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BasisGuard vs Koinly: Which Is Better for Fixing Your 1099-DA?",
  description:
    "Compare BasisGuard and Koinly for 1099-DA cost basis correction. See pricing, features, and which tool is best for fixing missing cost basis on your crypto tax forms.",
  keywords: [
    "BasisGuard vs Koinly",
    "Koinly alternative",
    "1099-DA cost basis",
    "crypto tax tool comparison",
    "Koinly pricing",
    "fix 1099-DA",
    "Form 8949 generator",
    "crypto tax calculator",
  ],
  openGraph: {
    title: "BasisGuard vs Koinly: Which Is Better for Fixing Your 1099-DA?",
    description:
      "Side-by-side comparison of BasisGuard and Koinly for correcting missing cost basis on IRS Form 1099-DA.",
    type: "article",
    url: "https://basisguard.com/compare/basisguard-vs-koinly",
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

export default function BasisGuardVsKoinlyPage() {
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
            BasisGuard vs Koinly: Which Is Better for Fixing Your 1099-DA?
          </h1>
          <p className="text-slate mb-8">
            Both tools help with crypto taxes, but they solve very different problems. Here&apos;s an honest
            breakdown to help you decide.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Quick Answer</h2>
              <p>
                <strong>Koinly</strong> is a comprehensive crypto tax suite that tracks your entire portfolio,
                handles DeFi, NFTs, staking, and generates full tax reports across 20+ countries.{" "}
                <strong>BasisGuard</strong> does one thing and does it exceptionally well: it detects and
                corrects missing cost basis on your IRS 1099-DA, then generates a corrected Form 8949.
              </p>
              <p className="mt-3">
                If your only problem is that your 1099-DA shows $0 cost basis and you need to fix it before
                filing, BasisGuard is faster, cheaper, and purpose-built for exactly that. If you need a
                full-featured crypto tax platform for ongoing portfolio management, Koinly is the broader tool.
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
                      <th className="text-center px-4 py-3 font-semibold">Koinly</th>
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
                        <span className="text-xs text-slate">$49 &ndash; $279/year</span>
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
                        <span className="font-medium">30&ndash;60 minutes</span>
                        <br />
                        <span className="text-xs text-slate">(sync all exchanges)</span>
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
                      <td className="px-4 py-3 text-center"><PartialIcon /> <span className="text-xs text-slate ml-1">Limited free tier</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Exchange Support</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">Major US exchanges</span>
                        <br />
                        <span className="text-xs text-slate">+ any CSV import</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold text-emerald-dark">200+ exchanges</span>
                        <br />
                        <span className="text-xs text-slate">+ API sync</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">DeFi / NFT / Staking Tracking</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">Not the focus</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Comprehensive</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Portfolio Tracking</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Multi-Country Tax Reports</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">US only</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">20+ countries</span></td>
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
                  <h4 className="font-semibold text-emerald-dark mb-2">Purpose-Built for 1099-DA</h4>
                  <p className="text-sm">
                    BasisGuard was designed from the ground up to solve one problem: your 1099-DA has missing
                    or wrong cost basis. Upload it, connect your exchange data, and get a corrected Form 8949
                    in minutes. No need to configure wallets, tag transactions, or learn a complex platform.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Save Money</h4>
                  <p className="text-sm">
                    Pay <strong>$19.99&ndash;$69.99 once</strong> versus $49&ndash;$279 every year with
                    Koinly. If you only need to fix your 1099-DA for this tax season, why pay for a
                    subscription you don&apos;t need?
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">2-Minute Setup</h4>
                  <p className="text-sm">
                    Koinly requires syncing all your exchanges and wallets to build a complete transaction
                    history. BasisGuard only needs your 1099-DA and your exchange CSV. Upload, analyze, done.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Free Mismatch Report</h4>
                  <p className="text-sm">
                    See exactly how much you would overpay before spending a single dollar. BasisGuard shows
                    you the full mismatch analysis for free. You only pay when you want the corrected forms.
                  </p>
                </div>
              </div>
            </section>

            {/* Koinly Advantages */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Where Koinly Wins</h2>
              <p>
                To be fair, Koinly is a powerful platform with capabilities well beyond what BasisGuard offers:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>200+ exchange integrations</strong> with automatic API syncing &mdash; excellent if
                  you trade across many platforms.
                </li>
                <li>
                  <strong>DeFi, NFT, and staking support</strong> &mdash; Koinly can track complex on-chain
                  activities like liquidity pools, yield farming, and NFT sales.
                </li>
                <li>
                  <strong>Portfolio tracking</strong> &mdash; real-time portfolio dashboard with gain/loss
                  tracking throughout the year.
                </li>
                <li>
                  <strong>International tax reports</strong> &mdash; supports tax filing in over 20 countries,
                  not just the US.
                </li>
                <li>
                  <strong>Tax-loss harvesting insights</strong> &mdash; identifies unrealized losses you could
                  sell to offset gains.
                </li>
              </ul>
            </section>

            {/* Who Should Choose */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose BasisGuard?</h2>
              <div className="bg-emerald/5 border border-emerald/20 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose BasisGuard if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Your 1099-DA shows $0 or incorrect cost basis and you need to fix it</li>
                  <li>You want a corrected Form 8949 as fast as possible</li>
                  <li>You prefer a one-time payment over a recurring subscription</li>
                  <li>You trade primarily on major US exchanges (Coinbase, Kraken, Binance.US, Gemini)</li>
                  <li>You don&apos;t need DeFi/NFT tracking or portfolio management</li>
                  <li>You want to see your overpayment amount before paying anything</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose Koinly?</h2>
              <div className="bg-navy/5 border border-navy/10 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose Koinly if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>You trade across many exchanges and need API-based auto-syncing</li>
                  <li>You&apos;re active in DeFi, NFTs, or staking and need those tracked</li>
                  <li>You want year-round portfolio tracking, not just tax-time tools</li>
                  <li>You file taxes outside the US (UK, Australia, Canada, etc.)</li>
                  <li>You want tax-loss harvesting recommendations</li>
                  <li>You don&apos;t mind paying an annual subscription for a broader feature set</li>
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
                  <h4 className="font-semibold text-charcoal mb-3">Koinly</h4>
                  <ul className="text-sm space-y-2">
                    <li>Newbie: <span className="font-mono font-semibold">$49/yr</span> <span className="text-slate">(100 transactions)</span></li>
                    <li>Hodler: <span className="font-mono font-semibold">$99/yr</span> <span className="text-slate">(1,000 transactions)</span></li>
                    <li>Trader: <span className="font-mono font-semibold">$179/yr</span> <span className="text-slate">(3,000 transactions)</span></li>
                    <li>Pro: <span className="font-mono font-semibold">$279/yr</span> <span className="text-slate">(10,000 transactions)</span></li>
                    <li className="pt-2 text-slate font-semibold">Renews annually. Per tax year.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Verdict */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Bottom Line</h2>
              <p>
                Koinly is a solid all-in-one crypto tax platform, and if you need its full feature set, it&apos;s
                worth the subscription. But if your specific problem is a 1099-DA with missing cost basis and you
                need a corrected Form 8949, you don&apos;t need a Swiss Army knife &mdash; you need a scalpel.
                BasisGuard gets the job done in 2 minutes for a fraction of the cost, with no subscription
                strings attached.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">See How Much Your 1099-DA Is Costing You</h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and get a free mismatch report in under 2 minutes. No credit card required.
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
            This comparison is based on publicly available information as of March 2026. Koinly is a trademark
            of Koinly Ltd. BasisGuard is not affiliated with, endorsed by, or sponsored by Koinly. Pricing and
            features may change. Always verify current details on each provider&apos;s website.
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
