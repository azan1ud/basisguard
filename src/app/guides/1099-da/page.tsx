import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding the 1099-DA — BasisGuard",
  description:
    "What is the new IRS Form 1099-DA, why it matters for crypto traders, and how to handle missing cost basis.",
};

export default function Understanding1099DAPage() {
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
              Tax Guide
            </span>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-3">Understanding the New IRS Form 1099-DA</h1>
          <p className="text-slate mb-8">
            The 2025 tax year is the first time crypto exchanges must report your transactions to the IRS.
            Here&apos;s what you need to know.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">What Is the 1099-DA?</h2>
              <p>
                Form 1099-DA (&quot;Digital Assets&quot;) is a new IRS information return that custodial crypto
                brokers must issue starting with the 2025 tax year. Similar to how your stock broker sends
                you a 1099-B, your crypto exchange now sends a 1099-DA reporting your crypto sales to both
                you and the IRS.
              </p>
              <p className="mt-3">
                This is a major shift. Previously, many crypto exchanges issued voluntary 1099-MISC or
                1099-K forms, but there was no standardized crypto-specific reporting. The 1099-DA changes that.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">What Does the 1099-DA Report?</h2>
              <p>For the <strong>2025 tax year</strong>, the 1099-DA reports:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Gross proceeds</strong> from each sale or disposition of digital assets</li>
                <li><strong>Asset type</strong> (e.g., Bitcoin, Ethereum)</li>
                <li><strong>Sale date</strong></li>
                <li><strong>Transaction ID</strong></li>
                <li><strong>Broker name</strong></li>
              </ul>

              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">The Critical Gap</p>
                <p className="text-sm">
                  For 2025, brokers are <strong>not required to report cost basis</strong>. This means the 1099-DA
                  shows how much you sold crypto for, but <strong>not</strong> how much you paid for it. The IRS
                  receives a form showing $60,000 in proceeds with no cost basis — effectively treating your
                  entire sale amount as taxable gain.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">When Will Cost Basis Be Included?</h2>
              <p>
                The IRS has indicated that cost basis reporting will be phased in for future tax years.
                Starting with <strong>2026 and beyond</strong>, brokers may be required to report cost basis
                for assets that were both purchased and sold on the same platform. However, assets transferred
                between exchanges or wallets will likely still have basis reporting challenges for years to come.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Why Is Missing Basis a Problem?</h2>
              <p>Here&apos;s a real-world example:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-3">What the IRS sees (1099-DA)</h4>
                  <ul className="text-sm space-y-2">
                    <li>Sold: <span className="font-mono font-semibold">1 BTC</span></li>
                    <li>Proceeds: <span className="font-mono font-semibold">$95,000</span></li>
                    <li>Cost basis: <span className="font-mono font-semibold text-danger">$0 (not reported)</span></li>
                    <li>Taxable gain: <span className="font-mono font-semibold text-danger">$95,000</span></li>
                    <li>Estimated tax (24%): <span className="font-mono font-semibold text-danger">$22,800</span></li>
                  </ul>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-3">What actually happened</h4>
                  <ul className="text-sm space-y-2">
                    <li>Bought: <span className="font-mono font-semibold">1 BTC for $82,000</span></li>
                    <li>Sold: <span className="font-mono font-semibold">1 BTC for $95,000</span></li>
                    <li>Actual cost basis: <span className="font-mono font-semibold text-emerald-dark">$82,000</span></li>
                    <li>Actual gain: <span className="font-mono font-semibold text-emerald-dark">$13,000</span></li>
                    <li>Actual tax (24%): <span className="font-mono font-semibold text-emerald-dark">$3,120</span></li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-center font-semibold">
                Overpayment without correction:{" "}
                <span className="font-mono text-danger text-lg">$19,680</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Common Scenarios That Cause $0 Basis</h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>Transferred assets:</strong> You bought BTC on Coinbase, transferred it to Kraken, then
                  sold it on Kraken. Kraken has no record of your purchase price, so it reports $0 basis.
                </li>
                <li>
                  <strong>Wallet transfers:</strong> You moved ETH to a hardware wallet (Ledger, Trezor) and later
                  sent it to an exchange to sell. The exchange doesn&apos;t know your acquisition cost.
                </li>
                <li>
                  <strong>DeFi activity:</strong> Swaps on decentralized exchanges, liquidity providing, or yield
                  farming that later result in sales on centralized exchanges.
                </li>
                <li>
                  <strong>Airdrops and forks:</strong> Free tokens received whose basis should be fair market value
                  at the time of receipt, but the exchange has no way to know this.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How to Fix It</h2>
              <p>You have the legal right to report accurate cost basis on your tax return, even if your 1099-DA doesn&apos;t include it. Here&apos;s how:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Gather your complete transaction history from all exchanges and wallets</li>
                <li>Calculate the correct cost basis for each sale using FIFO, LIFO, or HIFO accounting</li>
                <li>File <strong>Form 8949</strong> with the corrected basis, using adjustment code &quot;B&quot;</li>
                <li>Attach a supporting statement explaining the discrepancies</li>
                <li>Keep records for at least 3 years in case of audit</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Key Deadlines for 2025 Tax Year</h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>January 31, 2026:</strong> Deadline for exchanges to send 1099-DA to the IRS</li>
                <li><strong>February 15, 2026:</strong> Deadline for exchanges to send 1099-DA to taxpayers</li>
                <li><strong>April 15, 2026:</strong> Tax filing deadline (or October 15, 2026 with extension)</li>
              </ul>
              <p className="mt-3 text-sm text-slate">
                Note: Some exchanges (particularly Coinbase) have experienced delays in issuing 1099-DA forms.
                If you haven&apos;t received yours by mid-March, contact your exchange directly.
              </p>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Don&apos;t Overpay Because of a Missing Basis</h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and see exactly how much you&apos;d overpay in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your 1099-DA Free &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
