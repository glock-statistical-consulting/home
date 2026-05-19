import { NextRequest, NextResponse } from "next/server"
import { sendInquiryCustomerConfirmation, sendInquiryAdminNotification } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const honeypot = formData.get("_website") as string
    if (honeypot) {
      return NextResponse.redirect(new URL(formData.get("_next") as string || "https://kevinglock.de"), { status: 302 })
    }

    const name = (formData.get("name") as string || "").trim()
    const email = (formData.get("email") as string || "").trim()
    const message = (formData.get("message") as string || "").trim()
    const inquiryType = (formData.get("booking_type") as string || "inquiry").trim()
    const service = (formData.get("booking_service") as string || "").trim()
    const redirectUrl = formData.get("_next") as string || "https://kevinglock.de"

    if (!email || !name) {
      return NextResponse.redirect(new URL(redirectUrl), { status: 302 })
    }

    const results = await Promise.allSettled([
      sendInquiryCustomerConfirmation(email, name, inquiryType),
      sendInquiryAdminNotification(email, name, message, inquiryType, service || undefined),
    ])

    if (results[1].status === "rejected" || (results[1].status === "fulfilled" && !results[1].value.success)) {
      console.error("Admin inquiry notification failed")
    }
    if (results[0].status === "rejected" || (results[0].status === "fulfilled" && !results[0].value.success)) {
      console.error("Customer inquiry confirmation failed")
    }

    return NextResponse.redirect(new URL(redirectUrl), { status: 302 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.redirect(new URL("https://kevinglock.de"), { status: 302 })
  }
}
