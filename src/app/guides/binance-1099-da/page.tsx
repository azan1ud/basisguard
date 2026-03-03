import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binance.US 1099-DA Guide: Missing Cost Basis Explained — BasisGuard",
  description:
    "Your Binance.US 1099-DA shows missing cost basis. Learn what Binance.US reports to the IRS, how to download your transaction history, and how BasisGuard fixes your cost basis.",
  keywords: [
    "Binance 1099-DA",
    "Binance.US 1099-DA",
    "Binance crypto taxes",
    "Binance missing cost basis",
    "Binance US tax form",
    "Binance Form 8949",
    "Binance transaction history CSV",
    "Binance tax report",
  ],
  openGraph: {
    title: "Binance.US 1099-DA Guide — BasisGuard",
    description:
      "Your Binance.US 1099-DA is missing cost basis. Learn why and how to fix it before you overpay the IRS.",
    type: "article",
    url: "https://basisguard.com/guides/binance-1099-da",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Binance.US 1099-DA Guide: Missing Cost Basis Explained",
  description:
    "Your Binance.US 1099-DA shows missing cost basis. Learn what Binance.US reports to the IRS, how to download your transaction history, and how BasisGuard fixes your cost basis.",
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
    "@id": "https://basisguard.com/guides/binance-1099-da",
  },
  keywords: [
    "Binance 1099-DA",
    "Binance.US crypto taxes",
    "Binance missing cost basis",
    "Binance US tax form",
  ],
};

export default function Binance1099DAPage() {
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
            Binance.US 1099-DA Guide: Missing Cost Basis Explained
          </h1>
          <p className="text-slate mb-8">
            Binance.US has had a turbulent few years, including halted USD
            services and restricted operations. If you traded on Binance.US and
            received a 1099-DA for 2025, the missing cost basis problem may be
            worse for you than users of other exchanges. Here&apos;s what you
            need to know.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What Does Your Binance.US 1099-DA Include?
              </h2>
              <p>
                Like all US-regulated crypto brokers, Binance.US (operated by
                BAM Trading Services) is required to issue Form 1099-DA for the
                2025 tax year. Your Binance.US 1099-DA reports:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Gross proceeds</strong> from each sale or trade of
                  digital assets
                </li>
                <li>
                  <strong>Digital asset type</strong> (BTC, ETH, BNB, etc.)
                </li>
                <li>
                  <strong>Date of each disposition</strong>
                </li>
                <li>
                  <strong>Transaction identifiers</strong>
                </li>
                <li>
                  <strong>Broker information</strong> (BAM Trading Services,
                  Inc.)
                </li>
              </ul>
              <p className="mt-3">
                Binance.US provides tax documents through the{" "}
                <strong>Tax section</strong> of your account settings. You can
                access it by navigating to{" "}
                <strong>
                  Account &rarr; Tax &rarr; Tax Statements
                </strong>{" "}
                in your Binance.US dashboard.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Why Binance.US Cost Basis Is Missing (and Why It&apos;s Worse)
              </h2>
              <p>
                The standard 2025 1099-DA cost basis gap affects all exchanges,
                but Binance.US users face additional challenges:
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">
                  The Binance.US Problem
                </p>
                <p className="text-sm">
                  Beyond the regulatory $0 basis issue, Binance.US halted USD
                  deposits and withdrawals in mid-2023 and has operated with
                  reduced features since. Many users scrambled to move assets
                  off the platform, creating a chain of transfers that breaks
                  basis tracking across multiple exchanges.
                </p>
              </div>
              <p className="mt-4">
                If you bought crypto on Binance.US, transferred it to Coinbase
                or a hardware wallet, and later sold it elsewhere, neither
                exchange has a complete picture. Binance.US knows what you paid
                but may not have issued a 1099-DA for the sale (since it
                happened elsewhere). The exchange where you sold has the
                proceeds but no record of your Binance.US purchase price.
              </p>
              <p className="mt-3">
                Additionally, many users who traded on international Binance
                (binance.com) before it was restricted to US users may have
                historical transactions that are difficult to export or
                reconcile with their Binance.US activity.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Common Binance.US Scenarios That Cause $0 Basis
              </h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>Bought on Binance.US, sold on Binance.US:</strong>{" "}
                  Even if the asset never left the platform, the 2025 1099-DA
                  does not include cost basis per IRS regulations.
                </li>
                <li>
                  <strong>
                    Transferred out during the 2023 USD suspension:
                  </strong>{" "}
                  Many users moved crypto off Binance.US to other exchanges
                  during the service disruptions. Those assets were sold
                  elsewhere with the receiving exchange reporting $0 basis.
                </li>
                <li>
                  <strong>BNB and dust conversions:</strong> Binance.US
                  automatically converts small balances (&quot;dust&quot;) to
                  BNB. These micro-conversions are taxable events with their own
                  cost basis calculations, but they often show $0 on the
                  1099-DA.
                </li>
                <li>
                  <strong>Migrated from international Binance:</strong> If you
                  originally traded on binance.com and later migrated to
                  Binance.US, your historical purchase records may not have
                  transferred cleanly, leaving gaps in your basis trail.
                </li>
                <li>
                  <strong>Staking and distribution rewards:</strong> BNB
                  staking, launchpad distributions, and other reward programs
                  create income events with a fair-market-value basis that
                  Binance.US does not report on the 1099-DA.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How to Download Your Binance.US Transaction History
              </h2>
              <p>
                Getting your complete Binance.US history requires a few steps
                due to the platform&apos;s changes over the years:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong>Log in to Binance.US</strong> at{" "}
                  <span className="font-mono text-sm">binance.us</span>
                </li>
                <li>
                  Navigate to <strong>Orders &rarr; Trade History</strong> or{" "}
                  <strong>Wallet &rarr; Transaction History</strong>
                </li>
                <li>
                  Click <strong>&quot;Export&quot;</strong> or{" "}
                  <strong>&quot;Generate CSV&quot;</strong> in the top right
                </li>
                <li>
                  Select a custom date range covering your{" "}
                  <strong>entire history</strong> on the platform (Binance.US
                  may limit exports to 3-month windows, so you may need
                  multiple exports)
                </li>
                <li>
                  Also export your <strong>Distribution History</strong> (for
                  staking rewards, airdrops, and referral bonuses) from{" "}
                  <strong>Wallet &rarr; Distribution History</strong>
                </li>
                <li>
                  Download all CSV files and save them
                </li>
              </ol>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> Binance.US limits CSV exports to
                  3-month intervals. If you have been on the platform since
                  2019, you may need to generate 8 or more separate exports.
                  Make sure you cover every quarter with no gaps. BasisGuard
                  can merge multiple Binance.US CSVs automatically.
                </p>
              </div>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-3">
                <p className="text-sm">
                  <strong>If you also used international Binance:</strong>{" "}
                  Log in to binance.com separately and export your trade history
                  from <strong>Orders &rarr; Trade History &rarr; Export</strong>.
                  This data is critical if you purchased assets on the
                  international platform before migrating to Binance.US.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What&apos;s In the Binance.US CSV?
              </h2>
              <p>
                The Binance.US trade history CSV contains columns for date, pair
                (e.g., BTCUSD, ETHBUSD), type (buy/sell), price, quantity,
                total, fee, and fee asset. The distribution history includes
                date, asset, amount, and distribution type (staking, referral,
                airdrop, etc.).
              </p>
              <p className="mt-3">
                One Binance.US-specific complication is the variety of trading
                pairs. Some assets traded against USD, others against BUSD (now
                defunct), and some against BNB. Each pair type requires
                different handling to calculate USD-denominated cost basis
                accurately. BasisGuard handles all Binance.US pair types
                automatically.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How BasisGuard Fixes Your Binance.US 1099-DA
              </h2>
              <p>
                BasisGuard is built to handle the complexities unique to
                Binance.US users:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <strong>Upload your Binance.US 1099-DA</strong> (PDF) and all
                  your trade history and distribution CSVs
                </li>
                <li>
                  BasisGuard <strong>merges multiple CSV exports</strong>{" "}
                  automatically and deduplicates overlapping date ranges
                </li>
                <li>
                  We <strong>normalize all trading pairs</strong> (USD, BUSD,
                  BNB pairs) to accurate USD cost basis values
                </li>
                <li>
                  Each sale on the 1099-DA is{" "}
                  <strong>matched to its original purchase</strong> using FIFO,
                  LIFO, or HIFO
                </li>
                <li>
                  BasisGuard generates a{" "}
                  <strong>corrected Form 8949</strong> with adjustment code
                  &quot;B&quot; and a full discrepancy report
                </li>
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-3">
                    Binance.US 1099-DA (as filed)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      Sold:{" "}
                      <span className="font-mono font-semibold">
                        5,000 DOGE
                      </span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$1,250</span>
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
                        $1,250
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
                      <span className="font-mono font-semibold">
                        5,000 DOGE
                      </span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$1,250</span>
                    </li>
                    <li>
                      Actual basis:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $900
                      </span>
                    </li>
                    <li>
                      Actual gain:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $350
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-center font-semibold">
                Tax savings:{" "}
                <span className="font-mono text-emerald-dark text-lg">
                  $216
                </span>{" "}
                <span className="text-sm text-slate font-normal">
                  (at 24% tax rate, per transaction — adds up fast across
                  hundreds of trades)
                </span>
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What About Binance.US Account Closures?
              </h2>
              <p>
                Some users lost access to Binance.US or had restricted account
                functionality during the platform&apos;s operational changes in
                2023-2024. If you can no longer access your Binance.US account
                to download your transaction history, you may be able to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Contact Binance.US support to request a data export under
                  CCPA/GDPR rights
                </li>
                <li>
                  Check your email for trade confirmation emails from Binance.US
                </li>
                <li>
                  Use on-chain data from blockchain explorers to reconstruct
                  deposit and withdrawal records
                </li>
              </ul>
              <p className="mt-3">
                BasisGuard can work with partial records and on-chain data to
                help reconstruct your cost basis even in difficult situations.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Already Filed? Amend Your Return
              </h2>
              <p>
                If you filed your 2025 taxes using the $0 cost basis from your
                Binance.US 1099-DA, you can file{" "}
                <strong>Form 1040-X</strong> (amended return) with a corrected
                Form 8949 showing your actual cost basis. You have up to three
                years from the original filing deadline to amend.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">
                Fix Your Binance.US 1099-DA in Minutes
              </h3>
              <p className="text-sm text-slate mb-4">
                Upload your Binance.US 1099-DA and transaction history. See
                exactly how much you&apos;d overpay in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your Binance.US 1099-DA Free &rarr;
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
                  href="/guides/gemini-1099-da"
                  className="text-sm text-emerald hover:text-emerald-dark transition-colors"
                >
                  Gemini 1099-DA Guide &rarr;
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
          affiliated with BAM Trading Services, Inc. or Binance.
          &quot;Binance&quot; and &quot;Binance.US&quot; are registered
          trademarks of their respective owners.
        </p>
      </footer>
    </div>
  );
}
