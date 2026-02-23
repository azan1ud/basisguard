// =============================================================================
// BasisGuard - 1099-DA PDF Parsing Module
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse');
import { v4 as uuidv4 } from 'uuid';
import { Transaction1099DA, ParsedPDFResult } from './types';

// =============================================================================
// Public API
// =============================================================================

/**
 * Parse a 1099-DA PDF document and extract transaction data.
 *
 * Supports known formats from: Coinbase, Kraken, Gemini.
 * Falls back to a generic pattern-matching extractor for unknown brokers.
 *
 * @param buffer - Raw PDF file contents
 * @returns Array of parsed Transaction1099DA entries
 */
export async function parse1099DA(buffer: Buffer): Promise<Transaction1099DA[]> {
  const result = await parse1099DADetailed(buffer);
  return result.transactions;
}

/**
 * Parse a 1099-DA PDF with full diagnostic output including warnings and
 * broker detection info.
 */
export async function parse1099DADetailed(buffer: Buffer): Promise<ParsedPDFResult> {
  if (!buffer || buffer.length === 0) {
    throw new Error('PDF buffer is empty. Please provide a valid PDF file.');
  }

  let parsed;
  try {
    parsed = await pdfParse(buffer);
  } catch (err) {
    throw new Error(
      `Failed to parse PDF: ${err instanceof Error ? err.message : String(err)}. Ensure the file is a valid, unencrypted PDF.`,
    );
  }

  const text = parsed.text;
  const pageCount = parsed.numpages;
  const warnings: string[] = [];

  if (!text || text.trim().length === 0) {
    throw new Error(
      'PDF contains no extractable text. It may be a scanned image; please use a text-based PDF export from your broker.',
    );
  }

  // Detect broker
  const broker = detectBroker(text);
  if (broker === 'Unknown') {
    warnings.push(
      'Could not identify the broker. Using generic extraction; results may need manual review.',
    );
  }

  // Detect tax year
  const taxYear = detectTaxYear(text);

  // Extract transactions using broker-specific or generic parser
  let transactions: Transaction1099DA[];
  switch (broker) {
    case 'Coinbase':
      transactions = parseCoinbaseFormat(text, warnings);
      break;
    case 'Kraken':
      transactions = parseKrakenFormat(text, warnings);
      break;
    case 'Gemini':
      transactions = parseGeminiFormat(text, warnings);
      break;
    default:
      transactions = parseGenericFormat(text, warnings);
      break;
  }

  // Assign broker to all transactions
  for (const tx of transactions) {
    tx.broker = broker;
  }

  if (transactions.length === 0) {
    warnings.push(
      'No transactions were extracted from the PDF. The format may be unsupported or the document may not be a 1099-DA.',
    );
  }

  return {
    transactions,
    broker,
    taxYear,
    rawPageCount: pageCount,
    warnings,
  };
}

// =============================================================================
// Broker Detection
// =============================================================================

function detectBroker(text: string): string {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes('coinbase') ||
    lowerText.includes('coinbase, inc') ||
    lowerText.includes('coinbase global')
  ) {
    return 'Coinbase';
  }

  if (
    lowerText.includes('kraken') ||
    lowerText.includes('payward') ||
    lowerText.includes('payward, inc')
  ) {
    return 'Kraken';
  }

  if (
    lowerText.includes('gemini') ||
    lowerText.includes('gemini trust') ||
    lowerText.includes('gemini exchange')
  ) {
    return 'Gemini';
  }

  if (lowerText.includes('binance') || lowerText.includes('binance.us')) {
    return 'Binance';
  }

  return 'Unknown';
}

function detectTaxYear(text: string): number {
  // Look for a 4-digit year near common keywords
  const yearPatterns = [
    /(?:tax\s*year|form\s*1099|calendar\s*year)\s*:?\s*(20\d{2})/i,
    /(?:for\s*the\s*year)\s*(20\d{2})/i,
    /(20\d{2})\s*(?:form\s*1099|tax\s*information)/i,
  ];

  for (const pattern of yearPatterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // Fallback: assume current year - 1
  return new Date().getFullYear() - 1;
}

// =============================================================================
// Broker-Specific Parsers
// =============================================================================

/**
 * Coinbase 1099-DA format:
 * Typically has rows with: Asset | Date of Sale | Proceeds | Cost Basis | Transaction ID
 */
function parseCoinbaseFormat(text: string, warnings: string[]): Transaction1099DA[] {
  const transactions: Transaction1099DA[] = [];

  // Coinbase often uses a tabular format, one transaction per line.
  // Pattern: Asset  MM/DD/YYYY  $X,XXX.XX  $X,XXX.XX  <txid>
  const linePattern =
    /([A-Z]{2,10})\s+(\d{1,2}\/\d{1,2}\/\d{4})\s+\$?([\d,]+\.?\d*)\s+\$?([\d,]+\.?\d*)\s*([A-Za-z0-9-]*)/g;

  let match: RegExpExecArray | null;
  while ((match = linePattern.exec(text)) !== null) {
    const [, asset, dateStr, proceedsStr, basisStr, txId] = match;

    const proceeds = parseAmount(proceedsStr);
    const basis = parseAmount(basisStr);
    const saleDate = parseDate(dateStr);

    if (!saleDate) {
      warnings.push(`Skipped line with unparseable date: "${dateStr}"`);
      continue;
    }

    transactions.push({
      id: uuidv4(),
      asset: asset.toUpperCase(),
      proceeds,
      reportedBasis: basis,
      saleDate,
      broker: 'Coinbase',
      transactionId: txId || '',
    });
  }

  // Fallback to generic if Coinbase-specific didn't capture anything
  if (transactions.length === 0) {
    return parseGenericFormat(text, warnings);
  }

  return transactions;
}

/**
 * Kraken 1099-DA format:
 * Kraken (Payward) typically lists transactions with different column ordering.
 */
function parseKrakenFormat(text: string, warnings: string[]): Transaction1099DA[] {
  const transactions: Transaction1099DA[] = [];

  // Kraken often uses: Date | Asset | Qty | Proceeds | Cost Basis
  const linePattern =
    /(\d{1,2}\/\d{1,2}\/\d{4})\s+([A-Z]{2,10})\s+[\d.]+\s+\$?([\d,]+\.?\d*)\s+\$?([\d,]+\.?\d*)/g;

  let match: RegExpExecArray | null;
  while ((match = linePattern.exec(text)) !== null) {
    const [, dateStr, asset, proceedsStr, basisStr] = match;

    const proceeds = parseAmount(proceedsStr);
    const basis = parseAmount(basisStr);
    const saleDate = parseDate(dateStr);

    if (!saleDate) {
      warnings.push(`Skipped line with unparseable date: "${dateStr}"`);
      continue;
    }

    transactions.push({
      id: uuidv4(),
      asset: asset.toUpperCase(),
      proceeds,
      reportedBasis: basis,
      saleDate,
      broker: 'Kraken',
      transactionId: '',
    });
  }

  if (transactions.length === 0) {
    return parseGenericFormat(text, warnings);
  }

  return transactions;
}

/**
 * Gemini 1099-DA format.
 */
function parseGeminiFormat(text: string, warnings: string[]): Transaction1099DA[] {
  const transactions: Transaction1099DA[] = [];

  // Gemini format: Asset | Sale Date | Gross Proceeds | Cost Basis
  const linePattern =
    /([A-Z]{2,10})\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+\$?([\d,]+\.?\d*)\s+\$?([\d,]+\.?\d*)/g;

  let match: RegExpExecArray | null;
  while ((match = linePattern.exec(text)) !== null) {
    const [, asset, dateStr, proceedsStr, basisStr] = match;

    const proceeds = parseAmount(proceedsStr);
    const basis = parseAmount(basisStr);
    const saleDate = parseDate(dateStr);

    if (!saleDate) {
      warnings.push(`Skipped line with unparseable date: "${dateStr}"`);
      continue;
    }

    transactions.push({
      id: uuidv4(),
      asset: asset.toUpperCase(),
      proceeds,
      reportedBasis: basis,
      saleDate,
      broker: 'Gemini',
      transactionId: '',
    });
  }

  if (transactions.length === 0) {
    return parseGenericFormat(text, warnings);
  }

  return transactions;
}

// =============================================================================
// Generic / Fallback Parser
// =============================================================================

/**
 * Generic parser that tries to extract tabular data from any 1099-DA PDF.
 * Looks for lines with: a crypto asset ticker, a date, and one or two dollar amounts.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseGenericFormat(text: string, warnings: string[]): Transaction1099DA[] {
  const transactions: Transaction1099DA[] = [];

  // Split into lines and process each
  const lines = text.split(/\n/);

  // Broad pattern: somewhere on the line there is a ticker, a date, and dollar amounts
  const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/;

  // Known crypto tickers to help distinguish from random uppercase words
  const knownTickers = new Set([
    'BTC', 'ETH', 'SOL', 'ADA', 'DOGE', 'XRP', 'DOT', 'AVAX', 'MATIC',
    'LINK', 'UNI', 'AAVE', 'ATOM', 'ALGO', 'LTC', 'BCH', 'XLM', 'FIL',
    'NEAR', 'APT', 'ARB', 'OP', 'USDC', 'USDT', 'DAI', 'SHIB', 'PEPE',
    'WBTC', 'WETH', 'CRV', 'MKR', 'SNX', 'COMP', 'SUSHI', 'YFI',
    'GRT', 'BAT', 'ZEC', 'DASH', 'EOS', 'TRX', 'VET', 'THETA',
    'MANA', 'SAND', 'AXS', 'ENJ', 'CHZ', 'GALA', 'IMX',
  ]);

  for (const line of lines) {
    const dateMatch = line.match(datePattern);
    if (!dateMatch) continue;

    const amounts: number[] = [];
    let amtMatch: RegExpExecArray | null;
    const amtRegex = /\$?([\d,]+\.\d{2})/g;
    while ((amtMatch = amtRegex.exec(line)) !== null) {
      amounts.push(parseAmount(amtMatch[1]));
    }

    if (amounts.length < 1) continue;

    // Try to find a known ticker on this line
    const words = line.split(/\s+/);
    let ticker = '';
    for (const word of words) {
      const cleaned = word.replace(/[^A-Z]/g, '');
      if (knownTickers.has(cleaned)) {
        ticker = cleaned;
        break;
      }
    }

    if (!ticker) continue;

    const saleDate = parseDate(dateMatch[1]);
    if (!saleDate) continue;

    const proceeds = amounts[0];
    const basis = amounts.length >= 2 ? amounts[1] : 0;

    transactions.push({
      id: uuidv4(),
      asset: ticker,
      proceeds,
      reportedBasis: basis,
      saleDate,
      broker: 'Unknown',
      transactionId: '',
    });
  }

  return transactions;
}

// =============================================================================
// Utility Functions
// =============================================================================

/** Parse a dollar amount string like "1,234.56" or "1234.56" into a number */
function parseAmount(raw: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[$,\s]/g, '');
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

/** Parse a date string in common formats: MM/DD/YYYY, MM-DD-YYYY, MM/DD/YY */
function parseDate(raw: string): Date | null {
  if (!raw) return null;

  const normalized = raw.replace(/-/g, '/');
  const parts = normalized.split('/');

  if (parts.length !== 3) return null;

  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  let year = parseInt(parts[2], 10);

  // Handle 2-digit year
  if (year < 100) {
    year += year >= 50 ? 1900 : 2000;
  }

  // Basic validation
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 2000 || year > 2100) {
    return null;
  }

  return new Date(year, month - 1, day);
}
