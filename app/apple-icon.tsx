import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Full-bleed square: iOS applies its own rounded mask to home-screen icons.
export default async function AppleIcon() {
  const newsreader = await readFile(join(process.cwd(), "assets/fonts/Newsreader-Regular.ttf"))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6A2C55",
          color: "#FFFFFF",
          fontFamily: "Newsreader",
          fontSize: 88,
          paddingTop: 20,
        }}
      >
        SR
      </div>
    ),
    { ...size, fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }] },
  )
}
