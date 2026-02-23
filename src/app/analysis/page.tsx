"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";
import { useApp } from "@/lib/context";
import type { CostBasisMethod } from "@/lib/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatDate(d: Date | string): string {
  const date = new Date(d);
  if (isNaN(date.getTime())) return "N/A";
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function StatusBadge({ status }: { status: "match" | "mismatch" | "missing" }) {
  if (status === "match") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-medium text-emerald-dark">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7l3 3 5-5" />
        </svg>
        Match
      </span>
    );
  }
  if (status === "mismatch") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber-dark">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 4v3M7 9.5h.01" />
        </svg>
        Mismatch
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger-dark">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l6 6M10 4l-6 6" />
      </svg>
      Missing Basis
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AnalysisPage() {
  const {
    form1099Data,
    analysisSummary,
    selectedMethod,
    runAnalysis,
    setSelectedMethod,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"all" | "mismatch" | "missing" | "match">("all");

  // Run analysis on mount if we have data
  useEffect(() => {
    if (form1099Data.length > 0) {
      runAnalysis();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -----------------------------------------------------------------------
  // No data at all -- redirect the user to upload
  // -----------------------------------------------------------------------
  if (!analysisSummary && form1099Data.length === 0) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="bg-white rounded-card shadow-card p-10 max-w-md text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <h1 className="text-xl font-bold text-navy mb-2">No data to analyze</h1>
          <p className="text-sm text-slate mb-6">
            Please upload your 1099-DA first.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
          >
            Go to Upload
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Data exists but analysis hasn't completed yet -- loading spinner
  // -----------------------------------------------------------------------
  if (!analysisSummary) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-emerald border-t-transparent mb-4" />
          <p className="text-sm font-medium text-slate">Running analysis...</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Derived data from the real analysis summary
  // -----------------------------------------------------------------------
  const currentMethodResult = analysisSummary.methodResults[selectedMethod];
  const results = currentMethodResult.results;

  const taxOwedPer1099 = currentMethodResult.totalTaxOwed + analysisSummary.totalOverpayment;
  const actualLiability = currentMethodResult.totalTaxOwed;
  const overpayment = analysisSummary.totalOverpayment;

  const filtered =
    activeTab === "all"
      ? results
      : results.filter((r) => r.status === activeTab);

  // Mismatch categories -- computed from results
  const zeroBasisCount = results.filter(
    (r) => r.reportedBasis === 0 && r.status === "mismatch"
  ).length;

  const missingDataCount = results.filter(
    (r) => r.status === "missing"
  ).length;

  const feeDiscrepancyCount = results.filter(
    (r) => r.status === "match" && r.discrepancy > 0
  ).length;

  const stablecoinCount = results.filter(
    (r) => r.notes && r.notes.toLowerCase().includes("stablecoin")
  ).length;

  const mismatchCategories = [
    {
      label: "Transferred assets with $0 basis",
      count: zeroBasisCount,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
      color: "bg-amber/10 border-amber/30",
    },
    {
      label: "Missing acquisition data",
      count: missingDataCount,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      ),
      color: "bg-danger/10 border-danger/30",
    },
    {
      label: "Fee discrepancies",
      count: feeDiscrepancyCount,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      color: "bg-slate/10 border-slate/30",
    },
    {
      label: "Stablecoin swaps",
      count: stablecoinCount,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 014-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 01-4 4H3" />
        </svg>
      ),
      color: "bg-emerald/10 border-emerald/30",
    },
  ];

  // Tax method comparison data
  const methodLabels: Record<CostBasisMethod, string> = {
    FIFO: "First In, First Out",
    LIFO: "Last In, First Out",
    HIFO: "Highest In, First Out",
  };

  const methods: CostBasisMethod[] = ["FIFO", "LIFO", "HIFO"];

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header bar */}
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
              href="/dashboard"
              className="text-sm font-medium text-slate hover:text-charcoal transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator currentStep={3} />
        </div>

        {/* ================================================================= */}
        {/* HERO METRICS                                                      */}
        {/* ================================================================= */}
        <section className="text-center mb-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-10">
            Your Analysis Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 1099-DA says */}
            <div className="bg-white rounded-card shadow-card p-8">
              <p className="text-sm font-medium text-slate mb-2">
                Your 1099-DA says you owe
              </p>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-danger">
                {formatUsd(taxOwedPer1099)}
              </p>
            </div>

            {/* Actual liability */}
            <div className="bg-white rounded-card shadow-card p-8">
              <p className="text-sm font-medium text-slate mb-2">
                Your actual tax liability
              </p>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-charcoal">
                {formatUsd(actualLiability)}
              </p>
            </div>

            {/* Overpayment */}
            <div className="bg-emerald/5 border-2 border-emerald rounded-card shadow-card p-8">
              <p className="text-sm font-semibold text-emerald-dark mb-2">
                YOU&apos;RE OVERPAYING BY
              </p>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-emerald">
                {formatUsd(overpayment)}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* MISMATCH BREAKDOWN TABLE                                          */}
        {/* ================================================================= */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-navy">
              Transaction-Level Breakdown
            </h2>

            {/* Tab filters */}
            <div className="flex gap-2">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "mismatch", label: "Mismatches" },
                  { key: "missing", label: "Missing" },
                  { key: "match", label: "Matches" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-btn transition-colors ${
                    activeTab === tab.key
                      ? "bg-navy text-white"
                      : "bg-white text-slate hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      Sale Date
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      1099-DA Proceeds
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      1099-DA Basis
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      Actual Basis
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      Discrepancy
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.transaction.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        i % 2 === 1 ? "bg-gray-50/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-charcoal">
                        {r.transaction.asset}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate text-xs">
                        {formatDate(r.transaction.saleDate)}
                      </td>
                      <td className="px-4 py-3 font-mono text-right text-charcoal">
                        {formatUsd(r.transaction.proceeds)}
                      </td>
                      <td className="px-4 py-3 font-mono text-right text-charcoal">
                        {r.reportedBasis === 0 ? (
                          <span className="text-danger font-semibold">$0</span>
                        ) : (
                          formatUsd(r.reportedBasis)
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-right text-emerald-dark font-semibold">
                        {formatUsd(r.actualBasis)}
                      </td>
                      <td className="px-4 py-3 font-mono text-right">
                        <span
                          className={
                            r.discrepancy > 100
                              ? "text-danger font-semibold"
                              : "text-slate"
                          }
                        >
                          {formatUsd(r.discrepancy)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate">
                        No transactions in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* MISMATCH CATEGORIES                                               */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-6">
            Mismatch Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mismatchCategories.map((cat) => (
              <div
                key={cat.label}
                className={`bg-white rounded-card shadow-card p-5 border ${cat.color} flex items-start gap-4`}
              >
                <div className="flex-shrink-0 mt-0.5">{cat.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal leading-snug">
                    {cat.label}
                  </p>
                  <p className="mt-1">
                    <span className="font-mono text-2xl font-bold text-navy">
                      {cat.count}
                    </span>
                    <span className="ml-1 text-xs text-slate">
                      transaction{cat.count !== 1 ? "s" : ""}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* TAX METHOD COMPARISON                                             */}
        {/* ================================================================= */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-2">
            Tax Method Comparison
          </h2>
          <p className="text-sm text-slate mb-6">
            Different accounting methods produce different tax outcomes. We
            recommend the method that minimizes your liability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methods.map((method) => {
              const mr = analysisSummary.methodResults[method];
              const isRecommended = method === analysisSummary.recommendedMethod;
              const isSelected = method === selectedMethod;

              return (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`relative bg-white rounded-card shadow-card p-6 text-left transition-shadow hover:shadow-card-hover ${
                    isRecommended
                      ? "border-2 border-emerald ring-1 ring-emerald/20"
                      : isSelected
                      ? "border-2 border-navy ring-1 ring-navy/20"
                      : "border border-gray-200"
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-emerald px-3 py-0.5 text-xs font-semibold text-white">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                      Recommended
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-navy">{method}</h3>
                  <p className="text-xs text-slate mt-1 mb-4">{methodLabels[method]}</p>
                  <p className="font-mono text-3xl font-bold text-charcoal">
                    {formatUsd(mr.totalTaxOwed)}
                  </p>
                  <p className="text-xs text-slate mt-1">Estimated tax owed</p>
                  {isRecommended && (
                    <p className="mt-3 text-sm font-medium text-emerald-dark">
                      Saves you {formatUsd(taxOwedPer1099 - mr.totalTaxOwed)} vs.
                      your 1099-DA
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* CALL TO ACTION                                                    */}
        {/* ================================================================= */}
        <section className="mb-16 text-center">
          <div className="bg-white rounded-card shadow-card-lg p-8 sm:p-12 max-w-2xl mx-auto border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
              Unlock Your Corrected Form 8949
            </h2>
            <p className="text-slate mb-8 max-w-lg mx-auto">
              Get your IRS-ready corrected Form 8949, full discrepancy report,
              and reconciled transaction history.
            </p>

            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-btn bg-emerald px-10 py-4 text-lg font-semibold text-white shadow-card hover:bg-emerald-dark hover:shadow-card-hover transition-all"
            >
              Get My Corrected Forms &mdash; $39.99
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <p className="mt-5 font-mono text-sm text-emerald-dark font-semibold">
              You could save {formatUsd(overpayment)} &mdash; that&apos;s a{" "}
              {Math.round(overpayment / 39.99)}x return on $39.99
            </p>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald">
                  <path d="M7 1L3.5 3v3.5c0 3.04 1.88 5.88 3.5 6.97 1.62-1.09 3.5-3.93 3.5-6.97V3L7 1z" />
                </svg>
                Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald">
                  <path d="M2 7l3.5 3.5L12 4" />
                </svg>
                30-day money-back guarantee
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* DISCLAIMER                                                        */}
        {/* ================================================================= */}
        <footer className="border-t border-gray-200 pt-8 pb-12">
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
