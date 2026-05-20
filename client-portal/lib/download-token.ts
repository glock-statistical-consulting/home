import crypto from "crypto"

const SECRET = process.env.DOWNLOAD_SIGNING_SECRET || ""

export const DOWNLOAD_TTL_DAYS = 30

function hmac(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex")
}

export function signDownload(file: string, expSeconds: number): string {
  if (!SECRET) throw new Error("DOWNLOAD_SIGNING_SECRET not set")
  return hmac(`file:${file}|exp:${expSeconds}`)
}

export function signBundle(productKey: string, expSeconds: number): string {
  if (!SECRET) throw new Error("DOWNLOAD_SIGNING_SECRET not set")
  return hmac(`bundle:${productKey}|exp:${expSeconds}`)
}

export function verifyDownload(file: string, expSeconds: number, sig: string): boolean {
  if (!SECRET || !sig || !expSeconds) return false
  if (expSeconds * 1000 < Date.now()) return false
  const expected = hmac(`file:${file}|exp:${expSeconds}`)
  return timingSafeEqualHex(expected, sig)
}

export function verifyBundle(productKey: string, expSeconds: number, sig: string): boolean {
  if (!SECRET || !sig || !expSeconds) return false
  if (expSeconds * 1000 < Date.now()) return false
  const expected = hmac(`bundle:${productKey}|exp:${expSeconds}`)
  return timingSafeEqualHex(expected, sig)
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"))
  } catch {
    return false
  }
}

export function expIn(days: number): number {
  return Math.floor(Date.now() / 1000) + days * 86400
}
