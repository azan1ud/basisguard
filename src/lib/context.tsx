"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import {
  Transaction1099DA,
  ExchangeTransaction,
  AnalysisSummary,
  CostBasisMethod,
  UserSession,
} from "./types";
import { analyzeMismatches } from "./costBasisEngine";
import {
  onAuthChange,
  signInWithGoogle,
  signOut,
  getUserSession,
  saveAnalysisResults,
  getAnalysisResults,
} from "./firebase";
import type { User } from "firebase/auth";

// =============================================================================
// Serialization Helpers (Date <-> ISO string for Firestore)
// =============================================================================

function serializeDates<T>(obj: T): unknown {
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
}

const DATE_FIELDS = new Set(["saleDate", "date", "analyzedAt"]);

function hydrateDates<T>(obj: T): unknown {
  if (Array.isArray(obj)) return obj.map(hydrateDates);
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (DATE_FIELDS.has(k) && typeof v === "string") {
        out[k] = new Date(v);
      } else {
        out[k] = hydrateDates(v);
      }
    }
    return out;
  }
  return obj;
}

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

  // Auth
  firebaseUser: User | null;
  authLoading: boolean;
  userSession: UserSession | null;
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

  // Auth
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;

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
  firebaseUser: null,
  authLoading: true,
  userSession: null,
};

// =============================================================================
// Context
// =============================================================================

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const prevStateRef = useRef<AppState>(defaultState);

  // -------------------------------------------------------------------------
  // Auth listener — runs once on mount
  // -------------------------------------------------------------------------
  useEffect(() => {
    const unsub = onAuthChange(async (user) => {
      if (user) {
        // Fetch user session + draft from Firestore
        const [session, draftRaw] = await Promise.all([
          getUserSession(user.uid).catch(() => null),
          getAnalysisResults(user.uid, "draft").catch(() => null),
        ]);

        setState((prev) => {
          // Hydrate draft into state if we have one and local state is empty
          if (draftRaw && prev.form1099Data.length === 0) {
            const draft = hydrateDates(draftRaw) as Record<string, unknown>;
            return {
              ...prev,
              firebaseUser: user,
              authLoading: false,
              userSession: session,
              form1099Data: (draft.form1099Data as Transaction1099DA[]) ?? [],
              uploadConfirmed: (draft.uploadConfirmed as boolean) ?? false,
              exchangeHistory: (draft.exchangeHistory as ExchangeTransaction[]) ?? [],
              connectedExchanges: (draft.connectedExchanges as string[]) ?? [],
              connectConfirmed: (draft.connectConfirmed as boolean) ?? false,
              analysisSummary: (draft.analysisSummary as AnalysisSummary | null) ?? null,
              selectedMethod: (draft.selectedMethod as CostBasisMethod) ?? "HIFO",
              isPaid: (draft.isPaid as boolean) ?? false,
              stripeSessionId: (draft.stripeSessionId as string | null) ?? null,
            };
          }
          return { ...prev, firebaseUser: user, authLoading: false, userSession: session };
        });
      } else {
        setState((prev) => ({
          ...prev,
          firebaseUser: null,
          authLoading: false,
          userSession: null,
        }));
      }
    });
    return unsub;
  }, []);

  // -------------------------------------------------------------------------
  // Firestore persistence — save on key transitions
  // -------------------------------------------------------------------------
  useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;

    // Only persist when signed in
    if (!state.firebaseUser) return;
    const uid = state.firebaseUser.uid;

    const uploadJustConfirmed = state.uploadConfirmed && !prev.uploadConfirmed;
    const connectJustConfirmed = state.connectConfirmed && !prev.connectConfirmed;
    const analysisJustCompleted =
      state.analysisSummary !== null && prev.analysisSummary === null;
    const paymentJustCompleted = state.isPaid && !prev.isPaid;

    const shouldSaveDraft =
      uploadJustConfirmed || connectJustConfirmed || analysisJustCompleted;

    if (shouldSaveDraft) {
      const payload = serializeDates({
        form1099Data: state.form1099Data,
        uploadConfirmed: state.uploadConfirmed,
        exchangeHistory: state.exchangeHistory,
        connectedExchanges: state.connectedExchanges,
        connectConfirmed: state.connectConfirmed,
        analysisSummary: state.analysisSummary,
        selectedMethod: state.selectedMethod,
        isPaid: state.isPaid,
        stripeSessionId: state.stripeSessionId,
      }) as Record<string, unknown>;

      saveAnalysisResults(uid, "draft", payload).catch(console.error);
    }

    if (paymentJustCompleted) {
      const docId = `analysis-${Date.now()}`;
      const payload = serializeDates({
        form1099Data: state.form1099Data,
        uploadConfirmed: state.uploadConfirmed,
        exchangeHistory: state.exchangeHistory,
        connectedExchanges: state.connectedExchanges,
        connectConfirmed: state.connectConfirmed,
        analysisSummary: state.analysisSummary,
        selectedMethod: state.selectedMethod,
        isPaid: state.isPaid,
        stripeSessionId: state.stripeSessionId,
        status: "complete",
      }) as Record<string, unknown>;

      saveAnalysisResults(uid, docId, payload).catch(console.error);
    }
  }, [state]);

  // -------------------------------------------------------------------------
  // Step 1: Upload
  // -------------------------------------------------------------------------
  const setForm1099Data = useCallback((data: Transaction1099DA[]) => {
    setState((prev) => ({ ...prev, form1099Data: data, uploadConfirmed: false }));
  }, []);

  const confirmUpload = useCallback(() => {
    setState((prev) => ({ ...prev, uploadConfirmed: true }));
  }, []);

  // -------------------------------------------------------------------------
  // Step 2: Connect
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Step 3: Analysis
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Step 4: Payment
  // -------------------------------------------------------------------------
  const markPaid = useCallback((sessionId: string) => {
    setState((prev) => ({ ...prev, isPaid: true, stripeSessionId: sessionId }));
  }, []);

  // -------------------------------------------------------------------------
  // Auth actions
  // -------------------------------------------------------------------------
  const signIn = useCallback(async () => {
    await signInWithGoogle();
    // Auth state listener above will pick up the user
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut();
    // Auth state listener above will clear the user
  }, []);

  // -------------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------------
  const resetAll = useCallback(() => {
    setState((prev) => ({
      ...defaultState,
      // Keep auth state across resets
      firebaseUser: prev.firebaseUser,
      authLoading: prev.authLoading,
      userSession: prev.userSession,
    }));
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
    signIn,
    signOutUser,
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
