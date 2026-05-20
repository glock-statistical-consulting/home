import { NextRequest, NextResponse } from "next/server"
import { createWebhookClient } from "@/lib/supabase/webhook"

export async function POST(req: NextRequest) {
  try {
    const { token, rating, text, anonymous } = await req.json()

    if (!token || !rating) {
      return NextResponse.json({ error: "token and rating required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "rating must be 1-5" }, { status: 400 })
    }

    const supabase = createWebhookClient()

    const { data: request, error: reqError } = await supabase
      .from("feedback_requests")
      .select("id, status")
      .eq("token", token)
      .single()

    if (reqError || !request) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 })
    }

    if (request.status === "completed") {
      return NextResponse.json({ error: "Already submitted" }, { status: 400 })
    }

    const { error: insertError } = await supabase.from("feedback_responses").insert({
      request_id: request.id,
      rating,
      text: text || null,
      anonymous: anonymous !== false,
    })

    if (insertError) {
      console.error("Feedback insert error:", insertError)
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 })
    }

    await supabase
      .from("feedback_requests")
      .update({ status: "completed" })
      .eq("id", request.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Feedback submit error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
