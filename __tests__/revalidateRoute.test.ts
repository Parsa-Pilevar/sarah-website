// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { revalidatePath } from "next/cache"
import { POST } from "@/app/api/revalidate/route"

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }))

function call(headers: Record<string, string> = {}) {
  return POST(new Request("http://localhost/api/revalidate", { method: "POST", headers }))
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.mocked(revalidatePath).mockClear()
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "test-secret")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("rejects a request with no secret", async () => {
    const res = await call()
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("rejects the wrong secret", async () => {
    const res = await call({ "x-revalidate-secret": "nope" })
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("rejects everything when the server has no secret configured", async () => {
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "")
    const res = await call({ "x-revalidate-secret": "" })
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("refreshes the whole site with the right secret", async () => {
    const res = await call({ "x-revalidate-secret": "test-secret" })
    expect(res.status).toBe(200)
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })
})
