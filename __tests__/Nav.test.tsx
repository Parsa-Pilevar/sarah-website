import { describe, expect, test, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }))

vi.mock("next/navigation", () => ({
  usePathname,
}))

import Nav from "@/components/Nav"

describe("Nav", () => {
  beforeEach(() => {
    usePathname.mockReset()
  })

  test("renders a link for every nav item", () => {
    usePathname.mockReturnValue("/")
    render(<Nav />)

    expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /q-art/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /research/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /teaching/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /news/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument()
  })

  test("marks About active only on the exact root path", () => {
    usePathname.mockReturnValue("/")
    render(<Nav />)

    expect(screen.getByRole("link", { name: /^about$/i })).toHaveClass("bg-accent")
    expect(screen.getByRole("link", { name: /research/i })).not.toHaveClass("bg-accent")
  })

  test("does not mark About active on nested paths", () => {
    usePathname.mockReturnValue("/research/2024")
    render(<Nav />)

    expect(screen.getByRole("link", { name: /^about$/i })).not.toHaveClass("bg-accent")
    expect(screen.getByRole("link", { name: /research/i })).toHaveClass("bg-accent")
  })

  test("marks a section active via startsWith for nested routes", () => {
    usePathname.mockReturnValue("/q-art/some-sub-page")
    render(<Nav />)

    expect(screen.getByRole("link", { name: /q-art/i })).toHaveClass("bg-accent")
  })

  test("marks no item active on an unrelated path", () => {
    usePathname.mockReturnValue("/studio")
    render(<Nav />)

    const activeLinks = screen
      .getAllByRole("link")
      .filter((link) => link.className.split(" ").includes("bg-accent"))
    expect(activeLinks).toHaveLength(0)
  })

  test("brand link always points home", () => {
    usePathname.mockReturnValue("/teaching")
    render(<Nav />)

    expect(screen.getByRole("link", { name: /sarah rowles/i })).toHaveAttribute("href", "/")
  })
})
