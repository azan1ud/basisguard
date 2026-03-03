"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Transaction {
  id: string;
  asset: string;
  quantity: string;
  saleProceeds: string;
  reportedBasis: string;
  actualBasis: string;
}

interface Results {
  totalProceeds: number;
  totalReportedBasis: number;
  totalActualBasis: number;
  taxAtReported: number;
  taxAtActual: number;
  estimatedSavings: number;
}

const TAX_RATE = 0.24; // 24% short-term capital gains rate

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function createEmptyTransaction(): Transaction {
  return {
    id: crypto.randomUUID(),
    asset: "",
    quantity: "",
    saleProceeds: "",
    reportedBasis: "",
    actualBasis: "",
  };
}

function createPrefilledTransaction(): Transaction {
  return {
    id: crypto.randomUUID(),
    asset: "BTC",
    quantity: "1",
    saleProceeds: "85000",
    reportedBasis: "0",
    actualBasis: "42000",
  };
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function pct(part: number, whole: number): number {
  if (whole === 0) return 0;
  return Math.min((part / whole) * 100, 100);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CalculatorPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    createPrefilledTransaction(),
  ]);
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);

  /* ---------- transaction CRUD ---------- */

  const updateField = useCallback(
    (id: string, field: keyof Transaction, value: string) => {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? { ...tx, [field]: value } : tx))
      );
      // Hide results when data changes so they don't go stale
      setShowResults(false);
    },
    []
  );

  const addTransaction = () => {
    setTransactions((prev) => [...prev, createEmptyTransaction()]);
    setShowResults(false);
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => {
      if (prev.length <= 1) return prev; // keep at least one row
      return prev.filter((tx) => tx.id !== id);
    });
    setShowResults(false);
  };

  /* ---------- calculate ---------- */

  const calculate = () => {
    let totalProceeds = 0;
    let totalReportedBasis = 0;
    let totalActualBasis = 0;

    for (const tx of transactions) {
      const proceeds = parseFloat(tx.saleProceeds) || 0;
      const reported = parseFloat(tx.reportedBasis) || 0;
      const actual = parseFloat(tx.actualBasis) || 0;

      totalProceeds += proceeds;
      totalReportedBasis += reported;
      totalActualBasis += actual;
    }

    const taxAtReported = Math.max(
      (totalProceeds - totalReportedBasis) * TAX_RATE,
      0
    );
    const taxAtActual = Math.max(
      (totalProceeds - totalActualBasis) * TAX_RATE,
      0
    );
    const estimatedSavings = Math.max(taxAtReported - taxAtActual, 0);

    setResults({
      totalProceeds,
      totalReportedBasis,
      totalActualBasis,
      taxAtReported,
      taxAtActual,
      estimatedSavings,
    });
    setShowResults(true);
  };

  /* ---------- render ---------- */

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ---- Header ---- */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-navy">
            Basis<span className="text-emerald">Guard</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate hover:text-charcoal transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* ---- Page heading ---- */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block bg-emerald/10 text-emerald-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Free Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
            1099-DA Cost Basis Calculator
          </h1>
          <p className="text-slate">
            See how much you could be overpaying on your crypto taxes because
            your 1099-DA is missing cost basis. Free, no sign-up required.
          </p>
        </div>

        {/* ---- Calculator Card ---- */}
        <div className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="border-b border-gray-200 px-6 sm:px-8 py-5">
            <h2 className="text-lg font-semibold text-charcoal">
              Enter Your Transactions
            </h2>
            <p className="text-sm text-slate mt-1">
              Add the crypto sales from your 1099-DA. We&apos;ll calculate the
              tax difference between reported and actual cost basis.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {transactions.map((tx, idx) => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                index={idx}
                total={transactions.length}
                onChange={updateField}
                onRemove={removeTransaction}
              />
            ))}

            {/* Add + Calculate buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={addTransaction}
                className="inline-flex items-center gap-1.5 rounded-btn border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Transaction
              </button>

              <button
                type="button"
                onClick={calculate}
                className="inline-flex items-center gap-2 rounded-btn bg-emerald px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                  <line x1="8" y1="18" x2="12" y2="18" />
                </svg>
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* ---- Results Card ---- */}
        {showResults && results && (
          <div className="bg-white rounded-card shadow-card overflow-hidden animate-fade-in">
            <div className="border-b border-gray-200 px-6 sm:px-8 py-5">
              <h2 className="text-lg font-semibold text-charcoal">
                Your Results
              </h2>
              <p className="text-sm text-slate mt-1">
                Based on a {(TAX_RATE * 100).toFixed(0)}% short-term capital
                gains tax rate.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Summary grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard
                  label="Total Proceeds"
                  value={fmt(results.totalProceeds)}
                  color="charcoal"
                />
                <SummaryCard
                  label="Reported Basis (1099-DA)"
                  value={fmt(results.totalReportedBasis)}
                  color="danger"
                  sub={
                    results.totalReportedBasis === 0
                      ? "Your 1099-DA shows $0"
                      : undefined
                  }
                />
                <SummaryCard
                  label="Actual Cost Basis"
                  value={fmt(results.totalActualBasis)}
                  color="emerald"
                />
              </div>

              {/* Tax comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-danger/30 rounded-card p-5 bg-danger/5">
                  <h4 className="font-semibold text-danger mb-1 text-sm">
                    Tax at Reported Basis
                  </h4>
                  <p className="text-2xl font-bold font-mono text-danger">
                    {fmt(results.taxAtReported)}
                  </p>
                  <p className="text-xs text-slate mt-1">
                    What the IRS expects if you don&apos;t correct your basis
                  </p>
                </div>
                <div className="border-2 border-emerald/30 rounded-card p-5 bg-emerald/5">
                  <h4 className="font-semibold text-emerald-dark mb-1 text-sm">
                    Tax at Actual Basis
                  </h4>
                  <p className="text-2xl font-bold font-mono text-emerald-dark">
                    {fmt(results.taxAtActual)}
                  </p>
                  <p className="text-xs text-slate mt-1">
                    What you should actually owe
                  </p>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="rounded-card bg-navy p-6 text-center">
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Estimated Tax Savings
                </p>
                <p className="text-4xl font-bold font-mono text-emerald">
                  {fmt(results.estimatedSavings)}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  That&apos;s how much you could save by reporting your actual
                  cost basis on Form 8949.
                </p>
              </div>

              {/* Visual comparison bar */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-charcoal">
                  Tax Comparison
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate mb-1">
                      <span>Tax at reported basis (1099-DA)</span>
                      <span className="font-mono font-semibold text-danger">
                        {fmt(results.taxAtReported)}
                      </span>
                    </div>
                    <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-danger/70 rounded-full transition-all duration-700"
                        style={{
                          width: `${pct(
                            results.taxAtReported,
                            results.taxAtReported
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate mb-1">
                      <span>Tax at actual basis</span>
                      <span className="font-mono font-semibold text-emerald-dark">
                        {fmt(results.taxAtActual)}
                      </span>
                    </div>
                    <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald/70 rounded-full transition-all duration-700"
                        style={{
                          width: `${pct(
                            results.taxAtActual,
                            results.taxAtReported
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- CTA Section ---- */}
        <div className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="p-6 sm:p-10 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 mx-auto">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy">
              Want the Full Analysis?
            </h2>
            <p className="text-slate max-w-lg mx-auto text-sm">
              Upload your actual 1099-DA and exchange history. BasisGuard
              analyzes all your transactions, compares FIFO / LIFO / HIFO
              methods, and generates a corrected IRS Form 8949 — so you only pay
              what you actually owe.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-btn bg-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
            >
              Upload Your 1099-DA for Free
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ---- SEO Content ---- */}
        <div className="bg-white rounded-card shadow-card p-8 sm:p-12">
          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-navy mt-0 mb-3">
                How This Calculator Works
              </h2>
              <p>
                When you sell cryptocurrency, your taxable gain equals the sale
                proceeds minus your cost basis (what you originally paid for the
                asset). If your 1099-DA shows a cost basis of $0 — which is
                extremely common for the 2025 tax year — the IRS treats your{" "}
                <strong>entire sale amount</strong> as taxable gain.
              </p>
              <p className="mt-3">
                This calculator lets you enter the proceeds from your 1099-DA
                alongside your actual purchase price. It then computes the tax
                at both the reported ($0) basis and your real basis, showing you
                the difference — the amount you would overpay if you filed
                without correcting the basis.
              </p>
              <p className="mt-3">
                The calculation uses a default{" "}
                <strong>24% short-term capital gains rate</strong> (the marginal
                rate for most crypto traders). Your actual rate depends on your
                total income and whether the gain is short-term or long-term.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                Why Is My 1099-DA Missing Cost Basis?
              </h2>
              <p>
                The IRS Form 1099-DA is new for the 2025 tax year. Under the
                current regulations, crypto brokers are required to report{" "}
                <strong>gross proceeds</strong> from your sales, but they are{" "}
                <strong>not required to report cost basis</strong> for digital
                assets acquired before January 1, 2026. That means most
                exchanges — including Coinbase, Kraken, and Gemini — will either
                leave the cost basis field blank or show $0.
              </p>
              <p className="mt-3">
                There are several common reasons your cost basis may be missing:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Transferred assets:</strong> You bought crypto on one
                  exchange and moved it to another before selling. The selling
                  exchange has no record of your original purchase price.
                </li>
                <li>
                  <strong>Wallet transfers:</strong> You stored crypto in a
                  hardware or software wallet (Ledger, MetaMask, etc.) and later
                  sent it to an exchange to sell.
                </li>
                <li>
                  <strong>Regulatory phase-in:</strong> Even for assets bought
                  and sold on the same exchange, brokers are not required to
                  report basis for the 2025 tax year. Full cost basis reporting
                  is expected to begin in 2026 or later.
                </li>
                <li>
                  <strong>DeFi and airdrops:</strong> Tokens received through
                  decentralized protocols, airdrops, forks, or staking rewards
                  may have basis that no centralized broker can track.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mt-8 mb-3">
                What Happens If I File Without Correcting My Basis?
              </h2>
              <p>
                If you accept the $0 cost basis from your 1099-DA and file your
                taxes as-is, you will pay capital gains tax on the{" "}
                <strong>full sale amount</strong> — not just your actual profit.
                For example, if you sold 1 BTC for $85,000 and your real
                purchase price was $42,000, filing without correction means
                paying tax on $85,000 of &quot;gain&quot; instead of $43,000.
                At a 24% rate, that is an overpayment of{" "}
                <strong>$10,080</strong>.
              </p>
              <p className="mt-3">
                The IRS allows you to report your actual cost basis on{" "}
                <strong>Form 8949</strong> using adjustment code &quot;B.&quot;
                This is standard procedure and completely legal. BasisGuard
                automates this process by matching your 1099-DA transactions
                with your real purchase history and generating the corrected
                Form 8949.
              </p>
            </section>
          </div>
        </div>

        {/* ---- Disclaimer ---- */}
        <div className="text-center text-xs text-slate max-w-2xl mx-auto pb-8">
          <p>
            <strong>Disclaimer:</strong> This calculator provides estimates for
            informational purposes only and does not constitute tax, legal, or
            financial advice. Your actual tax liability depends on your total
            income, filing status, holding periods, and applicable state taxes.
            Consult a qualified tax professional for advice specific to your
            situation.
          </p>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TransactionRow({
  tx,
  index,
  total,
  onChange,
  onRemove,
}: {
  tx: Transaction;
  index: number;
  total: number;
  onChange: (id: string, field: keyof Transaction, value: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="relative rounded-card border border-gray-200 p-4 sm:p-5 bg-gray-50/50">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate uppercase tracking-wider">
          Transaction {index + 1}
        </span>
        {total > 1 && (
          <button
            type="button"
            onClick={() => onRemove(tx.id)}
            className="text-slate hover:text-danger transition-colors"
            aria-label={`Remove transaction ${index + 1}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <InputField
          label="Asset"
          placeholder="BTC"
          value={tx.asset}
          onChange={(v) => onChange(tx.id, "asset", v)}
        />
        <InputField
          label="Quantity Sold"
          placeholder="1"
          value={tx.quantity}
          onChange={(v) => onChange(tx.id, "quantity", v)}
          type="number"
        />
        <InputField
          label="Sale Proceeds ($)"
          placeholder="85,000"
          value={tx.saleProceeds}
          onChange={(v) => onChange(tx.id, "saleProceeds", v)}
          type="number"
        />
        <InputField
          label="Reported Basis ($)"
          placeholder="0"
          value={tx.reportedBasis}
          onChange={(v) => onChange(tx.id, "reportedBasis", v)}
          type="number"
          hint="From 1099-DA"
        />
        <InputField
          label="Actual Purchase Price ($)"
          placeholder="42,000"
          value={tx.actualBasis}
          onChange={(v) => onChange(tx.id, "actualBasis", v)}
          type="number"
          hint="What you paid"
        />
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  hint,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2 text-sm text-charcoal placeholder:text-gray-400 focus:border-emerald focus:ring-1 focus:ring-emerald outline-none transition-colors"
        step={type === "number" ? "any" : undefined}
        min={type === "number" ? "0" : undefined}
      />
      {hint && <p className="text-[11px] text-slate mt-0.5">{hint}</p>}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color: "charcoal" | "danger" | "emerald";
  sub?: string;
}) {
  const valueColor = {
    charcoal: "text-charcoal",
    danger: "text-danger",
    emerald: "text-emerald-dark",
  }[color];

  return (
    <div className="rounded-card border border-gray-200 p-4 text-center">
      <p className="text-xs font-medium text-slate mb-1">{label}</p>
      <p className={`text-xl font-bold font-mono ${valueColor}`}>{value}</p>
      {sub && <p className="text-[11px] text-danger mt-1">{sub}</p>}
    </div>
  );
}
