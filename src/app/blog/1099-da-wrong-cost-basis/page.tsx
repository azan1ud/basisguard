import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your 1099-DA Cost Basis Is Wrong — Here's Why and How to Fix It",
  description:
    "The IRS 1099-DA shows $0 cost basis for your crypto. Learn why this happens, how much you could overpay, and the legal way to correct it with Form 8949.",
  keywords: [
    "1099-DA wrong cost basis",
    "1099-DA $0 cost basis",
    "crypto tax overpayment",
    "1099-DA fix",
    "missing cost basis crypto",
    "IRS crypto taxes 2025",
  ],
  openGraph: {
    title: "Your 1099-DA Cost Basis Is Wrong — Here's Why and How to Fix It",
    description:
      "The IRS thinks you owe taxes on 100% of your crypto proceeds. Here's the legal fix.",
    type: "article",
    url: "https://basisguard.vercel.app/blog/1099-da-wrong-cost-basis",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Your 1099-DA Cost Basis Is Wrong — Here's Why and How to Fix It",
  description:
    "The IRS 1099-DA shows $0 cost basis for your crypto. Learn why this happens and how to fix it.",
  author: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  publisher: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://basisguard.vercel.app/blog/1099-da-wrong-cost-basis" },
};

export default function WrongCostBasisPage() {
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
            Your 1099-DA Cost Basis Is Wrong &mdash; Here&apos;s Why and How to Fix It
          </h1>
          <p className="text-sm text-slate mb-8">Published March 2, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <p>
                If you sold cryptocurrency in 2025, you&apos;ve probably received your first-ever Form 1099-DA from
                your exchange. And if you looked closely, you noticed something alarming: the cost basis field
                shows <strong>$0</strong>.
              </p>
              <p className="mt-3">
                No, your exchange didn&apos;t lose your data. And no, you didn&apos;t get your crypto for free.
                This is a known issue with the brand-new 1099-DA reporting rules — and if you don&apos;t fix it,
                you could overpay the IRS by thousands of dollars.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Why Your 1099-DA Shows $0 Cost Basis</h2>
              <p>
                The IRS introduced Form 1099-DA for the 2025 tax year as the first standardized crypto reporting
                form. But here&apos;s the catch: <strong>for 2025, brokers are only required to report gross
                proceeds</strong>. They are not required to report your cost basis.
              </p>
              <p className="mt-3">
                That means your exchange sends the IRS a form showing you sold $50,000 worth of Bitcoin — but
                with no record of the $42,000 you paid for it. As far as the IRS is concerned, your taxable
                gain is $50,000 unless you prove otherwise.
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">The Math</p>
                <p className="text-sm">
                  Sold 1 ETH for $3,800. Bought it for $2,200. Your actual gain: <strong>$1,600</strong>. What
                  the IRS sees on your 1099-DA: <strong className="text-danger">$3,800 gain</strong>. That&apos;s
                  an extra <strong className="text-danger">$528 in taxes</strong> at 24% — on a single transaction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">This Is Not an Error — It&apos;s the Regulation</h2>
              <p>
                The IRS phased in 1099-DA reporting in stages. For 2025, only gross proceeds are mandatory. Cost
                basis reporting for digital assets acquired before January 1, 2026 is not required. Starting
                with the 2026 tax year, cost basis will begin to be reported — but only for assets both bought
                and sold on the same exchange.
              </p>
              <p className="mt-3">
                This means that even next year, transferred assets (from another exchange or a wallet) will likely
                still show $0 basis. The problem isn&apos;t going away soon.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How Much Could You Overpay?</h2>
              <p>
                The average crypto trader who files with $0 cost basis overpays by <strong>$3,200</strong>. For
                active traders, it can be $10,000 or more. Here&apos;s why:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Every sale is treated as 100% profit, even if you barely broke even or lost money</li>
                <li>Multiple trades compound the error — each one adds phantom gains</li>
                <li>You could end up in a higher tax bracket because of inflated income</li>
                <li>Capital gains surtax (NIIT) kicks in at $200K/$250K — false gains can push you over the threshold</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Legal Way to Fix It: Form 8949</h2>
              <p>
                The IRS <strong>explicitly allows</strong> you to correct cost basis on Form 8949. This is not
                a loophole or a gray area — it&apos;s standard procedure that has existed for years with stock
                trades and now applies to crypto.
              </p>
              <p className="mt-3">Here&apos;s how it works:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Get your complete transaction history from your exchange (usually a CSV download)</li>
                <li>Match each sale to its original purchase to determine the real cost basis</li>
                <li>File Form 8949 with the correct basis, checking <strong>Box B</strong> (basis not reported to IRS)</li>
                <li>Use adjustment code <strong>&quot;B&quot;</strong> in column (f) to indicate the correction</li>
                <li>The adjusted amounts flow to Schedule D of your tax return</li>
              </ol>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Already filed?</strong> You can file an amended return (Form 1040-X) with your corrected
                  Form 8949. The IRS allows amendments for up to 3 years from the original filing date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Hard Part: Matching Transactions</h2>
              <p>
                Calculating the correct cost basis sounds straightforward, but in practice it&apos;s complex:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You need to choose an accounting method (FIFO, LIFO, or HIFO)</li>
                <li>Partial sales split lots — if you bought 1 BTC and sold 0.3 BTC, which 0.3 counts?</li>
                <li>Crypto-to-crypto trades are taxable disposals with their own basis calculations</li>
                <li>Multiple exchanges mean multiple CSVs to reconcile</li>
                <li>One mistake cascades through every subsequent calculation</li>
              </ul>
              <p className="mt-3">
                This is exactly what BasisGuard automates. Upload your 1099-DA and your exchange history, and
                we match every sale to its purchase, calculate the correct basis, and generate the corrected
                Form 8949 — in about 2 minutes.
              </p>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">
                See How Much Your 1099-DA Is Costing You
              </h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and get a free mismatch analysis. No credit card required.
              </p>
              <Link
                href="/upload"
                className="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors"
              >
                Check Your 1099-DA Free &rarr;
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-navy mb-3">Related Articles</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog/fix-missing-cost-basis" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  How to Fix Missing Cost Basis &rarr;
                </Link>
                <Link href="/guides/form-8949" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Form 8949 Complete Guide &rarr;
                </Link>
                <Link href="/blog/1099-da-vs-1099-b" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  1099-DA vs 1099-B &rarr;
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
