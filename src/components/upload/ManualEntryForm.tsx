"use client";

import { useState } from "react";
import type { Transaction1099DA } from "./ParsedDataTable";

const ASSET_OPTIONS = [
  "BTC",
  "ETH",
  "SOL",
  "ADA",
  "DOT",
  "AVAX",
  "MATIC",
  "LINK",
  "UNI",
  "XRP",
  "DOGE",
  "SHIB",
  "LTC",
  "OTHER",
];

interface ManualEntryFormProps {
  onAddTransaction: (transaction: Transaction1099DA) => void;
  transactions: Transaction1099DA[];
  onRemoveTransaction: (id: string) => void;
}

export default function ManualEntryForm({
  onAddTransaction,
  transactions,
  onRemoveTransaction,
}: ManualEntryFormProps) {
  const [asset, setAsset] = useState("BTC");
  const [saleDate, setSaleDate] = useState("");
  const [grossProceeds, setGrossProceeds] = useState("");
  const [reportedBasis, setReportedBasis] = useState("");
  const [broker, setBroker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!asset || !saleDate || !grossProceeds) return;

    const transaction: Transaction1099DA = {
      id: crypto.randomUUID(),
      asset,
      saleDate,
      grossProceeds: parseFloat(grossProceeds) || 0,
      reportedBasis: parseFloat(reportedBasis) || 0,
      broker,
    };

    onAddTransaction(transaction);

    // Reset form
    setSaleDate("");
    setGrossProceeds("");
    setReportedBasis("");
    setBroker("");
  };

  const formatCurrency = (val: number): string => {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Entry form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Asset */}
          <div>
            <label
              htmlFor="manual-asset"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Asset
            </label>
            <select
              id="manual-asset"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            >
              {ASSET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sale Date */}
          <div>
            <label
              htmlFor="manual-sale-date"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Sale Date
            </label>
            <input
              id="manual-sale-date"
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              required
              className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          {/* Gross Proceeds */}
          <div>
            <label
              htmlFor="manual-proceeds"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Gross Proceeds ($)
            </label>
            <input
              id="manual-proceeds"
              type="number"
              step="0.01"
              min="0"
              value={grossProceeds}
              onChange={(e) => setGrossProceeds(e.target.value)}
              required
              placeholder="0.00"
              className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal font-mono focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          {/* Reported Basis */}
          <div>
            <label
              htmlFor="manual-basis"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Reported Basis ($)
            </label>
            <input
              id="manual-basis"
              type="number"
              step="0.01"
              min="0"
              value={reportedBasis}
              onChange={(e) => setReportedBasis(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal font-mono focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          {/* Broker */}
          <div>
            <label
              htmlFor="manual-broker"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              Broker
            </label>
            <input
              id="manual-broker"
              type="text"
              value={broker}
              onChange={(e) => setBroker(e.target.value)}
              placeholder="e.g., Coinbase"
              className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-btn bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors"
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
          </div>
        </div>
      </form>

      {/* Added transactions list */}
      {transactions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-charcoal">
            Added Transactions ({transactions.length})
          </h4>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                    Asset
                  </th>
                  <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                    Sale Date
                  </th>
                  <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                    Gross Proceeds
                  </th>
                  <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                    Reported Basis
                  </th>
                  <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                    Broker
                  </th>
                  <th className="pb-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 pr-4 font-medium">{tx.asset}</td>
                    <td className="py-2 pr-4">{tx.saleDate}</td>
                    <td className="py-2 pr-4 font-mono">{formatCurrency(tx.grossProceeds)}</td>
                    <td className="py-2 pr-4 font-mono">{formatCurrency(tx.reportedBasis)}</td>
                    <td className="py-2 pr-4">{tx.broker}</td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => onRemoveTransaction(tx.id)}
                        className="rounded-btn p-1.5 text-slate hover:text-danger hover:bg-danger/10 transition-colors"
                        aria-label={`Remove ${tx.asset} transaction`}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-card border border-gray-200 bg-white p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-charcoal">{tx.asset}</span>
                    <span className="text-xs text-slate">{tx.saleDate}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className="font-mono text-charcoal">
                      {formatCurrency(tx.grossProceeds)}
                    </span>
                    {tx.broker && (
                      <span className="text-slate">{tx.broker}</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveTransaction(tx.id)}
                  className="shrink-0 ml-2 rounded-btn p-1.5 text-slate hover:text-danger hover:bg-danger/10 transition-colors"
                  aria-label={`Remove ${tx.asset} transaction`}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
