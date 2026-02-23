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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
