"use client"

import { useAuth } from "@/components/auth-context"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = useAuth()

  useEffect(() => {
    if (
      auth.mode.type !== "loading" &&
      auth.mode.type !== "authenticated"
    ) {
      window.location.href = "/login"
    }
  }, [auth.mode])

  if (auth.mode.type === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        Laden...
      </div>
    )
  }

  if (auth.mode.type !== "authenticated") {
    return null
  }

  return <>{children}</>
}
