"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";
import FileUploadZone from "@/components/ui/FileUploadZone";
import { useApp } from "@/lib/context";
import { parseExchangeCSV } from "@/lib/exchanges/csv";

interface Exchange {
  id: string;
  name: string;
  initials: string;
  color: string;
  bgColor: string;
  authType: "oauth" | "apikey";
}

const exchanges: Exchange[] = [
  {
    id: "coinbase",
    name: "Coinbase",
    initials: "CB",
    color: "#1652F0",
    bgColor: "bg-blue-50",
    authType: "oauth",
  },
  {
    id: "kraken",
    name: "Kraken",
    initials: "KR",
    color: "#5741D9",
    bgColor: "bg-purple-50",
    authType: "apikey",
  },
  {
    id: "gemini",
    name: "Gemini",
    initials: "GE",
    color: "#00DCFA",
    bgColor: "bg-cyan-50",
    authType: "apikey",
  },
  {
    id: "binance",
    name: "Binance",
    initials: "BN",
    color: "#F3BA2F",
    bgColor: "bg-yellow-50",
    authType: "apikey",
  },
];

export default function ConnectPage() {
  const {
    connectedExchanges,
    exchangeHistory,
    addConnectedExchange,
    addExchangeHistory,
    confirmConnect,
  } = useApp();

  const [csvUploaded, setCsvUploaded] = useState(false);
  const [csvParseCount, setCsvParseCount] = useState(0);
  const [csvParseError, setCsvParseError] = useState<string | null>(null);

  const handleCsvUpload = (file: File) => {
    setCsvParseError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const transactions = parseExchangeCSV(text, "generic");

        if (transactions.length > 0) {
          addExchangeHistory(transactions);
          addConnectedExchange("CSV Upload");
          setCsvParseCount(transactions.length);
          setCsvUploaded(true);
        } else {
          setCsvParseError("No transactions found in the CSV file.");
        }
      } catch {
        setCsvParseError("Failed to parse the CSV file. Please check the format.");
      }
    };
    reader.onerror = () => {
      setCsvParseError("Failed to read the CSV file.");
    };
    reader.readAsText(file);
  };

  // Enable continue when at least one exchange is connected or CSV history exists
  const anyConnected =
    connectedExchanges.length > 0 || exchangeHistory.length > 0;

  const handleContinue = () => {
    confirmConnect();
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/upload"
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
              Back to Upload
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
        <StepIndicator currentStep={2} />
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
            Connect Your Exchange
          </h1>
          <p className="mt-2 text-sm text-slate max-w-lg mx-auto">
            Connect your exchange accounts so we can pull your actual transaction
            history and calculate your true cost basis.
          </p>
        </div>

        {/* Exchange cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className="bg-white rounded-card shadow-card p-6 transition-shadow hover:shadow-card-hover"
              >
                {/* Exchange header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center rounded-card text-sm font-bold
                      ${exchange.bgColor}
                    `}
                    style={{ color: exchange.color }}
                  >
                    {exchange.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-charcoal">
                      {exchange.name}
                    </h3>
                    <p className="text-xs text-slate">
                      {exchange.authType === "oauth"
                        ? "OAuth Integration"
                        : "API Key Authentication"}
                    </p>
                  </div>
                </div>

                {/* Coming soon notice */}
                <div className="rounded-btn bg-gray-50 border border-gray-200 p-4 text-center">
                  <p className="text-sm font-medium text-slate">Coming Soon</p>
                  <p className="text-xs text-slate/70 mt-1">
                    Direct {exchange.name} integration is under development. Use CSV upload below for now.
                  </p>
                </div>
              </div>
          ))}
        </div>

        {/* CSV Upload section */}
        <div className="mt-8 bg-white rounded-card shadow-card p-6 sm:p-8">
          <div className="text-center mb-5">
            <h3 className="text-base font-semibold text-charcoal">
              Don&apos;t see your exchange?
            </h3>
            <p className="mt-1 text-sm text-slate">
              Upload a CSV of your transaction history from any exchange.
            </p>
          </div>

          {csvUploaded ? (
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
                  CSV uploaded successfully - {csvParseCount} transactions parsed
                </p>
                <p className="text-xs text-slate mt-0.5">
                  Your transaction history will be included in the analysis.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <FileUploadZone accept="csv" onFileSelect={handleCsvUpload} />
              {csvParseError && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  {csvParseError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-btn border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors"
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
          <Link
            href="/analysis"
            onClick={anyConnected ? handleContinue : undefined}
            className={`
              inline-flex items-center gap-2 rounded-btn px-6 py-3 text-sm font-semibold transition-colors
              ${
                anyConnected
                  ? "bg-emerald text-white hover:bg-emerald-dark"
                  : "bg-gray-200 text-slate cursor-not-allowed pointer-events-none"
              }
            `}
            aria-disabled={!anyConnected}
          >
            Continue to Analysis
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
