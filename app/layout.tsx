import type { Metadata } from "next"
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { siteUrl } from "@/lib/site"
import { defaultTitle, siteDescription, siteName } from "@/lib/metadata"
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
  title: {
    default: defaultTitle,
    template: "%s | Sarah Rowles EdD",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
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
