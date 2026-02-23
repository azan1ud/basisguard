// =============================================================================
// BasisGuard - Core Cost Basis Mismatch Detection Engine
// =============================================================================

import {
  Transaction1099DA,
  ExchangeTransaction,
  MismatchResult,
  AnalysisSummary,
  TaxLot,
  CostBasisMethod,
  MethodResult,
  WRAPPED_TOKEN_MAP,
  STABLECOIN_GROUPS,
  DEFAULT_SHORT_TERM_TAX_RATE,
  DEFAULT_LONG_TERM_TAX_RATE,
  MATCH_THRESHOLD_USD,
  DATE_MATCH_TOLERANCE_DAYS,
  AMOUNT_MATCH_TOLERANCE,
} from './types';

// =============================================================================
// Public API
// =============================================================================

/**
 * Main entry point: Analyze all 1099-DA transactions against exchange history
 * using a specific cost-basis method. Returns a full summary with per-method
 * breakdowns and a recommendation for the optimal method.
 */
export function analyzeMismatches(
  form1099Data: Transaction1099DA[],
  exchangeHistory: ExchangeTransaction[],
  method: CostBasisMethod = 'FIFO',
): AnalysisSummary {
  if (form1099Data.length === 0) {
    return buildEmptySummary();
  }

  // Run all three methods to compare
  const methodResults = compareAllMethods(form1099Data, exchangeHistory);

  // Determine the best method (highest total basis = lowest tax)
  const recommendedMethod = pickRecommendedMethod(methodResults);

  // Use the selected method for headline numbers
  const primary = methodResults[method];

  return {
    totalOverpayment: primary.totalOverpayment,
    totalTransactions: form1099Data.length,
    mismatchCount: primary.results.filter((r) => r.status === 'mismatch').length,
    matchCount: primary.results.filter((r) => r.status === 'match').length,
    missingCount: primary.results.filter((r) => r.status === 'missing').length,
    methodResults,
    recommendedMethod,
    analyzedAt: new Date(),
  };
}

// =============================================================================
// Transaction Matching
// =============================================================================

/**
 * For each 1099-DA sale, find the best-matching sell transaction in the
 * exchange history. Matches on: asset (including wrapped equivalents),
 * approximate date, and approximate amount.
 */
export function matchTransactions(
  form1099Data: Transaction1099DA[],
  exchangeHistory: ExchangeTransaction[],
): Map<string, ExchangeTransaction | null> {
  const matches = new Map<string, ExchangeTransaction | null>();
  const sells = exchangeHistory.filter((tx) => tx.type === 'sell');

  // Track which exchange transactions have already been consumed
  const usedExchangeTxIds = new Set<string>();

  for (const formTx of form1099Data) {
    let bestMatch: ExchangeTransaction | null = null;
    let bestScore = Infinity;

    for (const exTx of sells) {
      if (usedExchangeTxIds.has(exTx.id)) continue;

      // Asset must match (accounting for wrapped tokens)
      if (!assetsAreEquivalent(formTx.asset, exTx.asset)) continue;

      // Date proximity score (days apart)
      const daysDiff = Math.abs(daysBetween(formTx.saleDate, exTx.date));
      if (daysDiff > DATE_MATCH_TOLERANCE_DAYS) continue;

      // Proceeds proximity score (compare proceeds to exTx total value)
      const exTxValue = exTx.amount * exTx.price;
      const proceedsDiff = Math.abs(formTx.proceeds - exTxValue);
      const proceedsTolerance = formTx.proceeds * AMOUNT_MATCH_TOLERANCE;

      // If the quantity is known, also check amount match
      if (formTx.quantity !== undefined) {
        const amtDiff = Math.abs(formTx.quantity - exTx.amount);
        const amtTolerance = formTx.quantity * AMOUNT_MATCH_TOLERANCE;
        if (amtDiff > amtTolerance && proceedsDiff > proceedsTolerance) continue;
      } else if (proceedsDiff > proceedsTolerance + 50) {
        // Allow a small fixed buffer when no quantity is known
        continue;
      }

      // Composite score: lower is better
      const score = daysDiff * 100 + proceedsDiff;
      if (score < bestScore) {
        bestScore = score;
        bestMatch = exTx;
      }
    }

    if (bestMatch) {
      usedExchangeTxIds.add(bestMatch.id);
    }
    matches.set(formTx.id, bestMatch);
  }

  return matches;
}

// =============================================================================
// Tax Lot Construction
// =============================================================================

/**
 * Build tax lots from buy (and transfer_in) transactions. Each lot represents
 * an acquisition of an asset with a known cost basis. Returns lots sorted by
 * date for FIFO processing.
 */
export function buildTaxLots(
  exchangeHistory: ExchangeTransaction[],
): TaxLot[] {
  const buys = exchangeHistory.filter(
    (tx) => tx.type === 'buy' || tx.type === 'transfer_in',
  );

  const lots: TaxLot[] = buys.map((tx) => ({
    id: tx.id,
    asset: normalizeAsset(tx.asset),
    amount: tx.amount,
    price: tx.price,
    fee: tx.fee,
    date: new Date(tx.date),
    exchange: tx.exchange,
    remaining: tx.amount,
  }));

  // Sort ascending by date (FIFO order); callers can reverse for LIFO
  lots.sort((a, b) => a.date.getTime() - b.date.getTime());

  return lots;
}

// =============================================================================
// Cost Basis Calculation (per method)
// =============================================================================

/**
 * Given a sell transaction, consume tax lots using the specified method and
 * return the computed cost basis (total acquisition cost for the quantity sold).
 */
export function calculateBasis(
  sellAsset: string,
  sellAmount: number,
  sellDate: Date,
  lots: TaxLot[],
  method: CostBasisMethod,
): { basis: number; feeBasis: number; lotsUsed: TaxLot[] } {
  const normalized = normalizeAsset(sellAsset);

  // Filter lots for this asset that still have remaining quantity
  const available = lots.filter(
    (lot) => normalizeAsset(lot.asset) === normalized && lot.remaining > 0,
  );

  // Order lots based on method
  const ordered = orderLotsByMethod(available, method);

  let remaining = sellAmount;
  let basis = 0;
  let feeBasis = 0;
  const lotsUsed: TaxLot[] = [];

  for (const lot of ordered) {
    if (remaining <= 0) break;

    const consume = Math.min(lot.remaining, remaining);
    const fractionOfLot = consume / lot.amount;

    basis += consume * lot.price;
    feeBasis += lot.fee * fractionOfLot;

    lot.remaining -= consume;
    remaining -= consume;

    lotsUsed.push({ ...lot });
  }

  return { basis, feeBasis, lotsUsed };
}

// =============================================================================
// Edge Case Detection
// =============================================================================

export interface EdgeCaseFlag {
  transactionId: string;
  type: 'wrapped_token' | 'stablecoin_swap' | 'zero_basis' | 'transfer_only' | 'dust_amount';
  description: string;
}

/**
 * Detect edge cases that commonly cause 1099-DA mismatches:
 * - Wrapped token conversions (WETH<->ETH) reported as disposals
 * - Stablecoin-to-stablecoin swaps treated as taxable events
 * - Zero or missing cost basis on the 1099-DA
 * - Assets that only show transfer activity (no buy/sell)
 * - Dust amounts below $1
 */
export function detectEdgeCases(
  form1099Data: Transaction1099DA[],
  exchangeHistory: ExchangeTransaction[],
): EdgeCaseFlag[] {
  const flags: EdgeCaseFlag[] = [];

  for (const tx of form1099Data) {
    // Zero or missing basis
    if (tx.reportedBasis === 0 || tx.reportedBasis === undefined) {
      flags.push({
        transactionId: tx.id,
        type: 'zero_basis',
        description: `Broker reported $0 basis for ${tx.asset} sale of $${tx.proceeds.toFixed(2)}. This is commonly incorrect if the asset was acquired on the same exchange.`,
      });
    }

    // Wrapped token disposal
    const canonical = WRAPPED_TOKEN_MAP[tx.asset.toUpperCase()];
    if (canonical) {
      flags.push({
        transactionId: tx.id,
        type: 'wrapped_token',
        description: `${tx.asset} is a wrapped version of ${canonical}. Wrapping/unwrapping is generally not a taxable event; verify this sale is a true disposal.`,
      });
    }

    // Stablecoin swap detection
    if (isStablecoin(tx.asset)) {
      flags.push({
        transactionId: tx.id,
        type: 'stablecoin_swap',
        description: `${tx.asset} is a stablecoin. If this was swapped for another stablecoin, the gain/loss is likely negligible. Review whether reporting is correct.`,
      });
    }

    // Dust amount
    if (tx.proceeds < 1.0) {
      flags.push({
        transactionId: tx.id,
        type: 'dust_amount',
        description: `Proceeds of $${tx.proceeds.toFixed(4)} are negligible dust. Consider whether this needs to be reported.`,
      });
    }
  }

  // Transfer-only assets: assets that appear in 1099-DA but have no buys
  const assetsWithBuys = new Set(
    exchangeHistory
      .filter((tx) => tx.type === 'buy')
      .map((tx) => normalizeAsset(tx.asset)),
  );

  for (const tx of form1099Data) {
    const norm = normalizeAsset(tx.asset);
    if (!assetsWithBuys.has(norm)) {
      // Check if there are at least transfer_in records
      const hasTransfer = exchangeHistory.some(
        (ex) => ex.type === 'transfer_in' && normalizeAsset(ex.asset) === norm,
      );
      if (hasTransfer) {
        flags.push({
          transactionId: tx.id,
          type: 'transfer_only',
          description: `${tx.asset} was only transferred in, never purchased on a connected exchange. Basis must be determined from the originating exchange or wallet.`,
        });
      }
    }
  }

  return flags;
}

// =============================================================================
// Multi-Method Comparison
// =============================================================================

/**
 * Run all three cost-basis methods and return detailed results for each.
 */
export function compareAllMethods(
  form1099Data: Transaction1099DA[],
  exchangeHistory: ExchangeTransaction[],
): Record<CostBasisMethod, MethodResult> {
  const methods: CostBasisMethod[] = ['FIFO', 'LIFO', 'HIFO'];
  const results = {} as Record<CostBasisMethod, MethodResult>;

  for (const method of methods) {
    results[method] = runSingleMethod(form1099Data, exchangeHistory, method);
  }

  return results;
}

// =============================================================================
// Tax Impact Calculation
// =============================================================================

/**
 * Calculate the tax impact of a discrepancy.
 *
 * If the 1099-DA shows $0 basis, the IRS assumes:
 *   tax = (proceeds - 0) * rate
 * But the correct tax should be:
 *   tax = (proceeds - actualBasis) * rate
 *
 * The overpayment is the difference.
 */
export function calculateTaxImpact(
  proceeds: number,
  reportedBasis: number,
  actualBasis: number,
  saleDate: Date,
  acquisitionDate?: Date,
): number {
  const rate = determineApplicableRate(saleDate, acquisitionDate);

  const taxWithReportedBasis = Math.max(0, (proceeds - reportedBasis) * rate);
  const taxWithActualBasis = Math.max(0, (proceeds - actualBasis) * rate);

  // Positive value means overpayment (taxpayer pays too much with reported basis)
  return taxWithReportedBasis - taxWithActualBasis;
}

// =============================================================================
// Internal Helpers
// =============================================================================

function runSingleMethod(
  form1099Data: Transaction1099DA[],
  exchangeHistory: ExchangeTransaction[],
  method: CostBasisMethod,
): MethodResult {
  // Build fresh tax lots (deep copy so each method starts clean)
  const lots = buildTaxLots(exchangeHistory);

  // Match 1099-DA entries to exchange sells
  const matchMap = matchTransactions(form1099Data, exchangeHistory);

  // Process sells in chronological order
  const sortedForm = [...form1099Data].sort(
    (a, b) => new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime(),
  );

  const mismatchResults: MismatchResult[] = [];
  let totalBasis = 0;
  let totalTaxOwed = 0;
  let totalOverpayment = 0;

  for (const formTx of sortedForm) {
    const matched = matchMap.get(formTx.id);

    if (!matched) {
      // No matching exchange transaction found
      mismatchResults.push({
        transaction: formTx,
        reportedBasis: formTx.reportedBasis,
        actualBasis: 0,
        discrepancy: formTx.reportedBasis,
        taxImpact: 0,
        status: 'missing',
        notes: 'No matching sell transaction found in exchange records.',
      });
      continue;
    }

    // Calculate actual cost basis from tax lots
    const sellAmount = matched.amount;
    const { basis, feeBasis } = calculateBasis(
      matched.asset,
      sellAmount,
      new Date(matched.date),
      lots,
      method,
    );

    const actualBasis = basis + feeBasis;
    const discrepancy = Math.abs(formTx.reportedBasis - actualBasis);

    // Determine status
    let status: MismatchResult['status'];
    if (discrepancy <= MATCH_THRESHOLD_USD) {
      status = 'match';
    } else {
      status = 'mismatch';
    }

    const taxImpact = calculateTaxImpact(
      formTx.proceeds,
      formTx.reportedBasis,
      actualBasis,
      new Date(formTx.saleDate),
      undefined, // Could be improved by tracking acquisition date
    );

    totalBasis += actualBasis;
    totalTaxOwed += Math.max(0, (formTx.proceeds - actualBasis) * DEFAULT_SHORT_TERM_TAX_RATE);
    if (taxImpact > 0) {
      totalOverpayment += taxImpact;
    }

    mismatchResults.push({
      transaction: formTx,
      reportedBasis: formTx.reportedBasis,
      actualBasis,
      discrepancy,
      taxImpact,
      status,
      matchedTransaction: matched,
      notes: status === 'mismatch'
        ? `Basis differs by $${discrepancy.toFixed(2)}. Reported: $${formTx.reportedBasis.toFixed(2)}, Calculated: $${actualBasis.toFixed(2)} (${method}).`
        : undefined,
    });
  }

  return {
    method,
    totalBasis,
    totalTaxOwed,
    totalOverpayment,
    results: mismatchResults,
  };
}

function pickRecommendedMethod(
  methodResults: Record<CostBasisMethod, MethodResult>,
): CostBasisMethod {
  // Recommend the method with the highest total basis (lowest tax liability)
  let best: CostBasisMethod = 'FIFO';
  let highestBasis = -Infinity;

  for (const method of ['FIFO', 'LIFO', 'HIFO'] as CostBasisMethod[]) {
    if (methodResults[method].totalBasis > highestBasis) {
      highestBasis = methodResults[method].totalBasis;
      best = method;
    }
  }

  return best;
}

function orderLotsByMethod(lots: TaxLot[], method: CostBasisMethod): TaxLot[] {
  const copy = [...lots];
  switch (method) {
    case 'FIFO':
      // Already sorted ascending by date from buildTaxLots
      copy.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case 'LIFO':
      copy.sort((a, b) => b.date.getTime() - a.date.getTime());
      break;
    case 'HIFO':
      // Highest cost first (maximizes basis, minimizes gain)
      copy.sort((a, b) => b.price - a.price);
      break;
  }
  return copy;
}

function determineApplicableRate(
  saleDate: Date,
  acquisitionDate?: Date,
): number {
  if (!acquisitionDate) {
    // Conservative: assume short-term
    return DEFAULT_SHORT_TERM_TAX_RATE;
  }
  const holdingDays = daysBetween(acquisitionDate, saleDate);
  return holdingDays > 365 ? DEFAULT_LONG_TERM_TAX_RATE : DEFAULT_SHORT_TERM_TAX_RATE;
}

/** Normalize asset symbols: strip whitespace, uppercase, resolve wrapped tokens */
function normalizeAsset(asset: string): string {
  const upper = asset.trim().toUpperCase();
  return WRAPPED_TOKEN_MAP[upper] ?? upper;
}

/** Check if two asset symbols refer to the same underlying asset */
function assetsAreEquivalent(a: string, b: string): boolean {
  const normA = normalizeAsset(a);
  const normB = normalizeAsset(b);

  if (normA === normB) return true;

  // Check if both are stablecoins in the same group
  for (const group of STABLECOIN_GROUPS) {
    if (group.includes(normA) && group.includes(normB)) return true;
  }

  return false;
}

/** Check if an asset symbol is a stablecoin */
function isStablecoin(asset: string): boolean {
  const norm = normalizeAsset(asset);
  return STABLECOIN_GROUPS.some((group) => group.includes(norm));
}

/** Calculate the number of days between two dates */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86_400_000;
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / msPerDay,
  );
}

/** Build an empty summary when there are no transactions to analyze */
function buildEmptySummary(): AnalysisSummary {
  const emptyMethod: MethodResult = {
    method: 'FIFO',
    totalBasis: 0,
    totalTaxOwed: 0,
    totalOverpayment: 0,
    results: [],
  };

  return {
    totalOverpayment: 0,
    totalTransactions: 0,
    mismatchCount: 0,
    matchCount: 0,
    missingCount: 0,
    methodResults: {
      FIFO: { ...emptyMethod, method: 'FIFO' },
      LIFO: { ...emptyMethod, method: 'LIFO' },
      HIFO: { ...emptyMethod, method: 'HIFO' },
    },
    recommendedMethod: 'FIFO',
    analyzedAt: new Date(),
  };
}
