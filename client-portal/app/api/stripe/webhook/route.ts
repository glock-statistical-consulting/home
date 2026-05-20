import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe/server"
import { createWebhookClient } from "@/lib/supabase/webhook"
import { sendPurchaseConfirmation, sendAdminNotification } from "@/lib/email"
import { getDownloads } from "@/lib/downloads"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"
import { signDownload, signBundle, expIn, DOWNLOAD_TTL_DAYS } from "@/lib/download-token"

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
  const product = productKey ? PRODUCTS[productKey as ProductKey] : undefined
  const productName = product?.name || session.metadata?.customName || "Nachhilfe-Paket"
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || ""

  const supabase = createWebhookClient()

  const { data: purchase } = await supabase.from("purchases").insert({
    product_key: productKey || null,
    stripe_session_id: session.id,
    stripe_customer_id: session.customer,
    customer_email: customerEmail,
    customer_name: customerName,
    status: "complete",
    amount_total: session.amount_total,
    created_at: new Date().toISOString(),
  }).select("id").single()

  if (customerEmail && purchase) {
    await supabase.from("feedback_requests").insert({
      purchase_id: purchase.id,
      customer_email: customerEmail,
      customer_name: customerName || null,
      product_name: productName,
    })
  }

  const baseUrl = "https://kevinglock.de"
  const exp = expIn(DOWNLOAD_TTL_DAYS)
  const downloads = productKey ? getDownloads(productKey).map((d) => ({
    name: d.name,
    url: `${baseUrl}/api/download?file=${encodeURIComponent(d.fileUrl)}&exp=${exp}&sig=${signDownload(d.fileUrl, exp)}`,
  })) : []

  const bundleUrl = downloads.length > 1 && productKey
    ? `${baseUrl}/api/download/bundle?productKey=${productKey}&exp=${exp}&sig=${signBundle(productKey, exp)}`
    : undefined

  // Build booking summary for tutoring / custom purchases
  const hours = session.metadata?.hours ? parseInt(session.metadata.hours) : undefined
  const level = session.metadata?.level || ""
  const levelLabel = level ? (level === "einstieg" ? "Einstieg" : level === "absolventen" ? "Absolventen" : level === "dissertation" ? "Dissertation" : level) : ""
  const pkgLabel = productKey === "tutoring_single" ? "Einzelstunde"
    : productKey === "tutoring_5h" ? "5 Stunden"
    : productKey === "tutoring_10h" ? "10 Stunden"
    : hours ? `${hours} Stunden` : "Individuell"

  // Only show booking summary for tutoring/custom (not library)
  const isLibrary = product?.type === "one_time" && product?.metadata?.access === "library"
  const bookingSummary = isLibrary ? undefined : {
    label: pkgLabel,
    level: levelLabel || "Nachhilfe",
    hours: hours || 1,
    total: session.amount_total ? session.amount_total / 100 : 0,
    totalCents: session.amount_total || 0,
  }

  const emailPromises: Promise<unknown>[] = []

  if (customerEmail) {
    emailPromises.push(
      sendPurchaseConfirmation(customerEmail, customerName, productName, downloads, bundleUrl, bookingSummary)
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
      session.amount_total,
      session.metadata?.lang
    ).then((r) => {
      if (!r.success) console.error("Admin notification failed:", r.error)
    })
  )

  await Promise.allSettled(emailPromises)
}
