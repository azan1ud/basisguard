"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { getUserAnalyses } from "@/lib/firebase";

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

interface Report {
  id: string;
  date: string;
  taxYear: number;
  exchanges: string[];
  transactions: number;
  savings: number;
  status: "complete" | "pending" | "expired";
}

function StatusBadge({ status }: { status: "complete" | "pending" | "expired" }) {
  const styles: Record<string, string> = {
    complete: "bg-emerald/10 text-emerald-dark",
    pending: "bg-amber/10 text-amber-dark",
    expired: "bg-gray-100 text-slate",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const { firebaseUser, authLoading, signIn, signOutUser, userSession } = useApp();
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    if (authLoading || !firebaseUser) {
      setLoadingReports(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const docs = await getUserAnalyses(firebaseUser!.uid);

        const mapped: Report[] = docs
          .filter((d) => d.id !== "draft")
          .map((d) => {
            const summary = d.analysisSummary as Record<string, unknown> | undefined;
            const createdAt = d.createdAt as { seconds?: number } | string | undefined;
            let dateStr = "";
            if (createdAt && typeof createdAt === "object" && "seconds" in createdAt) {
              dateStr = new Date((createdAt.seconds as number) * 1000)
                .toISOString()
                .slice(0, 10);
            } else if (typeof createdAt === "string") {
              dateStr = new Date(createdAt).toISOString().slice(0, 10);
            }

            return {
              id: d.id,
              date: dateStr,
              taxYear: (summary?.taxYear as number) ?? new Date().getFullYear(),
              exchanges: (d.connectedExchanges as string[]) ?? [],
              transactions: (summary?.totalTransactions as number) ?? 0,
              savings: (summary?.totalOverpayment as number) ?? 0,
              status: ((d.status as string) ?? "complete") as Report["status"],
            };
          });

        if (!cancelled) {
          setReports(mapped);
          setLoadingReports(false);
        }
      } catch (err) {
        console.error("Error loading analyses:", err);
        if (!cancelled) setLoadingReports(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [firebaseUser, authLoading]);

  // -------------------------------------------------------------------------
  // Sign-in prompt
  // -------------------------------------------------------------------------
  if (!authLoading && !firebaseUser) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="bg-white rounded-card shadow-card p-10 max-w-md text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h1 className="text-xl font-bold text-navy mb-2">Sign in to view your dashboard</h1>
          <p className="text-sm text-slate mb-6">
            Your saved reports and analysis history will appear here.
          </p>
          <button
            onClick={signIn}
            className="inline-flex items-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Loading state
  // -------------------------------------------------------------------------
  if (authLoading || loadingReports) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" />
      </div>
    );
  }

  const totalSavings = reports.reduce((s, r) => s + r.savings, 0);
  const totalTransactions = reports.reduce((s, r) => s + r.transactions, 0);

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
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate hidden sm:inline">
                {userSession?.email || firebaseUser?.email || ""}
              </span>
              <button
                onClick={signOutUser}
                className="text-sm font-medium text-slate hover:text-charcoal transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">
              Welcome back{firebaseUser?.displayName ? `, ${firebaseUser.displayName.split(" ")[0]}` : ""}
            </h1>
            <p className="text-slate mt-1">
              Here are your saved reports and analysis history.
            </p>
          </div>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-btn bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-card hover:bg-emerald-dark hover:shadow-card-hover transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
            Start New Analysis
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-card shadow-card p-6 border border-gray-100">
            <p className="text-sm font-medium text-slate mb-1">
              Total Reports
            </p>
            <p className="font-mono text-3xl font-bold text-navy">
              {reports.length}
            </p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 border border-gray-100">
            <p className="text-sm font-medium text-slate mb-1">
              Total Transactions
            </p>
            <p className="font-mono text-3xl font-bold text-navy">
              {totalTransactions}
            </p>
          </div>
          <div className="bg-emerald/5 border-2 border-emerald rounded-card shadow-card p-6">
            <p className="text-sm font-semibold text-emerald-dark mb-1">
              Total Savings Identified
            </p>
            <p className="font-mono text-3xl font-bold text-emerald">
              {formatUsd(totalSavings)}
            </p>
          </div>
        </div>

        {/* Reports Table */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-navy mb-4">Your Reports</h2>

          {reports.length === 0 ? (
            <div className="bg-white rounded-card shadow-card p-10 border border-gray-100 text-center">
              <p className="text-slate mb-4">No saved reports yet.</p>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 rounded-btn bg-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
              >
                Start Your First Analysis
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-card shadow-card overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="text-left px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Tax Year
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Exchanges
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Transactions
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Savings
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-slate text-xs uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, i) => (
                      <tr
                        key={report.id}
                        className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                          i % 2 === 1 ? "bg-gray-50/30" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-slate">
                          {report.date}
                        </td>
                        <td className="px-4 py-3 font-medium text-charcoal">
                          {report.taxYear}
                        </td>
                        <td className="px-4 py-3 text-charcoal">
                          <div className="flex flex-wrap gap-1">
                            {report.exchanges.map((ex) => (
                              <span
                                key={ex}
                                className="inline-flex items-center rounded-full bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy"
                              >
                                {ex}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-right text-charcoal">
                          {report.transactions}
                        </td>
                        <td className="px-4 py-3 font-mono text-right font-semibold text-emerald">
                          {formatUsd(report.savings)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <StatusBadge status={report.status} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href="/report"
                              className="inline-flex items-center gap-1 rounded-btn bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy hover:bg-navy/10 transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 1v7M3 6l3 3 3-3M1 11h10" />
                              </svg>
                              Download
                            </Link>
                            <Link
                              href="/analysis"
                              className="inline-flex items-center gap-1 rounded-btn bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy hover:bg-navy/10 transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="6" cy="6" r="1.5" />
                                <path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z" />
                              </svg>
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
