import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
import { sendPurchaseConfirmation, sendAdminNotification } from "@/lib/email"
import { getDownloads } from "@/lib/downloads"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const productKey = session.metadata?.productKey
  if (!productKey) return

  const supabase = await createClient()

  await supabase.from("purchases").insert({
    product_key: productKey,
    stripe_session_id: session.id,
    stripe_customer_id: session.customer,
    customer_email: session.customer_details?.email,
    customer_name: session.customer_details?.name,
    status: "complete",
    amount_total: session.amount_total,
    created_at: new Date().toISOString(),
  })

  const product = PRODUCTS[productKey as ProductKey]
  const productName = product?.name || productKey
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || ""

  const origin = "https://kevinglock.de"

  const downloads = getDownloads(productKey).map((d) => ({
    name: d.name,
    url: `${origin}${d.fileUrl}`,
  }))

  const emailPromises: Promise<unknown>[] = []

  if (customerEmail) {
    emailPromises.push(
      sendPurchaseConfirmation(customerEmail, customerName, productName, downloads)
        .then((r) => {
          if (!r.success) console.error("Purchase email failed:", r.error)
        })
    )
  }

  emailPromises.push(
    sendAdminNotification(
      customerEmail || "unbekannt",
      customerName,
      productName,
      session.amount_total
    ).then((r) => {
      if (!r.success) console.error("Admin notification failed:", r.error)
    })
  )

  await Promise.allSettled(emailPromises)
}
