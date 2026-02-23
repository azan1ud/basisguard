"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const reportData = {
  taxYear: 2025,
  transactionCount: 47,
  mismatchCount: 11,
  savings: 48_070,
  generatedAt: "2026-03-15T14:30:00Z",
};

function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// ---------------------------------------------------------------------------
// Download Card Component
// ---------------------------------------------------------------------------

function DownloadCard({
  title,
  description,
  icon,
  buttonLabel,
  fileType,
  onDownload,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonLabel: string;
  fileType: string;
  onDownload: () => void;
}) {
  return (
    <div className="bg-white rounded-card shadow-card p-6 border border-gray-100 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-card bg-navy/5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-navy">{title}</h3>
          <p className="text-sm text-slate mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs font-medium text-slate uppercase tracking-wider">
          {fileType}
        </span>
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-btn bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
          </svg>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filing Instructions
// ---------------------------------------------------------------------------

const filingSteps = [
  {
    step: 1,
    title: "Log into TurboTax (or your tax software)",
    detail:
      "Navigate to the Investment Income section where capital gains and losses are entered.",
  },
  {
    step: 2,
    title: 'Select "I\'ll enter my own info"',
    detail:
      'When prompted about importing from your broker, choose to manually enter or override your 1099-DA data.',
  },
  {
    step: 3,
    title: "Enter the corrected amounts from your Form 8949",
    detail:
      "Use the corrected cost basis amounts from your BasisGuard report. Enter each transaction with the actual basis, not the $0 basis from your 1099-DA.",
  },
  {
    step: 4,
    title: "Attach the discrepancy report",
    detail:
      'If you e-file, keep the BasisGuard Discrepancy Report with your records. If you paper-file, include it as a supplemental attachment with a note stating "Cost basis corrected per taxpayer records."',
  },
  {
    step: 5,
    title: "Review and file",
    detail:
      "Double-check that your Schedule D reflects the corrected capital gains. Your tax owed should now reflect your actual gains, not the inflated amount from the 1099-DA.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ReportPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [savedToDashboard, setSavedToDashboard] = useState(false);

  function handleDownload(fileType: string) {
    alert(
      `Demo: In production, this would download your ${fileType}. The API endpoint /api/generate-report would generate the file.`
    );
  }

  function handleShareWithCPA() {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  }

  function handleSaveToDashboard() {
    setSavedToDashboard(true);
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
              href="/dashboard"
              className="text-sm font-medium text-slate hover:text-charcoal transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator currentStep={5} />
        </div>

        {/* Success Banner */}
        <div className="mb-10 bg-emerald/5 border border-emerald/30 rounded-card p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
            Your Corrected Forms Are Ready!
          </h1>
          <p className="text-slate">
            Tax year {reportData.taxYear} &middot;{" "}
            <span className="font-mono">{reportData.transactionCount}</span>{" "}
            transactions analyzed &middot; Estimated savings of{" "}
            <span className="font-mono font-semibold text-emerald-dark">
              {formatUsd(reportData.savings)}
            </span>
          </p>
        </div>

        {/* Download Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-navy mb-6">
            Download Your Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DownloadCard
              title="Corrected Form 8949"
              description="IRS-ready form with your actual cost basis for each transaction."
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h10l6 6v16H6V3z" />
                  <path d="M16 3v6h6" />
                  <path d="M10 15h8M10 19h5" />
                </svg>
              }
              buttonLabel="Download PDF"
              fileType="PDF"
              onDownload={() => handleDownload("Corrected Form 8949 (PDF)")}
            />
            <DownloadCard
              title="1099-DA Discrepancy Report"
              description="Side-by-side comparison of reported vs. actual basis for your records."
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h10l6 6v16H6V3z" />
                  <path d="M16 3v6h6" />
                  <path d="M10 14h8M10 18h8M10 22h4" />
                </svg>
              }
              buttonLabel="Download PDF"
              fileType="PDF"
              onDownload={() =>
                handleDownload("1099-DA Discrepancy Report (PDF)")
              }
            />
            <DownloadCard
              title="Reconciled Transactions"
              description="Full transaction history with corrected basis in spreadsheet format."
              icon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1B2A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="20" height="20" rx="2" />
                  <path d="M4 10h20M4 16h20M10 4v20M16 4v20" />
                </svg>
              }
              buttonLabel="Download CSV"
              fileType="CSV"
              onDownload={() =>
                handleDownload("Reconciled Transactions (CSV)")
              }
            />
          </div>
        </section>

        {/* Actions Row */}
        <section className="mb-12 flex flex-col sm:flex-row gap-4">
          {/* Share with CPA */}
          <button
            onClick={handleShareWithCPA}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn bg-white border border-gray-200 px-6 py-3 text-sm font-semibold text-navy hover:bg-gray-50 shadow-card transition-colors"
          >
            {emailSent ? (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l4.5 4.5L15 5" />
                </svg>
                Email Sent!
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="14" height="10" rx="1.5" />
                  <path d="M2 4l7 5 7-5" />
                </svg>
                Share with Your CPA
              </>
            )}
          </button>

          {/* Save to Dashboard */}
          <button
            onClick={handleSaveToDashboard}
            disabled={savedToDashboard}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light shadow-card transition-colors disabled:opacity-60"
          >
            {savedToDashboard ? (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l4.5 4.5L15 5" />
                </svg>
                Saved to Dashboard
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2h10a2 2 0 012 2v12l-6-3-6 3V4a2 2 0 012-2z" />
                </svg>
                Save to Dashboard
              </>
            )}
          </button>
        </section>

        {/* Filing Instructions */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-2">
            Filing Instructions
          </h2>
          <p className="text-sm text-slate mb-6">
            Follow these steps to override your 1099-DA data when filing your
            tax return.
          </p>

          <div className="bg-white rounded-card shadow-card border border-gray-100 divide-y divide-gray-100">
            {filingSteps.map((s) => (
              <div key={s.step} className="p-5 flex gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white text-sm font-semibold">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate mt-1 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
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
