// =============================================================================
// BasisGuard - Historical Price Data via CoinGecko API
// =============================================================================
// Uses the free CoinGecko API to fetch historical crypto prices.
// Free tier: 10-30 calls/minute (no API key required for basic endpoints).
// Pro tier: requires API key via COINGECKO_API_KEY env var.
// =============================================================================

// =============================================================================
// Configuration
// =============================================================================

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const COINGECKO_PRO_BASE_URL = 'https://pro-api.coingecko.com/api/v3';

/** Minimum interval between API calls (ms) to respect rate limits */
const MIN_REQUEST_INTERVAL_MS = 2500; // ~24 req/min, safe for free tier

/** Maximum number of retries on rate limit or transient error */
const MAX_RETRIES = 3;

/** Cache TTL: historical prices never change, so cache indefinitely per session */
const CACHE_TTL_MS = Infinity;

// =============================================================================
// In-Memory Cache
// =============================================================================

interface CacheEntry {
  price: number;
  fetchedAt: number;
}

const priceCache = new Map<string, CacheEntry>();

/** Timestamp of the last API request, used for rate limiting */
let lastRequestTime = 0;

// =============================================================================
// CoinGecko Coin ID Mapping
// =============================================================================

/**
 * Map common ticker symbols to CoinGecko coin IDs.
 * CoinGecko uses slug-style IDs, not ticker symbols.
 */
const TICKER_TO_COINGECKO_ID: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  XRP: 'ripple',
  DOT: 'polkadot',
  AVAX: 'avalanche-2',
  MATIC: 'matic-network',
  LINK: 'chainlink',
  UNI: 'uniswap',
  AAVE: 'aave',
  ATOM: 'cosmos',
  ALGO: 'algorand',
  LTC: 'litecoin',
  BCH: 'bitcoin-cash',
  XLM: 'stellar',
  FIL: 'filecoin',
  NEAR: 'near',
  APT: 'aptos',
  ARB: 'arbitrum',
  OP: 'optimism',
  USDC: 'usd-coin',
  USDT: 'tether',
  DAI: 'dai',
  BUSD: 'binance-usd',
  SHIB: 'shiba-inu',
  PEPE: 'pepe',
  WBTC: 'wrapped-bitcoin',
  WETH: 'weth',
  CRV: 'curve-dao-token',
  MKR: 'maker',
  SNX: 'havven',
  COMP: 'compound-governance-token',
  SUSHI: 'sushi',
  YFI: 'yearn-finance',
  GRT: 'the-graph',
  BAT: 'basic-attention-token',
  ZEC: 'zcash',
  DASH: 'dash',
  EOS: 'eos',
  TRX: 'tron',
  VET: 'vechain',
  THETA: 'theta-token',
  MANA: 'decentraland',
  SAND: 'the-sandbox',
  AXS: 'axie-infinity',
  ENJ: 'enjincoin',
  CHZ: 'chiliz',
  GALA: 'gala',
  IMX: 'immutable-x',
  stETH: 'staked-ether',
  rETH: 'rocket-pool-eth',
  cbETH: 'coinbase-wrapped-staked-eth',
};

// =============================================================================
// Public API
// =============================================================================

/**
 * Get the historical USD price of a crypto asset on a specific date.
 *
 * Results are cached in memory for the duration of the process. The function
 * automatically handles rate limiting by spacing requests.
 *
 * @param asset - Asset ticker symbol (e.g. "BTC", "ETH")
 * @param date - The date to fetch the price for
 * @returns Price in USD
 * @throws Error if the asset is not recognized or the API call fails
 */
export async function getHistoricalPrice(
  asset: string,
  date: Date,
): Promise<number> {
  const normalizedAsset = asset.toUpperCase().trim();
  const dateKey = formatDateForAPI(date);
  const cacheKey = `${normalizedAsset}:${dateKey}`;

  // Check cache first
  const cached = priceCache.get(cacheKey);
  if (cached && (Date.now() - cached.fetchedAt) < CACHE_TTL_MS) {
    return cached.price;
  }

  // Stablecoins: return $1.00 without an API call
  if (isStablecoin(normalizedAsset)) {
    const price = 1.0;
    priceCache.set(cacheKey, { price, fetchedAt: Date.now() });
    return price;
  }

  // Resolve CoinGecko ID
  const coinId = resolveCoinGeckoId(normalizedAsset);
  if (!coinId) {
    throw new Error(
      `Unknown asset "${asset}". Cannot resolve CoinGecko ID. Add it to the TICKER_TO_COINGECKO_ID mapping.`,
    );
  }

  // Fetch from API with rate limiting and retries
  const price = await fetchPriceWithRetry(coinId, dateKey);

  // Cache the result
  priceCache.set(cacheKey, { price, fetchedAt: Date.now() });

  return price;
}

/**
 * Batch-fetch historical prices for multiple asset+date pairs.
 * More efficient than calling getHistoricalPrice individually because
 * it de-duplicates and sequences requests optimally.
 *
 * @param queries - Array of { asset, date } pairs
 * @returns Map from "ASSET:DD-MM-YYYY" to price
 */
export async function getHistoricalPricesBatch(
  queries: Array<{ asset: string; date: Date }>,
): Promise<Map<string, number>> {
  const results = new Map<string, number>();

  // De-duplicate
  const uniqueQueries = new Map<string, { asset: string; date: Date }>();
  for (const q of queries) {
    const key = `${q.asset.toUpperCase().trim()}:${formatDateForAPI(q.date)}`;
    if (!uniqueQueries.has(key)) {
      uniqueQueries.set(key, q);
    }
  }

  // Process sequentially to respect rate limits
  for (const [key, q] of Array.from(uniqueQueries.entries())) {
    try {
      const price = await getHistoricalPrice(q.asset, q.date);
      results.set(key, price);
    } catch (err) {
      // Store 0 for failed lookups, with a warning
      console.warn(
        `Failed to fetch price for ${q.asset} on ${formatDateForAPI(q.date)}: ${err instanceof Error ? err.message : String(err)}`,
      );
      results.set(key, 0);
    }
  }

  return results;
}

/**
 * Clear the in-memory price cache. Useful for testing or when
 * you want to force fresh API calls.
 */
export function clearPriceCache(): void {
  priceCache.clear();
}

/**
 * Get the current size of the in-memory price cache.
 */
export function getPriceCacheSize(): number {
  return priceCache.size;
}

// =============================================================================
// Internal: API Calls
// =============================================================================

async function fetchPriceWithRetry(
  coinId: string,
  dateStr: string,
): Promise<number> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fetchPrice(coinId, dateStr);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // If rate limited, wait longer before retrying
      if (lastError.message.includes('429')) {
        await sleep(MIN_REQUEST_INTERVAL_MS * (attempt + 2));
      } else if (lastError.message.includes('404')) {
        // Asset not found; don't retry
        throw lastError;
      } else {
        await sleep(MIN_REQUEST_INTERVAL_MS);
      }
    }
  }

  throw lastError || new Error(`Failed to fetch price for ${coinId} after ${MAX_RETRIES} retries.`);
}

async function fetchPrice(coinId: string, dateStr: string): Promise<number> {
  // Rate limiting: ensure minimum interval between requests
  await enforceRateLimit();

  const apiKey = process.env.COINGECKO_API_KEY;
  const baseUrl = apiKey ? COINGECKO_PRO_BASE_URL : COINGECKO_BASE_URL;

  const url = `${baseUrl}/coins/${coinId}/history?date=${dateStr}&localization=false`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (apiKey) {
    headers['x-cg-pro-api-key'] = apiKey;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `CoinGecko API returned ${response.status} for ${coinId} on ${dateStr}: ${body}`,
    );
  }

  const data = await response.json();

  // CoinGecko returns: { market_data: { current_price: { usd: 12345.67 } } }
  const usdPrice = data?.market_data?.current_price?.usd;

  if (typeof usdPrice !== 'number' || isNaN(usdPrice)) {
    throw new Error(
      `CoinGecko returned no USD price for ${coinId} on ${dateStr}. The coin may not have been listed on this date.`,
    );
  }

  return usdPrice;
}

// =============================================================================
// Internal: Utilities
// =============================================================================

async function enforceRateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;

  if (elapsed < MIN_REQUEST_INTERVAL_MS) {
    await sleep(MIN_REQUEST_INTERVAL_MS - elapsed);
  }

  lastRequestTime = Date.now();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a Date as DD-MM-YYYY, which is what CoinGecko's /history endpoint expects.
 */
function formatDateForAPI(date: Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function resolveCoinGeckoId(ticker: string): string | null {
  return TICKER_TO_COINGECKO_ID[ticker] ?? null;
}

function isStablecoin(ticker: string): boolean {
  const stablecoins = new Set([
    'USDC', 'USDT', 'DAI', 'BUSD', 'TUSD', 'USDP', 'GUSD', 'FRAX',
    'PYUSD', 'LUSD', 'SUSD', 'CUSD', 'UST',
  ]);
  return stablecoins.has(ticker);
}
