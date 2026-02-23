import Link from "next/link";

const comparisonPoints = [
  {
    feature: "Pricing",
    others: "Annual subscriptions starting at $49-$199/year, whether or not you need it",
    basisguard: "One-time fee. Pay only when you file. No recurring charges.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
        <path
          d="M11 6.5v9M8.5 9.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2-1.2 1.7-2.5 2c-1.3.3-2.5.9-2.5 2s.9 2 2.5 2 2.5-.9 2.5-2"
          stroke="#1B2A4A"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    feature: "Focus",
    others:
      "Bloated portfolio trackers that try to do everything: DeFi, NFTs, staking, real-time prices",
    basisguard:
      "Built for one thing: detecting missing cost basis on your 1099-DA and fixing your Form 8949.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="11" r="4" stroke="#1B2A4A" strokeWidth="1.3" fill="none" />
        <circle cx="11" cy="11" r="1.5" fill="#10B981" />
      </svg>
    ),
  },
  {
    feature: "Speed",
    others:
      "Requires syncing your entire transaction history, resolving errors, and manual categorization",
    basisguard:
      "Upload your 1099-DA, connect your exchange, and get your corrected forms in under 2 minutes.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
        <path
          d="M11 7v4.5l3 1.5"
          stroke="#1B2A4A"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Comparison() {
  return (
    <section id="compare" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Why BasisGuard over CoinTracker or Koinly?
          </h2>
          <p className="mt-4 text-lg text-slate">
            Those tools are great portfolio trackers. But if your only goal is to
            stop overpaying on your 1099-DA, you need a sharper tool.
          </p>
        </div>

        {/* Comparison rows */}
        <div className="max-w-4xl mx-auto space-y-6">
          {comparisonPoints.map((point) => (
            <div
              key={point.feature}
              className="rounded-card bg-offwhite shadow-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                {point.icon}
                <h3 className="text-lg font-semibold text-navy">{point.feature}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Others */}
                <div className="rounded-btn bg-white border border-gray-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                    CoinTracker / Koinly
                  </p>
                  <p className="text-sm text-slate leading-relaxed">
                    {point.others}
                  </p>
                </div>

                {/* BasisGuard */}
                <div className="rounded-btn bg-emerald/5 border border-emerald/15 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-dark mb-2">
                    BasisGuard
                  </p>
                  <p className="text-sm text-charcoal leading-relaxed">
                    {point.basisguard}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-btn bg-navy px-8 py-4 text-base font-semibold text-white shadow-card hover:bg-navy-light hover:shadow-card-hover transition-all"
          >
            See how much you&apos;d save
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
