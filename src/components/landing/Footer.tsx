import Link from "next/link";

const footerLinks = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "The Problem", href: "#problem" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  resources: [
    { label: "IRS Form 8949 Guide", href: "/guides/form-8949" },
    { label: "Understanding 1099-DA", href: "/guides/1099-da" },
    { label: "Coinbase 1099-DA Guide", href: "/guides/coinbase-1099-da" },
    { label: "Cost Basis Calculator", href: "/tools/calculator" },
    { label: "Blog", href: "/blog/1099-da-wrong-cost-basis" },
    { label: "Contact Support", href: "/support" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 3h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M6 8l1.5 1.5L10 6"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-base font-semibold text-white">
                Basis<span className="text-emerald">Guard</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Stop overpaying on your crypto taxes. Detect missing cost basis on
              your 1099-DA and get corrected forms in minutes.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Legal disclaimer */}
          <div className="rounded-btn bg-white/5 border border-white/10 px-5 py-4 mb-8">
            <p className="text-xs text-white/40 leading-relaxed">
              <span className="font-semibold text-white/50">Disclaimer:</span>{" "}
              BasisGuard is not a tax advisor, CPA, attorney, or financial
              advisor. The information and tools provided are for educational
              and informational purposes only and do not constitute tax, legal,
              or financial advice. You should consult a qualified tax
              professional before making any decisions based on information
              provided by BasisGuard. Tax laws and regulations are subject to
              change. BasisGuard does not guarantee the accuracy, completeness,
              or timeliness of any information provided.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} BasisGuard. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Built by{" "}
              <a
                href="https://avantware.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/70 transition-colors"
              >
                Avantware
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
