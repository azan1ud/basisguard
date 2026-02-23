// =============================================================================
// BasisGuard - Kraken API Connector
// =============================================================================
// Kraken uses API key + secret authentication with HMAC-SHA512 signatures.
// Documentation: https://docs.kraken.com/rest/
//
// Required credentials:
//   - API Key (public)
//   - API Secret (private, base64-encoded)
//
// The API key must have "Query Funds" and "Query Ledger/Trade History"
// permissions. No withdrawal or trading permissions are needed.
// =============================================================================

import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { ExchangeTransaction } from '../types';

// =============================================================================
// Configuration
// =============================================================================

const KRAKEN_API_BASE = 'https://api.kraken.com';

// Kraken asset name mapping (Kraken uses X/Z prefixes internally)
const KRAKEN_ASSET_MAP: Record<string, string> = {
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
  XXMR: 'XMR',
  XZEC: 'ZEC',
  XETC: 'ETC',
  XREP: 'REP',
  XMLN: 'MLN',
};

// =============================================================================
// Public API
// =============================================================================

/**
 * Fetch the complete trade history from Kraken for the given API credentials.
 *
 * Retrieves all closed trades and ledger entries, handling pagination via the
 * offset parameter. Only trade-related ledger entries (buy/sell) and
 * deposit/withdrawal entries are included.
 *
 * @param apiKey - Kraken API public key
 * @param apiSecret - Kraken API private key (base64-encoded)
 * @returns Array of normalized ExchangeTransaction entries
 */
export async function fetchKrakenHistory(
  apiKey: string,
  apiSecret: string,
): Promise<ExchangeTransaction[]> {
  if (!apiKey || !apiSecret) {
    throw new Error('Kraken API key and secret are required.');
  }

  const transactions: ExchangeTransaction[] = [];

  // Fetch trade history (paginated)
  const trades = await fetchAllTradesHistory(apiKey, apiSecret);
  for (const trade of trades) {
    const normalized = normalizeKrakenTrade(trade);
    if (normalized) {
      transactions.push(normalized);
    }
  }

  // Fetch ledger entries for deposits/withdrawals
  const ledgerEntries = await fetchLedgerEntries(apiKey, apiSecret);
  for (const entry of ledgerEntries) {
    const normalized = normalizeKrakenLedgerEntry(entry);
    if (normalized) {
      transactions.push(normalized);
    }
  }

  // Sort chronologically
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return transactions;
}

// =============================================================================
// Kraken API Types
// =============================================================================

interface KrakenTrade {
  ordertxid: string;
  pair: string;
  time: number; // Unix timestamp
  type: 'buy' | 'sell';
  ordertype: string;
  price: string;
  cost: string;
  fee: string;
  vol: string;
  margin: string;
  misc: string;
}

interface KrakenLedgerEntry {
  refid: string;
  time: number;
  type: string; // 'deposit' | 'withdrawal' | 'trade' | 'transfer' | ...
  subtype: string;
  aclass: string;
  asset: string;
  amount: string;
  fee: string;
  balance: string;
}

interface KrakenResponse<T> {
  error: string[];
  result: T;
}

// =============================================================================
// Request Signing
// =============================================================================

/**
 * Create a signed request to the Kraken private API.
 * Kraken uses a nonce-based HMAC-SHA512 signature scheme.
 */
async function krakenPrivateRequest<T>(
  apiKey: string,
  apiSecret: string,
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const nonce = Date.now() * 1000; // Microsecond nonce
  const body = new URLSearchParams({
    nonce: nonce.toString(),
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ),
  });

  const path = `/0/private/${endpoint}`;
  const signature = createKrakenSignature(path, nonce, body.toString(), apiSecret);

  const response = await fetch(`${KRAKEN_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'API-Key': apiKey,
      'API-Sign': signature,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Kraken API request failed (${response.status}): ${await response.text()}`);
  }

  const data: KrakenResponse<T> = await response.json();

  if (data.error && data.error.length > 0) {
    throw new Error(`Kraken API error: ${data.error.join(', ')}`);
  }

  return data.result;
}

/**
 * Create the HMAC-SHA512 signature required by Kraken's private API.
 *
 * Signature = HMAC-SHA512(
 *   base64_decode(apiSecret),
 *   path + SHA256(nonce + body)
 * )
 */
function createKrakenSignature(
  path: string,
  nonce: number,
  body: string,
  apiSecret: string,
): string {
  const message = nonce.toString() + body;
  const sha256Hash = crypto.createHash('sha256').update(message).digest();

  const pathBuffer = Buffer.from(path);
  const combined = Buffer.concat([pathBuffer, sha256Hash]);

  const secretBuffer = Buffer.from(apiSecret, 'base64');
  const hmac = crypto.createHmac('sha512', secretBuffer).update(combined).digest('base64');

  return hmac;
}

// =============================================================================
// Paginated Fetching
// =============================================================================

async function fetchAllTradesHistory(
  apiKey: string,
  apiSecret: string,
): Promise<KrakenTrade[]> {
  const allTrades: KrakenTrade[] = [];
  let offset = 0;
  const pageSize = 50;
  let hasMore = true;

  while (hasMore) {
    const result = await krakenPrivateRequest<{
      trades: Record<string, KrakenTrade>;
      count: number;
    }>(apiKey, apiSecret, 'TradesHistory', { ofs: offset });

    const trades = Object.values(result.trades || {});
    allTrades.push(...trades);

    offset += pageSize;
    hasMore = trades.length === pageSize && offset < result.count;
  }

  return allTrades;
}

async function fetchLedgerEntries(
  apiKey: string,
  apiSecret: string,
): Promise<KrakenLedgerEntry[]> {
  const allEntries: KrakenLedgerEntry[] = [];
  let offset = 0;
  const pageSize = 50;
  let hasMore = true;

  while (hasMore) {
    const result = await krakenPrivateRequest<{
      ledger: Record<string, KrakenLedgerEntry>;
      count: number;
    }>(apiKey, apiSecret, 'Ledgers', { ofs: offset });

    const entries = Object.values(result.ledger || {});
    allEntries.push(...entries);

    offset += pageSize;
    hasMore = entries.length === pageSize && offset < result.count;
  }

  return allEntries;
}

// =============================================================================
// Normalization
// =============================================================================

function normalizeKrakenAsset(asset: string): string {
  const upper = asset.toUpperCase();
  return KRAKEN_ASSET_MAP[upper] ?? upper;
}

/**
 * Extract the base asset from a Kraken pair like "XXBTZUSD" or "ETHUSD".
 */
function extractAssetFromKrakenPair(pair: string): string {
  // Kraken pairs can be in format like XXBTZUSD, XETHZUSD, SOLUSD, etc.
  const knownQuotes = ['ZUSD', 'ZEUR', 'ZGBP', 'ZJPY', 'USD', 'EUR', 'GBP', 'USDT', 'USDC'];

  for (const quote of knownQuotes) {
    if (pair.endsWith(quote)) {
      const base = pair.slice(0, -quote.length);
      return normalizeKrakenAsset(base);
    }
  }

  // Fallback: take the first half
  return normalizeKrakenAsset(pair.slice(0, Math.ceil(pair.length / 2)));
}

function normalizeKrakenTrade(trade: KrakenTrade): ExchangeTransaction | null {
  const type: ExchangeTransaction['type'] = trade.type === 'buy' ? 'buy' : 'sell';
  const asset = extractAssetFromKrakenPair(trade.pair);
  const amount = parseFloat(trade.vol);
  const price = parseFloat(trade.price);
  const fee = parseFloat(trade.fee);

  if (!asset || amount === 0) return null;

  return {
    id: uuidv4(),
    asset,
    type,
    amount: Math.abs(amount),
    price,
    fee: Math.abs(fee),
    date: new Date(trade.time * 1000),
    exchange: 'Kraken',
    transactionId: trade.ordertxid,
    tradingPair: trade.pair,
  };
}

function normalizeKrakenLedgerEntry(entry: KrakenLedgerEntry): ExchangeTransaction | null {
  // Only include deposits and withdrawals
  const typeMap: Record<string, ExchangeTransaction['type']> = {
    deposit: 'transfer_in',
    withdrawal: 'transfer_out',
  };

  const type = typeMap[entry.type];
  if (!type) return null;

  const asset = normalizeKrakenAsset(entry.asset);
  const amount = Math.abs(parseFloat(entry.amount));
  const fee = Math.abs(parseFloat(entry.fee));

  // Skip fiat entries
  if (['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].includes(asset)) return null;
  if (amount === 0) return null;

  return {
    id: uuidv4(),
    asset,
    type,
    amount,
    price: 0, // Price not available for deposits/withdrawals; must be enriched later
    fee,
    date: new Date(entry.time * 1000),
    exchange: 'Kraken',
    transactionId: entry.refid,
  };
}
