import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kraken 1099-DA Guide: Understanding Your Crypto Tax Form — BasisGuard",
  description:
    "Your Kraken 1099-DA shows zero cost basis. Learn what Kraken reports to the IRS, how to export your Kraken trade history, and how BasisGuard corrects your cost basis.",
  keywords: [
    "Kraken 1099-DA",
    "Kraken crypto taxes",
    "Kraken missing cost basis",
    "Kraken tax form",
    "Kraken Form 8949",
    "Kraken export trade history",
    "Kraken CSV download",
    "Kraken tax report",
  ],
  openGraph: {
    title: "Kraken 1099-DA Guide — BasisGuard",
    description:
      "Your Kraken 1099-DA reports $0 cost basis. Learn why and how to fix it before overpaying the IRS.",
    type: "article",
    url: "https://basisguard.com/guides/kraken-1099-da",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Kraken 1099-DA Guide: Understanding Your Crypto Tax Form",
  description:
    "Your Kraken 1099-DA shows zero cost basis. Learn what Kraken reports to the IRS, how to export your Kraken trade history, and how BasisGuard corrects your cost basis.",
  author: {
    "@type": "Organization",
    name: "BasisGuard",
    url: "https://basisguard.com",
  },
  publisher: {
    "@type": "Organization",
    name: "BasisGuard",
    url: "https://basisguard.com",
  },
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://basisguard.com/guides/kraken-1099-da",
  },
  keywords: [
    "Kraken 1099-DA",
    "Kraken crypto taxes",
    "Kraken missing cost basis",
    "Kraken tax form",
  ],
};

export default function Kraken1099DAPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-navy">
            Basis<span className="text-emerald">Guard</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate hover:text-charcoal transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-card shadow-card p-8 sm:p-12">
          <div className="mb-3">
            <span className="inline-block bg-emerald/10 text-emerald-dark text-xs font-semibold px-3 py-1 rounded-full">
              Exchange Guide
            </span>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-3">
            Kraken 1099-DA Guide: Understanding Your Crypto Tax Form
          </h1>
          <p className="text-slate mb-8">
            Kraken is one of the most popular crypto exchanges in the US, and
            for 2025 it&apos;s issuing 1099-DA forms for the first time. If your
            Kraken 1099-DA shows $0 cost basis, you&apos;re not alone. Here&apos;s
            what&apos;s happening and how to fix it.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What Does Your Kraken 1099-DA Include?
              </h2>
              <p>
                Kraken&apos;s 1099-DA reports the same core information that the
                IRS mandates from all US-regulated crypto brokers for the 2025
                tax year:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Gross proceeds</strong> from each sale, trade, or
                  disposition of digital assets
                </li>
                <li>
                  <strong>Asset identifier</strong> (e.g., XBT for Bitcoin, ETH
                  for Ethereum)
                </li>
                <li>
                  <strong>Date of each disposition</strong>
                </li>
                <li>
                  <strong>Transaction reference</strong> for audit trail
                  purposes
                </li>
                <li>
                  <strong>Broker identification</strong> (Payward, Inc., doing
                  business as Kraken)
                </li>
              </ul>
              <p className="mt-3">
                Kraken makes the 1099-DA available in your account under{" "}
                <strong>Settings &rarr; Account &rarr; Tax Documents</strong>.
                Kraken also sends the form to the IRS, so the agency already has
                a copy of your reported proceeds.
              </p>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Note:</strong> Kraken uses &quot;XBT&quot; as the
                  ticker for Bitcoin instead of &quot;BTC.&quot; This is the ISO
                  standard but can cause confusion when matching against other
                  exchanges or tax software. BasisGuard automatically normalizes
                  this.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Why Kraken Reports $0 Cost Basis
              </h2>
              <p>
                For the 2025 tax year, the IRS does not require crypto brokers
                to report cost basis on the 1099-DA. This means Kraken reports
                your proceeds but leaves the cost basis field at{" "}
                <strong>$0 or blank</strong>, regardless of whether Kraken
                actually knows what you paid.
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">
                  The Kraken Problem
                </p>
                <p className="text-sm">
                  You bought 10 ETH on Kraken at $2,800 each ($28,000 total) and
                  sold them at $3,500 each ($35,000 total). Your real gain is
                  $7,000. But your Kraken 1099-DA shows $35,000 in proceeds and
                  $0 cost basis, meaning the IRS sees{" "}
                  <strong className="text-danger">$35,000 in taxable gain</strong>{" "}
                  instead of $7,000.
                </p>
              </div>
              <p className="mt-4">
                Kraken is particularly common for users who trade a wide variety
                of assets and use advanced trading features like margin and
                staking. If you staked assets on Kraken and then sold the
                staking rewards, the basis for those rewards (fair market value
                when received) is almost certainly not reflected on the 1099-DA.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Common Kraken Scenarios That Cause Missing Basis
              </h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>Bought and sold entirely on Kraken:</strong> Even for
                  assets that never left the platform, the 2025 1099-DA does not
                  include cost basis. Kraken has the data internally, but the
                  form reports $0.
                </li>
                <li>
                  <strong>Transferred in from Coinbase, Binance, or a wallet:</strong>{" "}
                  If you moved crypto to Kraken from another exchange or a
                  hardware wallet and then sold it, Kraken has no way of knowing
                  your original purchase price.
                </li>
                <li>
                  <strong>Staking rewards sold:</strong> Kraken was a major
                  staking provider. If you earned ETH, DOT, or ADA staking
                  rewards and later sold them, the cost basis should be the fair
                  market value when the reward was received. This is rarely
                  captured correctly.
                </li>
                <li>
                  <strong>Margin trading:</strong> Leveraged positions on Kraken
                  create complex cost basis calculations. The proceeds appear on
                  the 1099-DA, but the basis calculation for margin trades is
                  not included.
                </li>
                <li>
                  <strong>Kraken Pro and Kraken.com accounts:</strong> If you
                  used both the legacy Kraken Pro interface and the newer
                  Kraken.com platform, transactions may be split across
                  different export formats.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How to Export Your Kraken Trade History
              </h2>
              <p>
                To correct your cost basis, you need your full Kraken
                transaction history. Follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong>Log in to Kraken</strong> at{" "}
                  <span className="font-mono text-sm">kraken.com</span>
                </li>
                <li>
                  Click on <strong>History</strong> in the top navigation bar
                </li>
                <li>
                  Select the <strong>Export</strong> tab (or click the
                  &quot;Export&quot; button in the top right of the History page)
                </li>
                <li>
                  Choose <strong>&quot;Trades&quot;</strong> as the export type
                  and select <strong>&quot;All&quot;</strong> for the date range
                  to capture your complete trading history
                </li>
                <li>
                  Also export <strong>&quot;Ledgers&quot;</strong> which
                  includes deposits, withdrawals, staking rewards, and other
                  non-trade activity
                </li>
                <li>
                  Click <strong>&quot;Submit&quot;</strong> and download the CSV
                  files when they are ready
                </li>
              </ol>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Tip:</strong> Kraken&apos;s Trades export and Ledgers
                  export are separate files. For the most accurate cost basis
                  reconstruction, you should download both. The Trades CSV
                  contains your buy/sell execution details, while the Ledgers
                  CSV captures staking rewards, deposits, and withdrawals that
                  affect your basis.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What&apos;s In the Kraken CSV?
              </h2>
              <p>
                Kraken&apos;s Trades export includes columns for trade ID, order
                ID, pair (e.g., XBTUSD, ETHUSD), time, type (buy/sell), order
                type, price, cost, fee, volume, and margin. The Ledgers export
                includes refid, time, type (deposit, withdrawal, trade,
                staking, transfer), subtype, asset, amount, fee, and balance.
              </p>
              <p className="mt-3">
                Together, these files contain everything needed to reconstruct
                your complete cost basis history on Kraken. However, manually
                processing this data is tedious, especially if you have
                hundreds of trades across multiple asset pairs, and the XBT
                ticker naming convention adds an extra layer of complexity.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How BasisGuard Fixes Your Kraken 1099-DA
              </h2>
              <p>
                BasisGuard handles Kraken&apos;s unique data format
                automatically:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <strong>Upload your Kraken 1099-DA</strong> (PDF) and your
                  Kraken Trades/Ledgers CSV exports
                </li>
                <li>
                  BasisGuard <strong>normalizes Kraken&apos;s ticker symbols</strong>{" "}
                  (XBT to BTC, XXBT to BTC, etc.) and parses all trade pairs
                </li>
                <li>
                  We <strong>match each sale on the 1099-DA</strong> to the
                  corresponding purchase records from your history
                </li>
                <li>
                  Cost basis is calculated using your preferred method (
                  <strong>FIFO, LIFO, or HIFO</strong>), including proper
                  handling of staking rewards and margin trades
                </li>
                <li>
                  BasisGuard generates a{" "}
                  <strong>corrected Form 8949</strong> and a discrepancy report
                  showing the difference for every transaction
                </li>
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-3">
                    Kraken 1099-DA (as filed)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      Sold:{" "}
                      <span className="font-mono font-semibold">10 ETH</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$35,000</span>
                    </li>
                    <li>
                      Cost basis:{" "}
                      <span className="font-mono font-semibold text-danger">
                        $0
                      </span>
                    </li>
                    <li>
                      Taxable gain:{" "}
                      <span className="font-mono font-semibold text-danger">
                        $35,000
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-3">
                    After BasisGuard correction
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      Sold:{" "}
                      <span className="font-mono font-semibold">10 ETH</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$35,000</span>
                    </li>
                    <li>
                      Actual basis:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $28,000
                      </span>
                    </li>
                    <li>
                      Actual gain:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $7,000
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-center font-semibold">
                Tax savings:{" "}
                <span className="font-mono text-emerald-dark text-lg">
                  $6,720
                </span>{" "}
                <span className="text-sm text-slate font-normal">
                  (at 24% tax rate)
                </span>
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Already Filed? You Can Still Amend
              </h2>
              <p>
                If you filed your 2025 taxes with the $0 cost basis from your
                Kraken 1099-DA, you can file an amended return using{" "}
                <strong>Form 1040-X</strong> with a corrected Form 8949. The IRS
                allows amendments for up to three years after the original
                filing deadline. Given the widespread $0 basis issue with
                Kraken&apos;s 1099-DA, the IRS expects many taxpayers to file
                corrections.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">
                Fix Your Kraken 1099-DA in Minutes
              </h3>
              <p className="text-sm text-slate mb-4">
                Upload your Kraken 1099-DA and trade history. See exactly how
                much you&apos;d overpay in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your Kraken 1099-DA Free &rarr;
              </Link>
            </div>

            {/* Related Guides */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-3">
                Related Guides
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/guides/1099-da"
                  className="text-sm text-emerald hover:text-emerald-dark transition-colors"
                >
                  Understanding the 1099-DA &rarr;
                </Link>
                <Link
                  href="/guides/form-8949"
                  className="text-sm text-emerald hover:text-emerald-dark transition-colors"
                >
                  Form 8949 Guide &rarr;
                </Link>
                <Link
                  href="/guides/coinbase-1099-da"
                  className="text-sm text-emerald hover:text-emerald-dark transition-colors"
                >
                  Coinbase 1099-DA Guide &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate text-center leading-relaxed">
          <strong>Disclaimer:</strong> BasisGuard is not a tax advisor, CPA, or
          attorney. This guide is for informational purposes only and does not
          constitute tax, legal, or financial advice. Always consult a qualified
          tax professional regarding your specific situation. BasisGuard is not
          affiliated with Payward, Inc. or Kraken. &quot;Kraken&quot; is a
          registered trademark of Payward, Inc.
        </p>
      </footer>
    </div>
  );
}
