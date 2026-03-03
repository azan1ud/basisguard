import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProvider } from "@/lib/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "BasisGuard — Don't Overpay on Your Crypto Taxes",
  description:
    "Your 1099-DA is wrong. BasisGuard detects missing cost basis on your crypto tax forms and shows you exactly how much you'd overpay. Fix your Form 8949 in minutes.",
  keywords: [
    "1099-DA",
    "crypto taxes",
    "cost basis",
    "Form 8949",
    "crypto tax calculator",
    "IRS crypto",
    "tax overpayment",
  ],
  openGraph: {
    title: "BasisGuard — Your 1099-DA Is Wrong",
    description:
      "The IRS thinks you owe taxes on 100% of your crypto proceeds. We'll prove your actual cost basis and save you thousands.",
    type: "website",
    url: "https://basisguard.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "BasisGuard",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "url": "https://basisguard.vercel.app",
      "description": "Detects missing cost basis on IRS 1099-DA forms and generates corrected Form 8949 for crypto traders. Save thousands on your crypto taxes.",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "19.99",
        "highPrice": "69.99",
        "priceCurrency": "USD",
        "offerCount": "3"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Avantware",
        "url": "https://avantware.uk"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to Fix Missing Cost Basis on Your 1099-DA",
      "description": "Correct your crypto tax forms in under 2 minutes with BasisGuard.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Upload Your 1099-DA", "text": "Upload your 1099-DA PDF or enter transactions manually. Your data is parsed instantly and never stored." },
        { "@type": "HowToStep", "position": 2, "name": "Connect Your Exchange", "text": "Upload a CSV export from Coinbase, Kraken, Binance, or any exchange so we can find your actual cost basis." },
        { "@type": "HowToStep", "position": 3, "name": "Get Corrected Forms", "text": "BasisGuard compares your data, finds mismatches, and generates a corrected IRS Form 8949 with your real cost basis." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it legal to correct my 1099-DA cost basis?",
          "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The IRS explicitly allows taxpayers to report the correct cost basis on Form 8949, even when the 1099-DA shows a different or missing amount. You check Box B or Box E and enter the accurate basis. This is standard IRS procedure." }
        },
        {
          "@type": "Question",
          "name": "Why is my 1099-DA missing cost basis?",
          "acceptedAnswer": { "@type": "Answer", "text": "For the 2025 tax year, IRS regulations only require brokers to report gross proceeds on Form 1099-DA. Cost basis reporting for digital assets acquired before January 1, 2026 is not mandatory, so most exchanges report $0 or leave it blank." }
        },
        {
          "@type": "Question",
          "name": "What happens if I file with zero cost basis from my 1099-DA?",
          "acceptedAnswer": { "@type": "Answer", "text": "The IRS treats the entire sale proceeds as taxable gain when cost basis is zero. This means you could overpay by thousands of dollars. On average, crypto traders overpay $3,200 when they accept the default zero cost basis." }
        },
        {
          "@type": "Question",
          "name": "Which exchanges are supported?",
          "acceptedAnswer": { "@type": "Answer", "text": "BasisGuard supports 1099-DA forms from Coinbase, Kraken, Binance.US, Gemini, and most major US-regulated exchanges. You can also upload CSV exports from any exchange." }
        },
        {
          "@type": "Question",
          "name": "I already filed my taxes. Can I still fix this?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can file an amended return (Form 1040-X) with the corrected Form 8949 showing your actual cost basis. Many users recover thousands by amending." }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AppProvider>
          {children}
        </AppProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
