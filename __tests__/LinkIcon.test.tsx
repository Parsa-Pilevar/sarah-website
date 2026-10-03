import { describe, expect, test } from "vitest"
import { render } from "@testing-library/react"
import LinkIcon from "@/components/LinkIcon"

describe("LinkIcon", () => {
  test("renders LinkedIn icon when label contains 'linkedin'", () => {
    const { container } = render(<LinkIcon label="LinkedIn" />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  test("matches label case-insensitively", () => {
    const lower = render(<LinkIcon label="linkedin" />)
    const upper = render(<LinkIcon label="LINKEDIN" />)
    expect(lower.container.innerHTML).toBe(upper.container.innerHTML)
  })

  test("renders Google Scholar icon when label contains 'scholar'", () => {
    const a = render(<LinkIcon label="Google Scholar" />)
    const b = render(<LinkIcon label="scholar" />)
    expect(a.container.innerHTML).toBe(b.container.innerHTML)
  })

  test("renders ORCID icon when label contains 'orcid'", () => {
    const { container } = render(<LinkIcon label="ORCID" />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  test("falls back to the academic cap icon for unrecognized labels", () => {
    const fallback = render(<LinkIcon label="Personal Website" />)
    const other = render(<LinkIcon label="Blog" />)
    expect(fallback.container.innerHTML).toBe(other.container.innerHTML)
  })

  test("renders different icons for different label categories", () => {
    const linkedin = render(<LinkIcon label="LinkedIn" />)
    const scholar = render(<LinkIcon label="Scholar" />)
    const orcid = render(<LinkIcon label="Orcid" />)
    const fallback = render(<LinkIcon label="Website" />)

    const htmls = [linkedin, scholar, orcid, fallback].map((r) => r.container.innerHTML)
    expect(new Set(htmls).size).toBe(4)
  })

  test("icon svg is hidden from assistive tech", () => {
    const { container } = render(<LinkIcon label="LinkedIn" />)
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
  })

  test("handles empty label without throwing", () => {
    expect(() => render(<LinkIcon label="" />)).not.toThrow()
  })
})
