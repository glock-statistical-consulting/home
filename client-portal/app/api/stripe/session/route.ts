import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id")
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      productKey: session.metadata?.productKey || null,
      status: session.status,
      customerEmail: session.customer_details?.email || null,
    })
  } catch (error) {
    console.error("Session retrieve error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    )
  }
}
