import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IRS Form 8949 Guide — BasisGuard",
  description:
    "Complete guide to IRS Form 8949 for reporting cryptocurrency sales and correcting cost basis from your 1099-DA.",
};

export default function Form8949GuidePage() {
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
          <h1 className="text-3xl font-bold text-navy mb-3">IRS Form 8949: A Complete Guide for Crypto Traders</h1>
          <p className="text-slate mb-8">
            Everything you need to know about reporting crypto sales and correcting your cost basis.
          </p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">What Is Form 8949?</h2>
              <p>
                IRS Form 8949, &quot;Sales and Other Dispositions of Capital Assets,&quot; is the form you use to report
                every individual sale of a capital asset, including cryptocurrency. Each crypto sale, trade, or
                disposal gets its own line on Form 8949. The totals from Form 8949 then flow into Schedule D of
                your tax return.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Why Does Form 8949 Matter for 1099-DA?</h2>
              <p>
                Starting with the 2025 tax year, crypto brokers are required to issue Form 1099-DA, which reports
                your gross proceeds from crypto sales. However, for 2025, brokers are <strong>not required to
                report your cost basis</strong>. This means the IRS receives a form showing you sold crypto for
                $50,000 but has no record that you paid $40,000 for it.
              </p>
              <p className="mt-3">
                Form 8949 is where you <strong>correct this</strong>. By filing Form 8949 with your accurate cost
                basis, you ensure the IRS knows your actual gain was $10,000 — not $50,000.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Form 8949 Parts and Boxes</h2>
              <p>Form 8949 has two parts:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Part I:</strong> Short-term capital gains and losses (assets held one year or less)</li>
                <li><strong>Part II:</strong> Long-term capital gains and losses (assets held more than one year)</li>
              </ul>
              <p className="mt-3">Each part has three checkbox options:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Box A:</strong> Basis reported to the IRS (matches your 1099-DA)</li>
                <li><strong>Box B:</strong> Basis <em>not</em> reported to the IRS (this is what most crypto traders will check for 2025)</li>
                <li><strong>Box C:</strong> No 1099 received</li>
              </ul>
              <div className="bg-amber/10 border border-amber/30 rounded-btn p-4 mt-4">
                <p className="text-sm">
                  <strong>For 2025 crypto taxes:</strong> Most traders will check <strong>Box B</strong> since your 1099-DA
                  reports proceeds but not cost basis. This tells the IRS that you are providing the cost basis yourself.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Columns on Form 8949</h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border border-gray-200 rounded-btn overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2.5 font-semibold text-charcoal border-b">Column</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-charcoal border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="px-4 py-2.5 font-mono">(a)</td><td className="px-4 py-2.5">Description of property (e.g., &quot;2.5 BTC&quot;)</td></tr>
                    <tr className="border-b bg-gray-50"><td className="px-4 py-2.5 font-mono">(b)</td><td className="px-4 py-2.5">Date acquired</td></tr>
                    <tr className="border-b"><td className="px-4 py-2.5 font-mono">(c)</td><td className="px-4 py-2.5">Date sold or disposed</td></tr>
                    <tr className="border-b bg-gray-50"><td className="px-4 py-2.5 font-mono">(d)</td><td className="px-4 py-2.5">Proceeds (sales price)</td></tr>
                    <tr className="border-b"><td className="px-4 py-2.5 font-mono">(e)</td><td className="px-4 py-2.5">Cost or other basis</td></tr>
                    <tr className="border-b bg-gray-50"><td className="px-4 py-2.5 font-mono">(f)</td><td className="px-4 py-2.5">Adjustment code (use &quot;B&quot; for corrected basis)</td></tr>
                    <tr className="border-b"><td className="px-4 py-2.5 font-mono">(g)</td><td className="px-4 py-2.5">Amount of adjustment</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-2.5 font-mono">(h)</td><td className="px-4 py-2.5">Gain or loss (d minus e, adjusted by g)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How BasisGuard Helps</h2>
              <p>
                BasisGuard automatically generates a completed Form 8949 with your corrected cost basis. We:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Parse your 1099-DA to extract the reported proceeds</li>
                <li>Connect to your exchange to find your actual purchase prices</li>
                <li>Calculate the correct cost basis using your preferred method (FIFO, LIFO, or HIFO)</li>
                <li>Generate a Form 8949 PDF with adjustment code B and the correct basis figures</li>
                <li>Create a discrepancy report explaining each correction for your CPA</li>
              </ol>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Ready to Fix Your 1099-DA?</h3>
              <p className="text-sm text-slate mb-4">
                See exactly how much your 1099-DA is overstating your taxes.
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
