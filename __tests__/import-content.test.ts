import { describe, expect, it } from "vitest"

import { buildDocuments } from "../scripts/sarah-content.mjs"

type Doc = Record<string, unknown> & { _id: string }

const docs = buildDocuments() as Doc[]
const byId = (id: string) => docs.find((doc) => doc._id === id) as Record<string, unknown[]>

function walk(value: unknown, visit: (value: unknown, key: string | null) => void, key: string | null = null) {
  visit(value, key)
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit))
  else if (value && typeof value === "object") {
    for (const [childKey, child] of Object.entries(value)) walk(child, visit, childKey)
  }
}

describe("buildDocuments", () => {
  it("returns the five singletons with the expected counts", () => {
    expect(docs.map((doc) => doc._id)).toEqual([
      "aboutPage",
      "qartPage",
      "researchPage",
      "employmentPage",
      "contactPage",
    ])
    expect(byId("researchPage").publications).toHaveLength(11)
    expect(byId("researchPage").presentations).toHaveLength(17)
    expect(byId("researchPage").networks).toHaveLength(5)
    expect(byId("employmentPage").researchRoles).toHaveLength(11)
    expect(byId("employmentPage").teachingRoles).toHaveLength(4)
    expect(byId("aboutPage").links).toHaveLength(5)
  })

  it("gives every object in an array a _type and a _key unique within that array", () => {
    let keyedArrays = 0
    walk(docs, (value) => {
      if (!Array.isArray(value) || value.length === 0 || typeof value[0] !== "object") return
      if (value === docs) return
      keyedArrays++
      for (const item of value) {
        expect(item).toHaveProperty("_type")
        expect(item).toHaveProperty("_key")
      }
      const keys = value.map((item) => item._key)
      expect(new Set(keys).size).toBe(keys.length)
    })
    expect(keyedArrays).toBeGreaterThan(0)
  })

  it("contains no email addresses or mailto links", () => {
    walk(docs, (value) => {
      if (typeof value !== "string") return
      expect(value).not.toContain("@")
      expect(value.toLowerCase()).not.toContain("mailto")
    })
  })

  it("only uses http or https URLs", () => {
    const urls: string[] = []
    walk(docs, (value, key) => {
      if (typeof value === "string" && (key === "url" || key === "href" || key === "websiteUrl")) urls.push(value)
    })
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) expect(url).toMatch(/^https?:\/\//)
  })

  it("never marks a span as strong", () => {
    walk(docs, (value) => {
      if (value && typeof value === "object" && (value as { _type?: string })._type === "span") {
        expect((value as { marks?: string[] }).marks ?? []).not.toContain("strong")
      }
    })
  })
})
