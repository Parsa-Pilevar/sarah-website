import type { NextConfig } from "next"
import path from "path"

const publicContentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' cdn.sanity.io",
  "connect-src 'self' *.api.sanity.io formspree.io",
  // Next.js App Router hydrates via inline bootstrap scripts, so script-src can't drop to just 'self'
  "script-src 'self' 'unsafe-inline'",
  // next/font injects its @font-face declarations inline
  "style-src 'self' 'unsafe-inline'",
].join("; ")

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        // Studio is an authenticated internal tool (styled-components inline styles,
        // its own Sanity API/websocket connections) — no CSP or frame restrictions here.
        source: "/studio/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/:path((?!studio).*)",
        headers: [
          { key: "Content-Security-Policy", value: publicContentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ]
  },
}

export default nextConfig
