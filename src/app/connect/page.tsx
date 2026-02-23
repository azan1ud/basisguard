"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";
import FileUploadZone from "@/components/ui/FileUploadZone";

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

interface ConnectionState {
  connected: boolean;
  loading: boolean;
  apiKey: string;
  apiSecret: string;
}

export default function ConnectPage() {
  const [connections, setConnections] = useState<Record<string, ConnectionState>>(
    () => {
      const initial: Record<string, ConnectionState> = {};
      exchanges.forEach((ex) => {
        initial[ex.id] = {
          connected: false,
          loading: false,
          apiKey: "",
          apiSecret: "",
        };
      });
      return initial;
    }
  );

  const [csvUploaded, setCsvUploaded] = useState(false);

  const updateConnection = (id: string, updates: Partial<ConnectionState>) => {
    setConnections((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));
  };

  const handleOAuthConnect = async (exchangeId: string) => {
    updateConnection(exchangeId, { loading: true });
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateConnection(exchangeId, { connected: true, loading: false });
  };

  const handleApiKeyConnect = async (exchangeId: string) => {
    const conn = connections[exchangeId];
    if (!conn.apiKey.trim() || !conn.apiSecret.trim()) return;

    updateConnection(exchangeId, { loading: true });
    // Simulate API key validation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    updateConnection(exchangeId, { connected: true, loading: false });
  };

  const handleCsvUpload = () => {
    setCsvUploaded(true);
  };

  const anyConnected =
    Object.values(connections).some((c) => c.connected) || csvUploaded;

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
          {exchanges.map((exchange) => {
            const conn = connections[exchange.id];

            return (
              <div
                key={exchange.id}
                className={`
                  bg-white rounded-card shadow-card p-6 transition-shadow
                  ${conn.connected ? "ring-2 ring-emerald/30" : "hover:shadow-card-hover"}
                `}
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
                        ? "Connect with OAuth"
                        : "API Key Authentication"}
                    </p>
                  </div>
                  {conn.connected && (
                    <div className="flex items-center gap-1.5 text-emerald">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-xs font-semibold">Connected</span>
                    </div>
                  )}
                </div>

                {/* Connection form */}
                {!conn.connected && (
                  <div>
                    {exchange.authType === "oauth" ? (
                      <button
                        type="button"
                        onClick={() => handleOAuthConnect(exchange.id)}
                        disabled={conn.loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-btn bg-emerald px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {conn.loading ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
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
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                              <polyline points="10 17 15 12 10 7" />
                              <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Connect with OAuth
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor={`${exchange.id}-key`}
                            className="block text-xs font-medium text-charcoal mb-1"
                          >
                            API Key
                          </label>
                          <input
                            id={`${exchange.id}-key`}
                            type="text"
                            value={conn.apiKey}
                            onChange={(e) =>
                              updateConnection(exchange.id, { apiKey: e.target.value })
                            }
                            placeholder="Enter your API key"
                            className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2 text-sm text-charcoal font-mono placeholder:font-sans placeholder:text-slate/50 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`${exchange.id}-secret`}
                            className="block text-xs font-medium text-charcoal mb-1"
                          >
                            API Secret
                          </label>
                          <input
                            id={`${exchange.id}-secret`}
                            type="password"
                            value={conn.apiSecret}
                            onChange={(e) =>
                              updateConnection(exchange.id, {
                                apiSecret: e.target.value,
                              })
                            }
                            placeholder="Enter your API secret"
                            className="w-full rounded-btn border border-gray-300 bg-white px-3 py-2 text-sm text-charcoal font-mono placeholder:font-sans placeholder:text-slate/50 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApiKeyConnect(exchange.id)}
                          disabled={
                            conn.loading ||
                            !conn.apiKey.trim() ||
                            !conn.apiSecret.trim()
                          }
                          className="w-full inline-flex items-center justify-center gap-2 rounded-btn bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {conn.loading ? (
                            <>
                              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            "Connect"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Connected state content */}
                {conn.connected && (
                  <p className="text-xs text-slate">
                    Successfully connected. We will pull your transaction history during
                    the analysis step.
                  </p>
                )}
              </div>
            );
          })}
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
                  CSV uploaded successfully
                </p>
                <p className="text-xs text-slate mt-0.5">
                  Your transaction history will be included in the analysis.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <FileUploadZone accept="csv" onFileSelect={handleCsvUpload} />
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
