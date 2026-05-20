import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendFeedbackRequest } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { requestId } = await req.json()
    if (!requestId) {
      return NextResponse.json({ error: "requestId required" }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: request, error } = await supabase
      .from("feedback_requests")
      .select("*")
      .eq("id", requestId)
      .single()

    if (error || !request) {
      return NextResponse.json({ error: "Feedback request not found" }, { status: 404 })
    }

    if (request.status !== "pending") {
      return NextResponse.json({ error: "Already sent" }, { status: 400 })
    }

    const result = await sendFeedbackRequest(
      request.customer_email,
      request.customer_name || "",
      request.product_name || "Projekt",
      request.token,
      "DE"
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    await supabase
      .from("feedback_requests")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", requestId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Feedback send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
