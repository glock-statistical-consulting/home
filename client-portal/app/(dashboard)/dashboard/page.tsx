"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/components/auth-context"
import { t, type Lang } from "@/lib/translations"
import { createClient } from "@/lib/supabase/client"

const STORAGE_BUCKET = "uploads"
const MAX_FILE_SIZE = 50 * 1024 * 1024
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/x-rar-compressed",
  "application/json",
  "application/xml",
]

type StoredFile = {
  name: string
  size: number
  created_at: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function sanitizeFilename(name: string): string {
  return name.replace(/[/\\]/g, "_").replace(/[^a-zA-Z0-9._\-\s\(\)]/g, "_") || "unnamed"
}

export default function DashboardPage() {
  const auth = useAuth()
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current
  const [lang, setLang] = useState<Lang>("de")
  const [files, setFiles] = useState<StoredFile[]>([])
  const [toast, setToast] = useState("")
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "de" || stored === "en") setLang(stored)
  }, [])

  const tr = (key: string) => t(key, lang)
  const userEmail =
    auth.mode.type === "authenticated"
      ? auth.mode.user.email ?? ""
      : ""

  const showToast = useCallback(
    (msg: string) => {
      setToast(msg)
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(""), 3000)
    },
    [],
  )

  const loadFiles = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data: items } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(user.id, { sortBy: { column: "created_at", order: "desc" } })

    if (!items) {
      setFiles([])
      return
    }

    setFiles(
      items.map((f) => ({
        name: f.name,
        size: f.metadata?.size ?? 0,
        created_at: f.created_at ?? "",
      })),
    )
  }, [supabase])

  useEffect(() => {
    if (auth.mode.type === "authenticated") loadFiles()
  }, [auth.mode, loadFiles])

  const uploadFiles = useCallback(
    async (fileList: FileList) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      for (const file of Array.from(fileList)) {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          showToast(`${file.name}: Typ nicht erlaubt.`)
          continue
        }
        if (file.size > MAX_FILE_SIZE) {
          showToast(`${file.name}: Datei zu groß (max. 50 MB).`)
          continue
        }

        const safeName = sanitizeFilename(file.name)
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(`${user.id}/${safeName}`, file, { upsert: true })

        if (error) {
          showToast(`${safeName}: ${error.message}`)
        } else {
          showToast(`${safeName} ${tr("dashboard_upload_success")}`)
        }
      }
      loadFiles()
    },
    [supabase, loadFiles, showToast, tr],
  )

  const downloadFile = useCallback(
    async (fileName: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(`${user.id}/${fileName}`)

      if (error || !data) {
        showToast(tr("dashboard_download_error"))
        return
      }

      const url = URL.createObjectURL(data)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    },
    [supabase, showToast, tr],
  )

  const deleteFile = useCallback(
    async (fileName: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([`${user.id}/${fileName}`])

      if (error) {
        showToast(tr("dashboard_delete_error"))
      } else {
        showToast(tr("dashboard_delete_success"))
        loadFiles()
      }
    },
    [supabase, loadFiles, showToast, tr],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
    },
    [uploadFiles],
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  return (
    <div className="min-h-screen bg-[#e8eef3] p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1e4466]">
              {tr("dashboard_title")}
            </h1>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => { setLang("de"); localStorage.setItem("lang", "de") }}
                className={`font-semibold ${lang === "de" ? "text-[#ff6600]" : "text-gray-500"}`}
              >
                DE
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => { setLang("en"); localStorage.setItem("lang", "en") }}
                className={`font-semibold ${lang === "en" ? "text-[#ff6600]" : "text-gray-500"}`}
              >
                EN
              </button>
            </div>
            <button
              onClick={auth.signOut}
              className="rounded-2xl border-2 border-[#1e4466] px-5 py-2 text-sm font-semibold text-[#1e4466] transition hover:bg-[#1e4466] hover:text-white"
            >
              {tr("dashboard_logout")}
            </button>
          </div>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileRef.current?.click()}
          className={`mb-6 cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
            dragging
              ? "border-[#ff6600] bg-orange-50"
              : "border-gray-300 bg-white/50"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files?.length) {
                uploadFiles(e.target.files)
                e.target.value = ""
              }
            }}
          />
          <div className="mb-2 text-3xl">📁</div>
          <p className="text-sm text-gray-500">{tr("dashboard_upload_text")}</p>
        </div>

        <div className="rounded-xl bg-white/50 p-6">
          <h3 className="mb-4 font-semibold text-[#1e4466]">
            {tr("dashboard_files_title")}
          </h3>

          {files.length === 0 ? (
            <p className="py-5 text-center text-sm text-gray-400">
              {tr("dashboard_files_empty")}
            </p>
          ) : (
            <div className="flex flex-col">
              {files.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between gap-3 border-b border-gray-200 py-3 last:border-0"
                >
                  <span className="flex-1 truncate text-sm text-gray-700">
                    {f.name}
                  </span>
                  {f.size > 0 && (
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatSize(f.size)}
                    </span>
                  )}
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => downloadFile(f.name)}
                      className="rounded-xl bg-[#1e4466] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#002244]"
                    >
                      {tr("dashboard_download")}
                    </button>
                    <button
                      onClick={() => deleteFile(f.name)}
                      className="px-2 py-1.5 text-lg text-red-600 transition hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-green-600 px-6 py-3 text-sm text-white shadow-lg transition">
          {toast}
        </div>
      )}
    </div>
  )
}
