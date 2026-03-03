import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free 1099-DA Cost Basis Calculator | BasisGuard",
  description:
    "Calculate how much you're overpaying on crypto taxes due to missing cost basis on your 1099-DA. Free, no sign-up required.",
  keywords: [
    "1099-DA calculator",
    "crypto tax calculator",
    "cost basis calculator",
    "1099-DA cost basis",
    "crypto tax overpayment",
    "Form 8949 calculator",
  ],
  openGraph: {
    title: "Free 1099-DA Cost Basis Calculator | BasisGuard",
    description:
      "Calculate how much you're overpaying on crypto taxes due to missing cost basis on your 1099-DA. Free, no sign-up required.",
    type: "website",
    url: "https://basisguard.vercel.app/tools/calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "1099-DA Cost Basis Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://basisguard.vercel.app/tools/calculator",
  description:
    "Free calculator to estimate how much you're overpaying on crypto taxes due to missing cost basis on your 1099-DA.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "BasisGuard",
    url: "https://basisguard.vercel.app",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
