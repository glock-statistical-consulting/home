async function loadFeedback(containerId) {
  const el = document.getElementById(containerId)
  if (!el) { console.log("feedback: container not found"); return }

  try {
    const res = await fetch("/api/feedback/public")
    if (!res.ok) { console.log("feedback: API error", res.status); return }
    const data = await res.json()
    if (!data.feedback || data.feedback.length === 0) return

    const items = data.feedback.filter((f) => f.rating >= 3)
    if (items.length === 0) return

    const isMobile = window.innerWidth <= 700
    const perView = isMobile ? 1 : 3
    const visibleCount = Math.min(items.length, perView)

    let cards = ""
    items.forEach((f) => {
      cards += `
        <div class="f-card">
          <div class="f-stars">${renderStars(f.rating)}</div>
          ${f.text ? `<p class="f-text">${escapeHtml(f.text)}</p>` : ""}
          <div class="f-date">${new Date(f.created_at).toLocaleDateString("de-DE")}</div>
        </div>
      `
    })

    const duplicated = cards + cards

    const cardW = isMobile ? "calc(100vw - 40px)" : "280px"

    el.innerHTML = `
      <style>
        #feedback-marquee { overflow:hidden; width:100%; }
        #feedback-track { display:flex; gap:16px; width:max-content; animation: scrollFeedback ${items.length * 8}s linear infinite; }
        .f-card { flex-shrink:0; width:${cardW}; background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; box-sizing:border-box; }
        .f-stars { color:#f59e0b; font-size:18px; margin-bottom:8px; white-space:nowrap; }
        .f-text { color:#334155; font-size:14px; line-height:1.5; margin:0; word-break:break-word; }
        .f-date { color:#94a3b8; font-size:11px; margin-top:10px; }
        @keyframes scrollFeedback { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        #feedback-marquee:hover #feedback-track { animation-play-state:paused; }
      </style>
      <div id="feedback-marquee"><div id="feedback-track">${duplicated}</div></div>
    `
  } catch (e) {
    console.log("feedback: error", e)
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
