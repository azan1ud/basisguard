// =============================================================================
// BasisGuard - Coinbase API Connector
// =============================================================================
// Coinbase uses OAuth2 for read-only access to user transaction history.
// Documentation: https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/sign-in-with-coinbase
//
// Required env vars:
//   COINBASE_CLIENT_ID
//   COINBASE_CLIENT_SECRET
//   COINBASE_REDIRECT_URI
// =============================================================================

import { v4 as uuidv4 } from 'uuid';
import { ExchangeTransaction } from '../types';

// =============================================================================
// Configuration
// =============================================================================

const COINBASE_API_BASE = 'https://api.coinbase.com/v2';
const COINBASE_OAUTH_BASE = 'https://www.coinbase.com/oauth';

interface CoinbaseConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

function getConfig(): CoinbaseConfig {
  const clientId = process.env.COINBASE_CLIENT_ID;
  const clientSecret = process.env.COINBASE_CLIENT_SECRET;
  const redirectUri = process.env.COINBASE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      'Coinbase API credentials not configured. Set COINBASE_CLIENT_ID, COINBASE_CLIENT_SECRET, and COINBASE_REDIRECT_URI environment variables.',
    );
  }

  return { clientId, clientSecret, redirectUri };
}

// =============================================================================
// OAuth2 Helpers
// =============================================================================

/**
 * Generate the Coinbase OAuth2 authorization URL. Redirect the user to this
 * URL to begin the authorization flow. Requests read-only permissions for
 * accounts and transactions.
 */
export function getCoinbaseAuthUrl(state: string): string {
  const config = getConfig();

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    state,
    scope: 'wallet:accounts:read,wallet:transactions:read',
  });

  return `${COINBASE_OAUTH_BASE}/authorize?${params.toString()}`;
}

/**
 * Exchange an authorization code for an access token.
 */
export async function exchangeCoinbaseCode(code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> {
  const config = getConfig();

  const response = await fetch(`${COINBASE_OAUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Coinbase OAuth token exchange failed (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Refresh an expired access token using the refresh token.
 */
export async function refreshCoinbaseToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> {
  const config = getConfig();

  const response = await fetch(`${COINBASE_OAUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Coinbase token refresh failed (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

// =============================================================================
// Transaction History Fetching
// =============================================================================

/**
 * Fetch the complete transaction history from Coinbase for the authenticated user.
 *
 * This retrieves all accounts, then all transactions for each account, handling
 * pagination automatically. Only buy, sell, send, and receive transactions are
 * included (fiat deposits/withdrawals are excluded).
 *
 * @param accessToken - A valid Coinbase OAuth2 access token
 * @returns Array of normalized ExchangeTransaction entries
 */
export async function fetchCoinbaseHistory(
  accessToken: string,
): Promise<ExchangeTransaction[]> {
  if (!accessToken) {
    throw new Error('Coinbase access token is required.');
  }

  const transactions: ExchangeTransaction[] = [];

  // Step 1: List all accounts
  const accounts = await fetchAllPages<CoinbaseAccount>(
    `${COINBASE_API_BASE}/accounts`,
    accessToken,
  );

  // Step 2: For each account, fetch transaction history
  for (const account of accounts) {
    const accountTxs = await fetchAllPages<CoinbaseTransaction>(
      `${COINBASE_API_BASE}/accounts/${account.id}/transactions`,
      accessToken,
    );

    for (const tx of accountTxs) {
      const normalized = normalizeCoinbaseTransaction(tx, account);
      if (normalized) {
        transactions.push(normalized);
      }
    }
  }

  // Sort by date ascending
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return transactions;
}

// =============================================================================
// Coinbase API Types (subset)
// =============================================================================

interface CoinbaseAccount {
  id: string;
  name: string;
  currency: { code: string };
  balance: { amount: string; currency: string };
}

interface CoinbaseTransaction {
  id: string;
  type: string; // 'buy' | 'sell' | 'send' | 'receive' | 'trade' | ...
  status: string;
  amount: { amount: string; currency: string };
  native_amount: { amount: string; currency: string };
  created_at: string;
  network?: { transaction_fee?: { amount: string; currency: string } };
  buy?: { total: { amount: string }; fees: { amount: string }[] };
  sell?: { total: { amount: string }; fees: { amount: string }[] };
}

interface CoinbasePaginatedResponse<T> {
  data: T[];
  pagination: {
    next_uri: string | null;
  };
}

// =============================================================================
// Internal Helpers
// =============================================================================

/**
 * Fetch all pages of a paginated Coinbase API endpoint.
 */
async function fetchAllPages<T>(url: string, accessToken: string): Promise<T[]> {
  const all: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'CB-VERSION': '2024-01-01',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Coinbase access token is expired or invalid. Please re-authenticate.',
        );
      }
      const text = await response.text();
      throw new Error(`Coinbase API request failed (${response.status}): ${text}`);
    }

    const body: CoinbasePaginatedResponse<T> = await response.json();
    all.push(...body.data);

    // Coinbase returns a full URL for the next page
    nextUrl = body.pagination.next_uri
      ? `${COINBASE_API_BASE}${body.pagination.next_uri}`
      : null;
  }

  return all;
}

/**
 * Convert a Coinbase API transaction to our normalized format.
 * Returns null for transaction types we don't care about (e.g., fiat_deposit).
 */
function normalizeCoinbaseTransaction(
  tx: CoinbaseTransaction,
  account: CoinbaseAccount,
): ExchangeTransaction | null {
  // Only process completed transactions
  if (tx.status !== 'completed') return null;

  // Map Coinbase types to our types
  const typeMap: Record<string, ExchangeTransaction['type']> = {
    buy: 'buy',
    sell: 'sell',
    send: 'transfer_out',
    receive: 'transfer_in',
    trade: 'buy', // Trades are treated as buys of the received asset
  };

  const type = typeMap[tx.type];
  if (!type) return null;

  const amount = Math.abs(parseFloat(tx.amount.amount));
  const nativeAmount = Math.abs(parseFloat(tx.native_amount.amount));
  const price = amount > 0 ? nativeAmount / amount : 0;

  // Extract fee if available
  let fee = 0;
  if (tx.buy?.fees?.length) {
    fee = tx.buy.fees.reduce((sum, f) => sum + parseFloat(f.amount), 0);
  } else if (tx.sell?.fees?.length) {
    fee = tx.sell.fees.reduce((sum, f) => sum + parseFloat(f.amount), 0);
  } else if (tx.network?.transaction_fee) {
    fee = parseFloat(tx.network.transaction_fee.amount);
  }

  return {
    id: uuidv4(),
    asset: account.currency.code.toUpperCase(),
    type,
    amount,
    price,
    fee: Math.abs(fee),
    date: new Date(tx.created_at),
    exchange: 'Coinbase',
    transactionId: tx.id,
  };
}
