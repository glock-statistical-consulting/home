"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

type AuthMode =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "authenticated"; user: User; session: Session }
  | { type: "recovery" }

type AuthContext = {
  mode: AuthMode
  signIn: (email: string, password: string) => Promise<AuthError | null>
  signUp: (email: string, password: string, lang?: string) => Promise<AuthError | null>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<AuthError | null>
  updatePassword: (password: string) => Promise<AuthError | null>
}

const AuthCtx = createContext<AuthContext>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode>({ type: "loading" })
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode({ type: "recovery" })
        return
      }

      if (event === "SIGNED_OUT") {
        setMode({ type: "idle" })
        return
      }

      if (session?.user) {
        setMode({ type: "authenticated", user: session.user, session })
        return
      }

      setMode({ type: "idle" })
    })

    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setMode({
          type: "authenticated",
          user: data.user,
          session: null!,
        })
      } else {
        setMode({ type: "idle" })
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return error
    },
    [supabase],
  )

  const signUp = useCallback(
    async (email: string, password: string, lang?: string) => {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { lang: lang || 'de' } } })
      return error
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setMode({ type: "idle" })
  }, [supabase])

  const resetPassword = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      })
      return error
    },
    [supabase],
  )

  const updatePassword = useCallback(
    async (password: string) => {
      const { error } = await supabase.auth.updateUser({ password })
      if (!error) setMode({ type: "idle" })
      return error
    },
    [supabase],
  )

  return (
    <AuthCtx.Provider
      value={{ mode, signIn, signUp, signOut, resetPassword, updatePassword }}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}
