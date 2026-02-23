"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is it legal to correct my 1099-DA cost basis?",
    answer:
      "Absolutely. The IRS explicitly allows taxpayers to report the correct cost basis on Form 8949, even when the 1099-DA shows a different (or missing) amount. You simply check Box B or Box E on your Form 8949 and enter the accurate cost basis. This is a well-established IRS procedure, not a loophole. The IRS expects many 1099-DAs to have incomplete data in the first year of reporting.",
  },
  {
    question: "When do I need to do this? What's the deadline?",
    answer:
      "You should correct your cost basis before filing your 2024 tax return (due April 15, 2025, or October 15, 2025 with an extension). If you've already filed without your correct cost basis, you can file an amended return (Form 1040-X) to claim a refund. There's generally a 3-year window to file an amended return from the original due date.",
  },
  {
    question: "Which exchanges are supported?",
    answer:
      "BasisGuard currently supports 1099-DA forms from Coinbase, Kraken, Binance.US, Gemini, and most major US-regulated exchanges. For transaction history, you can connect via read-only API or upload a CSV export. If your exchange isn't listed, upload your CSV and our parser will handle the common formats automatically.",
  },
  {
    question: "Is my data safe? What do you do with my information?",
    answer:
      "Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use read-only API connections, meaning we can never initiate transactions or move funds. Your uploaded files are processed in memory and automatically deleted after your session. We do not sell, share, or retain your financial data beyond what's needed to generate your corrected forms.",
  },
  {
    question: "I already filed my taxes. Can I still fix this?",
    answer:
      "Yes. You can file an amended return (Form 1040-X) with the corrected Form 8949 showing your actual cost basis. BasisGuard generates both the corrected Form 8949 and a summary you can give to your CPA. Many users recover thousands of dollars in overpaid taxes by amending.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-offwhite">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-slate">
            Everything you need to know about correcting your 1099-DA.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-card bg-white shadow-card overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-charcoal leading-snug pr-2">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`shrink-0 text-slate transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-slate">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
