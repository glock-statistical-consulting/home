"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { getStripe } from "@/lib/stripe/client"
import { PRODUCTS, ProductKey } from "@/lib/stripe/products"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productKey = searchParams.get("productKey") as ProductKey | null
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productKey || !PRODUCTS[productKey]) {
      setError("Ungültiges Produkt.")
      return
    }

    fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productKey, mode: "embedded" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError(data.error || "Fehler beim Laden des Checkouts.")
        }
      })
      .catch(() => setError("Verbindungsfehler."))
  }, [productKey])

  if (error) {
    return (
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Fehler</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-6 py-2 rounded"
        >
          Zurück
        </button>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Checkout wird geladen...</p>
      </div>
    )
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={getStripe()}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Suspense
          fallback={
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Wird geladen...</p>
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </div>
    </main>
  )
}
