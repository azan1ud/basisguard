"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";

// ---------------------------------------------------------------------------
// Mock order data (would come from analysis context in production)
// ---------------------------------------------------------------------------

const orderData = {
  transactionCount: 47,
  mismatchCount: 11,
  savings: 38_910,
  tier: "pro" as const,
  tierLabel: "Pro",
  price: 39.99,
};

const pricingTiers = [
  {
    id: "starter" as const,
    label: "Starter",
    maxTx: 25,
    price: 19.99,
    features: [
      "Corrected Form 8949",
      "Discrepancy report",
      "Up to 25 transactions",
    ],
  },
  {
    id: "pro" as const,
    label: "Pro",
    maxTx: 100,
    price: 39.99,
    features: [
      "Everything in Starter",
      "Up to 100 transactions",
      "Tax method optimization",
      "CPA-ready export",
    ],
    popular: true,
  },
  {
    id: "unlimited" as const,
    label: "Unlimited",
    maxTx: Infinity,
    price: 69.99,
    features: [
      "Everything in Pro",
      "Unlimited transactions",
      "Priority support",
      "Multi-year filing",
    ],
  },
];

function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function CheckoutPage() {
  const [selectedTier, setSelectedTier] = useState<string>(orderData.tier);
  const [processing, setProcessing] = useState(false);

  const activeTier = pricingTiers.find((t) => t.id === selectedTier)!;
  const lowSavings = orderData.savings < 100;

  function handlePay() {
    setProcessing(true);
    // In production, this would call /api/create-checkout
    setTimeout(() => {
      setProcessing(false);
      alert(
        "Stripe checkout would open here. This is a demo. Redirecting to report page."
      );
      window.location.href = "/report";
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-btn bg-navy">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 3h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="#10B981" strokeWidth="1.5" fill="none" />
                  <path d="M6 8l1.5 1.5L10 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-navy">
                Basis<span className="text-emerald">Guard</span>
              </span>
            </Link>
            <Link
              href="/analysis"
              className="text-sm font-medium text-slate hover:text-charcoal transition-colors"
            >
              &larr; Back to Analysis
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator currentStep={4} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">
          Complete Your Order
        </h1>
        <p className="text-center text-slate mb-10">
          Choose the plan that fits your needs.
        </p>

        {/* Low savings notice */}
        {lowSavings && (
          <div className="mb-8 bg-emerald/5 border border-emerald/30 rounded-card p-5 text-center max-w-lg mx-auto">
            <p className="text-sm font-medium text-emerald-dark">
              Your 1099-DA is mostly accurate. Your estimated discrepancy is
              only {formatUsd(orderData.savings)}. No action may be needed, but
              you can still download corrected forms if you wish.
            </p>
          </div>
        )}

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pricingTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative text-left bg-white rounded-card shadow-card p-6 transition-all hover:shadow-card-hover ${
                selectedTier === tier.id
                  ? "border-2 border-emerald ring-1 ring-emerald/20"
                  : "border border-gray-200"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-emerald px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-navy">{tier.label}</h3>
              <p className="font-mono text-3xl font-bold text-charcoal mt-2">
                ${tier.price.toFixed(2)}
              </p>
              <p className="text-xs text-slate mt-1 mb-4">
                {tier.maxTx === Infinity
                  ? "Unlimited transactions"
                  : `Up to ${tier.maxTx} transactions`}
              </p>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M3 8l3.5 3.5L13 5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              {selectedTier === tier.id && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="7" cy="7" r="6" />
                      <path d="M4 7l2 2 4-4" />
                    </svg>
                    Selected
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Order Summary + Payment */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="lg:col-span-3 bg-white rounded-card shadow-card p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-navy mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate">Plan</span>
                <span className="font-medium text-charcoal">
                  {activeTier.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Transactions analyzed</span>
                <span className="font-mono font-medium text-charcoal">
                  {orderData.transactionCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Mismatches found</span>
                <span className="font-mono font-medium text-danger">
                  {orderData.mismatchCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Estimated savings</span>
                <span className="font-mono font-semibold text-emerald">
                  {formatUsd(orderData.savings)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="font-mono text-xl font-bold text-navy">
                  ${activeTier.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-btn bg-emerald px-6 py-3.5 text-base font-semibold text-white shadow-card hover:bg-emerald-dark hover:shadow-card-hover transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="16" height="11" rx="2" />
                    <path d="M2 9h16" />
                  </svg>
                  Pay with Stripe &mdash; ${activeTier.price.toFixed(2)}
                </>
              )}
            </button>

            <p className="mt-3 text-xs text-slate text-center">
              You&apos;ll be redirected to Stripe&apos;s secure checkout.
            </p>
          </div>

          {/* Trust & security column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Money-back guarantee */}
            <div className="bg-white rounded-card shadow-card p-5 border border-gray-100 text-center">
              <div className="flex items-center justify-center mb-3">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3L7 8v7.5c0 7.45 4.6 14.42 11 17.1 6.4-2.68 11-9.65 11-17.1V8l-11-5z" />
                  <path d="M13 18l3.5 3.5L23 15" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-navy mb-1">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-xs text-slate leading-relaxed">
                If our forms don&apos;t help reduce your tax liability,
                we&apos;ll refund you in full. No questions asked.
              </p>
            </div>

            {/* Security badges */}
            <div className="bg-white rounded-card shadow-card p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-navy mb-3 text-center">
                Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <rect x="3" y="9" width="14" height="8" rx="1.5" />
                    <path d="M6 9V6a4 4 0 018 0v3" />
                    <circle cx="10" cy="13" r="1.5" fill="#10B981" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-charcoal">
                      Stripe Secure Payments
                    </p>
                    <p className="text-xs text-slate">PCI DSS compliant</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M10 2L4 5v4.5c0 4.14 2.56 8.01 6 9.5 3.44-1.49 6-5.36 6-9.5V5l-6-3z" />
                    <path d="M7.5 10l1.75 1.75L12.5 8" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-charcoal">
                      256-Bit Encryption
                    </p>
                    <p className="text-xs text-slate">
                      Your data is encrypted end-to-end
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <circle cx="10" cy="9" r="2.5" />
                    <path d="M3 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-charcoal">
                      Read-Only Access
                    </p>
                    <p className="text-xs text-slate">
                      We never touch your funds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <footer className="border-t border-gray-200 mt-16 pt-8 pb-12">
          <p className="text-xs text-slate text-center max-w-2xl mx-auto leading-relaxed">
            BasisGuard is not a tax advisor. This tool provides informational
            estimates only. Consult a qualified CPA for tax advice. Tax
            calculations are based on the data you provide and may not reflect
            your complete financial situation. Always verify results with a
            licensed tax professional before filing.
          </p>
        </footer>
      </main>
    </div>
  );
}
