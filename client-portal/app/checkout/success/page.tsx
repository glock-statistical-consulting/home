"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getDownloads, DownloadItem } from "@/lib/downloads"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [productKey, setProductKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError("Keine Session-ID gefunden.")
      setLoading(false)
      return
    }

    fetch("/api/stripe/session?session_id=" + sessionId)
      .then((res) => res.json())
      .then((data) => {
        if (data.productKey) {
          setProductKey(data.productKey)
        } else {
          setError(data.error || "Fehler beim Abrufen der Bestellung.")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Verbindungsfehler.")
        setLoading(false)
      })
  }, [sessionId])

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Bestellung wird abgerufen...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Fehler</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-gray-500 text-sm">
          Falls du bereits bezahlt hast, prüfe deine E-Mails für die Download-Links
          oder kontaktiere mich.
        </p>
      </div>
    )
  }

  const product = PRODUCTS[productKey as ProductKey]
  const downloads = getDownloads(productKey || "")

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">&#10003;</div>
        <h1 className="text-3xl font-bold mb-2">Zahlung erfolgreich!</h1>
        <p className="text-gray-600">
          Vielen Dank f&uuml;r deinen Kauf
          {product ? " von \u201e" + product.name + "\u201c" : ""}.
        </p>
      </div>

      {downloads.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Deine Downloads</h2>
          <div className="space-y-3">
            {downloads.map((item: DownloadItem, i: number) => (
              <a
                key={i}
                href={item.fileUrl}
                className="block p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm mb-1">
          Du erh&auml;ltst ebenfalls eine Best&auml;tigung per E-Mail.
        </p>
        <p className="text-gray-500 text-sm">
          Ben&ouml;tigst du Hilfe? <a href="#contact" className="text-blue-600 underline open-modal">Kontaktiere mich</a>.
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <Suspense
        fallback={
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  )
}
