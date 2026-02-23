// =============================================================================
// BasisGuard - Stripe Payment Integration
// =============================================================================
// Handles checkout session creation for the three pricing tiers.
//
// Required environment variables:
//   STRIPE_SECRET_KEY       - Stripe secret key (sk_live_... or sk_test_...)
//   STRIPE_WEBHOOK_SECRET   - Webhook endpoint secret (whsec_...)
//   NEXT_PUBLIC_APP_URL     - Base URL of the app (e.g. https://basisguard.com)
//
// Stripe Price IDs must be configured in the PRICING_TIERS below after
// creating the products in the Stripe Dashboard.
// =============================================================================

import Stripe from 'stripe';
import { PricingTier, PricingTierConfig } from './types';

// =============================================================================
// Configuration
// =============================================================================

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY environment variable is not set. Configure it in your .env.local file.',
    );
  }

  return new Stripe(secretKey);
}

function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_APP_URL environment variable is not set. Set it to your app base URL.',
    );
  }
  return url.replace(/\/$/, ''); // Strip trailing slash
}

// =============================================================================
// Pricing Tiers
// =============================================================================

/**
 * Pricing tiers for BasisGuard.
 *
 * After creating products in the Stripe Dashboard, replace the
 * stripePriceId values with your actual Stripe Price IDs.
 */
export const PRICING_TIERS: Record<PricingTier, PricingTierConfig> = {
  free: {
    tier: 'free',
    name: 'Free Preview',
    maxTransactions: 10,
    priceUsd: 0,
    stripePriceId: '',
    features: [
      'Upload 1099-DA PDF',
      'See total overpayment estimate',
      'Preview first 10 transactions',
      'Blurred details (upgrade to unlock)',
    ],
  },
  starter: {
    tier: 'starter',
    name: 'Starter',
    maxTransactions: 100,
    priceUsd: 19.99,
    stripePriceId: process.env.STRIPE_PRICE_STARTER || 'price_starter_placeholder',
    features: [
      'Up to 100 transactions',
      'Full mismatch analysis',
      'FIFO/LIFO/HIFO comparison',
      'Download Form 8949 PDF',
      'Download discrepancy report',
    ],
  },
  pro: {
    tier: 'pro',
    name: 'Pro',
    maxTransactions: 1000,
    priceUsd: 39.99,
    stripePriceId: process.env.STRIPE_PRICE_PRO || 'price_pro_placeholder',
    features: [
      'Up to 1,000 transactions',
      'Everything in Starter',
      'Exchange API connections',
      'Wrapped token & stablecoin detection',
      'Priority support',
    ],
  },
  unlimited: {
    tier: 'unlimited',
    name: 'Unlimited',
    maxTransactions: Infinity,
    priceUsd: 69.99,
    stripePriceId: process.env.STRIPE_PRICE_UNLIMITED || 'price_unlimited_placeholder',
    features: [
      'Unlimited transactions',
      'Everything in Pro',
      'Multi-exchange reconciliation',
      'Historical price enrichment',
      'Audit-ready documentation',
      'Email support',
    ],
  },
};

// =============================================================================
// Public API
// =============================================================================

/**
 * Determine the appropriate pricing tier based on the number of transactions.
 */
export function getTierForTransactionCount(count: number): PricingTier {
  if (count <= 10) return 'free';
  if (count <= 100) return 'starter';
  if (count <= 1000) return 'pro';
  return 'unlimited';
}

/**
 * Get the pricing configuration for a specific tier.
 */
export function getTierConfig(tier: PricingTier): PricingTierConfig {
  return PRICING_TIERS[tier];
}

/**
 * Create a Stripe Checkout Session for the given tier.
 *
 * @param tier - The pricing tier to purchase
 * @param sessionId - The user's Firebase UID or session identifier
 * @returns The Stripe Checkout URL that the user should be redirected to
 */
export async function createCheckoutSession(
  tier: PricingTier,
  sessionId: string,
): Promise<string> {
  if (tier === 'free') {
    throw new Error('Cannot create a checkout session for the free tier.');
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();
  const tierConfig = PRICING_TIERS[tier];

  if (!tierConfig.stripePriceId || tierConfig.stripePriceId.includes('placeholder')) {
    throw new Error(
      `Stripe Price ID for tier "${tier}" is not configured. ` +
      `Create a product in the Stripe Dashboard and set the STRIPE_PRICE_${tier.toUpperCase()} environment variable.`,
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: tierConfig.stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/checkout/cancel`,
    client_reference_id: sessionId,
    metadata: {
      tier,
      userId: sessionId,
      product: 'basisguard',
    },
    allow_promotion_codes: true,
    // Collect billing address for tax purposes
    billing_address_collection: 'required',
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL. Please try again.');
  }

  return session.url;
}

/**
 * Verify a completed checkout session and return the associated metadata.
 * Used in the success callback to confirm payment and unlock the tier.
 *
 * @param checkoutSessionId - The Stripe Checkout Session ID from the URL
 * @returns Tier and userId from the session metadata
 */
export async function verifyCheckoutSession(
  checkoutSessionId: string,
): Promise<{
  tier: PricingTier;
  userId: string;
  customerEmail: string | null;
  amountPaid: number;
  stripeCustomerId: string;
}> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

  if (session.payment_status !== 'paid') {
    throw new Error(
      `Payment not completed. Status: ${session.payment_status}. ` +
      'If you were charged, please contact support.',
    );
  }

  const tier = (session.metadata?.tier || 'starter') as PricingTier;
  const userId = session.metadata?.userId || session.client_reference_id || '';
  const stripeCustomerId = typeof session.customer === 'string'
    ? session.customer
    : session.customer?.id || '';

  return {
    tier,
    userId,
    customerEmail: session.customer_details?.email || null,
    amountPaid: (session.amount_total || 0) / 100, // Convert cents to dollars
    stripeCustomerId,
  };
}

/**
 * Handle a Stripe webhook event. Call this from your API route that receives
 * Stripe webhooks.
 *
 * @param rawBody - The raw request body as a string or Buffer
 * @param signature - The Stripe-Signature header value
 * @returns Parsed event or null if verification fails
 */
export function constructWebhookEvent(
  rawBody: string | Buffer,
  signature: string,
): Stripe.Event {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      'STRIPE_WEBHOOK_SECRET environment variable is not set.',
    );
  }

  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}

/**
 * Get a formatted pricing display for all tiers.
 * Useful for rendering the pricing page.
 */
export function getAllPricingTiers(): PricingTierConfig[] {
  return Object.values(PRICING_TIERS);
}
