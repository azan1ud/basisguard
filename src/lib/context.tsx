"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  Transaction1099DA,
  ExchangeTransaction,
  AnalysisSummary,
  CostBasisMethod,
} from "./types";
import { analyzeMismatches } from "./costBasisEngine";

// =============================================================================
// State Shape
// =============================================================================

interface AppState {
  // Step 1: Upload
  form1099Data: Transaction1099DA[];
  uploadConfirmed: boolean;

  // Step 2: Connect
  exchangeHistory: ExchangeTransaction[];
  connectedExchanges: string[];
  connectConfirmed: boolean;

  // Step 3: Analysis
  analysisSummary: AnalysisSummary | null;
  selectedMethod: CostBasisMethod;

  // Step 4: Payment
  isPaid: boolean;
  stripeSessionId: string | null;
}

interface AppActions {
  // Step 1
  setForm1099Data: (data: Transaction1099DA[]) => void;
  confirmUpload: () => void;

  // Step 2
  addExchangeHistory: (transactions: ExchangeTransaction[]) => void;
  addConnectedExchange: (exchange: string) => void;
  confirmConnect: () => void;

  // Step 3
  runAnalysis: () => void;
  setSelectedMethod: (method: CostBasisMethod) => void;

  // Step 4
  markPaid: (sessionId: string) => void;

  // Reset
  resetAll: () => void;
}

type AppContextType = AppState & AppActions;

// =============================================================================
// Default State
// =============================================================================

const defaultState: AppState = {
  form1099Data: [],
  uploadConfirmed: false,
  exchangeHistory: [],
  connectedExchanges: [],
  connectConfirmed: false,
  analysisSummary: null,
  selectedMethod: "HIFO",
  isPaid: false,
  stripeSessionId: null,
};

// =============================================================================
// Context
// =============================================================================

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  // Step 1: Upload
  const setForm1099Data = useCallback((data: Transaction1099DA[]) => {
    setState((prev) => ({ ...prev, form1099Data: data, uploadConfirmed: false }));
  }, []);

  const confirmUpload = useCallback(() => {
    setState((prev) => ({ ...prev, uploadConfirmed: true }));
  }, []);

  // Step 2: Connect
  const addExchangeHistory = useCallback((transactions: ExchangeTransaction[]) => {
    setState((prev) => ({
      ...prev,
      exchangeHistory: [...prev.exchangeHistory, ...transactions],
    }));
  }, []);

  const addConnectedExchange = useCallback((exchange: string) => {
    setState((prev) => ({
      ...prev,
      connectedExchanges: prev.connectedExchanges.includes(exchange)
        ? prev.connectedExchanges
        : [...prev.connectedExchanges, exchange],
    }));
  }, []);

  const confirmConnect = useCallback(() => {
    setState((prev) => ({ ...prev, connectConfirmed: true }));
  }, []);

  // Step 3: Analysis
  const runAnalysis = useCallback(() => {
    setState((prev) => {
      if (prev.form1099Data.length === 0) return prev;

      const summary = analyzeMismatches(
        prev.form1099Data,
        prev.exchangeHistory,
        prev.selectedMethod
      );

      return { ...prev, analysisSummary: summary };
    });
  }, []);

  const setSelectedMethod = useCallback((method: CostBasisMethod) => {
    setState((prev) => {
      // Re-run analysis with new method if we have data
      if (prev.form1099Data.length > 0) {
        const summary = analyzeMismatches(
          prev.form1099Data,
          prev.exchangeHistory,
          method
        );
        return { ...prev, selectedMethod: method, analysisSummary: summary };
      }
      return { ...prev, selectedMethod: method };
    });
  }, []);

  // Step 4: Payment
  const markPaid = useCallback((sessionId: string) => {
    setState((prev) => ({ ...prev, isPaid: true, stripeSessionId: sessionId }));
  }, []);

  // Reset
  const resetAll = useCallback(() => {
    setState(defaultState);
  }, []);

  const value: AppContextType = {
    ...state,
    setForm1099Data,
    confirmUpload,
    addExchangeHistory,
    addConnectedExchange,
    confirmConnect,
    runAnalysis,
    setSelectedMethod,
    markPaid,
    resetAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
