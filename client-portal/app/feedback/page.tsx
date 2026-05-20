"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function FeedbackForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState("")
  const [anonymous, setAnonymous] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  if (!token) {
    return <p style={{ color: "#4a5568", textAlign: "center" }}>Ungültiger Link.</p>
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h2 style={{ color: "#1e3a5f", margin: "0 0 8px" }}>Danke f&uuml;r dein Feedback!</h2>
        <p style={{ color: "#4a5568", margin: 0 }}>Deine Bewertung hilft mir, besser zu werden.</p>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Bitte w&auml;hle eine Sternebewertung.")
      return
    }
    setSending(true)
    setError("")

    try {
      const res = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rating, text, anonymous }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || "Fehler beim Speichern.")
      }
    } catch {
      setError("Verbindungsfehler.")
    }
    setSending(false)
  }

  return (
    <div>
      <h2 style={{ color: "#1e3a5f", margin: "0 0 4px", fontSize: 22 }}>Wie war deine Erfahrung?</h2>
      <p style={{ color: "#64748b", margin: "0 0 20px", fontSize: 14 }}>
        Dein Feedback hilft mir, meine Dienstleistung zu verbessern.
      </p>

      <div style={{ fontSize: 32, marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              background: "none",
              border: "none",
              fontSize: 32,
              cursor: "pointer",
              color: star <= (hover || rating) ? "#f59e0b" : "#d1d5db",
              transition: "color .15s",
              padding: "0 4px",
            }}
          >
            {star <= (hover || rating) ? "\u2605" : "\u2606"}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Was hat dir gefallen? Was kann ich besser machen? (optional)"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          border: "1px solid #d1d5db",
          borderRadius: 8,
          fontSize: 14,
          fontFamily: "inherit",
          resize: "vertical",
          boxSizing: "border-box",
          marginBottom: 12,
        }}
      />

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#64748b", marginBottom: 20 }}>
        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        Anonym ver&ouml;ffentlichen (kein Name, nur Sterne + Text)
      </label>

      {error && <p style={{ color: "#dc2626", fontSize: 14, margin: "0 0 12px" }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={sending}
        style={{
          background: sending ? "#94a3b8" : "#1e3a5f",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 32px",
          fontSize: 16,
          fontWeight: 600,
          cursor: sending ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        {sending ? "Wird gesendet..." : "Feedback abschicken"}
      </button>
    </div>
  )
}

export default function FeedbackPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f6f9",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      padding: 20,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: 40,
        maxWidth: 440,
        width: "100%",
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
      }}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Lade...</p>}>
          <FeedbackForm />
        </Suspense>
      </div>
    </div>
  )
}
