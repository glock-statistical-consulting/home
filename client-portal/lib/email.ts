const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kevin@kevinglock.de"
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@kevinglock.de"

interface SendResult {
  success: boolean
  error?: string
}

export async function sendPurchaseConfirmation(
  customerEmail: string,
  customerName: string,
  productName: string,
  downloadLinks: { name: string; url: string }[]
): Promise<SendResult> {
  if (!RESEND_API_KEY) return { success: false, error: "Resend not configured" }

  const downloadHtml = downloadLinks
    .map((d) => `<li><a href="${d.url}" style="color:#2563eb;">${d.name}</a></li>`)
    .join("")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Kevin Glock <${FROM_EMAIL}>`,
        to: customerEmail,
        subject: "Deine Bestellung bei Kevin Glock Statistical Consulting",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h1 style="color:#1e3a5f;">Vielen Dank für deine Bestellung!</h1>
            <p>Hallo ${customerName || "Kunde"},</p>
            <p>du hast <strong>${productName}</strong> erworben.</p>
            ${downloadLinks.length > 0 ? `<p>Hier sind deine Download-Links:</p><ul>${downloadHtml}</ul>` : ""}
            <p>Bei Fragen oder weiterem Unterstützungsbedarf antworte einfach auf diese E-Mail oder buche eine <a href="https://kevinglock.de/nachhilfe.html" style="color:#2563eb;">Nachhilfe-Sitzung</a>.</p>
            <br>
            <p>Viele Grüße,<br>Kevin Glock</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
            <p style="color:#6b7280;font-size:12px;">Kevin Glock Statistical Consulting Services | Schönebecker Straße 76 | 45359 Essen</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("Resend error:", body)
      return { success: false, error: body }
    }

    return { success: true }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: String(error) }
  }
}

export async function sendAdminNotification(
  customerEmail: string,
  customerName: string,
  productName: string,
  amount: number | null
): Promise<SendResult> {
  if (!RESEND_API_KEY) return { success: false, error: "Resend not configured" }

  const amountStr = amount ? `${(amount / 100).toFixed(2)} €` : "unbekannt"

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `GSC Notification <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `Neuer Verkauf: ${productName} - ${amountStr}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Neuer Verkauf</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:600;">Produkt:</td><td>${productName}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Betrag:</td><td>${amountStr}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Kunde:</td><td>${customerName || "Unbekannt"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">E-Mail:</td><td>${customerEmail}</td></tr>
            </table>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("Admin notification error:", body)
      return { success: false, error: body }
    }

    return { success: true }
  } catch (error) {
    console.error("Admin notification send error:", error)
    return { success: false, error: String(error) }
  }
}
