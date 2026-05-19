const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kevin@kevinglock.de"
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@kevinglock.de"
const CALENDAR_BOOKING_URL = process.env.CALENDAR_BOOKING_URL || ""

interface SendResult {
  success: boolean
  error?: string
}

export async function sendPurchaseConfirmation(
  customerEmail: string,
  customerName: string,
  productName: string,
  downloadLinks: { name: string; url: string }[],
  bundleUrl?: string,
  bookingSummary?: { label: string; level: string; hours: number; total: number; totalCents: number }
): Promise<SendResult> {
  if (!RESEND_API_KEY) return { success: false, error: "Resend not configured" }

  const downloadHtml = downloadLinks
    .map((d) => `<li style="padding:6px 0;border-bottom:1px solid #e2e8f0;"><a href="${d.url}" style="color:#1e3a5f;text-decoration:none;font-size:14px;display:block;">${d.name}</a></li>`)
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
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f6f9;">
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="background:#1e3a5f;padding:24px 32px;text-align:center;">
                  <img src="https://kevinglock.de/img/logo.svg" alt="GSC" style="height:40px;width:auto;" />
                  <h1 style="color:#ffffff;margin:12px 0 0;font-size:20px;font-weight:600;">Kevin Glock Statistical Consulting</h1>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;padding:32px;border-radius:0 0 8px 8px;">
                  <p style="color:#1e3a5f;font-size:24px;font-weight:700;margin:0 0 8px;">Vielen Dank f&uuml;r deine Bestellung!</p>
                  <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 20px;">Hallo ${customerName || "Kunde"},<br>vielen Dank f&uuml;r deine Bestellung von <strong style="color:#1e3a5f;">${productName}</strong>.</p>

                  ${bookingSummary ? `
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:20px;">
                    <p style="color:#1e3a5f;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Buchungs&uuml;bersicht</p>
                    <table style="width:100%;border-collapse:collapse;font-size:14px;">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Paket</td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-weight:600;text-align:right;">${bookingSummary.label}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Stufe</td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;text-align:right;">${bookingSummary.level}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#64748b;">Stunden</td>
                        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;text-align:right;">${bookingSummary.hours}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#64748b;font-weight:600;">Gesamtbetrag</td>
                        <td style="padding:8px 0;color:#1e3a5f;font-weight:700;font-size:16px;text-align:right;">${(bookingSummary.totalCents / 100).toFixed(2).replace(".", ",")} &euro;</td>
                      </tr>
                    </table>
                    <p style="color:#94a3b8;font-size:12px;margin:8px 0 0;text-align:right;">inkl. MwSt.</p>
                  </div>` : ""}

                  ${downloadLinks.length > 0 ? `
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:20px;">
                    <p style="color:#1e3a5f;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Deine pers&ouml;nlichen Download-Links</p>
                    <ul style="list-style:none;padding:0;margin:0;">
                      ${downloadHtml}
                    </ul>
                  </div>` : ""}

                  ${bundleUrl ? `
                  <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;">
                    <tr>
                      <td style="background:#1e3a5f;border-radius:8px;text-align:center;padding:16px 24px;">
                        <a href="${bundleUrl}" style="color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;display:block;">Alle Downloads als ZIP herunterladen</a>
                      </td>
                    </tr>
                  </table>` : ""}

                  ${bookingSummary && CALENDAR_BOOKING_URL ? `
                  <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;">
                    <tr>
                      <td style="background:#16a34a;border-radius:8px;text-align:center;padding:16px 24px;">
                        <a href="${CALENDAR_BOOKING_URL}" style="color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;display:block;">Jetzt Termin buchen</a>
                      </td>
                    </tr>
                  </table>` : ""}

                  <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:20px;">
                    <p style="color:#4a5568;font-size:14px;line-height:1.6;margin:0 0 4px;">Ben&ouml;tigst du Hilfe bei der Auswertung oder m&ouml;chtest du tiefer einsteigen?</p>
                    <p style="margin:0;"><a href="https://kevinglock.de/nachhilfe.html" style="color:#1e3a5f;font-weight:600;text-decoration:underline;">Nachhilfe-Sitzung buchen</a></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#1e3a5f;padding:20px 32px;text-align:center;border-radius:8px 8px 0 0;">
                  <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0;">Kevin Glock Statistical Consulting Services<br>Sch&ouml;nebecker Stra&szlig;e 76 | 45359 Essen<br><a href="https://kevinglock.de" style="color:#94a3b8;">kevinglock.de</a> | <a href="mailto:glock.gsc@web.de" style="color:#94a3b8;">glock.gsc@web.de</a></p>
                </td>
              </tr>
            </table>
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
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f6f9;">
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="background:#1e3a5f;padding:16px 32px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;font-size:18px;">Neuer Verkauf</h1>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;padding:24px 32px;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Produkt</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-weight:600;font-size:14px;text-align:right;">${productName}</td></tr>
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Betrag</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-weight:600;font-size:14px;text-align:right;">${amountStr}</td></tr>
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Kunde</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-size:14px;text-align:right;">${customerName || "Unbekannt"}</td></tr>
                    <tr><td style="padding:10px 0;color:#64748b;font-size:14px;">E-Mail</td><td style="padding:10px 0;color:#1e3a5f;font-size:14px;text-align:right;">${customerEmail}</td></tr>
                  </table>
                </td>
              </tr>
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

export async function sendInquiryCustomerConfirmation(
  customerEmail: string,
  customerName: string,
  inquiryType: string
): Promise<SendResult> {
  if (!RESEND_API_KEY) return { success: false, error: "Resend not configured" }

  const typeLabel = inquiryType === "consulting" ? "Consulting" : inquiryType === "nachhilfe" ? "Nachhilfe" : "Anfrage"

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
        subject: `Danke f\u00fcr deine ${typeLabel} \u2013 ich melde mich zeitnah`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f6f9;">
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="background:#1e3a5f;padding:24px 32px;text-align:center;">
                  <img src="https://kevinglock.de/img/logo.svg" alt="GSC" style="height:40px;width:auto;" />
                  <h1 style="color:#ffffff;margin:12px 0 0;font-size:20px;font-weight:600;">Kevin Glock Statistical Consulting</h1>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;padding:32px;border-radius:0 0 8px 8px;">
                  <p style="color:#1e3a5f;font-size:24px;font-weight:700;margin:0 0 8px;">Danke f\u00fcr deine ${typeLabel}!</p>
                  <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 20px;">Hallo ${customerName || "Kunde"},</p>
                  <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 16px;">vielen Dank f\u00fcr deine ${typeLabel}. Ich habe sie erhalten und schaue sie mir in Ruhe an.</p>
                  <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 16px;">Du h\u00f6rst in K\u00fcrze von mir \u2013 meist antworte ich innerhalb von 24\u00a0Stunden.</p>
                  <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 4px;">Falls dir bis dahin noch etwas einf\u00e4llt, antworte einfach auf diese E-Mail.</p>
                  <div style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:24px;">
                    <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0;">Beste Gr\u00fc\u00dfe<br><strong style="color:#1e3a5f;">Kevin Glock</strong></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#1e3a5f;padding:20px 32px;text-align:center;border-radius:8px 8px 0 0;">
                  <p style="color:#94a3b8;font-size:12px;line-height:1.6;margin:0;">Kevin Glock Statistical Consulting Services<br>Sch\u00f6nebecker Stra\u00dfe 76 | 45359 Essen<br><a href="https://kevinglock.de" style="color:#94a3b8;">kevinglock.de</a> | <a href="mailto:glock.gsc@web.de" style="color:#94a3b8;">glock.gsc@web.de</a></p>
                </td>
              </tr>
            </table>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("Resend inquiry confirmation error:", body)
      return { success: false, error: body }
    }

    return { success: true }
  } catch (error) {
    console.error("Inquiry confirmation send error:", error)
    return { success: false, error: String(error) }
  }
}

export async function sendInquiryAdminNotification(
  customerEmail: string,
  customerName: string,
  message: string,
  inquiryType: string,
  service?: string
): Promise<SendResult> {
  if (!RESEND_API_KEY) return { success: false, error: "Resend not configured" }

  const typeLabel = inquiryType === "consulting" ? "Consulting" : inquiryType === "nachhilfe" ? "Nachhilfe" : "Allgemein"

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
        subject: `Neue ${typeLabel}-Anfrage von ${customerName || customerEmail}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f6f9;">
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="background:#1e3a5f;padding:16px 32px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;font-size:18px;">Neue ${typeLabel}-Anfrage</h1>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;padding:24px 32px;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Typ</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-weight:600;font-size:14px;text-align:right;">${typeLabel}</td></tr>
                    ${service ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Service</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-weight:600;font-size:14px;text-align:right;">${service}</td></tr>` : ""}
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-size:14px;text-align:right;">${customerName || "Unbekannt"}</td></tr>
                    <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">E-Mail</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#1e3a5f;font-size:14px;text-align:right;">${customerEmail}</td></tr>
                    <tr><td style="padding:10px 0;color:#64748b;font-size:14px;">Nachricht</td><td style="padding:10px 0;color:#1e3a5f;font-size:14px;text-align:right;max-width:320px;word-break:break-word;">${message}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error("Admin inquiry notification error:", body)
      return { success: false, error: body }
    }

    return { success: true }
  } catch (error) {
    console.error("Admin inquiry notification send error:", error)
    return { success: false, error: String(error) }
  }
}
