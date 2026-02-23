import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { PricingTier } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier, sessionId } = body;

    if (!tier) {
      return NextResponse.json(
        { error: "Missing required field: tier" },
        { status: 400 }
      );
    }

    const validTiers: PricingTier[] = ["starter", "pro", "unlimited"];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}. Must be one of: starter, pro, unlimited` },
        { status: 400 }
      );
    }

    const checkoutUrl = await createCheckoutSession(
      tier as PricingTier,
      sessionId || "anonymous"
    );

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout creation error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
