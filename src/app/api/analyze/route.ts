import { NextRequest, NextResponse } from "next/server";
import type {
  AnalysisSummary,
  MismatchResult,
  CostBasisMethod,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// POST /api/analyze
// Accepts form1099Data and exchangeHistory, returns analysis results.
// Currently returns mock data. In production, this would call
// costBasisEngine.analyzeMismatches().
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form1099Data, exchangeHistory } = body;

    // Validate input presence
    if (!form1099Data && !exchangeHistory) {
      return NextResponse.json(
        {
          error: "Missing required fields: form1099Data and exchangeHistory",
        },
        { status: 400 }
      );
    }

    // In production:
    // const results = await costBasisEngine.analyzeMismatches(
    //   form1099Data,
    //   exchangeHistory
    // );

    // Mock mismatch results
    const mockResults: MismatchResult[] = [
      {
        transaction: {
          id: "tx-001",
          asset: "BTC",
          proceeds: 42150,
          reportedBasis: 0,
          saleDate: new Date("2024-03-15"),
          broker: "Coinbase",
          transactionId: "CB-001",
        },
        reportedBasis: 0,
        actualBasis: 28400,
        discrepancy: 28400,
        taxImpact: 6816,
        status: "mismatch",
        notes: "Transferred from Ledger — $0 basis reported",
      },
      {
        transaction: {
          id: "tx-002",
          asset: "ETH",
          proceeds: 18320,
          reportedBasis: 0,
          saleDate: new Date("2024-05-22"),
          broker: "Coinbase",
          transactionId: "CB-002",
        },
        reportedBasis: 0,
        actualBasis: 14750,
        discrepancy: 14750,
        taxImpact: 3540,
        status: "mismatch",
        notes: "Transferred from Metamask — $0 basis reported",
      },
      {
        transaction: {
          id: "tx-003",
          asset: "SOL",
          proceeds: 8940,
          reportedBasis: 0,
          saleDate: new Date("2024-06-10"),
          broker: "Kraken",
          transactionId: "KR-001",
        },
        reportedBasis: 0,
        actualBasis: 6120,
        discrepancy: 6120,
        taxImpact: 1469,
        status: "mismatch",
        notes: "Transferred from Phantom — $0 basis reported",
      },
      {
        transaction: {
          id: "tx-004",
          asset: "BTC",
          proceeds: 15600,
          reportedBasis: 15580,
          saleDate: new Date("2024-07-04"),
          broker: "Coinbase",
          transactionId: "CB-003",
        },
        reportedBasis: 15580,
        actualBasis: 15600,
        discrepancy: 20,
        taxImpact: 0,
        status: "match",
      },
      {
        transaction: {
          id: "tx-005",
          asset: "ETH",
          proceeds: 22480,
          reportedBasis: 0,
          saleDate: new Date("2024-08-18"),
          broker: "Kraken",
          transactionId: "KR-002",
        },
        reportedBasis: 0,
        actualBasis: 19300,
        discrepancy: 19300,
        taxImpact: 4632,
        status: "mismatch",
        notes: "Missing acquisition data from Kraken",
      },
      {
        transaction: {
          id: "tx-006",
          asset: "SOL",
          proceeds: 5210,
          reportedBasis: 0,
          saleDate: new Date("2024-09-02"),
          broker: "Coinbase",
          transactionId: "CB-004",
        },
        reportedBasis: 0,
        actualBasis: 3890,
        discrepancy: 3890,
        taxImpact: 934,
        status: "missing",
        notes: "No matching buy record found",
      },
    ];

    // Mock analysis summary
    const mockSummary: AnalysisSummary = {
      totalOverpayment: 38910,
      totalTransactions: 47,
      mismatchCount: 8,
      matchCount: 4,
      missingCount: 2,
      methodResults: {
        FIFO: {
          method: "FIFO" as CostBasisMethod,
          totalBasis: 98200,
          totalTaxOwed: 12640,
          totalOverpayment: 34610,
          results: mockResults,
        },
        LIFO: {
          method: "LIFO" as CostBasisMethod,
          totalBasis: 104500,
          totalTaxOwed: 10210,
          totalOverpayment: 37040,
          results: mockResults,
        },
        HIFO: {
          method: "HIFO" as CostBasisMethod,
          totalBasis: 112300,
          totalTaxOwed: 8340,
          totalOverpayment: 38910,
          results: mockResults,
        },
      },
      recommendedMethod: "HIFO",
      analyzedAt: new Date(),
      taxYear: 2024,
    };

    return NextResponse.json({
      summary: mockSummary,
      results: mockResults,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze transactions" },
      { status: 500 }
    );
  }
}
