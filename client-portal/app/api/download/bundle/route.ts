import { NextRequest, NextResponse } from "next/server"
import JSZip from "jszip"
import { getDownloads } from "@/lib/downloads"
import { verifyBundle } from "@/lib/download-token"
import fs from "fs"
import path from "path"

export async function GET(req: NextRequest) {
  const productKey = req.nextUrl.searchParams.get("productKey")
  const exp = parseInt(req.nextUrl.searchParams.get("exp") || "0", 10)
  const sig = req.nextUrl.searchParams.get("sig") || ""
  if (!productKey || !getDownloads(productKey).length) {
    return NextResponse.json({ error: "Missing or invalid productKey" }, { status: 400 })
  }
  if (!verifyBundle(productKey, exp, sig)) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 })
  }
  const items = getDownloads(productKey)

  if (items.length === 0) {
    return NextResponse.json({ error: "No downloads for this product" }, { status: 404 })
  }

  const zip = new JSZip()

  for (const item of items) {
    const filePath = path.join(process.cwd(), "public", item.fileUrl)
    if (fs.existsSync(filePath)) {
      zip.file(path.basename(item.fileUrl), fs.readFileSync(filePath))
    }
  }

  const zipBuf = await zip.generateAsync({ type: "uint8array" })
  const productLabel = productKey.replace(/_/g, "-")

  return new NextResponse(zipBuf as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${productLabel}.zip"`,
      "Content-Length": zipBuf.length.toString(),
    },
  })
}
