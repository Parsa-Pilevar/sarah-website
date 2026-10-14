import type { Metadata } from "next"
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { siteUrl } from "@/lib/site"
import "./globals.css"
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
})
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sarah Rowles",
  description: "Academic site of Sarah Rowles.",
  openGraph: {
    type: "website",
    siteName: "Sarah Rowles",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body className="bg-paper text-ink">{children}</body>
    </html>
  )
}
