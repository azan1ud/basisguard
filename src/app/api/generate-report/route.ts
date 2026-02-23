import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/generate-report
// Generates a corrected Form 8949 PDF (and other reports).
// Currently returns a mock response. In production, this would use a PDF
// generation library (e.g., pdf-lib, puppeteer) to create real tax forms.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analysisId, reportType, sessionId } = body;

    // Validate required fields
    if (!analysisId || !reportType) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: analysisId and reportType (form8949 | discrepancy | transactions)",
        },
        { status: 400 }
      );
    }

    const validTypes = ["form8949", "discrepancy", "transactions"];
    if (!validTypes.includes(reportType)) {
      return NextResponse.json(
        {
          error: `Invalid reportType: ${reportType}. Must be one of: ${validTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // In production:
    //
    // 1. Verify the user has paid (check sessionId against Stripe)
    // 2. Fetch the analysis results from the database
    // 3. Generate the appropriate report
    //
    // if (reportType === "form8949") {
    //   const pdfBuffer = await generateForm8949(analysisId);
    //   return new NextResponse(pdfBuffer, {
    //     headers: {
    //       "Content-Type": "application/pdf",
    //       "Content-Disposition": `attachment; filename="Form8949_Corrected_${analysisId}.pdf"`,
    //     },
    //   });
    // }
    //
    // if (reportType === "discrepancy") {
    //   const pdfBuffer = await generateDiscrepancyReport(analysisId);
    //   return new NextResponse(pdfBuffer, {
    //     headers: {
    //       "Content-Type": "application/pdf",
    //       "Content-Disposition": `attachment; filename="DiscrepancyReport_${analysisId}.pdf"`,
    //     },
    //   });
    // }
    //
    // if (reportType === "transactions") {
    //   const csvBuffer = await generateTransactionCSV(analysisId);
    //   return new NextResponse(csvBuffer, {
    //     headers: {
    //       "Content-Type": "text/csv",
    //       "Content-Disposition": `attachment; filename="Transactions_${analysisId}.csv"`,
    //     },
    //   });
    // }

    // Mock response
    const fileExtension = reportType === "transactions" ? "csv" : "pdf";
    const contentType =
      reportType === "transactions" ? "text/csv" : "application/pdf";

    const mockFileNames: Record<string, string> = {
      form8949: `Form8949_Corrected_${analysisId}.pdf`,
      discrepancy: `DiscrepancyReport_${analysisId}.pdf`,
      transactions: `ReconciledTransactions_${analysisId}.csv`,
    };

    return NextResponse.json({
      message: `Mock ${reportType} report generated successfully`,
      fileName: mockFileNames[reportType],
      contentType,
      fileExtension,
      analysisId,
      sessionId: sessionId || null,
      generatedAt: new Date().toISOString(),
      note: "This is a mock response. In production, the actual file binary would be returned.",
    });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
