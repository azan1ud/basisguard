"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";
import FileUploadZone from "@/components/ui/FileUploadZone";
import ParsedDataTable, {
  type Transaction1099DA as TableTransaction,
} from "@/components/upload/ParsedDataTable";
import ManualEntryForm from "@/components/upload/ManualEntryForm";
import { useApp } from "@/lib/context";
import type { Transaction1099DA as CoreTransaction } from "@/lib/types";

type TabKey = "pdf" | "csv" | "manual";

const tabs: { key: TabKey; label: string }[] = [
  { key: "pdf", label: "Upload PDF" },
  { key: "csv", label: "Upload CSV" },
  { key: "manual", label: "Manual Entry" },
];

/**
 * Convert ParsedDataTable rows (string dates, grossProceeds) to core Transaction1099DA[]
 * (Date objects, proceeds field) for storage in shared context.
 */
function tableRowsToCoreData(rows: TableTransaction[]): CoreTransaction[] {
  return rows.map((row) => ({
    id: row.id,
    asset: row.asset,
    proceeds: row.grossProceeds,
    reportedBasis: row.reportedBasis,
    saleDate: new Date(row.saleDate),
    broker: row.broker,
    transactionId: "",
  }));
}

export default function UploadPage() {
  const {
    uploadConfirmed,
    setForm1099Data,
    confirmUpload,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabKey>("pdf");
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [parsedData, setParsedData] = useState<TableTransaction[] | null>(null);
  const [dataConfirmed, setDataConfirmed] = useState(false);

  const [isParsingCsv, setIsParsingCsv] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);
  const [csvData, setCsvData] = useState<TableTransaction[] | null>(null);
  const [csvConfirmed, setCsvConfirmed] = useState(false);

  const [manualTransactions, setManualTransactions] = useState<TableTransaction[]>([]);

  const handlePdfUpload = async (file: File) => {
    setIsParsingPdf(true);
    setPdfProgress(0);
    setParsedData(null);
    setDataConfirmed(false);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setPdfProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-1099", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      clearInterval(progressInterval);
      setPdfProgress(100);

      // Brief delay to show 100% before revealing data
      setTimeout(() => {
        setIsParsingPdf(false);
        setPdfProgress(0);
        // API response goes into the table as-is (string dates, grossProceeds naming)
        setParsedData(result.transactions);
      }, 400);
    } catch {
      clearInterval(progressInterval);
      setIsParsingPdf(false);
      setPdfProgress(0);
      // On error, use fallback sample data so the UI still works
      setParsedData(getSampleData());
    }
  };

  const handleCsvUpload = async (file: File) => {
    setIsParsingCsv(true);
    setCsvProgress(0);
    setCsvData(null);
    setCsvConfirmed(false);

    // Simulate CSV parsing with progress
    const progressInterval = setInterval(() => {
      setCsvProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 20;
      });
    }, 250);

    // Simulate parsing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearInterval(progressInterval);
    setCsvProgress(100);

    setTimeout(() => {
      setIsParsingCsv(false);
      setCsvProgress(0);
      // Parse CSV or use sample data
      parseCsvFile(file);
    }, 400);
  };

  const parseCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((l) => l.trim());
        if (lines.length < 2) {
          setCsvData(getSampleData());
          return;
        }

        const transactions: TableTransaction[] = lines.slice(1).map((line) => {
          const cols = line.split(",").map((c) => c.trim().replace(/"/g, ""));
          return {
            id: crypto.randomUUID(),
            asset: cols[0] || "BTC",
            saleDate: cols[1] || "2024-01-15",
            grossProceeds: parseFloat(cols[2]) || 0,
            reportedBasis: parseFloat(cols[3]) || 0,
            broker: cols[4] || "Unknown",
          };
        });

        setCsvData(transactions.length > 0 ? transactions : getSampleData());
      } catch {
        setCsvData(getSampleData());
      }
    };
    reader.onerror = () => {
      setCsvData(getSampleData());
    };
    reader.readAsText(file);
  };

  const handleManualAdd = (tx: TableTransaction) => {
    setManualTransactions((prev) => [...prev, tx]);
  };

  const handleManualRemove = (id: string) => {
    setManualTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * When the user clicks "Confirm Data" on the ParsedDataTable, convert the
   * table rows into the core Transaction1099DA[] type and push into context.
   */
  const handleConfirmData = (data: TableTransaction[]) => {
    // Convert table format to core format and store in shared context
    const coreData = tableRowsToCoreData(data);
    setForm1099Data(coreData);
    confirmUpload();

    if (activeTab === "pdf") {
      setParsedData(data);
      setDataConfirmed(true);
    } else if (activeTab === "csv") {
      setCsvData(data);
      setCsvConfirmed(true);
    }
  };

  /**
   * When manual transactions are confirmed (user has added entries and wants
   * to proceed), convert and push to context.
   */
  const handleConfirmManual = () => {
    const coreData = tableRowsToCoreData(manualTransactions);
    setForm1099Data(coreData);
    confirmUpload();
  };

  // The continue button is enabled when the shared context has confirmed data
  const hasData =
    uploadConfirmed ||
    (activeTab === "manual" && manualTransactions.length > 0);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-charcoal transition-colors"
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-btn bg-navy">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 3h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M6 8l1.5 1.5L10 6"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-navy">
                Basis<span className="text-emerald">Guard</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="py-8">
        <StepIndicator currentStep={1} />
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
            Upload Your 1099-DA
          </h1>
          <p className="mt-2 text-sm text-slate max-w-lg mx-auto">
            Upload your 1099-DA form from your broker, or enter your transaction data
            manually. We will parse the data and check for cost basis issues.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="bg-white rounded-card shadow-card overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Upload method tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    flex-1 py-3.5 px-4 text-sm font-medium text-center border-b-2 transition-colors
                    ${
                      activeTab === tab.key
                        ? "border-emerald text-emerald"
                        : "border-transparent text-slate hover:text-charcoal hover:border-gray-300"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* PDF Tab */}
            {activeTab === "pdf" && (
              <div className="space-y-6">
                <FileUploadZone
                  accept="pdf"
                  onFileSelect={handlePdfUpload}
                  isLoading={isParsingPdf}
                  progress={pdfProgress}
                />
                {parsedData && (
                  <div className="pt-2">
                    {dataConfirmed ? (
                      <div className="flex items-center gap-3 rounded-card bg-emerald/5 border border-emerald/20 p-4">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            Data confirmed - {parsedData.length} transactions
                          </p>
                          <p className="text-xs text-slate mt-0.5">
                            You can proceed to the next step.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ParsedDataTable
                        data={parsedData}
                        onConfirm={handleConfirmData}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* CSV Tab */}
            {activeTab === "csv" && (
              <div className="space-y-6">
                <FileUploadZone
                  accept="csv"
                  onFileSelect={handleCsvUpload}
                  isLoading={isParsingCsv}
                  progress={csvProgress}
                />
                {csvData && (
                  <div className="pt-2">
                    {csvConfirmed ? (
                      <div className="flex items-center gap-3 rounded-card bg-emerald/5 border border-emerald/20 p-4">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            Data confirmed - {csvData.length} transactions
                          </p>
                          <p className="text-xs text-slate mt-0.5">
                            You can proceed to the next step.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <ParsedDataTable
                        data={csvData}
                        onConfirm={handleConfirmData}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Manual Entry Tab */}
            {activeTab === "manual" && (
              <div className="space-y-6">
                <ManualEntryForm
                  onAddTransaction={handleManualAdd}
                  transactions={manualTransactions}
                  onRemoveTransaction={handleManualRemove}
                />
                {manualTransactions.length > 0 && !uploadConfirmed && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleConfirmManual}
                      className="inline-flex items-center justify-center rounded-btn bg-emerald px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
                    >
                      Confirm Data
                    </button>
                  </div>
                )}
                {uploadConfirmed && manualTransactions.length > 0 && (
                  <div className="flex items-center gap-3 rounded-card bg-emerald/5 border border-emerald/20 p-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        Data confirmed - {manualTransactions.length} transactions
                      </p>
                      <p className="text-xs text-slate mt-0.5">
                        You can proceed to the next step.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Continue button */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/connect"
            className={`
              inline-flex items-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold transition-colors
              ${
                hasData
                  ? "bg-emerald text-white hover:bg-emerald-dark"
                  : "bg-gray-200 text-slate cursor-not-allowed pointer-events-none"
              }
            `}
            aria-disabled={!hasData}
          >
            Continue to Connect Exchange
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
      </main>
    </div>
  );
}

/** Fallback sample data for when parsing fails or for demo purposes */
function getSampleData(): TableTransaction[] {
  return [
    {
      id: crypto.randomUUID(),
      asset: "BTC",
      saleDate: "2024-03-15",
      grossProceeds: 42350.0,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "ETH",
      saleDate: "2024-05-22",
      grossProceeds: 8920.5,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "SOL",
      saleDate: "2024-07-10",
      grossProceeds: 3150.75,
      reportedBasis: 0.0,
      broker: "Kraken",
    },
    {
      id: crypto.randomUUID(),
      asset: "BTC",
      saleDate: "2024-09-03",
      grossProceeds: 15800.0,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "ETH",
      saleDate: "2024-11-28",
      grossProceeds: 5430.25,
      reportedBasis: 0.0,
      broker: "Gemini",
    },
  ];
}
