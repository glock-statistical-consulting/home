import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/login.html", destination: "/login" },
      { source: "/about", destination: "/about.html" },
      { source: "/consulting", destination: "/consulting.html" },
      { source: "/nachhilfe", destination: "/nachhilfe.html" },
      { source: "/impressum", destination: "/impressum.html" },
      { source: "/datenschutz", destination: "/datenschutz.html" },
    ]
  },
  async redirects() {
    return [
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/consulting.html", destination: "/consulting", permanent: true },
      { source: "/nachhilfe.html", destination: "/nachhilfe", permanent: true },
      { source: "/impressum.html", destination: "/impressum", permanent: true },
      { source: "/datenschutz.html", destination: "/datenschutz", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(self)",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https://checkout.stripe.com; img-src 'self' data: https://*.stripe.com; font-src 'self'; connect-src 'self' https://wbgnlnvvmifvcenjlmqp.supabase.co wss://wbgnlnvvmifvcenjlmqp.supabase.co https://api.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com; form-action 'self' https://wbgnlnvvmifvcenjlmqp.supabase.co https://api.stripe.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ]
  },
}

export default nextConfig
