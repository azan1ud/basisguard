"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StepIndicator from "@/components/ui/StepIndicator";
import { useApp } from "@/lib/context";
import { generateForm8949, generateDiscrepancyReport } from "@/lib/formGenerator";
import { saveAnalysisResults } from "@/lib/firebase";

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
  return date.toISOString().slice(0, 10);
}

/** Trigger a browser download from raw bytes or a string. */
function triggerDownload(data: BlobPart, filename: string, mimeType: string) {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
  loading,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonLabel: string;
  fileType: string;
  onDownload: () => void;
  loading?: boolean;
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
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-btn bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
            </svg>
          )}
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" /></div>}>
      <ReportPageInner />
    </Suspense>
  );
}

function ReportPageInner() {
  const {
    analysisSummary,
    selectedMethod,
    markPaid,
    firebaseUser,
    signIn,
    form1099Data,
    exchangeHistory,
    connectedExchanges,
    isPaid,
    stripeSessionId,
    uploadConfirmed,
    connectConfirmed,
  } = useApp();

  const searchParams = useSearchParams();

  const [emailSent, setEmailSent] = useState(false);
  const [savedToDashboard, setSavedToDashboard] = useState(false);
  const [downloadingForm, setDownloadingForm] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  // Mark paid if session_id is in URL params (Stripe redirect)
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      markPaid(sessionId);
    }
  }, [searchParams, markPaid]);

  // -----------------------------------------------------------------------
  // No analysis results -- friendly redirect
  // -----------------------------------------------------------------------
  if (!analysisSummary) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="bg-white rounded-card shadow-card p-10 max-w-md text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <h1 className="text-xl font-bold text-navy mb-2">No analysis results found</h1>
          <p className="text-sm text-slate mb-6">
            Please upload your 1099-DA and run an analysis first.
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
  // Derived data
  // -----------------------------------------------------------------------
  const results = analysisSummary.methodResults[selectedMethod].results;

  // -----------------------------------------------------------------------
  // Download handlers
  // -----------------------------------------------------------------------

  async function handleDownloadForm8949() {
    setDownloadingForm(true);
    try {
      const pdfBuffer = await generateForm8949(results);
      triggerDownload(pdfBuffer, "BasisGuard_Form8949.pdf", "application/pdf");
    } catch (err) {
      console.error("Error generating Form 8949:", err);
    } finally {
      setDownloadingForm(false);
    }
  }

  async function handleDownloadDiscrepancyReport() {
    setDownloadingReport(true);
    try {
      const pdfBuffer = await generateDiscrepancyReport(analysisSummary!, results);
      triggerDownload(pdfBuffer, "BasisGuard_DiscrepancyReport.pdf", "application/pdf");
    } catch (err) {
      console.error("Error generating Discrepancy Report:", err);
    } finally {
      setDownloadingReport(false);
    }
  }

  function handleDownloadCSV() {
    const header = "Asset,Sale Date,Proceeds,Reported Basis,Actual Basis,Discrepancy,Status";
    const rows = results.map((r) =>
      [
        r.transaction.asset,
        formatDate(r.transaction.saleDate),
        r.transaction.proceeds.toFixed(2),
        r.reportedBasis.toFixed(2),
        r.actualBasis.toFixed(2),
        r.discrepancy.toFixed(2),
        r.status,
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    triggerDownload(csv, "BasisGuard_Transactions.csv", "text/csv;charset=utf-8");
  }

  function handleShareWithCPA() {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  }

  async function handleSaveToDashboard() {
    if (!firebaseUser) {
      // Prompt sign-in first
      await signIn();
      return;
    }

    try {
      const docId = `analysis-${Date.now()}`;
      const serializeDates = (obj: unknown): unknown => {
        if (obj instanceof Date) return obj.toISOString();
        if (Array.isArray(obj)) return obj.map(serializeDates);
        if (obj && typeof obj === "object") {
          const out: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(obj)) {
            out[k] = serializeDates(v);
          }
          return out;
        }
        return obj;
      };

      const payload = serializeDates({
        form1099Data,
        uploadConfirmed,
        exchangeHistory,
        connectedExchanges,
        connectConfirmed,
        analysisSummary,
        selectedMethod,
        isPaid,
        stripeSessionId,
        status: "complete",
      }) as Record<string, unknown>;

      await saveAnalysisResults(firebaseUser.uid, docId, payload);
      setSavedToDashboard(true);
    } catch (err) {
      console.error("Error saving to dashboard:", err);
    }
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
            {analysisSummary.taxYear
              ? `Tax year ${analysisSummary.taxYear}`
              : `Analyzed ${new Date(analysisSummary.analyzedAt).toLocaleDateString()}`}{" "}
            &middot;{" "}
            <span className="font-mono">{analysisSummary.totalTransactions}</span>{" "}
            transactions analyzed &middot; Estimated savings of{" "}
            <span className="font-mono font-semibold text-emerald-dark">
              {formatUsd(analysisSummary.totalOverpayment)}
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
              onDownload={handleDownloadForm8949}
              loading={downloadingForm}
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
              onDownload={handleDownloadDiscrepancyReport}
              loading={downloadingReport}
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
              onDownload={handleDownloadCSV}
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
