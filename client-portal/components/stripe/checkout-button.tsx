"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ProductKey } from "@/lib/stripe/products"

interface CheckoutButtonProps {
  productKey: ProductKey
  label?: string
  className?: string
  disabled?: boolean
}

export function CheckoutButton({
  productKey,
  label,
  className = "",
  disabled,
}: CheckoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleCheckout() {
    setLoading(true)
    router.push("/checkout?productKey=" + productKey)
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? "Wird geladen..." : label || "Jetzt kaufen"}
    </button>
  )
}
