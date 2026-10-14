import { describe, expect, test } from "vitest"
import { shouldShowSpotlight } from "@/lib/spotlight"

const body = [{ _type: "block", children: [{ _type: "span", text: "Hello" }] }]

describe("shouldShowSpotlight", () => {
  test("hidden when there is no research document", () => {
    expect(shouldShowSpotlight(null)).toBe(false)
    expect(shouldShowSpotlight(undefined)).toBe(false)
  })

  test("hidden when showSpotlight is unset, even with content", () => {
    expect(shouldShowSpotlight({ spotlightTitle: "Award", spotlightBody: body })).toBe(false)
  })

  test("hidden when showSpotlight is false", () => {
    expect(shouldShowSpotlight({ showSpotlight: false, spotlightTitle: "Award", spotlightBody: body })).toBe(false)
  })

  test("hidden for truthy values that aren't exactly true", () => {
    expect(shouldShowSpotlight({ showSpotlight: "true" as unknown as boolean, spotlightTitle: "Award" })).toBe(false)
    expect(shouldShowSpotlight({ showSpotlight: 1 as unknown as boolean, spotlightTitle: "Award" })).toBe(false)
  })

  test("hidden when switched on but there's nothing to show", () => {
    expect(shouldShowSpotlight({ showSpotlight: true })).toBe(false)
    expect(shouldShowSpotlight({ showSpotlight: true, spotlightTitle: "   ", spotlightBody: [] })).toBe(false)
  })

  test("shown when switched on with a title", () => {
    expect(shouldShowSpotlight({ showSpotlight: true, spotlightTitle: "Award" })).toBe(true)
  })

  test("shown when switched on with only a body", () => {
    expect(shouldShowSpotlight({ showSpotlight: true, spotlightBody: body })).toBe(true)
  })
})
