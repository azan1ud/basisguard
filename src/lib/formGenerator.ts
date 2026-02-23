// =============================================================================
// BasisGuard - IRS Form 8949 & Discrepancy Report PDF Generator
// =============================================================================

import { jsPDF } from 'jspdf';
import {
  MismatchResult,
  AnalysisSummary,
  CostBasisMethod,
} from './types';

// =============================================================================
// Public API
// =============================================================================

/**
 * Generate an IRS Form 8949 PDF with corrected cost basis information.
 *
 * Form 8949 is used to report sales and dispositions of capital assets.
 * Part I covers short-term (held <= 1 year), Part II covers long-term.
 * This generator places all transactions in Part I with Box C checked
 * (basis NOT reported to the IRS), since that is the typical scenario
 * for crypto 1099-DA mismatches.
 *
 * @param results - Array of MismatchResult entries to include on the form
 * @returns PDF as a Buffer
 */
export async function generateForm8949(
  results: MismatchResult[],
): Promise<Buffer> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

  // Filter to only mismatches and missing-basis entries (matches don't need correction)
  const toReport = results.filter((r) => r.status === 'mismatch' || r.status === 'missing');

  if (toReport.length === 0) {
    addCenteredText(doc, 'No mismatches or missing basis entries to report.', 300);
    return Buffer.from(doc.output('arraybuffer'));
  }

  // Paginate: Form 8949 has room for roughly 14 rows per page
  const ROWS_PER_PAGE = 14;
  const pages = chunkArray(toReport, ROWS_PER_PAGE);

  for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
    if (pageIdx > 0) {
      doc.addPage();
    }

    renderForm8949Page(doc, pages[pageIdx], pageIdx + 1, pages.length);
  }

  return Buffer.from(doc.output('arraybuffer'));
}

/**
 * Generate a comprehensive discrepancy report PDF showing the full analysis
 * results, method comparisons, and per-transaction breakdowns.
 *
 * @param summary - The full AnalysisSummary from the cost basis engine
 * @param results - Per-transaction MismatchResult entries
 * @returns PDF as a Buffer
 */
export async function generateDiscrepancyReport(
  summary: AnalysisSummary,
  results: MismatchResult[],
): Promise<Buffer> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

  // -- Page 1: Executive Summary --
  renderReportHeader(doc);
  renderExecutiveSummary(doc, summary);

  // -- Page 2: Method Comparison --
  doc.addPage();
  renderMethodComparison(doc, summary);

  // -- Page 3+: Transaction Details --
  doc.addPage();
  renderTransactionDetails(doc, results);

  return Buffer.from(doc.output('arraybuffer'));
}

// =============================================================================
// Form 8949 Renderer
// =============================================================================

function renderForm8949Page(
  doc: jsPDF,
  entries: MismatchResult[],
  pageNum: number,
  totalPages: number,
): void {
  const margin = 40;
  const pageWidth = 612; // Letter width in points
  let y = margin;

  // Header
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Form 8949', margin, y);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Department of the Treasury - Internal Revenue Service', margin, y + 12);
  doc.text('Sales and Other Dispositions of Capital Assets', margin, y + 22);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 60, y);

  y += 40;

  // Tax year
  doc.setFontSize(9);
  doc.text(`Tax Year: ${new Date().getFullYear() - 1}`, margin, y);
  y += 15;

  // Part I header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Part I - Short-Term Capital Gains and Losses (Assets Held One Year or Less)', margin, y);
  y += 14;

  // Checkbox indication
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Check Box C: Basis NOT reported to the IRS. [X]', margin, y);
  y += 16;

  // Column headers
  const colWidths = {
    desc: 120,
    dateAcq: 65,
    dateSold: 65,
    proceeds: 70,
    basis: 70,
    adjustment: 65,
    gainLoss: 70,
  };

  const headers = [
    { label: '(a) Description', width: colWidths.desc },
    { label: '(b) Date Acquired', width: colWidths.dateAcq },
    { label: '(c) Date Sold', width: colWidths.dateSold },
    { label: '(d) Proceeds', width: colWidths.proceeds },
    { label: '(e) Cost Basis', width: colWidths.basis },
    { label: '(f) Adjustment', width: colWidths.adjustment },
    { label: '(h) Gain/(Loss)', width: colWidths.gainLoss },
  ];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);

  let x = margin;
  // Draw header row background
  doc.setFillColor(230, 230, 230);
  doc.rect(margin, y - 8, pageWidth - 2 * margin, 18, 'F');

  for (const header of headers) {
    doc.text(header.label, x + 2, y + 4);
    x += header.width;
  }

  y += 18;

  // Draw horizontal line
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  // Data rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  let totalProceeds = 0;
  let totalBasis = 0;
  let totalAdjustment = 0;
  let totalGainLoss = 0;

  for (const entry of entries) {
    if (y > 700) break; // Safety: don't overflow page

    x = margin;

    // (a) Description: e.g. "1.5 BTC"
    const qty = entry.matchedTransaction
      ? entry.matchedTransaction.amount.toFixed(6)
      : '?';
    const desc = `${qty} ${entry.transaction.asset}`;
    doc.text(desc, x + 2, y + 4);
    x += colWidths.desc;

    // (b) Date Acquired: "Various" since we may use multiple lots
    doc.text('Various', x + 2, y + 4);
    x += colWidths.dateAcq;

    // (c) Date Sold
    doc.text(formatDateShort(entry.transaction.saleDate), x + 2, y + 4);
    x += colWidths.dateSold;

    // (d) Proceeds
    const proceeds = entry.transaction.proceeds;
    doc.text(formatMoney(proceeds), x + 2, y + 4);
    x += colWidths.proceeds;

    // (e) Cost or other basis (corrected)
    const basis = entry.actualBasis;
    doc.text(formatMoney(basis), x + 2, y + 4);
    x += colWidths.basis;

    // (f) Adjustment code and amount
    const adjustment = entry.actualBasis - entry.reportedBasis;
    const adjText = adjustment !== 0 ? `B ${formatMoney(adjustment)}` : '-';
    doc.text(adjText, x + 2, y + 4);
    x += colWidths.adjustment;

    // (h) Gain or Loss
    const gainLoss = proceeds - basis;
    doc.text(formatMoney(gainLoss), x + 2, y + 4);

    totalProceeds += proceeds;
    totalBasis += basis;
    totalAdjustment += adjustment;
    totalGainLoss += gainLoss;

    // Row separator
    y += 14;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.25);
    doc.line(margin, y, pageWidth - margin, y);
    y += 2;
  }

  // Totals row
  y += 8;
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  x = margin;
  doc.text('Totals', x + 2, y + 4);
  x += colWidths.desc + colWidths.dateAcq + colWidths.dateSold;
  doc.text(formatMoney(totalProceeds), x + 2, y + 4);
  x += colWidths.proceeds;
  doc.text(formatMoney(totalBasis), x + 2, y + 4);
  x += colWidths.basis;
  doc.text(formatMoney(totalAdjustment), x + 2, y + 4);
  x += colWidths.adjustment;
  doc.text(formatMoney(totalGainLoss), x + 2, y + 4);

  // Footer
  y += 30;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6);
  doc.text(
    'Generated by BasisGuard. This is a draft for review; consult a tax professional before filing.',
    margin,
    y,
  );
  doc.text(
    'Adjustment Code B: Basis reported to you is wrong. The corrected basis is shown in column (e).',
    margin,
    y + 10,
  );
}

// =============================================================================
// Discrepancy Report Renderer
// =============================================================================

function renderReportHeader(doc: jsPDF): void {
  const margin = 40;
  let y = margin;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BasisGuard', margin, y);
  y += 22;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Cost Basis Discrepancy Report', margin, y);
  y += 16;

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
  doc.setTextColor(0, 0, 0);
}

function renderExecutiveSummary(doc: jsPDF, summary: AnalysisSummary): void {
  const margin = 40;
  let y = 120;

  // Section title
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, y);
  y += 20;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const lines = [
    `Total Transactions Analyzed: ${summary.totalTransactions}`,
    `Matches (basis correct): ${summary.matchCount}`,
    `Mismatches (basis incorrect): ${summary.mismatchCount}`,
    `Missing (no exchange record): ${summary.missingCount}`,
    '',
    `Estimated Total Overpayment: ${formatMoney(summary.totalOverpayment)}`,
    `Recommended Cost Basis Method: ${summary.recommendedMethod}`,
  ];

  for (const line of lines) {
    doc.text(line, margin + 10, y);
    y += 14;
  }

  // Overpayment highlight box
  if (summary.totalOverpayment > 0) {
    y += 10;
    doc.setFillColor(220, 255, 220);
    doc.roundedRect(margin, y, 300, 40, 4, 4, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 100, 0);
    doc.text(
      `Potential Tax Savings: ${formatMoney(summary.totalOverpayment)}`,
      margin + 15,
      y + 25,
    );
    doc.setTextColor(0, 0, 0);
  }
}

function renderMethodComparison(doc: jsPDF, summary: AnalysisSummary): void {
  const margin = 40;
  let y = margin;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Cost Basis Method Comparison', margin, y);
  y += 25;

  // Table header
  const colWidths = [120, 100, 100, 110];
  const headers = ['Method', 'Total Basis', 'Tax Owed', 'Overpayment'];

  doc.setFillColor(230, 230, 230);
  doc.rect(margin, y - 10, 430, 18, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  let x = margin;
  for (let i = 0; i < headers.length; i++) {
    doc.text(headers[i], x + 5, y + 2);
    x += colWidths[i];
  }
  y += 16;

  // Data rows
  doc.setFont('helvetica', 'normal');
  const methods: CostBasisMethod[] = ['FIFO', 'LIFO', 'HIFO'];

  for (const method of methods) {
    const mr = summary.methodResults[method];
    x = margin;

    // Highlight recommended method
    if (method === summary.recommendedMethod) {
      doc.setFillColor(240, 250, 240);
      doc.rect(margin, y - 10, 430, 16, 'F');
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }

    const label = method === summary.recommendedMethod ? `${method} (Recommended)` : method;
    doc.text(label, x + 5, y + 2);
    x += colWidths[0];

    doc.text(formatMoney(mr.totalBasis), x + 5, y + 2);
    x += colWidths[1];

    doc.text(formatMoney(mr.totalTaxOwed), x + 5, y + 2);
    x += colWidths[2];

    doc.text(formatMoney(mr.totalOverpayment), x + 5, y + 2);

    y += 18;
  }

  // Explanation
  y += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const explanations = [
    'FIFO (First In, First Out): Sells the oldest acquired lots first.',
    'LIFO (Last In, First Out): Sells the most recently acquired lots first.',
    'HIFO (Highest In, First Out): Sells the highest-cost lots first, minimizing gains.',
    '',
    'The recommended method minimizes your tax liability by maximizing cost basis.',
    'Consult a tax professional before changing your cost basis accounting method.',
  ];

  for (const line of explanations) {
    doc.text(line, margin + 5, y);
    y += 11;
  }
}

function renderTransactionDetails(doc: jsPDF, results: MismatchResult[]): void {
  const margin = 40;
  let y = margin;

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Transaction Details', margin, y);
  y += 25;

  // Column headers
  const colWidths = [70, 55, 70, 70, 70, 60, 70];
  const headers = ['Asset', 'Date', 'Proceeds', 'Reported', 'Actual', 'Diff', 'Status'];

  doc.setFillColor(230, 230, 230);
  doc.rect(margin, y - 10, 465, 18, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  let x = margin;
  for (let i = 0; i < headers.length; i++) {
    doc.text(headers[i], x + 2, y + 2);
    x += colWidths[i];
  }
  y += 16;

  doc.setFont('helvetica', 'normal');

  for (const r of results) {
    if (y > 720) {
      doc.addPage();
      y = margin;

      // Repeat header on new page
      doc.setFillColor(230, 230, 230);
      doc.rect(margin, y - 10, 465, 18, 'F');
      doc.setFont('helvetica', 'bold');
      x = margin;
      for (let i = 0; i < headers.length; i++) {
        doc.text(headers[i], x + 2, y + 2);
        x += colWidths[i];
      }
      y += 16;
      doc.setFont('helvetica', 'normal');
    }

    // Status-based row coloring
    if (r.status === 'mismatch') {
      doc.setFillColor(255, 240, 240);
      doc.rect(margin, y - 8, 465, 14, 'F');
    } else if (r.status === 'missing') {
      doc.setFillColor(255, 255, 230);
      doc.rect(margin, y - 8, 465, 14, 'F');
    }

    x = margin;
    doc.text(r.transaction.asset, x + 2, y + 2);
    x += colWidths[0];

    doc.text(formatDateShort(r.transaction.saleDate), x + 2, y + 2);
    x += colWidths[1];

    doc.text(formatMoney(r.transaction.proceeds), x + 2, y + 2);
    x += colWidths[2];

    doc.text(formatMoney(r.reportedBasis), x + 2, y + 2);
    x += colWidths[3];

    doc.text(formatMoney(r.actualBasis), x + 2, y + 2);
    x += colWidths[4];

    const diff = r.actualBasis - r.reportedBasis;
    doc.text(formatMoney(diff), x + 2, y + 2);
    x += colWidths[5];

    doc.text(r.status.toUpperCase(), x + 2, y + 2);

    y += 16;

    // Separator
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.25);
    doc.line(margin, y - 4, margin + 465, y - 4);
  }

  // Footer
  y += 20;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6);
  doc.text(
    'Generated by BasisGuard. For informational purposes only. This does not constitute tax advice.',
    margin,
    y,
  );
}

// =============================================================================
// Formatting Utilities
// =============================================================================

function formatMoney(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (amount < 0) {
    return `($${formatted})`;
  }
  return `$${formatted}`;
}

function formatDateShort(date: Date | string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'N/A';

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

function addCenteredText(doc: jsPDF, text: string, y: number): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(text);
  doc.text(text, (pageWidth - textWidth) / 2, y);
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
