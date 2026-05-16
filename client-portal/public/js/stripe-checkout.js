async function stripeCheckout(productKey, btn) {
  var originalText = btn.textContent || btn.innerText
  btn.disabled = true
  btn.textContent = "Wird geladen..."

  try {
    var res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productKey: productKey }),
    })

    var data = await res.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      alert("Fehler: " + (data.error || "Unbekannter Fehler"))
    }
  } catch (_) {
    alert("Verbindungsfehler. Bitte versuche es sp\u00e4ter erneut.")
  } finally {
    btn.disabled = false
    btn.textContent = originalText
  }
}
