import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe/server"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

export async function POST(req: NextRequest) {
  try {
    const { productKey, userId, mode, successUrl, cancelUrl } = await req.json()

    const product = PRODUCTS[productKey as ProductKey]
    if (!product) {
      return NextResponse.json({ error: "Invalid product key" }, { status: 400 })
    }

    const origin = req.headers.get("origin") || "http://localhost:3000"
    const isEmbedded = mode === "embedded"

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        productKey: product.key,
        ...(userId ? { userId } : {}),
        ...product.metadata,
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
