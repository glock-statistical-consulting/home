import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

export async function POST(req: NextRequest) {
  try {
    const { productKey, customAmount, customName, customDescription, customMetadata, userId, mode, successUrl, cancelUrl } = await req.json()

    const origin = req.headers.get("origin") || "http://localhost:3000"
    const isEmbedded = mode === "embedded"

    const product = customAmount ? null : PRODUCTS[productKey as ProductKey]
    if (!customAmount && !product) {
      return NextResponse.json({ error: "Invalid product key" }, { status: 400 })
    }

    const sessionParams = {
      mode: "payment" as const,
      line_items: customAmount
        ? [{
            price_data: {
              currency: "eur",
              product_data: {
                name: customName || "Produkt",
                description: customDescription || undefined,
              },
              unit_amount: customAmount,
            },
            quantity: 1,
          }]
        : [{
            price_data: {
              currency: "eur",
              product_data: {
                name: product!.name,
                description: product!.description,
              },
              unit_amount: product!.price,
            },
            quantity: 1,
          }],
      metadata: {
        ...(productKey ? { productKey } : {}),
        ...(customMetadata || {}),
        ...(userId ? { userId } : {}),
      },
      ...(isEmbedded
        ? {
            ui_mode: "embedded_page" as const,
            return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          }
        : {
            success_url: successUrl || `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${origin}/checkout/cancel`,
          }),
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    if (isEmbedded) {
      return NextResponse.json({ clientSecret: session.client_secret })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
