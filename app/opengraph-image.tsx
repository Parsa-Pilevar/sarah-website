import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { ogImage } from "@/lib/metadata"

export const alt = ogImage.alt
export const size = { width: ogImage.width, height: ogImage.height }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const newsreader = await readFile(join(process.cwd(), "assets/fonts/Newsreader-Regular.ttf"))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#6A2C55",
          color: "#FAF9F7",
          fontFamily: "Newsreader",
        }}
      >
        <div style={{ width: 96, height: 6, background: "#8E93B3", marginBottom: 48 }} />
        <div style={{ fontSize: 96, lineHeight: 1.1 }}>Dr Sarah Rowles</div>
        <div style={{ fontSize: 44, marginTop: 24, opacity: 0.85 }}>Fine art pedagogy researcher</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }] },
  )
}
