import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IRS CP2000 Notice for Crypto: What It Means and How to Respond",
  description:
    "Received an IRS CP2000 notice about your crypto taxes? Learn what triggered it, how to respond, and how to prevent it by fixing your 1099-DA cost basis.",
  keywords: [
    "IRS CP2000 crypto",
    "CP2000 notice cryptocurrency",
    "IRS notice crypto taxes",
    "CP2000 response",
    "crypto tax notice",
    "IRS crypto audit",
  ],
  openGraph: {
    title: "IRS CP2000 Notice for Crypto: What to Do",
    description: "How to respond to an IRS CP2000 notice about your cryptocurrency transactions.",
    type: "article",
    url: "https://basisguard.vercel.app/blog/irs-cp2000-crypto",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "IRS CP2000 Notice for Crypto: What It Means and How to Respond",
  description: "How to respond to an IRS CP2000 notice about cryptocurrency.",
  author: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  publisher: { "@type": "Organization", name: "BasisGuard", url: "https://basisguard.vercel.app" },
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://basisguard.vercel.app/blog/irs-cp2000-crypto" },
};

export default function CP2000CryptoPage() {
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
            IRS CP2000 Notice for Crypto: What It Means and How to Respond
          </h1>
          <p className="text-sm text-slate mb-8">Published March 2, 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <p>
                You open your mailbox and find a letter from the IRS: <strong>Notice CP2000</strong>. It says
                the income on your tax return doesn&apos;t match what was reported by third parties — and it
                proposes additional taxes owed. If the discrepancy involves cryptocurrency, you&apos;re not alone.
                Here&apos;s what&apos;s happening and what to do.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">What Is an IRS CP2000 Notice?</h2>
              <p>
                A CP2000 is <strong>not an audit</strong>. It&apos;s an automated notice generated when the IRS&apos;s
                computer systems detect a mismatch between what you reported on your tax return and what third
                parties (like your crypto exchange) reported to the IRS.
              </p>
              <p className="mt-3">
                With the new 1099-DA reporting for crypto starting in 2025, CP2000 notices for crypto are expected
                to surge. The IRS now has direct, transaction-level data from exchanges — and any discrepancy
                triggers an automatic notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Why Did You Get a CP2000 for Crypto?</h2>
              <p>Common triggers:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Unreported crypto income:</strong> Your 1099-DA shows proceeds from sales that you
                  didn&apos;t include on your tax return at all.
                </li>
                <li>
                  <strong>Missing cost basis:</strong> You reported the sale but used a cost basis that the IRS
                  can&apos;t verify because the 1099-DA shows $0 basis.
                </li>
                <li>
                  <strong>Different amounts:</strong> The proceeds on your return don&apos;t match the proceeds
                  on the 1099-DA (could be rounding, fee treatment, or timing differences).
                </li>
                <li>
                  <strong>Didn&apos;t file Form 8949:</strong> You reported crypto gains on Schedule D but
                  didn&apos;t attach the required Form 8949 detail.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">Don&apos;t Panic — and Don&apos;t Ignore It</h2>
              <div className="bg-danger/10 border border-danger/30 rounded-btn p-4 mt-4">
                <p className="text-sm font-semibold text-danger mb-1">Important</p>
                <p className="text-sm">
                  You have <strong>30 days</strong> from the date on the notice to respond. If you don&apos;t
                  respond, the IRS will assume their proposed changes are correct and send you a bill. Always respond,
                  even if you agree with part of the notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How to Respond: Step by Step</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong>Read the notice carefully.</strong> Identify which transactions the IRS is questioning.
                  The CP2000 will list the 1099-DA information they received and show the difference from your return.
                </li>
                <li>
                  <strong>Gather your records.</strong> Pull your exchange transaction history (CSV), your original
                  1099-DA, and your filed tax return. You need to show the IRS your actual cost basis.
                </li>
                <li>
                  <strong>Prepare a corrected Form 8949.</strong> If the issue is missing cost basis, generate a
                  Form 8949 showing the correct basis with adjustment code B. This is the same process as correcting
                  a $0-basis 1099-DA at filing time.
                </li>
                <li>
                  <strong>Write a response letter.</strong> Explain the discrepancy clearly. Typical language:
                  &quot;The 1099-DA reports gross proceeds but does not include cost basis for 2025 per IRS
                  regulations. Enclosed is Form 8949 with the correct cost basis supported by exchange transaction
                  records.&quot;
                </li>
                <li>
                  <strong>Send your response.</strong> Mail it to the address on the CP2000 notice. Include a copy
                  of the notice, your corrected Form 8949, and supporting documentation. Keep copies of everything.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How to Prevent CP2000 Notices</h2>
              <p>The best way to avoid a CP2000 is to file correctly the first time:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Always file Form 8949</strong> for your crypto sales, even if your 1099-DA has $0 basis.
                  Don&apos;t just report a lump sum on Schedule D.
                </li>
                <li>
                  <strong>Report every transaction</strong> on the 1099-DA. Missing even one triggers a mismatch.
                </li>
                <li>
                  <strong>Use the correct adjustment code</strong> (B) when your basis differs from the 1099-DA.
                </li>
                <li>
                  <strong>Match proceeds exactly</strong> to the 1099-DA amounts. If the 1099-DA says $47,123.45,
                  don&apos;t round to $47,123.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">How BasisGuard Helps</h2>
              <p>
                BasisGuard generates a corrected Form 8949 that matches your 1099-DA proceeds exactly while
                adding the correct cost basis. This means every transaction on your return aligns with what the
                IRS received — the only difference is the basis you&apos;re providing, supported by your
                exchange records.
              </p>
              <p className="mt-3">
                If you&apos;ve already received a CP2000 notice, you can use BasisGuard to generate the
                corrected Form 8949 to include with your response.
              </p>
            </section>

            <div className="mt-10 bg-navy/5 rounded-card p-6 text-center">
              <h3 className="text-lg font-semibold text-navy mb-2">Prevent CP2000 Notices — Fix Your 1099-DA Now</h3>
              <p className="text-sm text-slate mb-4">
                Get a corrected Form 8949 that matches your 1099-DA and prevents IRS mismatches.
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
                <Link href="/blog/1099-da-wrong-cost-basis" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Why Your 1099-DA Is Wrong &rarr;
                </Link>
                <Link href="/blog/form-8949-crypto-guide" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Form 8949 Step-by-Step &rarr;
                </Link>
                <Link href="/guides/1099-da" className="text-sm text-emerald hover:text-emerald-dark transition-colors">
                  Understanding the 1099-DA &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate text-center leading-relaxed">
          <strong>Disclaimer:</strong> BasisGuard provides tax tools, not tax advice. If you have received an
          IRS notice, consult a qualified tax professional or enrolled agent for guidance specific to your situation.
        </p>
      </footer>
    </div>
  );
}
