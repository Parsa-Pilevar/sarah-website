import { describe, expect, test } from "vitest"
import { render } from "@testing-library/react"
import PageSkeleton from "@/components/PageSkeleton"

describe("PageSkeleton", () => {
  test("renders without crashing", () => {
    expect(() => render(<PageSkeleton />)).not.toThrow()
  })

  test("renders pulse placeholders", () => {
    const { container } = render(<PageSkeleton />)
    const pulses = container.querySelectorAll(".animate-pulse")
    expect(pulses.length).toBeGreaterThan(0)
  })
})
