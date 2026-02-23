import Link from "next/link";

const trustBadges = [
  {
    label: "256-bit encryption",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 2L4 5v4.5c0 4.14 2.56 8.01 6 9.5 3.44-1.49 6-5.36 6-9.5V5l-6-3z"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M7.5 10l1.75 1.75L12.5 8"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Read-only access",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="9" r="2.5" stroke="#10B981" strokeWidth="1.5" fill="none" />
        <path
          d="M3 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "We never touch your funds",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="9"
          width="14"
          height="8"
          rx="1.5"
          stroke="#10B981"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M6 9V6a4 4 0 018 0v3"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="10" cy="13" r="1.5" fill="#10B981" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="bg-offwhite pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Small badge */}
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="text-xs font-medium text-amber-dark">
            2026 Tax Season: New IRS 1099-DA Reporting
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-tight">
          Your 1099-DA is wrong.{" "}
          <span className="text-charcoal">Don&apos;t overpay your crypto taxes.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate max-w-2xl mx-auto">
          For the first time ever, your crypto exchange sent the IRS a tax form
          — but it&apos;s missing your cost basis. That means the IRS thinks you owe
          taxes on{" "}
          <span className="font-semibold text-charcoal">100% of your proceeds</span>,
          not just your gains.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-btn bg-emerald px-8 py-4 text-base font-semibold text-white shadow-card hover:bg-emerald-dark hover:shadow-card-hover transition-all"
          >
            Check Your 1099-DA Free
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Sub-CTA text */}
        <p className="mt-4 text-sm text-slate">
          No sign-up required. See your savings in 2 minutes.
        </p>

        {/* Trust badges */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              {badge.icon}
              <span className="text-sm font-medium text-slate">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
