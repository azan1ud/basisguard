const steps = [
  {
    number: "1",
    title: "Upload your 1099-DA PDF",
    description:
      "Drag and drop the 1099-DA you received from your exchange. We parse it instantly and never store your file.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="3"
          width="18"
          height="22"
          rx="2"
          stroke="#1B2A4A"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M10 13h8M10 17h5"
          stroke="#1B2A4A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 7v3m-2-1l2 2 2-2"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Connect your exchange (or upload CSV)",
    description:
      "Link your Coinbase, Kraken, or Binance account via read-only API, or upload a transaction history CSV.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="14" r="3" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="14" r="3" stroke="#1B2A4A" strokeWidth="1.5" fill="none" />
        <path
          d="M11 14h6"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <path
          d="M14 8v2M14 18v2"
          stroke="#1B2A4A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "See your savings and download corrected forms",
    description:
      "We show you exactly how much you'd overpay and generate a corrected Form 8949, ready to file or send to your CPA.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5"
          width="20"
          height="18"
          rx="2"
          stroke="#1B2A4A"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M8 16l3-4 3 2.5 4-5.5"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 10h20"
          stroke="#1B2A4A"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate">
            Three steps. Two minutes. Thousands saved.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-offwhite rounded-card p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {step.number}
                </span>
                <div className="text-navy">{step.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-charcoal leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connector line (desktop only) */}
        <div className="hidden md:flex justify-center mt-[-1px]">
          <div className="w-full max-w-4xl border-t-2 border-dashed border-gray-200" />
        </div>
      </div>
    </section>
  );
}
