// =============================================================================
// BasisGuard - Core TypeScript Type Definitions
// =============================================================================

/** A single transaction as reported on IRS Form 1099-DA */
export interface Transaction1099DA {
  /** Internal unique identifier */
  id: string;
  /** Asset symbol (e.g. "BTC", "ETH") */
  asset: string;
  /** Gross proceeds from the sale in USD */
  proceeds: number;
  /** Cost basis as reported by the broker in USD (may be 0 or missing) */
  reportedBasis: number;
  /** Date the sale occurred */
  saleDate: Date;
  /** Name of the reporting broker (e.g. "Coinbase", "Kraken") */
  broker: string;
  /** Broker-assigned transaction identifier, if available */
  transactionId: string;
  /** Quantity of the asset sold */
  quantity?: number;
}

/** A transaction from an exchange's own records (CSV export or API) */
export interface ExchangeTransaction {
  /** Internal unique identifier */
  id: string;
  /** Asset symbol (e.g. "BTC", "ETH") */
  asset: string;
  /** Transaction type */
  type: 'buy' | 'sell' | 'transfer_in' | 'transfer_out';
  /** Quantity of the asset */
  amount: number;
  /** Price per unit in USD at time of transaction */
  price: number;
  /** Fee paid in USD */
  fee: number;
  /** Date and time of the transaction */
  date: Date;
  /** Exchange where the transaction occurred */
  exchange: string;
  /** Trading pair (e.g. "BTC-USD") */
  tradingPair?: string;
  /** Broker-assigned transaction ID */
  transactionId?: string;
}

/** The result of comparing a single 1099-DA transaction against exchange records */
export interface MismatchResult {
  /** The original 1099-DA transaction being analyzed */
  transaction: Transaction1099DA;
  /** Basis as reported on the 1099-DA */
  reportedBasis: number;
  /** Actual cost basis computed from exchange history */
  actualBasis: number;
  /** Dollar difference: reportedBasis - actualBasis */
  discrepancy: number;
  /** Estimated tax impact of the discrepancy (positive = overpayment) */
  taxImpact: number;
  /** Classification of the comparison outcome */
  status: 'match' | 'mismatch' | 'missing';
  /** The exchange transaction matched to this 1099-DA entry, if found */
  matchedTransaction?: ExchangeTransaction;
  /** Explanation of the mismatch or edge case, if any */
  notes?: string;
}

/** Cost basis calculation method */
export type CostBasisMethod = 'FIFO' | 'LIFO' | 'HIFO';

/** Results for a single cost basis method */
export interface MethodResult {
  method: CostBasisMethod;
  totalBasis: number;
  totalTaxOwed: number;
  totalOverpayment: number;
  results: MismatchResult[];
}

/** Full analysis summary across all methods */
export interface AnalysisSummary {
  /** Total estimated tax overpayment in USD (using recommended method) */
  totalOverpayment: number;
  /** Total number of 1099-DA transactions analyzed */
  totalTransactions: number;
  /** Number of transactions with a basis mismatch */
  mismatchCount: number;
  /** Number of transactions where basis matches */
  matchCount: number;
  /** Number of 1099-DA transactions with no matching exchange record */
  missingCount: number;
  /** Detailed results for each cost-basis method */
  methodResults: Record<CostBasisMethod, MethodResult>;
  /** The method that produces the highest basis (lowest tax) */
  recommendedMethod: CostBasisMethod;
  /** Timestamp of when the analysis was performed */
  analyzedAt: Date;
  /** Tax year being analyzed */
  taxYear?: number;
}

/** A single tax lot representing acquired crypto */
export interface TaxLot {
  /** Asset symbol */
  asset: string;
  /** Original quantity purchased */
  amount: number;
  /** Price per unit in USD at acquisition */
  price: number;
  /** Fee paid in USD for the acquisition */
  fee: number;
  /** Date the lot was acquired */
  date: Date;
  /** Exchange where the lot was acquired */
  exchange: string;
  /** Remaining quantity not yet sold from this lot */
  remaining: number;
  /** Unique identifier for tracing */
  id?: string;
}

// =============================================================================
// User & Session Types
// =============================================================================

export interface UserSession {
  /** Firebase user ID */
  uid: string;
  /** User email address */
  email: string;
  /** Display name */
  displayName?: string;
  /** Current pricing tier */
  tier: PricingTier;
  /** Whether the user has an active paid subscription */
  isPaid: boolean;
  /** Stripe customer ID, if applicable */
  stripeCustomerId?: string;
  /** ISO timestamp of session creation */
  createdAt: string;
  /** ISO timestamp of last activity */
  lastActiveAt: string;
}

export type PricingTier = 'free' | 'starter' | 'pro' | 'unlimited';

export interface PricingTierConfig {
  tier: PricingTier;
  name: string;
  maxTransactions: number;
  priceUsd: number;
  stripePriceId: string;
  features: string[];
}

// =============================================================================
// API & Exchange Types
// =============================================================================

export interface ExchangeCredentials {
  exchange: string;
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface ParsedPDFResult {
  transactions: Transaction1099DA[];
  broker: string;
  taxYear: number;
  rawPageCount: number;
  warnings: string[];
}

export interface CSVParseResult {
  transactions: ExchangeTransaction[];
  exchange: string;
  rowsParsed: number;
  rowsSkipped: number;
  warnings: string[];
}

// =============================================================================
// Edge Case / Token Mapping Types
// =============================================================================

/** Known equivalent tokens (wrapped, bridged, etc.) */
export interface TokenEquivalence {
  canonical: string;
  equivalents: string[];
}

/** Well-known stablecoin groupings */
export const STABLECOIN_GROUPS: string[][] = [
  ['USDC', 'USDT', 'DAI', 'BUSD', 'TUSD', 'USDP', 'GUSD', 'FRAX'],
];

/** Wrapped-to-native token mappings */
export const WRAPPED_TOKEN_MAP: Record<string, string> = {
  WETH: 'ETH',
  WBTC: 'BTC',
  WMATIC: 'MATIC',
  WAVAX: 'AVAX',
  WBNB: 'BNB',
  WSOL: 'SOL',
  stETH: 'ETH',
  rETH: 'ETH',
  cbETH: 'ETH',
};

// =============================================================================
// Constants
// =============================================================================

/** Default long-term capital gains tax rate used for impact estimation */
export const DEFAULT_LONG_TERM_TAX_RATE = 0.15;

/** Default short-term capital gains tax rate used for impact estimation */
export const DEFAULT_SHORT_TERM_TAX_RATE = 0.24;

/** Threshold in USD below which a discrepancy is considered a "match" */
export const MATCH_THRESHOLD_USD = 0.50;

/** Tolerance in days for matching sale dates between 1099-DA and exchange */
export const DATE_MATCH_TOLERANCE_DAYS = 2;

/** Tolerance as a fraction of amount for matching quantities (5%) */
export const AMOUNT_MATCH_TOLERANCE = 0.05;
