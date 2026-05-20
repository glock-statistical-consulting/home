import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

function shortName(productKey: string | null, customName?: string, lang?: string): string {
  if (customName) return customName.length > 28 ? customName.slice(0, 25) + "..." : customName
  const isEn = lang === "en"
  switch (productKey) {
    case "tutoring_single": return isEn ? "Single Session" : "Einzelsitzung"
    case "tutoring_5h": return isEn ? "5 h Package" : "5 Std. Paket"
    case "tutoring_10h": return isEn ? "10 h Package" : "10 Std. Paket"
    case "library_bundle": return "Library \u2013 " + (isEn ? "Full" : "Komplett")
    case "library_basics": return "Library \u2013 Basics"
    case "library_standard": return "Library \u2013 Standard"
    case "library_advanced": return "Library \u2013 Advanced"
    case "library_all_access": return "Library \u2013 All-Access"
    default: return ""
  }
}

function isBooking(productKey: string | null, customAmount: number | null): boolean {
  if (customAmount) return true
  return productKey ? productKey.startsWith("tutoring_") : false
}

export async function POST(req: NextRequest) {
  try {
    const { productKey, customAmount, customName, customDescription, customMetadata, userId, mode, successUrl, cancelUrl, lang } = await req.json()

    const proto = req.headers.get("x-forwarded-proto") || "https"
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "kevinglock.de"
    const origin = `${proto}://${host}`
    const isEmbedded = mode === "embedded"

    const product = customAmount ? null : PRODUCTS[productKey as ProductKey]
    if (!customAmount && !product) {
      return NextResponse.json({ error: "Invalid product key" }, { status: 400 })
    }

    if (customAmount !== undefined && customAmount !== null) {
      if (
        !Number.isInteger(customAmount) ||
        customAmount < 100 ||
        customAmount > 100000
      ) {
        return NextResponse.json(
          { error: "Invalid custom amount" },
          { status: 400 }
        )
      }
    }

    const isEn = lang === "en"
    const stripeName = shortName(productKey, customName, lang)
    const stripeDesc = isEn
      ? (product?.descriptionEn || customDescription || product?.description || "")
      : (customDescription || product?.description || "")

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
        ...(lang ? { lang } : {}),
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
          message: isEn
            ? "You will receive your booking summary via email with a link to book a free slot. I will get back to you promptly."
            : "Du erh\u00e4ltst deine Buchungsaufstellung per E-Mail mit einem Link zur Buchung eines freien Slots. Ich melde mich dann zeitnah bei dir.",
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
