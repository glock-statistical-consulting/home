"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface FeedbackRequest {
  id: number
  customer_email: string
  customer_name: string | null
  product_name: string | null
  status: string
  created_at: string
  sent_at: string | null
}

interface FeedbackResponse {
  id: number
  rating: number
  text: string | null
  anonymous: boolean
  visible: boolean
  created_at: string
}

export default function FeedbackDashboard() {
  const [requests, setRequests] = useState<FeedbackRequest[]>([])
  const [responses, setResponses] = useState<FeedbackResponse[]>([])
  const [sending, setSending] = useState<number | null>(null)
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    createClient().then((client) => {
      setSupabase(client)
      loadData(client)
    })
  }, [])

  async function loadData(client: any) {
    const { data: reqs } = await client.from("feedback_requests").select("*").order("created_at", { ascending: false })
    if (reqs) setRequests(reqs)

    const { data: resps } = await client.from("feedback_responses").select("*").order("created_at", { ascending: false })
    if (resps) setResponses(resps)
  }

  async function sendFeedback(requestId: number) {
    setSending(requestId)
    await fetch("/api/feedback/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId }),
    })
    if (supabase) loadData(supabase)
    setSending(null)
  }

  async function toggleVisibility(responseId: number, current: boolean) {
    if (!supabase) return
    await supabase.from("feedback_responses").update({ visible: !current }).eq("id", responseId)
    loadData(supabase)
  }

  const pending = requests.filter((r) => r.status === "pending")
  const sent = requests.filter((r) => r.status === "sent")
  const completed = requests.filter((r) => r.status === "completed")

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "'Segoe UI',Arial,sans-serif" }}>
      <h1 style={{ color: "#1e3a5f", margin: "0 0 24px" }}>Feedback Verwaltung</h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#1e3a5f", fontSize: 18, margin: "0 0 12px" }}>
          Ausstehend ({pending.length})
        </h2>
        {pending.length === 0 && <p style={{ color: "#94a3b8" }}>Keine ausstehenden Anfragen.</p>}
        {pending.map((r) => (
          <div key={r.id} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{r.customer_name || "Unbekannt"}</strong>
              <span style={{ color: "#64748b", marginLeft: 8 }}>{r.customer_email}</span>
              <span style={{ color: "#94a3b8", marginLeft: 8, fontSize: 13 }}>{r.product_name}</span>
            </div>
            <button onClick={() => sendFeedback(r.id)} disabled={sending === r.id} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
              {sending === r.id ? "Sende..." : "Projekt abgeschlossen"}
            </button>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#1e3a5f", fontSize: 18, margin: "0 0 12px" }}>
          Gesendet, warte auf Antwort ({sent.length})
        </h2>
        {sent.map((r) => (
          <div key={r.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, marginBottom: 8, color: "#64748b", fontSize: 14 }}>
            {r.customer_name || "Unbekannt"} &mdash; {r.customer_email} &mdash; gesendet am {r.sent_at ? new Date(r.sent_at).toLocaleDateString() : "?"}
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ color: "#1e3a5f", fontSize: 18, margin: "0 0 12px" }}>
          Eingegangenes Feedback ({completed.length})
        </h2>
        {responses.map((r) => {
          const req = requests.find((x) => x.id === r.request_id)
          return (
            <div key={r.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ color: "#f59e0b", fontSize: 20 }}>
                  {[1,2,3,4,5].map((s) => (s <= r.rating ? "\u2605" : "\u2606")).join(" ")}
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b", cursor: "pointer" }}>
                  <input type="checkbox" checked={r.visible} onChange={() => toggleVisibility(r.id, r.visible)} />
                  Sichtbar
                </label>
              </div>
              {r.text && <p style={{ color: "#334155", fontSize: 14, margin: "0 0 4px" }}>{r.text}</p>}
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
                {req?.customer_name || "Anonym"} &mdash; {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
