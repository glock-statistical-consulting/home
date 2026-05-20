import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { verifyDownload } from "@/lib/download-token"

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file")
  const exp = parseInt(req.nextUrl.searchParams.get("exp") || "0", 10)
  const sig = req.nextUrl.searchParams.get("sig") || ""
  if (!file) {
    return NextResponse.json({ error: "Missing file param" }, { status: 400 })
  }
  if (!verifyDownload(file, exp, sig)) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 })
  }

  const safePath = path.normalize(file).replace(/^(\.\.(\/|\\|$))+/, "")
  const fullPath = path.join(process.cwd(), "public", safePath)

  if (!fullPath.startsWith(path.join(process.cwd(), "public"))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  const buf = fs.readFileSync(fullPath)
  const filename = path.basename(fullPath)

  return new NextResponse(buf as BodyInit, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": buf.length.toString(),
    },
  })
}
