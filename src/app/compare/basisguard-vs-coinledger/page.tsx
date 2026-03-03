import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BasisGuard vs CoinLedger: The Best Tool for 1099-DA Mismatches",
  description:
    "Compare BasisGuard and CoinLedger for fixing 1099-DA cost basis mismatches. See pricing, features, TurboTax integration, and which tool saves you the most.",
  keywords: [
    "BasisGuard vs CoinLedger",
    "CoinLedger alternative",
    "1099-DA mismatch",
    "crypto tax comparison",
    "CoinLedger pricing",
    "fix 1099-DA",
    "Form 8949 generator",
    "crypto tax calculator",
    "TurboTax crypto",
    "CryptoTrader.Tax",
  ],
  openGraph: {
    title: "BasisGuard vs CoinLedger: The Best Tool for 1099-DA Mismatches",
    description:
      "Side-by-side comparison of BasisGuard and CoinLedger for correcting missing cost basis on IRS Form 1099-DA.",
    type: "article",
    url: "https://basisguard.com/compare/basisguard-vs-coinledger",
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

export default function BasisGuardVsCoinLedgerPage() {
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
            BasisGuard vs CoinLedger: The Best Tool for 1099-DA Mismatches
          </h1>
          <p className="text-slate mb-8">
            CoinLedger (formerly CryptoTrader.Tax) is one of the longest-running crypto tax tools. But when
            your 1099-DA has missing cost basis, which tool actually fixes the problem faster and cheaper?
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Quick Answer</h2>
              <p>
                <strong>CoinLedger</strong> is a general-purpose crypto tax reporting platform best known for
                its TurboTax and H&amp;R Block integrations. It calculates your crypto gains and losses from
                your full transaction history and produces tax forms you can import directly into tax software.
              </p>
              <p className="mt-3">
                <strong>BasisGuard</strong> is a specialized tool built for one thing: detecting missing cost
                basis on your 1099-DA and generating a corrected Form 8949 with the right numbers. If your
                1099-DA shows $0 basis and you need that fixed, BasisGuard gets it done in 2 minutes for a
                one-time fee.
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
                      <th className="text-center px-4 py-3 font-semibold">CoinLedger</th>
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
                        <span className="text-xs text-slate">$49 &ndash; $299/year</span>
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
                        <span className="font-medium">15&ndash;30 minutes</span>
                        <br />
                        <span className="text-xs text-slate">(import all transactions)</span>
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
                      <td className="px-4 py-3 text-center"><PartialIcon /> <span className="text-xs text-slate ml-1">Preview only</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Exchange Support</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">Major US exchanges</span>
                        <br />
                        <span className="text-xs text-slate">+ any CSV import</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">100+ exchanges</span>
                        <br />
                        <span className="text-xs text-slate">+ API &amp; CSV</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">TurboTax / H&amp;R Block Integration</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">PDF download</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Direct import</span></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Tax Professional Reports</td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Discrepancy report</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /> <span className="text-xs text-slate ml-1">Full tax package</span></td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Margin / Futures Trading</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">DeFi / NFT Support</td>
                      <td className="px-4 py-3 text-center"><CrossIcon /> <span className="text-xs text-slate ml-1">Not the focus</span></td>
                      <td className="px-4 py-3 text-center"><CheckIcon /></td>
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
                  <h4 className="font-semibold text-emerald-dark mb-2">Built for the 1099-DA Problem</h4>
                  <p className="text-sm">
                    CoinLedger generates tax reports from scratch by importing your full transaction history.
                    BasisGuard starts from the actual problem: your 1099-DA shows wrong numbers. It
                    automatically detects every mismatch, shows you the overpayment, and generates the
                    correction.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">No Recurring Fees</h4>
                  <p className="text-sm">
                    CoinLedger charges $49&ndash;$299 <strong>every year</strong>. BasisGuard is a one-time
                    purchase of $19.99&ndash;$69.99. If you switch to BasisGuard, you stop paying the annual
                    crypto tax tool subscription.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">See Your Savings First</h4>
                  <p className="text-sm">
                    BasisGuard shows you the complete mismatch analysis &mdash; how many transactions have
                    wrong basis, and exactly how much you&apos;d overpay &mdash; before you spend a dollar.
                    CoinLedger shows a limited preview and requires payment to download forms.
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-2">Simpler Workflow</h4>
                  <p className="text-sm">
                    CoinLedger asks you to import every transaction you&apos;ve ever made. BasisGuard only
                    needs two things: your 1099-DA and your exchange history. No wallet syncing, no
                    transaction tagging, no manual classifications.
                  </p>
                </div>
              </div>
            </section>

            {/* CoinLedger Advantages */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Where CoinLedger Wins</h2>
              <p>
                CoinLedger has been around since 2018 (as CryptoTrader.Tax) and offers features that
                BasisGuard does not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>TurboTax and H&amp;R Block integration</strong> &mdash; this is CoinLedger&apos;s
                  standout feature. You can import your crypto tax data directly into TurboTax or H&amp;R Block
                  with a few clicks, no PDF uploads needed.
                </li>
                <li>
                  <strong>Full crypto tax reporting</strong> &mdash; handles not just cost basis corrections but
                  also mining income, staking rewards, airdrops, DeFi yields, and NFT sales.
                </li>
                <li>
                  <strong>Margin and futures trading</strong> &mdash; supports more complex trading activities
                  that some platforms do not track.
                </li>
                <li>
                  <strong>Audit trail</strong> &mdash; generates a comprehensive tax package with supporting
                  documents that can be useful if the IRS requests additional information.
                </li>
                <li>
                  <strong>Multi-year support</strong> &mdash; if you need to file or amend returns for
                  previous years, CoinLedger stores your history and can regenerate past reports.
                </li>
              </ul>
            </section>

            {/* Who Should Choose */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose BasisGuard?</h2>
              <div className="bg-emerald/5 border border-emerald/20 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose BasisGuard if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Your main issue is a 1099-DA with $0 or incorrect cost basis</li>
                  <li>You want the corrected Form 8949 as fast as possible</li>
                  <li>You prefer paying once instead of subscribing annually</li>
                  <li>You file your taxes with a CPA or manually (and can attach the corrected Form 8949 PDF)</li>
                  <li>You trade on major US exchanges and don&apos;t have complex DeFi activity</li>
                  <li>You want to see your full mismatch analysis for free before paying</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Who Should Choose CoinLedger?</h2>
              <div className="bg-navy/5 border border-navy/10 rounded-card p-5 mt-3">
                <p className="font-semibold text-navy mb-2">Choose CoinLedger if:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>You file with TurboTax or H&amp;R Block and want direct import integration</li>
                  <li>You have complex crypto activity: DeFi, staking, margin trading, NFTs</li>
                  <li>You trade on many exchanges and need broad CSV/API import support</li>
                  <li>You want a full audit-ready tax package with supporting documentation</li>
                  <li>You need to file or amend returns for multiple prior tax years</li>
                  <li>You want one tool that handles all your crypto tax obligations, not just 1099-DA correction</li>
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
                  <h4 className="font-semibold text-charcoal mb-3">CoinLedger</h4>
                  <ul className="text-sm space-y-2">
                    <li>Hobbyist: <span className="font-mono font-semibold">$49/yr</span> <span className="text-slate">(100 transactions)</span></li>
                    <li>Day Trader: <span className="font-mono font-semibold">$99/yr</span> <span className="text-slate">(1,500 transactions)</span></li>
                    <li>High Volume: <span className="font-mono font-semibold">$199/yr</span> <span className="text-slate">(5,000 transactions)</span></li>
                    <li>Unlimited: <span className="font-mono font-semibold">$299/yr</span> <span className="text-slate">(unlimited transactions)</span></li>
                    <li className="pt-2 text-slate font-semibold">Renews annually. Per tax year.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-emerald/5 border border-emerald/20 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>3-year cost comparison:</strong> If you use 500 transactions per year, CoinLedger costs
                  $99/yr x 3 = <strong>$297</strong>. BasisGuard costs <strong>$39.99 total</strong> for the same
                  transaction count. That&apos;s a savings of over <strong>$250</strong>.
                </p>
              </div>
            </section>

            {/* A Note on TurboTax */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">A Note on TurboTax Integration</h2>
              <p>
                CoinLedger&apos;s TurboTax integration is genuinely useful &mdash; it lets you import your
                crypto transactions directly without manually entering Form 8949 data. If you file exclusively
                with TurboTax and this convenience is important to you, it&apos;s a legitimate reason to choose
                CoinLedger.
              </p>
              <p className="mt-3">
                However, if your main concern is correcting the cost basis on your 1099-DA, keep in mind that
                TurboTax also accepts PDF attachments of Form 8949. You can download the corrected form from
                BasisGuard and attach it to your TurboTax filing. It takes an extra step, but it saves you
                $50&ndash;$230 in annual subscription fees.
              </p>
            </section>

            {/* Verdict */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Bottom Line</h2>
              <p>
                CoinLedger is a well-rounded crypto tax platform with strong integrations and years of
                reliability. If you need a comprehensive solution for complex crypto activity across multiple
                years, it&apos;s a solid choice.
              </p>
              <p className="mt-3">
                But if your problem is straightforward &mdash; your 1099-DA has missing cost basis and you
                need a corrected Form 8949 &mdash; BasisGuard solves it in 2 minutes for a one-time fee.
                No annual subscription, no complex setup, and you see your potential savings before
                paying a cent.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Find Out How Much Your 1099-DA Is Wrong</h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and get a free mismatch report. See exactly how much you&apos;d overpay
                with the wrong cost basis.
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
            This comparison is based on publicly available information as of March 2026. CoinLedger is a
            trademark of CoinLedger, Inc. (formerly CryptoTrader.Tax). BasisGuard is not affiliated with,
            endorsed by, or sponsored by CoinLedger. Pricing and features may change. Always verify current
            details on each provider&apos;s website.
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
