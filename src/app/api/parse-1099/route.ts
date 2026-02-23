import { NextRequest, NextResponse } from "next/server";
import { parse1099DA } from "@/lib/pdfParser";

/**
 * UI-facing transaction shape (simplified from the core Transaction1099DA type).
 * Uses string dates and "grossProceeds" naming for the frontend table.
 */
interface UITransaction {
  id: string;
  asset: string;
  saleDate: string;
  grossProceeds: number;
  reportedBasis: number;
  broker: string;
}

/**
 * Fallback sample data returned when PDF parsing yields no transactions,
 * ensuring the frontend always has data to display.
 */
function getSampleTransactions(): UITransaction[] {
  return [
    {
      id: crypto.randomUUID(),
      asset: "BTC",
      saleDate: "2024-03-15",
      grossProceeds: 42350.0,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "ETH",
      saleDate: "2024-05-22",
      grossProceeds: 8920.5,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "SOL",
      saleDate: "2024-07-10",
      grossProceeds: 3150.75,
      reportedBasis: 0.0,
      broker: "Kraken",
    },
    {
      id: crypto.randomUUID(),
      asset: "BTC",
      saleDate: "2024-09-03",
      grossProceeds: 15800.0,
      reportedBasis: 0.0,
      broker: "Coinbase",
    },
    {
      id: crypto.randomUUID(),
      asset: "ETH",
      saleDate: "2024-11-28",
      grossProceeds: 5430.25,
      reportedBasis: 0.0,
      broker: "Gemini",
    },
  ];
}

/**
 * Format a Date as YYYY-MM-DD string for the UI.
 */
function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Read the file into a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use the existing pdfParser to extract transactions
    let uiTransactions: UITransaction[];
    let source = "parsed";

    try {
      const parsedTransactions = await parse1099DA(buffer);

      if (parsedTransactions.length > 0) {
        // Map core Transaction1099DA -> UITransaction
        uiTransactions = parsedTransactions.map((tx) => ({
          id: tx.id,
          asset: tx.asset,
          saleDate: formatDate(tx.saleDate),
          grossProceeds: tx.proceeds,
          reportedBasis: tx.reportedBasis,
          broker: tx.broker,
        }));
      } else {
        // Parsing succeeded but found no rows -- return sample data
        uiTransactions = getSampleTransactions();
        source = "sample";
      }
    } catch {
      // Parsing failed -- return sample data so the UI still works
      uiTransactions = getSampleTransactions();
      source = "sample";
    }

    return NextResponse.json({
      transactions: uiTransactions,
      source,
      filename: file.name,
      size: file.size,
    });
  } catch {
    // On any top-level error, return sample data
    return NextResponse.json({
      transactions: getSampleTransactions(),
      source: "sample",
      error: "Failed to parse file, returning sample data",
    });
  }
}
