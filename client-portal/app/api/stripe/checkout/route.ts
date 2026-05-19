import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

function shortName(productKey: string | null, customName?: string): string {
  if (customName) return customName.length > 28 ? customName.slice(0, 25) + "..." : customName
  switch (productKey) {
    case "tutoring_single": return "Einzelsitzung"
    case "tutoring_5h": return "5 Std. Paket"
    case "tutoring_10h": return "10 Std. Paket"
    case "library_bundle": return "Library – Komplett"
    case "library_basics": return "Library – Basics"
    case "library_standard": return "Library – Standard"
    case "library_advanced": return "Library – Advanced"
    case "library_all_access": return "Library – All-Access"
    default: return ""
  }
}

function isBooking(productKey: string | null, customAmount: number | null): boolean {
  if (customAmount) return true
  return productKey ? productKey.startsWith("tutoring_") : false
}

export async function POST(req: NextRequest) {
  try {
    const { productKey, customAmount, customName, customDescription, customMetadata, userId, mode, successUrl, cancelUrl } = await req.json()

    const proto = req.headers.get("x-forwarded-proto") || "https"
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "kevinglock.de"
    const origin = `${proto}://${host}`
    const isEmbedded = mode === "embedded"

    const product = customAmount ? null : PRODUCTS[productKey as ProductKey]
    if (!customAmount && !product) {
      return NextResponse.json({ error: "Invalid product key" }, { status: 400 })
    }

    const stripeName = shortName(productKey, customName)
    const stripeDesc = customDescription || product?.description || ""

    const sessionParams: Record<string, unknown> = {
      mode: "payment" as const,
      line_items: customAmount
        ? [{
            price_data: {
              currency: "eur",
              product_data: {
                name: stripeName,
                description: stripeDesc,
              },
              unit_amount: customAmount,
            },
            quantity: 1,
          }]
        : [{
            price_data: {
              currency: "eur",
              product_data: {
                name: stripeName,
                description: stripeDesc,
              },
              unit_amount: product!.price,
            },
            quantity: 1,
          }],
      metadata: {
        ...(productKey ? { productKey } : {}),
        ...(product?.metadata || {}),
        ...(customMetadata || {}),
        ...(userId ? { userId } : {}),
      },
    }

    if (isEmbedded) {
      sessionParams.ui_mode = "embedded_page" as const
      sessionParams.return_url = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    } else {
      if (successUrl) {
        const sep = successUrl.includes("?") ? "&" : "?"
        sessionParams.success_url = `${successUrl}${sep}session_id={CHECKOUT_SESSION_ID}`
      } else {
        sessionParams.success_url = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
      }
      sessionParams.cancel_url = cancelUrl || `${origin}/checkout/cancel`
    }

    if (isBooking(productKey, customAmount)) {
      sessionParams.custom_text = {
        submit: {
          message: "Du erh\u00e4ltst deine Buchungsaufstellung per E-Mail mit einem Link zur Buchung eines freien Slots. Ich melde mich dann zeitnah bei dir.",
        },
      }
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
