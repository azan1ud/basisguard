import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coinbase 1099-DA Guide: What's On It, What's Missing, and How to Fix It — BasisGuard",
  description:
    "Your Coinbase 1099-DA is missing cost basis. Learn what's included on your Coinbase crypto tax form, why cost basis is $0, how to download your Coinbase CSV, and how BasisGuard fixes it.",
  keywords: [
    "Coinbase 1099-DA",
    "Coinbase crypto taxes",
    "Coinbase missing cost basis",
    "Coinbase tax form",
    "Coinbase Form 8949",
    "Coinbase transaction history CSV",
    "Coinbase tax report download",
    "1099-DA cost basis fix",
  ],
  openGraph: {
    title: "Coinbase 1099-DA Guide — BasisGuard",
    description:
      "Your Coinbase 1099-DA shows $0 cost basis. Learn why and how to fix it before you overpay the IRS by thousands.",
    type: "article",
    url: "https://basisguard.com/guides/coinbase-1099-da",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Coinbase 1099-DA Guide: What's On It, What's Missing, and How to Fix It",
  description:
    "Your Coinbase 1099-DA is missing cost basis. Learn what's included, why cost basis is $0, how to download your Coinbase CSV, and how BasisGuard fixes it.",
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
    "@id": "https://basisguard.com/guides/coinbase-1099-da",
  },
  keywords: [
    "Coinbase 1099-DA",
    "Coinbase crypto taxes",
    "Coinbase missing cost basis",
    "Coinbase tax form",
  ],
};

export default function Coinbase1099DAPage() {
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
            Coinbase 1099-DA Guide: What&apos;s On It, What&apos;s Missing, and
            How to Fix It
          </h1>
          <p className="text-slate mb-8">
            Coinbase is the largest US crypto exchange, and for the 2025 tax
            year, it&apos;s issuing 1099-DA forms to millions of users for the
            first time. Here&apos;s what you need to know about your Coinbase
            1099-DA, why cost basis is missing, and how to correct it before you
            file.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What Does Your Coinbase 1099-DA Include?
              </h2>
              <p>
                For the 2025 tax year, Coinbase is required to issue Form
                1099-DA to any US customer who sold, traded, or otherwise
                disposed of digital assets on the platform. Your Coinbase
                1099-DA reports the following information to both you and the
                IRS:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Gross proceeds</strong> from each sale or disposition
                  (how much you received)
                </li>
                <li>
                  <strong>Digital asset type</strong> (e.g., BTC, ETH, SOL)
                </li>
                <li>
                  <strong>Date of sale</strong> for each transaction
                </li>
                <li>
                  <strong>Transaction ID</strong> for matching purposes
                </li>
                <li>
                  <strong>Coinbase&apos;s broker information</strong> (Coinbase,
                  Inc.)
                </li>
              </ul>
              <p className="mt-3">
                Coinbase delivers the 1099-DA electronically through your
                account and may also mail a paper copy. You can find it under{" "}
                <strong>Settings &rarr; Taxes &rarr; Tax Documents</strong> in
                your Coinbase account or in the Coinbase Tax Center.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Why Is Your Coinbase 1099-DA Missing Cost Basis?
              </h2>
              <p>
                This is the critical issue. For 2025, IRS regulations do{" "}
                <strong>not require</strong> brokers to report cost basis on the
                1099-DA. That means your Coinbase form shows your proceeds
                (e.g., &quot;you sold $47,000 worth of Bitcoin&quot;) but
                reports your cost basis as <strong>$0 or blank</strong>.
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">
                  The Coinbase Problem
                </p>
                <p className="text-sm">
                  If you bought 0.5 BTC on Coinbase for $40,000 and sold it for
                  $47,000, your actual gain is $7,000. But your Coinbase 1099-DA
                  shows $47,000 in proceeds and $0 cost basis, so the IRS sees
                  a{" "}
                  <strong className="text-danger">
                    $47,000 taxable gain
                  </strong>{" "}
                  instead of your real $7,000 gain.
                </p>
              </div>
              <p className="mt-4">
                The problem gets worse if you transferred crypto into Coinbase
                from another exchange or a hardware wallet. Even when Coinbase
                has your purchase records for assets bought directly on their
                platform, the 2025 regulations do not require them to include
                that data on the 1099-DA. And for transferred-in assets,
                Coinbase has no way of knowing what you originally paid.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Common Coinbase Scenarios That Cause $0 Basis
              </h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <strong>Crypto bought on Coinbase and sold on Coinbase:</strong>{" "}
                  Coinbase has your purchase history, but the 2025 1099-DA
                  regulations do not require them to report it. Your basis shows
                  as $0.
                </li>
                <li>
                  <strong>Transferred in from Coinbase Wallet:</strong> If you
                  moved crypto from the Coinbase self-custody wallet back to
                  Coinbase exchange, the exchange treats it as a deposit with
                  unknown origin, reporting $0 basis.
                </li>
                <li>
                  <strong>Transferred from Binance, Kraken, or other exchanges:</strong>{" "}
                  You bought ETH on Kraken, sent it to Coinbase, and sold it
                  there. Coinbase has no record of your Kraken purchase price.
                </li>
                <li>
                  <strong>Coinbase Earn rewards:</strong> If you received free
                  crypto through Coinbase Earn and later sold it, the basis
                  should be the fair market value when received, but the 1099-DA
                  may show $0.
                </li>
                <li>
                  <strong>Converted between assets:</strong> Crypto-to-crypto
                  conversions (e.g., BTC to ETH via Coinbase Convert) are
                  taxable events. The cost basis of the new asset should reflect
                  the value at the time of conversion, but this chain of trades
                  can cause basis tracking to break.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How to Download Your Coinbase Transaction History
              </h2>
              <p>
                To correct your cost basis, you need your complete Coinbase
                transaction history. Here&apos;s how to get it:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong>Log in to Coinbase</strong> at{" "}
                  <span className="font-mono text-sm">coinbase.com</span>
                </li>
                <li>
                  Navigate to <strong>Settings</strong> (gear icon in the top
                  right)
                </li>
                <li>
                  Click <strong>Taxes</strong> in the left sidebar, then select{" "}
                  <strong>Tax Documents</strong>
                </li>
                <li>
                  Under &quot;Transaction History,&quot; click{" "}
                  <strong>&quot;Generate Report&quot;</strong> or{" "}
                  <strong>&quot;Download CSV&quot;</strong>
                </li>
                <li>
                  Select the date range covering <strong>all years</strong> you
                  have traded on Coinbase (not just 2025) to capture all
                  historical purchases
                </li>
                <li>
                  Download the CSV file to your computer
                </li>
              </ol>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Tip:</strong> If you also use Coinbase Pro (now
                  Coinbase Advanced Trade), you may need to download a separate
                  CSV from the Advanced Trade section. Coinbase merged the
                  platforms, but some older transactions may only appear in the
                  Pro/Advanced export. Check both.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What&apos;s In the Coinbase CSV?
              </h2>
              <p>
                The Coinbase transaction history CSV contains columns for
                timestamp, transaction type (buy, sell, send, receive, convert),
                asset, quantity, spot price at time of transaction, subtotal,
                fees, and total. This gives you the raw data needed to
                reconstruct your cost basis for every asset you purchased or
                received on Coinbase.
              </p>
              <p className="mt-3">
                However, manually matching hundreds or thousands of buys to
                their corresponding sells, applying FIFO or LIFO ordering,
                tracking partial lot sales, and handling conversions is
                extremely tedious and error-prone. A single mistake can mean
                over- or underpaying the IRS.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                How BasisGuard Fixes Your Coinbase 1099-DA
              </h2>
              <p>
                BasisGuard automates the entire correction process for Coinbase
                users:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <strong>Upload your Coinbase 1099-DA</strong> (PDF) and your
                  Coinbase transaction history CSV
                </li>
                <li>
                  BasisGuard <strong>parses every transaction</strong> and
                  matches each sale on the 1099-DA to its original purchase
                </li>
                <li>
                  We calculate the <strong>correct cost basis</strong> using
                  your preferred accounting method (FIFO, LIFO, or HIFO)
                </li>
                <li>
                  BasisGuard generates a{" "}
                  <strong>corrected Form 8949</strong> showing the accurate
                  basis with adjustment code &quot;B&quot;
                </li>
                <li>
                  You get a <strong>discrepancy report</strong> showing exactly
                  how much the 1099-DA overstated your gains, line by line
                </li>
              </ol>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-3">
                    Coinbase 1099-DA (as filed)
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      Sold:{" "}
                      <span className="font-mono font-semibold">0.5 BTC</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$47,000</span>
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
                        $47,000
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
                      <span className="font-mono font-semibold">0.5 BTC</span>
                    </li>
                    <li>
                      Proceeds:{" "}
                      <span className="font-mono font-semibold">$47,000</span>
                    </li>
                    <li>
                      Actual basis:{" "}
                      <span className="font-mono font-semibold text-emerald-dark">
                        $40,000
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
                  $9,600
                </span>{" "}
                <span className="text-sm text-slate font-normal">
                  (at 24% tax rate)
                </span>
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What If You Already Filed With Coinbase&apos;s $0 Basis?
              </h2>
              <p>
                If you already filed your 2025 taxes using the $0 cost basis
                from your Coinbase 1099-DA, you can still fix it. File an{" "}
                <strong>amended return (Form 1040-X)</strong> with the corrected
                Form 8949. The IRS allows you to amend returns for up to three
                years. Many Coinbase users who amend their returns recover
                thousands of dollars in overpaid taxes.
              </p>
            </section>

            {/* CTA */}
            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">
                Fix Your Coinbase 1099-DA in Minutes
              </h3>
              <p className="text-sm text-slate mb-4">
                Upload your Coinbase 1099-DA and transaction history. See how
                much you&apos;d overpay in under 2 minutes.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your Coinbase 1099-DA Free &rarr;
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
                  href="/guides/kraken-1099-da"
                  className="text-sm text-emerald hover:text-emerald-dark transition-colors"
                >
                  Kraken 1099-DA Guide &rarr;
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
          affiliated with Coinbase, Inc. &quot;Coinbase&quot; is a registered
          trademark of Coinbase, Inc.
        </p>
      </footer>
    </div>
  );
}
