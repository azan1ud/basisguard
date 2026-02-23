import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// POST /api/create-checkout
// Creates a Stripe checkout session and returns the checkout URL.
// Currently returns a mock URL. In production, this would use the Stripe SDK.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier } = body;

    // Validate required fields
    if (!tier) {
      return NextResponse.json(
        { error: "Missing required field: tier" },
        { status: 400 }
      );
    }

    // Tier pricing map
    const tierPricing: Record<string, { priceId: string; amount: number }> = {
      starter: {
        priceId: "price_starter_placeholder",
        amount: 1999,
      },
      pro: {
        priceId: "price_pro_placeholder",
        amount: 3999,
      },
      unlimited: {
        priceId: "price_unlimited_placeholder",
        amount: 6999,
      },
    };

    const selectedTier = tierPricing[tier];
    if (!selectedTier) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}. Must be one of: starter, pro, unlimited` },
        { status: 400 }
      );
    }

    // In production, create a real Stripe checkout session:
    //
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price: selectedTier.priceId,
    //       quantity: 1,
    //     },
    //   ],
    //   customer_email: email,
    //   metadata: {
    //     analysisId: analysisId || "",
    //     tier,
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/report?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    // });
    //
    // return NextResponse.json({ url: session.url });

    // Mock response
    const mockSessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    return NextResponse.json({
      url: `/report?session_id=${mockSessionId}`,
      sessionId: mockSessionId,
      tier,
      amount: selectedTier.amount,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
