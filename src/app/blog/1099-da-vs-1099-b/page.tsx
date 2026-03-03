import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1099-DA vs 1099-B: What's the Difference for Crypto Taxes?",
  description:
    "Understand the differences between IRS Form 1099-DA and 1099-B, why crypto now has its own form, and what it means for your cost basis and tax filing.",
  keywords: [
    "1099-DA vs 1099-B",
    "1099-DA difference",
    "crypto tax form",
    "1099-B crypto",
    "digital asset reporting",
    "IRS crypto form",
  ],
  openGraph: {
    title: "1099-DA vs 1099-B: What's the Difference?",
    description: "Why crypto got its own IRS form and what the 1099-DA means for your taxes.",
    type: "article",
    url: "https://basisguard.vercel.app/blog/1099-da-vs-1099-b",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "1099-DA vs 1099-B: What's the Difference for Crypto Taxes?",
  description: "Understand the differences between IRS Form 1099-DA and 1099-B for crypto.",
  author: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  publisher: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://basisguard.vercel.app/blog/1099-da-vs-1099-b" },
};

export default function DAvsB() {
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
            1099-DA vs 1099-B: What&apos;s the Difference for Crypto Taxes?
          </h1>
          <p className="text-sm text-slate mb-8">Published March 2, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <p>
                If you trade both stocks and crypto, you might be wondering why you now get two different tax
                forms: a 1099-B from your stockbroker and a 1099-DA from your crypto exchange. Here&apos;s
                what&apos;s different, what&apos;s the same, and why the distinction matters for your taxes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Quick Comparison</h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-gray-200 rounded-btn overflow-hidden">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left px-4 py-3 font-semibold">Feature</th>
                      <th className="text-center px-4 py-3 font-semibold">1099-B (Stocks)</th>
                      <th className="text-center px-4 py-3 font-semibold">1099-DA (Crypto)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">First issued</td>
                      <td className="px-4 py-3 text-center">1980s</td>
                      <td className="px-4 py-3 text-center">2025 tax year (new!)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Reports proceeds</td>
                      <td className="px-4 py-3 text-center">Yes</td>
                      <td className="px-4 py-3 text-center">Yes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Reports cost basis</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-dark">Yes (since 2011)</td>
                      <td className="px-4 py-3 text-center font-semibold text-danger">Not yet (starts 2026)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Reports gain/loss</td>
                      <td className="px-4 py-3 text-center">Yes</td>
                      <td className="px-4 py-3 text-center text-danger">No</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Asset types</td>
                      <td className="px-4 py-3 text-center">Stocks, bonds, options</td>
                      <td className="px-4 py-3 text-center">Digital assets only</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium">Who issues it</td>
                      <td className="px-4 py-3 text-center">Stock brokers</td>
                      <td className="px-4 py-3 text-center">Crypto brokers/exchanges</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Form 8949 checkbox</td>
                      <td className="px-4 py-3 text-center">Box A (basis reported)</td>
                      <td className="px-4 py-3 text-center">Box B (basis not reported)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Why Crypto Got Its Own Form</h2>
              <p>
                The IRS created the 1099-DA specifically for digital assets because crypto has unique characteristics
                that don&apos;t fit neatly into the 1099-B framework:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Self-custody:</strong> You can hold crypto in your own wallet — stocks are always held by a broker</li>
                <li><strong>Cross-platform transfers:</strong> Crypto moves freely between exchanges, making cost basis tracking far harder</li>
                <li><strong>Decentralized trading:</strong> DEXs, DeFi, and peer-to-peer transactions have no broker equivalent</li>
                <li><strong>24/7 markets:</strong> Crypto trades around the clock, creating more taxable events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">The Big Problem: No Cost Basis on the 1099-DA</h2>
              <p>
                When you sell stocks, your broker sends the IRS a 1099-B with both the proceeds <strong>and</strong> the
                cost basis. The IRS can verify your tax return against complete information. This system has worked
                smoothly since 2011.
              </p>
              <p className="mt-3">
                The 1099-DA doesn&apos;t have that yet. For 2025, exchanges only report proceeds. Without cost basis,
                the IRS can&apos;t calculate your actual gain — and their default assumption is that your basis is $0,
                meaning 100% of the sale is taxable gain.
              </p>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>Example:</strong> If your stockbroker&apos;s 1099-B shows you sold $10,000 of Apple stock
                  with a $8,000 basis, the IRS expects you to report a $2,000 gain. But if your crypto exchange&apos;s
                  1099-DA shows you sold $10,000 of Bitcoin with no basis, the IRS expects a <strong className="text-danger">$10,000 gain</strong> unless
                  you file Form 8949 with the correct basis.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">What This Means For You</h2>
              <p>
                If you sell stocks, your taxes are usually straightforward — the 1099-B has everything the IRS
                needs. But if you sell crypto, you have extra work to do:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Your 1099-DA only gives the IRS half the picture (proceeds without basis)</li>
                <li>You must provide the correct cost basis yourself on Form 8949</li>
                <li>If you don&apos;t, the IRS treats your entire sale as profit</li>
                <li>You need your exchange transaction history to prove your actual cost basis</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Will This Change?</h2>
              <p>
                Yes, eventually. The IRS plans to require cost basis reporting on the 1099-DA starting with the
                2026 tax year — but only for assets purchased and sold on the same exchange. Assets transferred
                from another exchange or wallet will likely still lack basis information for the foreseeable future.
              </p>
              <p className="mt-3">
                Until the 1099-DA catches up to the 1099-B in terms of completeness, tools like BasisGuard
                bridge the gap by calculating your correct cost basis and generating the corrected Form 8949.
              </p>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Don&apos;t Let an Incomplete 1099-DA Cost You Thousands</h3>
              <p className="text-sm text-slate mb-4">
                Upload your 1099-DA and see the real numbers in under 2 minutes.
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
                <Link href="/guides/1099-da" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Understanding the 1099-DA &rarr;
                </Link>
                <Link href="/blog/1099-da-wrong-cost-basis" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Why Your 1099-DA Is Wrong &rarr;
                </Link>
                <Link href="/guides/form-8949" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Form 8949 Guide &rarr;
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
