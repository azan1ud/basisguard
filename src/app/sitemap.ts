import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://basisguard.vercel.app';

  const staticPages = [
    '',
    '/upload',
    '/connect',
    '/analysis',
    '/checkout',
    '/dashboard',
    '/privacy',
    '/terms',
    '/support',
    '/guides/form-8949',
    '/guides/1099-da',
    '/blog/1099-da-wrong-cost-basis',
    '/blog/fix-missing-cost-basis',
    '/blog/1099-da-vs-1099-b',
    '/blog/form-8949-crypto-guide',
    '/blog/irs-cp2000-crypto',
    '/guides/coinbase-1099-da',
    '/guides/kraken-1099-da',
    '/guides/binance-1099-da',
    '/guides/gemini-1099-da',
    '/compare/basisguard-vs-koinly',
    '/compare/basisguard-vs-cointracker',
    '/compare/basisguard-vs-coinledger',
    '/tools/calculator',
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/blog') ? 0.8 : 0.7,
  }));
}
