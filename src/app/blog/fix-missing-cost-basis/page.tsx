import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Fix Missing Cost Basis on Your Crypto Tax Forms (2025 Guide)",
  description:
    "Step-by-step guide to fixing $0 cost basis on your 1099-DA or 1099-B. Download your exchange data, calculate real basis, and file corrected Form 8949.",
  keywords: [
    "fix missing cost basis",
    "crypto cost basis",
    "1099-DA fix",
    "cost basis $0",
    "crypto tax correction",
    "Form 8949 correction",
  ],
  openGraph: {
    title: "How to Fix Missing Cost Basis on Your Crypto Tax Forms",
    description:
      "Step-by-step guide to correcting $0 cost basis on your crypto tax forms and saving thousands.",
    type: "article",
    url: "https://basisguard.vercel.app/blog/fix-missing-cost-basis",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Fix Missing Cost Basis on Your Crypto Tax Forms (2025 Guide)",
  description: "Step-by-step guide to fixing $0 cost basis on your 1099-DA.",
  author: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  publisher: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://basisguard.vercel.app/blog/fix-missing-cost-basis" },
};

export default function FixMissingCostBasisPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
              Blog
            </span>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-3">
            How to Fix Missing Cost Basis on Your Crypto Tax Forms
          </h1>
          <p className="text-sm text-slate mb-8">Published March 2, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <p>
                You checked your 1099-DA and the cost basis column says $0. Now what? This guide walks you
                through exactly how to fix missing cost basis so you don&apos;t overpay the IRS on your 2025
                crypto taxes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Step 1: Don&apos;t Panic — This Is Normal</h2>
              <p>
                For the 2025 tax year, almost every crypto trader&apos;s 1099-DA will show $0 or blank cost
                basis. This is because the IRS only requires exchanges to report gross proceeds right now.
                Cost basis reporting begins in 2026 — and even then, only for assets bought and sold on the
                same exchange.
              </p>
              <p className="mt-3">
                The key thing to understand: <strong>you are legally allowed — and expected — to report the
                correct cost basis yourself</strong>. The IRS knows the 1099-DA is incomplete. They expect you
                to correct it on Form 8949.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Step 2: Download Your Transaction History</h2>
              <p>
                Your exchange keeps a record of every buy, sell, send, receive, and conversion you&apos;ve made.
                You need this data to reconstruct your cost basis. Here&apos;s how to get it from the major exchanges:
              </p>
              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-btn p-4">
                  <h4 className="font-semibold text-navy mb-1">Coinbase</h4>
                  <p className="text-sm">Settings &rarr; Taxes &rarr; Tax Documents &rarr; Generate Report &rarr; Download CSV</p>
                </div>
                <div className="bg-gray-50 rounded-btn p-4">
                  <h4 className="font-semibold text-navy mb-1">Kraken</h4>
                  <p className="text-sm">History &rarr; Export &rarr; Select &quot;Ledgers&quot; &rarr; CSV format &rarr; Submit</p>
                </div>
                <div className="bg-gray-50 rounded-btn p-4">
                  <h4 className="font-semibold text-navy mb-1">Gemini</h4>
                  <p className="text-sm">Account &rarr; Balances &rarr; Download History (select all dates) &rarr; CSV</p>
                </div>
                <div className="bg-gray-50 rounded-btn p-4">
                  <h4 className="font-semibold text-navy mb-1">Binance.US</h4>
                  <p className="text-sm">Orders &rarr; Trade History &rarr; Export Complete Trade History &rarr; CSV</p>
                </div>
              </div>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> Download your <strong>complete history</strong>, not just the current
                  year. You need your original purchase records, which may go back to 2017, 2020, or whenever
                  you first started trading. Select &quot;All time&quot; or the widest date range available.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Step 3: Understand Accounting Methods</h2>
              <p>When you sell crypto, you need to determine which specific purchase lot you&apos;re selling. The IRS allows three methods:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>FIFO (First In, First Out):</strong> Sell the oldest purchase first. This is the IRS
                  default if you don&apos;t specify. Generally results in higher gains if prices have risen over time.
                </li>
                <li>
                  <strong>LIFO (Last In, First Out):</strong> Sell the most recent purchase first. Can reduce
                  gains if your most recent purchase was at a higher price.
                </li>
                <li>
                  <strong>HIFO (Highest In, First Out):</strong> Sell the highest-cost purchase first. Minimizes
                  your taxable gain. This is the most tax-efficient method in most cases.
                </li>
              </ul>
              <p className="mt-3">
                You must be consistent within each asset type for the entire tax year. You can&apos;t use FIFO for
                one Bitcoin sale and HIFO for another in the same year.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Step 4: Match Sales to Purchases</h2>
              <p>
                This is the tedious part. For every sale on your 1099-DA, you need to find the corresponding
                purchase(s) in your transaction history and calculate the cost basis. Partial sales make this
                especially tricky:
              </p>
              <div className="bg-gray-50 rounded-btn p-4 mt-4">
                <p className="text-sm font-mono">
                  Jan 15: Buy 1.0 BTC @ $42,000<br />
                  Mar 20: Buy 0.5 BTC @ $38,000<br />
                  Jul 10: Sell 0.8 BTC @ $52,000<br />
                  <br />
                  Using FIFO: 0.8 BTC comes from the Jan 15 lot<br />
                  Cost basis = 0.8 × $42,000 = $33,600<br />
                  Gain = $41,600 - $33,600 = $8,000<br />
                  Remaining Jan 15 lot: 0.2 BTC
                </p>
              </div>
              <p className="mt-4">
                Now imagine doing this for 50, 200, or 1,000+ transactions across multiple exchanges. This is
                where most people make mistakes or give up and just accept the $0 basis — overpaying the IRS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Step 5: File Form 8949</h2>
              <p>
                Once you have the correct cost basis for each sale, you file Form 8949:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Check <strong>Box B</strong> at the top (basis not reported to the IRS)</li>
                <li>List each transaction with the correct cost basis in column (e)</li>
                <li>Enter adjustment code <strong>&quot;B&quot;</strong> in column (f)</li>
                <li>Calculate the adjustment amount in column (g)</li>
                <li>Compute the correct gain or loss in column (h)</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Easier Way: Let BasisGuard Do It</h2>
              <p>
                BasisGuard automates steps 2&ndash;5. Upload your 1099-DA PDF and your exchange CSV, and we:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Parse every transaction automatically</li>
                <li>Match each sale to its original purchase</li>
                <li>Calculate basis using your preferred method (FIFO, LIFO, or HIFO)</li>
                <li>Generate a corrected Form 8949 PDF ready for filing</li>
                <li>Create a discrepancy report showing exactly how much you saved</li>
              </ul>
              <p className="mt-3">The whole process takes about 2 minutes.</p>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Fix Your Cost Basis in 2 Minutes</h3>
              <p className="text-sm text-slate mb-4">
                See how much you&apos;d overpay with $0 cost basis. Free analysis, no credit card required.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Upload Your 1099-DA Free &rarr;
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-3">Related Articles</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/1099-da-wrong-cost-basis" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Why Your 1099-DA Is Wrong &rarr;
                </Link>
                <Link href="/guides/form-8949" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Form 8949 Complete Guide &rarr;
                </Link>
                <Link href="/blog/form-8949-crypto-guide" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Form 8949 for Crypto &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate text-center leading-relaxed">
          <strong>Disclaimer:</strong> BasisGuard provides tax tools, not tax advice. Consult a qualified tax
          professional for guidance specific to your situation.
        </p>
      </footer>
    </div>
  );
}
