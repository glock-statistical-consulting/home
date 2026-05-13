"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { t, type Lang } from "@/lib/translations"
import { createClient } from "@/lib/supabase/client"

type Tab = "login" | "register" | "reset"

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return "login_error_password_length"
  if (!/[a-z]/.test(pw)) return "login_error_password_lowercase"
  if (!/[A-Z]/.test(pw)) return "login_error_password_uppercase"
  if (!/[0-9]/.test(pw)) return "login_error_password_digit"
  if (!/[^a-zA-Z0-9]/.test(pw)) return "login_error_password_special"
  return null
}

function isRecoveryUrl(): boolean {
  if (typeof window === "undefined") return false
  const hash = window.location.hash
  return hash.includes("type=recovery") || hash.includes("type=invite")
}

export default function LoginPage() {
  const auth = useAuth()
  const [lang, setLang] = useState<Lang>("de")
  const [tab, setTab] = useState<Tab>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [isRecovery, setIsRecovery] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "de" || stored === "en") setLang(stored)
    if (isRecoveryUrl()) {
      setIsRecovery(true)
      setTab("reset")
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (auth.mode.type === "authenticated" && !isRecovery) {
      window.location.href = "/dashboard"
    }
    if (auth.mode.type === "recovery") {
      setIsRecovery(true)
      setTab("reset")
    }
  }, [auth.mode, isRecovery])

  if (!loaded) {
    return <div className="flex min-h-screen items-center justify-center text-gray-400">Laden...</div>
  }

  const tr = (key: string) => t(key, lang)
  const setLangAndStore = (l: Lang) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email) { setError(tr("login_error_required")); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(tr("login_error_email")); return
    }

    if (tab === "reset") {
      if (isRecovery) {
        const pwErr = validatePassword(password)
        if (pwErr) { setError(tr(pwErr)); return }
        setSubmitting(true)
        const err = await auth.updatePassword(password)
        setSubmitting(false)
        if (err) { setError(err.message); return }
        setSuccess(tr("login_password_updated"))
        setTimeout(() => { window.location.href = "/login" }, 2000)
      } else {
        setSubmitting(true)
        const err = await auth.resetPassword(email)
        setSubmitting(false)
        if (err) { setError(err.message); return }
        setSuccess(tr("login_reset_sent"))
        setEmail("")
      }
      return
    }

    if (!password) { setError(tr("login_error_required")); return }

    if (tab === "register") {
      const pwErr = validatePassword(password)
      if (pwErr) { setError(tr(pwErr)); return }
    } else if (password.length < 6) {
      setError(tr("login_error_password")); return
    }

    setSubmitting(true)
    const err = tab === "login"
      ? await auth.signIn(email, password)
      : await auth.signUp(email, password)
    setSubmitting(false)

    if (err) { setError(err.message); return }

    if (tab === "register") {
      setSuccess(tr("login_confirm_email"))
      setPassword("")
    }
  }

  const btnLabel = isRecovery
    ? tr("login_save_password")
    : tab === "reset" ? tr("login_reset")
    : tab === "login" ? tr("login_submit_login")
    : tr("login_submit_register")

  const infoText = isRecovery ? null :
    tab === "reset" ? null :
    tab === "login" ? tr("login_info_text") : tr("login_info_text_alt")

  const infoLink = isRecovery ? tr("login_back_to_login") :
    tab === "reset" ? tr("login_back_to_login") :
    tab === "login" ? tr("login_info_link") : tr("login_info_link_alt")

  const showPassword = tab !== "reset" || isRecovery

  return (
    <div className="flex min-h-screen flex-col bg-[#e8eef3]">
      <header className="flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/img/logo-compact.svg" alt="GSC" className="h-10" />
          <span className="hidden text-sm font-semibold text-[#1e4466] sm:inline">
            Glock Statistical Consulting
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs text-gray-500 hover:text-[#ff6600]">
            {lang === "de" ? "Zurück zur Startseite" : "Back to Home"}
          </a>
          <button
            onClick={() => setLangAndStore("de")}
            className={`text-xs font-semibold ${lang === "de" ? "text-[#ff6600]" : "text-gray-500"}`}
          >
            DE
          </button>
          <span className="text-xs text-gray-400">|</span>
          <button
            onClick={() => setLangAndStore("en")}
            className={`text-xs font-semibold ${lang === "en" ? "text-[#ff6600]" : "text-gray-500"}`}
          >
            EN
          </button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
      <div className="w-full max-w-md rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur">
        <div className="mb-6 flex flex-col items-center gap-2">
          <img src="/img/logo-compact.svg" alt="GSC" className="h-10" />
          <h1 className="text-xl font-bold text-[#1e4466]">
            {tr("login_tab_login")}
          </h1>
        </div>

        {!isRecovery && tab !== "reset" && (
          <div className="mb-6 flex border-b-2 border-gray-300">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess("") }}
                className={`flex-1 pb-2 text-sm font-semibold transition-colors ${
                  tab === t
                    ? "border-b-3 border-[#ff6600] text-[#1e4466]"
                    : "text-gray-400"
                }`}
              >
                {tr(`login_tab_${t}`)}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tr("login_email_placeholder")}
            required
            autoComplete={isRecovery ? "off" : "email"}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#ff6600] focus:outline-none"
          />

          {showPassword && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRecovery ? tr("login_new_password") : tr("login_password_placeholder")}
              required
              autoComplete={isRecovery ? "new-password" : tab === "login" ? "current-password" : "new-password"}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#ff6600] focus:outline-none"
            />
          )}

          {error && <p className="text-center text-xs text-red-600">{error}</p>}
          {success && <p className="text-center text-xs text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-2xl bg-[#ff6600] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "..." : btnLabel}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-500">
          {infoText && <span>{infoText} </span>}
          {infoLink && (
            <button
              onClick={() => {
                if (tab === "reset" || isRecovery) {
                  setTab("login"); setIsRecovery(false)
                } else {
                  setTab(tab === "login" ? "register" : "login")
                }
                setError(""); setSuccess("")
              }}
              className="font-semibold text-[#ff6600] hover:underline"
            >
              {infoLink}
            </button>
          )}
        </div>

        {tab === "login" && !isRecovery && (
          <div className="mt-2 text-center text-sm">
            <button
              onClick={() => { setTab("reset"); setError(""); setSuccess("") }}
              className="font-semibold text-[#ff6600] hover:underline"
            >
              {tr("login_forgot_password")}
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
