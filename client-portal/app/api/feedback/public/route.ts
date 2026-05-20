import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from("feedback_responses")
      .select("rating, text, created_at")
      .eq("visible", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Feedback public select error:", error)
      return NextResponse.json({ error: "Failed to load feedback" }, { status: 500 })
    }

    return NextResponse.json({ feedback: data || [] })
  } catch (error) {
    console.error("Feedback public error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
