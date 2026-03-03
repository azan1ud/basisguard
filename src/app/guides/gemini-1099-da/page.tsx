import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemini 1099-DA Guide: How to Fix Zero Cost Basis — BasisGuard",
  description:
    "Your Gemini 1099-DA shows zero cost basis. Learn what Gemini reports to the IRS, how to download your Gemini transaction history, and how BasisGuard fixes your cost basis for Form 8949.",
  keywords: [
    "Gemini 1099-DA",
    "Gemini crypto taxes",
    "Gemini zero cost basis",
    "Gemini missing cost basis",
    "Gemini tax form",
    "Gemini Form 8949",
    "Gemini transaction history download",
    "Gemini tax report",
  ],
  openGraph: {
    title: "Gemini 1099-DA Guide — BasisGuard",
    description:
      "Your Gemini 1099-DA reports $0 cost basis. Learn why your cost basis is missing and how to fix it before you overpay the IRS.",
    type: "article",
    url: "https://basisguard.com/guides/gemini-1099-da",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Gemini 1099-DA Guide: How to Fix Zero Cost Basis",
  description:
    "Your Gemini 1099-DA shows zero cost basis. Learn what Gemini reports to the IRS, how to download your Gemini transaction history, and how BasisGuard fixes your cost basis.",
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
    "@id": "https://basisguard.com/guides/gemini-1099-da",
  },
  keywords: [
    "Gemini 1099-DA",
    "Gemini crypto taxes",
    "Gemini zero cost basis",
    "Gemini tax form",
  ],
};

export default function Gemini1099DAPage() {
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
            Gemini 1099-DA Guide: How to Fix Zero Cost Basis
          </h1>
          <p className="text-slate mb-8">
            Gemini, the Winklevoss-founded exchange, is known for its
            regulatory compliance and security. But even Gemini&apos;s 1099-DA
            has the same zero cost basis problem as every other exchange for
            2025. Here&apos;s how to understand your Gemini tax form and fix it.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What Does Your Gemini 1099-DA Include?
              </h2>
              <p>
                Gemini Trust Company, LLC is a New York-regulated crypto
                exchange and custodian. For the 2025 tax year, Gemini issues
                Form 1099-DA to US customers who sold or disposed of digital
                assets. Your Gemini 1099-DA includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Gross proceeds</strong> from each sale, trade, or
                  disposal of digital assets on Gemini
                </li>
                <li>
                  <strong>Asset type</strong> (BTC, ETH, GUSD, etc.)
                </li>
                <li>
                  <strong>Date of sale</strong> for each transaction
                </li>
                <li>
                  <strong>Transaction reference numbers</strong>
                </li>
                <li>
                  <strong>Broker information</strong> (Gemini Trust Company,
                  LLC)
                </li>
              </ul>
              <p className="mt-3">
                Gemini provides tax documents through the{" "}
                <strong>Tax Center</strong> in your account. Navigate to{" "}
                <strong>
                  Account &rarr; Settings &rarr; Tax Center
                </strong>{" "}
                (or look for the &quot;Tax Documents&quot; section in your
                account dashboard). Gemini also partners with tax software
                providers and offers a direct integration with some platforms.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Why Does Your Gemini 1099-DA Show $0 Cost Basis?
              </h2>
              <p>
                Despite Gemini&apos;s reputation for compliance, the 2025
                1099-DA cost basis gap is a regulatory issue, not a Gemini issue.
                The IRS does not require brokers to report cost basis on the
                1099-DA for the 2025 tax year. This means your Gemini form
                shows what you sold crypto for but reports{" "}
                <strong>$0 or no value</strong> for cost basis.
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">
                  The Gemini Problem
                </p>
                <p className="text-sm">
                  You bought 2 ETH on Gemini for $5,600 and sold them for
                  $7,200. Your real gain is $1,600. But your Gemini 1099-DA
                  shows $7,200 in proceeds with $0 cost basis, so the IRS
                  calculates a{" "}
                  <strong className="text-danger">
                    $7,200 taxable gain
                  </strong>{" "}
                  — a $5,600 overstatement.
                </p>
              </div>
              <p className="mt-4">
                Gemini actually has better internal record-keeping than many
                exchanges because of its NY BitLicense requirements. But until
                the IRS mandates cost basis reporting on the 1099-DA (expected
                for 2026 and beyond), Gemini cannot include it on the form. The
                data exists — it just isn&apos;t on the 1099-DA.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Common Gemini Scenarios That Cause Zero Basis
              </h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>Bought and sold entirely on Gemini:</strong> Even when
                  Gemini has your complete purchase history, the 2025 1099-DA
                  reports $0 basis per IRS regulations.
                </li>
                <li>
                  <strong>Gemini Earn withdrawals:</strong> If you participated
                  in Gemini Earn (the lending program that was frozen in late
                  2022) and later recovered and sold those assets, the cost basis
                  situation is especially complex. The basis should reflect the
                  original purchase price, but the recovery and sale create
                  additional tax events.
                </li>
                <li>
                  <strong>GUSD conversions:</strong> Gemini Dollar (GUSD) is a
                  stablecoin issued by Gemini. Converting between GUSD and other
                  crypto is a taxable event. The cost basis of the received
                  asset should equal the GUSD value at conversion, but this
                  chain of conversions complicates basis tracking.
                </li>
                <li>
                  <strong>Gemini ActiveTrader trades:</strong> If you used
                  Gemini&apos;s ActiveTrader interface for high-frequency
                  trading, you may have hundreds or thousands of trades. Each
                  one shows $0 basis on the 1099-DA, compounding the
                  overstatement.
                </li>
                <li>
                  <strong>Transferred from another exchange or wallet:</strong>{" "}
                  Assets deposited into Gemini from Coinbase, Kraken, a hardware
                  wallet, or a DeFi protocol have no purchase history on Gemini,
                  resulting in $0 basis.
                </li>
                <li>
                  <strong>Gemini credit card rewards:</strong> If you earned
                  crypto back through the Gemini credit card and later sold
                  those rewards, the basis should be the fair market value when
                  the reward was credited. This is not reflected on the 1099-DA.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How to Download Your Gemini Transaction History
              </h2>
              <p>
                Gemini makes it straightforward to download your complete
                history. Here are the steps:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong>Log in to Gemini</strong> at{" "}
                  <span className="font-mono text-sm">gemini.com</span>
                </li>
                <li>
                  Click on your <strong>Account</strong> icon (top right) and
                  go to <strong>Settings</strong>
                </li>
                <li>
                  Select <strong>&quot;Account&quot;</strong> from the left
                  sidebar, then scroll to the{" "}
                  <strong>&quot;Transaction History&quot;</strong> section
                </li>
                <li>
                  Click <strong>&quot;Download Transaction History&quot;</strong>{" "}
                  and select <strong>XLSX or CSV</strong> format
                </li>
                <li>
                  Choose the date range — select{" "}
                  <strong>&quot;All Time&quot;</strong> to capture your complete
                  Gemini history
                </li>
                <li>
                  Download the file to your computer
                </li>
              </ol>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Tip:</strong> Gemini also offers a{" "}
                  <strong>Tax Center</strong> section that provides
                  pre-formatted tax reports, including a &quot;Transaction
                  History for Tax Reporting&quot; download. This version is
                  organized by tax lot and may be easier to work with than the
                  raw transaction export. Check both and use whichever gives you
                  the most complete picture.
                </p>
              </div>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-3">
                <p className="text-sm">
                  <strong>Gemini Earn users:</strong> If you had assets in
                  Gemini Earn, make sure to check whether those transactions
                  appear in your standard export. You may need to separately
                  download your Earn history from the Earn section of your
                  account, as interest accruals and withdrawals may be tracked
                  separately.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What&apos;s In the Gemini CSV?
              </h2>
              <p>
                Gemini&apos;s transaction history export includes columns for
                date and time, type (buy, sell, credit, debit, deposit,
                withdrawal), symbol, amount, price per unit, fee, fee currency,
                and USD total. Gemini&apos;s export is generally well-formatted
                and includes USD values for each transaction, which simplifies
                cost basis calculations.
              </p>
              <p className="mt-3">
                However, Gemini does not pre-calculate your gains or losses in
                the CSV. You still need to match each sell to its corresponding
                buy using the proper accounting method (FIFO, LIFO, or HIFO),
                account for partial lot sales, and handle special cases like
                Earn interest, credit card rewards, and GUSD conversions.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How BasisGuard Fixes Your Gemini 1099-DA
              </h2>
              <p>
                BasisGuard handles Gemini&apos;s transaction format and all of
                its special cases:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <strong>Upload your Gemini 1099-DA</strong> (PDF) and your
                  Gemini transaction history CSV
                </li>
                <li>
                  BasisGuard <strong>parses all transaction types</strong>{" "}
                  including buys, sells, conversions, Earn interest, credit card
                  rewards, and transfers
                </li>
                <li>
                  We <strong>match each sale on the 1099-DA</strong> to its
                  original purchase, using your preferred accounting method (
                  <strong>FIFO, LIFO, or HIFO</strong>)
                </li>
                <li>
                  GUSD conversions and Gemini Earn activity are{" "}
                  <strong>handled automatically</strong> with proper basis
                  assignment
                </li>
                <li>
                  BasisGuard generates a{" "}
                  <strong>corrected Form 8949</strong> with adjustment code
                  &quot;B&quot; and a detailed discrepancy report
                </li>
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-3">
                    Gemini 1099-DA (as filed)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      Sold:{" "}
                      <span className="font-mono font-semibold">2 ETH</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$7,200</span>
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
                        $7,200
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
                      <span className="font-mono font-semibold">2 ETH</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$7,200</span>
                    </li>
                    <li>
                      Actual basis:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $5,600
                      </span>
                    </li>
                    <li>
                      Actual gain:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $1,600
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-center font-semibold">
                Tax savings:{" "}
                <span className="font-mono text-emerald-dark text-lg">
                  $1,344
                </span>{" "}
                <span className="text-sm text-slate font-normal">
                  (at 24% tax rate, on this single transaction)
                </span>
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                A Note on Gemini Earn and Tax Implications
              </h2>
              <p>
                If you participated in the Gemini Earn program, your tax
                situation may be more complex. Interest earned through Gemini
                Earn is taxable as ordinary income in the year it was credited
                to your account. If those Earn assets were frozen and later
                returned, the timing of when you regained access can affect your
                tax treatment. The cost basis of Earn interest is the fair
                market value at the time it was credited to your account (not
                when it was returned after the freeze).
              </p>
              <p className="mt-3">
                BasisGuard correctly identifies Gemini Earn transactions in your
                history and assigns the proper basis based on the credit date,
                not the withdrawal date.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Already Filed With Zero Basis? You Can Amend
              </h2>
              <p>
                If you already filed your 2025 taxes using the $0 cost basis
                from your Gemini 1099-DA, file an amended return using{" "}
                <strong>Form 1040-X</strong> with a corrected Form 8949. You
                have three years from the original filing deadline to amend
                your return and claim the correct cost basis. Even for smaller
                portfolios, the overpayment from zero basis can be significant
                when compounded across multiple transactions.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">
                Fix Your Gemini 1099-DA in Minutes
              </h3>
              <p className="text-sm text-slate mb-4">
                Upload your Gemini 1099-DA and transaction history. See exactly
                how much you&apos;d overpay in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your Gemini 1099-DA Free &rarr;
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
          affiliated with Gemini Trust Company, LLC. &quot;Gemini&quot; is a
          registered trademark of Gemini Trust Company, LLC.
        </p>
      </footer>
    </div>
  );
}
