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

    const resendKey = Deno.env.get("RESEND_API_KEY")
    if (resendKey) {
      const lines: string[] = []
      if (data.name) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Name</td><td>${escape(data.name)}</td></tr>`)
      lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Email</td><td>${escape(data.email)}</td></tr>`)
      if (data.message) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Nachricht</td><td>${escape(data.message)}</td></tr>`)
      if (data.booking_type) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Typ</td><td>${escape(data.booking_type)}</td></tr>`)
      if (data.booking_card) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Bereich</td><td>${escape(data.booking_card)}</td></tr>`)
      if (data.booking_hours) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Stunden</td><td>${escape(data.booking_hours)}</td></tr>`)
      if (data.booking_topic || data.topic || data.quote_scope) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Thema</td><td>${escape(data.booking_topic || data.topic || data.quote_scope)}</td></tr>`)
      if (data.quote_timeline) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Zeitrahmen</td><td>${escape(data.quote_timeline)}</td></tr>`)
      if (data.quote_budget) lines.push(`<tr><td style="font-weight:600;padding:4px 12px 4px 0">Budget</td><td>${escape(data.quote_budget)}</td></tr>`)

      const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#1e4466">Neue ${data.booking_type === "booking" ? "Buchung" : data.booking_type === "quote" ? "Angebotsanfrage" : "Kontaktanfrage"}</h2>
        <table style="border-collapse:collapse;width:100%">${lines.join("")}</table>
        <hr style="margin:20px 0;border:none;border-top:1px solid #ddd">
        <p style="color:#888;font-size:0.85rem">Gesendet von kevinglock.de – Supabase Edge Function</p>
      </body></html>`

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "glock.gsc@web.de",
            subject: `Neue Nachricht von ${escape(data.name || data.email)}`,
            html,
          }),
        })
      } catch {
        // Email fehlgeschlagen – DB-Eintrag bleibt trotzdem erhalten
      }
    }

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

function escape(s: string): string {
  return s
    .replace(/&/g, "\x26amp;")
    .replace(/</g, "\x26lt;")
    .replace(/>/g, "\x26gt;")
    .replace(/"/g, "\x26quot;")
}
