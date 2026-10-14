import { describe, expect, test } from "vitest"
import { safeHref } from "@/lib/safeHref"

describe("safeHref", () => {
  test("allows http and https", () => {
    expect(safeHref("https://example.com/a")).toBe("https://example.com/a")
    expect(safeHref("http://example.com/")).toBe("http://example.com/")
  })

  test("rejects email links so no address ends up on the site", () => {
    expect(safeHref("mailto:someone@example.com")).toBeUndefined()
  })

  test("rejects script and data URLs, including obfuscated ones", () => {
    expect(safeHref("javascript:alert(1)")).toBeUndefined()
    expect(safeHref("  JavaScript:alert(1)")).toBeUndefined()
    expect(safeHref("java\tscript:alert(1)")).toBeUndefined()
    expect(safeHref("data:text/html,<script>alert(1)</script>")).toBeUndefined()
  })

  test("rejects relative paths, garbage and non-strings", () => {
    expect(safeHref("/research")).toBeUndefined()
    expect(safeHref("not a url")).toBeUndefined()
    expect(safeHref("")).toBeUndefined()
    expect(safeHref(null)).toBeUndefined()
    expect(safeHref(undefined)).toBeUndefined()
    expect(safeHref(42)).toBeUndefined()
  })
})
