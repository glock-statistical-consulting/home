async function loadFeedback(containerId) {
  const el = document.getElementById(containerId)
  if (!el) return

  try {
    const res = await fetch("https://kevinglock.de/api/feedback/public")
    const data = await res.json()
    if (!data.feedback || data.feedback.length === 0) {
      el.innerHTML = '<p style="color:#94a3b8;font-size:14px;">Noch kein Feedback vorhanden.</p>'
      return
    }

    const total = data.feedback.length
    const avg = (data.feedback.reduce((s, f) => s + f.rating, 0) / total).toFixed(1)

    let html = `
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:36px;font-weight:700;color:#1e3a5f;">${avg}</div>
        <div style="color:#f59e0b;font-size:24px;margin:4px 0;">${renderStars(Math.round(Number(avg)))}</div>
        <div style="color:#94a3b8;font-size:14px;">${total} Bewertungen</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
    `

    data.feedback.slice(0, 6).forEach((f) => {
      html += `
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
          <div style="color:#f59e0b;font-size:16px;margin-bottom:6px;">${renderStars(f.rating)}</div>
          ${f.text ? `<p style="color:#334155;font-size:14px;margin:0 0 4px;">${escapeHtml(f.text)}</p>` : ""}
          <p style="color:#94a3b8;font-size:12px;margin:0;">${new Date(f.created_at).toLocaleDateString("de-DE")}</p>
        </div>
      `
    })

    html += "</div>"
    el.innerHTML = html
  } catch {
    el.innerHTML = ""
  }
}

function renderStars(n) {
  return "\u2605".repeat(n) + "\u2606".repeat(5 - n)
}

function escapeHtml(str) {
  const div = document.createElement("div")
  div.textContent = str
  return div.innerHTML
}
