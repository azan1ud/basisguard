export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 sm:py-28 bg-offwhite">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            The cost basis problem, explained
          </h2>
          <p className="mt-4 text-lg text-slate">
            Your exchange knows what you sold crypto for but often fails to
            report what you originally paid. The IRS treats the missing cost
            basis as $0.
          </p>
        </div>

        {/* Two-card comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Card 1: What 1099-DA reports */}
          <div className="rounded-card bg-white border-2 border-danger/20 p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/10">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 3v4m0 2.5h.005"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="7" cy="7" r="6" stroke="#EF4444" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-danger">
                What your 1099-DA reports
              </h3>
            </div>

            <p className="text-sm text-slate mb-5">
              Bought 2 ETH at $2,500 each, sold at $3,500 each.
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate">Proceeds</span>
                <span className="font-mono text-base font-semibold text-charcoal">
                  $7,000
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate">Cost Basis</span>
                <span className="font-mono text-base font-semibold text-danger">
                  $0
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-medium text-charcoal">
                  IRS thinks you owe on
                </span>
                <span className="font-mono text-xl font-bold text-danger">
                  $7,000
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-btn bg-danger/5 border border-danger/10 px-4 py-3">
              <p className="text-xs text-danger font-medium">
                Estimated tax at 24% bracket:{" "}
                <span className="font-mono font-bold">$1,680</span>
              </p>
            </div>
          </div>

          {/* Card 2: What you actually owe */}
          <div className="rounded-card bg-white border-2 border-emerald/20 p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/10">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7l2.5 2.5L10 5"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="7" cy="7" r="6" stroke="#10B981" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-emerald-dark">
                What you actually owe
              </h3>
            </div>

            <p className="text-sm text-slate mb-5">
              Same trade, but with your real cost basis included.
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate">Proceeds</span>
                <span className="font-mono text-base font-semibold text-charcoal">
                  $7,000
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate">Cost Basis</span>
                <span className="font-mono text-base font-semibold text-emerald">
                  $5,000
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-medium text-charcoal">
                  Actual taxable gain
                </span>
                <span className="font-mono text-xl font-bold text-emerald">
                  $2,000
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-btn bg-emerald/5 border border-emerald/10 px-4 py-3">
              <p className="text-xs text-emerald-dark font-medium">
                Estimated tax at 24% bracket:{" "}
                <span className="font-mono font-bold">$480</span>
              </p>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        <div className="mt-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 rounded-card bg-white border border-gray-200 shadow-card px-6 py-4 sm:px-8 sm:py-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M12 2L8.5 8.5 2 9.5l5 4.5L5.5 21 12 17.5 18.5 21 17 14l5-4.5-6.5-1L12 2z"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="#F59E0B"
                fillOpacity="0.15"
              />
            </svg>
            <p className="text-base sm:text-lg text-charcoal">
              The average crypto trader is overpaying by{" "}
              <span className="font-mono font-bold text-navy">$3,200</span>{" "}
              this tax season.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
