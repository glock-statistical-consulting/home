import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const raw = await req.text()
    const params = new URLSearchParams(raw)
    const data: Record<string, string> = {}
    for (const [k, v] of params) data[k] = v

    if (!data.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Missing env vars", url: !!supabaseUrl, key: !!supabaseKey }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.49.1")
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name || null,
      email: data.email,
      message: data.message || null,
      page: data.booking_card || null,
      booking_type: data.booking_type || null,
      booking_hours: data.booking_hours || null,
      booking_card: data.booking_card || null,
      topic: data.booking_topic || data.topic || data.quote_scope || null,
      timeline: data.quote_timeline || null,
      budget: data.quote_budget || null,
      scope: data.quote_scope || null,
    })

    if (error) throw error

    const redirectUrl = data._next || "https://www.kevinglock.de"
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    })
  } catch (err) {
    const e = err as Record<string, unknown>
    return new Response(JSON.stringify({
      message: e.message,
      code: e.code,
      details: e.details,
      hint: e.hint,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
