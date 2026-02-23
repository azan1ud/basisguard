// =============================================================================
// BasisGuard - Gemini API Connector
// =============================================================================
// Gemini uses API key + secret authentication with HMAC-SHA384 signatures.
// Documentation: https://docs.gemini.com/rest-api/
//
// Required credentials:
//   - API Key
//   - API Secret
//
// The API key must have the "Auditor" role (read-only). No trading or
// withdrawal permissions are needed.
// =============================================================================

import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { ExchangeTransaction } from '../types';

// =============================================================================
// Configuration
// =============================================================================

const GEMINI_API_BASE = 'https://api.gemini.com';

// Gemini symbol mapping
const GEMINI_SYMBOLS: Record<string, string> = {
  btcusd: 'BTC',
  ethusd: 'ETH',
  ltcusd: 'LTC',
  bchusd: 'BCH',
  zecusd: 'ZEC',
  solusd: 'SOL',
  linkusd: 'LINK',
  uniusd: 'UNI',
  aaveusd: 'AAVE',
  maticusd: 'MATIC',
  dogeusd: 'DOGE',
  daiusd: 'DAI',
  shibusd: 'SHIB',
  avaxusd: 'AVAX',
  dotusd: 'DOT',
  adausd: 'ADA',
  atomusd: 'ATOM',
};

// =============================================================================
// Public API
// =============================================================================

/**
 * Fetch the complete trade and transfer history from Gemini for the given
 * API credentials.
 *
 * Retrieves all past trades and transfers, handling pagination via timestamps.
 *
 * @param apiKey - Gemini API key
 * @param apiSecret - Gemini API secret
 * @returns Array of normalized ExchangeTransaction entries
 */
export async function fetchGeminiHistory(
  apiKey: string,
  apiSecret: string,
): Promise<ExchangeTransaction[]> {
  if (!apiKey || !apiSecret) {
    throw new Error('Gemini API key and secret are required.');
  }

  const transactions: ExchangeTransaction[] = [];

  // Fetch trade history for all symbols
  const trades = await fetchAllTrades(apiKey, apiSecret);
  for (const trade of trades) {
    const normalized = normalizeGeminiTrade(trade);
    if (normalized) {
      transactions.push(normalized);
    }
  }

  // Fetch transfer history (deposits and withdrawals)
  const transfers = await fetchAllTransfers(apiKey, apiSecret);
  for (const transfer of transfers) {
    const normalized = normalizeGeminiTransfer(transfer);
    if (normalized) {
      transactions.push(normalized);
    }
  }

  // Sort chronologically
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return transactions;
}

// =============================================================================
// Gemini API Types
// =============================================================================

interface GeminiTrade {
  price: string;
  amount: string;
  timestamp: number; // Unix timestamp in seconds
  timestampms: number; // Unix timestamp in milliseconds
  type: 'Buy' | 'Sell';
  fee_currency: string;
  fee_amount: string;
  tid: number;
  order_id: string;
  symbol: string;
  exchange: string;
  is_auction_fill: boolean;
}

interface GeminiTransfer {
  type: string; // 'Deposit' | 'Withdrawal'
  status: string;
  timestampms: number;
  eid: number;
  currency: string;
  amount: string;
  txHash?: string;
  outputIdx?: number;
  destination?: string;
  purpose?: string;
  fee?: string;
}

// =============================================================================
// Request Signing
// =============================================================================

/**
 * Create a signed request to the Gemini private API.
 *
 * Gemini uses a payload-based HMAC-SHA384 signature scheme:
 * 1. Create a JSON payload with request path, nonce, and parameters
 * 2. Base64-encode the payload
 * 3. Sign with HMAC-SHA384 using the API secret
 */
async function geminiPrivateRequest<T>(
  apiKey: string,
  apiSecret: string,
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
): Promise<T> {
  const nonce = Date.now();
  const path = `/v1/${endpoint}`;

  const payload = {
    request: path,
    nonce,
    ...params,
  };

  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadJson).toString('base64');

  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payloadBase64)
    .digest('hex');

  const response = await fetch(`${GEMINI_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': '0',
      'X-GEMINI-APIKEY': apiKey,
      'X-GEMINI-PAYLOAD': payloadBase64,
      'X-GEMINI-SIGNATURE': signature,
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 400) {
      throw new Error(`Gemini API error (${response.status}): ${text}. Check API key permissions.`);
    }
    if (response.status === 429) {
      throw new Error('Gemini API rate limit exceeded. Please wait and retry.');
    }
    throw new Error(`Gemini API request failed (${response.status}): ${text}`);
  }

  return response.json() as Promise<T>;
}

// =============================================================================
// Paginated Fetching
// =============================================================================

/**
 * Fetch all trades across all supported symbols.
 * Gemini requires querying trades per-symbol.
 */
async function fetchAllTrades(
  apiKey: string,
  apiSecret: string,
): Promise<GeminiTrade[]> {
  const allTrades: GeminiTrade[] = [];

  // Get list of available symbols for the account
  const symbols = await getAvailableSymbols(apiKey, apiSecret);

  for (const symbol of symbols) {
    let timestamp = 0; // Start from beginning
    let hasMore = true;

    while (hasMore) {
      const trades = await geminiPrivateRequest<GeminiTrade[]>(
        apiKey,
        apiSecret,
        'mytrades',
        {
          symbol,
          timestamp,
          limit_trades: 500,
        },
      );

      allTrades.push(...trades);

      if (trades.length < 500) {
        hasMore = false;
      } else {
        // Move timestamp forward to fetch next page
        const lastTrade = trades[trades.length - 1];
        timestamp = lastTrade.timestampms + 1;
      }
    }
  }

  return allTrades;
}

/**
 * Fetch all deposit and withdrawal transfers.
 */
async function fetchAllTransfers(
  apiKey: string,
  apiSecret: string,
): Promise<GeminiTransfer[]> {
  const allTransfers: GeminiTransfer[] = [];
  let timestamp = 0;
  let hasMore = true;

  while (hasMore) {
    const transfers = await geminiPrivateRequest<GeminiTransfer[]>(
      apiKey,
      apiSecret,
      'transfers',
      {
        timestamp,
        limit_transfers: 50,
      },
    );

    // Only include completed transfers
    const completed = transfers.filter((t) =>
      ['Complete', 'Advanced'].includes(t.status),
    );
    allTransfers.push(...completed);

    if (transfers.length < 50) {
      hasMore = false;
    } else {
      const last = transfers[transfers.length - 1];
      timestamp = last.timestampms + 1;
    }
  }

  return allTransfers;
}

/**
 * Get the list of symbols the user has traded. Falls back to common symbols
 * if the notionalbalances endpoint doesn't provide useful data.
 */
async function getAvailableSymbols(
  apiKey: string,
  apiSecret: string,
): Promise<string[]> {
  try {
    const balances = await geminiPrivateRequest<
      Array<{ currency: string; amount: string }>
    >(apiKey, apiSecret, 'balances');

    // Build symbol list from non-fiat currencies with any historical activity
    const cryptoCurrencies = balances
      .map((b) => b.currency.toLowerCase())
      .filter((c) => !['usd', 'eur', 'gbp', 'sgd', 'gusd'].includes(c));

    // Construct USD pairs
    const symbols = cryptoCurrencies
      .map((c) => `${c}usd`)
      .filter((s) => Object.keys(GEMINI_SYMBOLS).includes(s) || true);

    return symbols.length > 0
      ? symbols
      : Object.keys(GEMINI_SYMBOLS); // Fallback to known symbols
  } catch {
    // Fallback to common symbols
    return Object.keys(GEMINI_SYMBOLS);
  }
}

// =============================================================================
// Normalization
// =============================================================================

function extractAssetFromGeminiSymbol(symbol: string): string {
  const lower = symbol.toLowerCase();

  // Check known mapping
  if (GEMINI_SYMBOLS[lower]) {
    return GEMINI_SYMBOLS[lower];
  }

  // Strip known quote currencies from the end
  const quoteCurrencies = ['usd', 'btc', 'eth', 'eur', 'gbp', 'sgd', 'gusd', 'dai', 'usdt'];
  for (const quote of quoteCurrencies) {
    if (lower.endsWith(quote) && lower.length > quote.length) {
      return lower.slice(0, -quote.length).toUpperCase();
    }
  }

  return symbol.toUpperCase();
}

function normalizeGeminiTrade(trade: GeminiTrade): ExchangeTransaction | null {
  const type: ExchangeTransaction['type'] = trade.type === 'Buy' ? 'buy' : 'sell';
  const asset = extractAssetFromGeminiSymbol(trade.symbol);
  const amount = parseFloat(trade.amount);
  const price = parseFloat(trade.price);
  const fee = parseFloat(trade.fee_amount);

  if (!asset || amount === 0) return null;

  return {
    id: uuidv4(),
    asset,
    type,
    amount: Math.abs(amount),
    price,
    fee: Math.abs(fee),
    date: new Date(trade.timestampms),
    exchange: 'Gemini',
    transactionId: trade.order_id,
    tradingPair: trade.symbol.toUpperCase(),
  };
}

function normalizeGeminiTransfer(transfer: GeminiTransfer): ExchangeTransaction | null {
  const typeMap: Record<string, ExchangeTransaction['type']> = {
    Deposit: 'transfer_in',
    Withdrawal: 'transfer_out',
  };

  const type = typeMap[transfer.type];
  if (!type) return null;

  const asset = transfer.currency.toUpperCase();
  const amount = Math.abs(parseFloat(transfer.amount));
  const fee = transfer.fee ? Math.abs(parseFloat(transfer.fee)) : 0;

  // Skip fiat transfers
  if (['USD', 'EUR', 'GBP', 'SGD'].includes(asset)) return null;
  if (amount === 0) return null;

  return {
    id: uuidv4(),
    asset,
    type,
    amount,
    price: 0, // Price must be enriched from price history
    fee,
    date: new Date(transfer.timestampms),
    exchange: 'Gemini',
    transactionId: String(transfer.eid),
  };
}
