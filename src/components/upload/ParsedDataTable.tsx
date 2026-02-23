"use client";

import { useState, useCallback } from "react";

export interface Transaction1099DA {
  id: string;
  asset: string;
  saleDate: string;
  grossProceeds: number;
  reportedBasis: number;
  broker: string;
}

interface ParsedDataTableProps {
  data: Transaction1099DA[];
  onConfirm: (data: Transaction1099DA[]) => void;
}

export default function ParsedDataTable({ data, onConfirm }: ParsedDataTableProps) {
  const [rows, setRows] = useState<Transaction1099DA[]>(data);
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: keyof Transaction1099DA;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCellClick = (rowId: string, field: keyof Transaction1099DA, value: string | number) => {
    if (field === "id") return;
    setEditingCell({ rowId, field });
    setEditValue(String(value));
  };

  const handleCellBlur = useCallback(() => {
    if (!editingCell) return;

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== editingCell.rowId) return row;
        const updated = { ...row };
        const field = editingCell.field;

        if (field === "grossProceeds" || field === "reportedBasis") {
          const num = parseFloat(editValue);
          if (!isNaN(num)) {
            updated[field] = num;
          }
        } else if (field !== "id") {
          (updated as Record<string, unknown>)[field] = editValue;
        }

        return updated;
      })
    );
    setEditingCell(null);
    setEditValue("");
  }, [editingCell, editValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCellBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
      setEditValue("");
    }
  };

  const addRow = () => {
    const newRow: Transaction1099DA = {
      id: crypto.randomUUID(),
      asset: "BTC",
      saleDate: new Date().toISOString().split("T")[0],
      grossProceeds: 0,
      reportedBasis: 0,
      broker: "",
    };
    setRows((prev) => [...prev, newRow]);
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const formatCurrency = (val: number): string => {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const renderCell = (
    row: Transaction1099DA,
    field: keyof Transaction1099DA,
    displayValue: string,
    isMono: boolean = false
  ) => {
    const isEditing = editingCell?.rowId === row.id && editingCell?.field === field;

    if (isEditing) {
      return (
        <input
          type={field === "grossProceeds" || field === "reportedBasis" ? "number" : "text"}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleCellBlur}
          onKeyDown={handleKeyDown}
          className="w-full rounded border border-emerald bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30"
          autoFocus
          step={field === "grossProceeds" || field === "reportedBasis" ? "0.01" : undefined}
        />
      );
    }

    return (
      <button
        type="button"
        onClick={() =>
          handleCellClick(
            row.id,
            field,
            field === "grossProceeds" || field === "reportedBasis"
              ? row[field]
              : row[field]
          )
        }
        className={`
          w-full text-left px-2 py-1 rounded hover:bg-gray-100 cursor-text transition-colors text-sm
          ${isMono ? "font-mono" : ""}
        `}
      >
        {displayValue}
      </button>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-charcoal">
          Parsed Transactions
        </h3>
        <span className="text-xs text-slate">
          Click any cell to edit
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                Asset
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                Sale Date
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                Gross Proceeds
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                Reported Basis
              </th>
              <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wider text-slate">
                Broker
              </th>
              <th className="pb-3 w-10 text-xs font-semibold uppercase tracking-wider text-slate">
                {/* Delete column */}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 pr-4">
                  {renderCell(row, "asset", row.asset)}
                </td>
                <td className="py-2 pr-4">
                  {renderCell(row, "saleDate", row.saleDate)}
                </td>
                <td className="py-2 pr-4">
                  {renderCell(row, "grossProceeds", formatCurrency(row.grossProceeds), true)}
                </td>
                <td className="py-2 pr-4">
                  {renderCell(row, "reportedBasis", formatCurrency(row.reportedBasis), true)}
                </td>
                <td className="py-2 pr-4">
                  {renderCell(row, "broker", row.broker)}
                </td>
                <td className="py-2">
                  <button
                    type="button"
                    onClick={() => deleteRow(row.id)}
                    className="rounded-btn p-1.5 text-slate hover:text-danger hover:bg-danger/10 transition-colors"
                    aria-label={`Delete row for ${row.asset}`}
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
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div
            key={row.id}
            className="bg-white rounded-card border border-gray-200 p-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-charcoal">{row.asset}</span>
              <button
                type="button"
                onClick={() => deleteRow(row.id)}
                className="rounded-btn p-1.5 text-slate hover:text-danger hover:bg-danger/10 transition-colors"
                aria-label={`Delete row for ${row.asset}`}
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
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-slate">Sale Date</span>
                <div>{renderCell(row, "saleDate", row.saleDate)}</div>
              </div>
              <div>
                <span className="text-xs text-slate">Broker</span>
                <div>{renderCell(row, "broker", row.broker)}</div>
              </div>
              <div>
                <span className="text-xs text-slate">Gross Proceeds</span>
                <div>{renderCell(row, "grossProceeds", formatCurrency(row.grossProceeds), true)}</div>
              </div>
              <div>
                <span className="text-xs text-slate">Reported Basis</span>
                <div>{renderCell(row, "reportedBasis", formatCurrency(row.reportedBasis), true)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center justify-center gap-2 rounded-btn border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors"
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
          Add Row
        </button>
        <button
          type="button"
          onClick={() => onConfirm(rows)}
          className="inline-flex items-center justify-center rounded-btn bg-emerald px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
        >
          Confirm Data
        </button>
      </div>
    </div>
  );
}
