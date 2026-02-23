// =============================================================================
// BasisGuard - Exchange CSV Parser
// =============================================================================

import { v4 as uuidv4 } from 'uuid';
import { ExchangeTransaction, CSVParseResult } from '../types';

// =============================================================================
// Public API
// =============================================================================

/**
 * Parse a CSV export from a crypto exchange into normalized ExchangeTransaction[].
 *
 * @param csvContent - Raw CSV file content as a string
 * @param exchangeType - One of: 'coinbase', 'kraken', 'gemini', 'binance', 'generic'
 * @returns Array of parsed ExchangeTransaction entries
 */
export function parseExchangeCSV(
  csvContent: string,
  exchangeType: string,
): ExchangeTransaction[] {
  const result = parseExchangeCSVDetailed(csvContent, exchangeType);
  return result.transactions;
}

/**
 * Parse with full diagnostics including row counts and warnings.
 */
export function parseExchangeCSVDetailed(
  csvContent: string,
  exchangeType: string,
): CSVParseResult {
  if (!csvContent || csvContent.trim().length === 0) {
    throw new Error('CSV content is empty.');
  }

  const normalizedType = exchangeType.toLowerCase().trim();

  switch (normalizedType) {
    case 'coinbase':
      return parseCoinbaseCSV(csvContent);
    case 'kraken':
      return parseKrakenCSV(csvContent);
    case 'gemini':
      return parseGeminiCSV(csvContent);
    case 'binance':
      return parseBinanceCSV(csvContent);
    case 'generic':
    default:
      return parseGenericCSV(csvContent, exchangeType);
  }
}

// =============================================================================
// Coinbase CSV Format
// =============================================================================
// Expected headers:
// Timestamp, Transaction Type, Asset, Quantity Transacted, Spot Price Currency,
// Spot Price at Transaction, Subtotal, Total (inclusive of fees and/or spread), Fees and/or Spread, Notes

function parseCoinbaseCSV(csv: string): CSVParseResult {
  const { headers, rows } = splitCSV(csv);
  const warnings: string[] = [];
  const transactions: ExchangeTransaction[] = [];
  let rowsSkipped = 0;

  const colMap = mapColumns(headers, {
    timestamp: ['timestamp', 'date', 'time'],
    type: ['transaction type', 'type'],
    asset: ['asset', 'currency'],
    quantity: ['quantity transacted', 'quantity', 'amount'],
    spotPrice: ['spot price at transaction', 'spot price', 'price'],
    fee: ['fees and/or spread', 'fees', 'fee', 'spread'],
    total: ['total (inclusive of fees and/or spread)', 'total'],
  });

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      const rawType = getCell(row, colMap.type).toLowerCase();
      const type = normalizeTxType(rawType);
      if (!type) {
        rowsSkipped++;
        continue;
      }

      const dateStr = getCell(row, colMap.timestamp);
      const date = parseDateFlexible(dateStr);
      if (!date) {
        warnings.push(`Row ${i + 2}: Could not parse date "${dateStr}"`);
        rowsSkipped++;
        continue;
      }

      const asset = getCell(row, colMap.asset).toUpperCase().trim();
      const quantity = parseNum(getCell(row, colMap.quantity));
      const spotPrice = parseNum(getCell(row, colMap.spotPrice));
      const fee = parseNum(getCell(row, colMap.fee));

      if (!asset || quantity === 0) {
        rowsSkipped++;
        continue;
      }

      transactions.push({
        id: uuidv4(),
        asset,
        type,
        amount: Math.abs(quantity),
        price: spotPrice,
        fee,
        date,
        exchange: 'Coinbase',
      });
    } catch {
      rowsSkipped++;
      warnings.push(`Row ${i + 2}: Failed to parse.`);
    }
  }

  return {
    transactions,
    exchange: 'Coinbase',
    rowsParsed: transactions.length,
    rowsSkipped,
    warnings,
  };
}

// =============================================================================
// Kraken CSV Format
// =============================================================================
// Expected headers:
// "txid","refid","time","type","subtype","aclass","asset","amount","fee","balance"

function parseKrakenCSV(csv: string): CSVParseResult {
  const { headers, rows } = splitCSV(csv);
  const warnings: string[] = [];
  const transactions: ExchangeTransaction[] = [];
  let rowsSkipped = 0;

  const colMap = mapColumns(headers, {
    txid: ['txid', 'transaction id'],
    time: ['time', 'timestamp', 'date'],
    type: ['type'],
    asset: ['asset', 'currency', 'pair'],
    amount: ['amount', 'vol', 'quantity'],
    fee: ['fee', 'fees'],
    price: ['price', 'cost'],
  });

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      const rawType = getCell(row, colMap.type).toLowerCase();
      const type = normalizeTxType(rawType);
      if (!type) {
        rowsSkipped++;
        continue;
      }

      const dateStr = getCell(row, colMap.time);
      const date = parseDateFlexible(dateStr);
      if (!date) {
        warnings.push(`Row ${i + 2}: Could not parse date "${dateStr}"`);
        rowsSkipped++;
        continue;
      }

      let asset = getCell(row, colMap.asset).toUpperCase().trim();
      // Kraken uses "X" prefix for some assets (XXBT = BTC, XETH = ETH)
      asset = normalizeKrakenAsset(asset);

      const amount = Math.abs(parseNum(getCell(row, colMap.amount)));
      const fee = parseNum(getCell(row, colMap.fee));
      const price = parseNum(getCell(row, colMap.price));

      if (!asset || amount === 0) {
        rowsSkipped++;
        continue;
      }

      transactions.push({
        id: uuidv4(),
        asset,
        type,
        amount,
        price: price > 0 ? price : 0,
        fee,
        date,
        exchange: 'Kraken',
        transactionId: getCell(row, colMap.txid),
      });
    } catch {
      rowsSkipped++;
      warnings.push(`Row ${i + 2}: Failed to parse.`);
    }
  }

  return {
    transactions,
    exchange: 'Kraken',
    rowsParsed: transactions.length,
    rowsSkipped,
    warnings,
  };
}

// =============================================================================
// Gemini CSV Format
// =============================================================================
// Expected headers:
// Date, Time (UTC), Type, Symbol, Specification, Liquidity Indicator, Trading Fee (USD),
// USD Amount, Trading Fee (BTC), BTC Amount, ...

function parseGeminiCSV(csv: string): CSVParseResult {
  const { headers, rows } = splitCSV(csv);
  const warnings: string[] = [];
  const transactions: ExchangeTransaction[] = [];
  let rowsSkipped = 0;

  const colMap = mapColumns(headers, {
    date: ['date', 'timestamp'],
    time: ['time (utc)', 'time'],
    type: ['type'],
    symbol: ['symbol', 'pair', 'market'],
    feeUsd: ['trading fee (usd)', 'fee (usd)', 'fee'],
    usdAmount: ['usd amount', 'usd', 'total'],
  });

  // Gemini also has per-asset amount columns; we'll need to detect them dynamically
  const assetAmountCols = findAssetAmountColumns(headers);

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      const rawType = getCell(row, colMap.type).toLowerCase();
      const type = normalizeTxType(rawType);
      if (!type) {
        rowsSkipped++;
        continue;
      }

      // Combine date and time columns
      const dateStr = getCell(row, colMap.date);
      const timeStr = getCell(row, colMap.time);
      const combined = timeStr ? `${dateStr} ${timeStr}` : dateStr;
      const date = parseDateFlexible(combined);
      if (!date) {
        warnings.push(`Row ${i + 2}: Could not parse date "${combined}"`);
        rowsSkipped++;
        continue;
      }

      // Extract asset from symbol column (e.g. "BTCUSD" -> "BTC")
      const symbol = getCell(row, colMap.symbol).toUpperCase();
      const asset = extractAssetFromPair(symbol);
      if (!asset) {
        rowsSkipped++;
        continue;
      }

      const feeUsd = Math.abs(parseNum(getCell(row, colMap.feeUsd)));
      const usdAmount = Math.abs(parseNum(getCell(row, colMap.usdAmount)));

      // Find the crypto amount from the asset-specific column
      let amount = 0;
      for (const col of assetAmountCols) {
        if (col.asset === asset) {
          amount = Math.abs(parseNum(getCell(row, col.index)));
          break;
        }
      }

      // Calculate price if we have both USD and amount
      const price = amount > 0 ? usdAmount / amount : 0;

      if (!asset || amount === 0) {
        rowsSkipped++;
        continue;
      }

      transactions.push({
        id: uuidv4(),
        asset,
        type,
        amount,
        price,
        fee: feeUsd,
        date,
        exchange: 'Gemini',
        tradingPair: symbol,
      });
    } catch {
      rowsSkipped++;
      warnings.push(`Row ${i + 2}: Failed to parse.`);
    }
  }

  return {
    transactions,
    exchange: 'Gemini',
    rowsParsed: transactions.length,
    rowsSkipped,
    warnings,
  };
}

// =============================================================================
// Binance CSV Format
// =============================================================================
// Expected headers:
// Date(UTC), Pair, Side, Price, Executed, Amount, Fee

function parseBinanceCSV(csv: string): CSVParseResult {
  const { headers, rows } = splitCSV(csv);
  const warnings: string[] = [];
  const transactions: ExchangeTransaction[] = [];
  let rowsSkipped = 0;

  const colMap = mapColumns(headers, {
    date: ['date(utc)', 'date', 'time', 'timestamp'],
    pair: ['pair', 'market', 'symbol'],
    side: ['side', 'type'],
    price: ['price'],
    executed: ['executed', 'amount', 'quantity'],
    amount: ['amount', 'total'],
    fee: ['fee'],
  });

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      const rawSide = getCell(row, colMap.side).toLowerCase();
      const type = normalizeTxType(rawSide);
      if (!type) {
        rowsSkipped++;
        continue;
      }

      const dateStr = getCell(row, colMap.date);
      const date = parseDateFlexible(dateStr);
      if (!date) {
        warnings.push(`Row ${i + 2}: Could not parse date "${dateStr}"`);
        rowsSkipped++;
        continue;
      }

      const pair = getCell(row, colMap.pair).toUpperCase();
      const asset = extractAssetFromPair(pair);
      if (!asset) {
        rowsSkipped++;
        continue;
      }

      const price = parseNum(getCell(row, colMap.price));
      const executed = Math.abs(parseNum(getCell(row, colMap.executed)));
      const fee = parseNum(getCell(row, colMap.fee));

      if (executed === 0) {
        rowsSkipped++;
        continue;
      }

      transactions.push({
        id: uuidv4(),
        asset,
        type,
        amount: executed,
        price,
        fee,
        date,
        exchange: 'Binance',
        tradingPair: pair,
      });
    } catch {
      rowsSkipped++;
      warnings.push(`Row ${i + 2}: Failed to parse.`);
    }
  }

  return {
    transactions,
    exchange: 'Binance',
    rowsParsed: transactions.length,
    rowsSkipped,
    warnings,
  };
}

// =============================================================================
// Generic CSV Parser
// =============================================================================

function parseGenericCSV(csv: string, exchangeLabel: string): CSVParseResult {
  const { headers, rows } = splitCSV(csv);
  const warnings: string[] = [];
  const transactions: ExchangeTransaction[] = [];
  let rowsSkipped = 0;

  const colMap = mapColumns(headers, {
    date: ['date', 'timestamp', 'time', 'datetime', 'date(utc)', 'trade date'],
    type: ['type', 'side', 'transaction type', 'action', 'direction'],
    asset: ['asset', 'currency', 'coin', 'symbol', 'token'],
    amount: ['amount', 'quantity', 'qty', 'size', 'volume', 'executed'],
    price: ['price', 'rate', 'spot price', 'unit price', 'execution price'],
    fee: ['fee', 'fees', 'commission', 'trading fee', 'spread'],
    total: ['total', 'net', 'subtotal', 'cost', 'usd amount'],
  });

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      const rawType = getCell(row, colMap.type).toLowerCase();
      const type = normalizeTxType(rawType);
      if (!type) {
        rowsSkipped++;
        continue;
      }

      const dateStr = getCell(row, colMap.date);
      const date = parseDateFlexible(dateStr);
      if (!date) {
        warnings.push(`Row ${i + 2}: Could not parse date "${dateStr}"`);
        rowsSkipped++;
        continue;
      }

      let asset = getCell(row, colMap.asset).toUpperCase().trim();
      if (!asset) {
        // Try extracting from a pair column
        const pairCol = headers.findIndex((h) =>
          ['pair', 'market', 'symbol'].includes(h.toLowerCase().trim()),
        );
        if (pairCol >= 0 && row[pairCol]) {
          asset = extractAssetFromPair(row[pairCol].toUpperCase()) || '';
        }
      }
      if (!asset) {
        rowsSkipped++;
        continue;
      }

      const amount = Math.abs(parseNum(getCell(row, colMap.amount)));
      let price = parseNum(getCell(row, colMap.price));
      const fee = parseNum(getCell(row, colMap.fee));
      const total = parseNum(getCell(row, colMap.total));

      // Derive price from total/amount if price column is missing
      if (price === 0 && amount > 0 && total > 0) {
        price = total / amount;
      }

      if (amount === 0) {
        rowsSkipped++;
        continue;
      }

      transactions.push({
        id: uuidv4(),
        asset,
        type,
        amount,
        price,
        fee,
        date,
        exchange: exchangeLabel || 'Generic',
      });
    } catch {
      rowsSkipped++;
      warnings.push(`Row ${i + 2}: Failed to parse.`);
    }
  }

  return {
    transactions,
    exchange: exchangeLabel || 'Generic',
    rowsParsed: transactions.length,
    rowsSkipped,
    warnings,
  };
}

// =============================================================================
// CSV Splitting & Column Mapping Utilities
// =============================================================================

interface CSVData {
  headers: string[];
  rows: string[][];
}

/**
 * Split raw CSV content into headers and row arrays.
 * Handles quoted fields containing commas and newlines.
 */
function splitCSV(csv: string): CSVData {
  const lines = parseCSVLines(csv);
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Skip any preamble lines that Coinbase sometimes adds (lines starting with non-header text)
  let headerIndex = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i];
    // Headers typically have multiple comma-separated items
    if (line.length >= 3) {
      headerIndex = i;
      break;
    }
  }

  const headers = lines[headerIndex].map((h) => h.trim());
  const rows = lines.slice(headerIndex + 1).filter((row) => row.length >= 2);

  return { headers, rows };
}

/**
 * Parse CSV respecting quoted fields.
 */
function parseCSVLines(csv: string): string[][] {
  const results: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < csv.length && csv[i + 1] === '"') {
          // Escaped quote
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        current.push(field);
        field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < csv.length && csv[i + 1] === '\n') {
          i++; // Skip \r\n
        }
        current.push(field);
        field = '';
        if (current.some((c) => c.trim().length > 0)) {
          results.push(current);
        }
        current = [];
      } else {
        field += ch;
      }
    }
  }

  // Final field/row
  current.push(field);
  if (current.some((c) => c.trim().length > 0)) {
    results.push(current);
  }

  return results;
}

/**
 * Map column names from the CSV header to their indices.
 * Each key in `wanted` maps to an array of possible header names (case-insensitive).
 */
function mapColumns(
  headers: string[],
  wanted: Record<string, string[]>,
): Record<string, number> {
  const map: Record<string, number> = {};
  const lowerHeaders = headers.map((h) => h.toLowerCase().trim());

  for (const [key, candidates] of Object.entries(wanted)) {
    let found = -1;
    for (const candidate of candidates) {
      const idx = lowerHeaders.indexOf(candidate.toLowerCase());
      if (idx >= 0) {
        found = idx;
        break;
      }
    }
    map[key] = found;
  }

  return map;
}

/** Safely retrieve a cell value by column index */
function getCell(row: string[], colIndex: number): string {
  if (colIndex < 0 || colIndex >= row.length) return '';
  return (row[colIndex] || '').trim();
}

// =============================================================================
// Type Normalization
// =============================================================================

/**
 * Normalize a raw transaction type string to our canonical types.
 * Returns null if the type is not a recognized trade/transfer.
 */
function normalizeTxType(raw: string): ExchangeTransaction['type'] | null {
  const s = raw.toLowerCase().trim();

  if (['buy', 'purchase', 'market buy', 'limit buy'].includes(s)) return 'buy';
  if (['sell', 'market sell', 'limit sell'].includes(s)) return 'sell';
  if (['send', 'transfer out', 'withdrawal', 'withdraw'].includes(s)) return 'transfer_out';
  if (['receive', 'transfer in', 'deposit', 'transfer'].includes(s)) return 'transfer_in';

  // Partial matching
  if (s.includes('buy')) return 'buy';
  if (s.includes('sell')) return 'sell';
  if (s.includes('send') || s.includes('withdraw')) return 'transfer_out';
  if (s.includes('receive') || s.includes('deposit')) return 'transfer_in';

  return null;
}

// =============================================================================
// Asset Symbol Normalization
// =============================================================================

/** Kraken uses X/Z prefixes for some assets */
function normalizeKrakenAsset(asset: string): string {
  const krakenMap: Record<string, string> = {
    XXBT: 'BTC',
    XBT: 'BTC',
    XETH: 'ETH',
    XLTC: 'LTC',
    XXRP: 'XRP',
    XXLM: 'XLM',
    XDOGE: 'DOGE',
    ZUSD: 'USD',
    ZEUR: 'EUR',
    ZGBP: 'GBP',
    ZJPY: 'JPY',
  };

  return krakenMap[asset] ?? asset;
}

/** Extract the base asset from a trading pair like "BTCUSD" or "BTC-USD" or "BTC/USD" */
function extractAssetFromPair(pair: string): string | null {
  if (!pair) return null;

  // Handle explicit delimiter: "BTC-USD", "BTC/USD", "BTC_USD"
  const delimiters = ['-', '/', '_'];
  for (const d of delimiters) {
    if (pair.includes(d)) {
      return pair.split(d)[0].trim();
    }
  }

  // No delimiter: try removing known quote currencies from the end
  const quoteCurrencies = ['USD', 'USDT', 'USDC', 'EUR', 'GBP', 'BTC', 'ETH', 'BUSD'];
  for (const quote of quoteCurrencies) {
    if (pair.endsWith(quote) && pair.length > quote.length) {
      return pair.slice(0, -quote.length);
    }
  }

  return pair.length >= 2 ? pair : null;
}

/** Find columns in the header that look like "<ASSET> Amount" (Gemini format) */
function findAssetAmountColumns(headers: string[]): { asset: string; index: number }[] {
  const results: { asset: string; index: number }[] = [];
  const pattern = /^([A-Z]{2,10})\s+amount$/i;

  for (let i = 0; i < headers.length; i++) {
    const match = headers[i].trim().match(pattern);
    if (match) {
      results.push({ asset: match[1].toUpperCase(), index: i });
    }
  }

  return results;
}

// =============================================================================
// Date Parsing
// =============================================================================

/**
 * Parse dates in multiple formats:
 * - 2024-01-15
 * - 2024-01-15T10:30:00Z
 * - 01/15/2024
 * - Jan 15, 2024
 * - 2024-01-15 10:30:00
 */
function parseDateFlexible(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Try native Date parsing first (handles ISO and many common formats)
  const native = new Date(dateStr);
  if (!isNaN(native.getTime()) && native.getFullYear() >= 2000) {
    return native;
  }

  // Try MM/DD/YYYY
  const slashParts = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (slashParts) {
    let year = parseInt(slashParts[3], 10);
    if (year < 100) year += 2000;
    const month = parseInt(slashParts[1], 10);
    const day = parseInt(slashParts[2], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return new Date(year, month - 1, day);
    }
  }

  return null;
}

/** Parse a numeric string, stripping common formatting */
function parseNum(s: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/[$,\s%]/g, '');
  // Handle parenthetical negatives: (123.45) -> -123.45
  const negMatch = cleaned.match(/^\((.+)\)$/);
  const val = parseFloat(negMatch ? `-${negMatch[1]}` : cleaned);
  return isNaN(val) ? 0 : val;
}
