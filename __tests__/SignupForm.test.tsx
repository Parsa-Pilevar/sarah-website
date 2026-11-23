import { describe, expect, test, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import SignupForm from "@/components/SignupForm"

describe("SignupForm", () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal("fetch", fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function submit(email = "ada@example.com") {
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: email } })
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }))
  }

  test("has a required email field with the expected attributes", () => {
    render(<SignupForm />)
    const email = screen.getByLabelText("Email")
    expect(email).toHaveAttribute("id", "signup-email")
    expect(email).toHaveAttribute("name", "email")
    expect(email).toHaveAttribute("type", "email")
    expect(email).toHaveAttribute("autocomplete", "email")
    expect(email).toBeRequired()
  })

  test("posts email, subject, type and honeypot to Formspree as JSON-accepting FormData", async () => {
    fetchMock.mockResolvedValue({ ok: true })
    render(<SignupForm />)
    submit()

    await screen.findByText("Thanks, you're signed up.")
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/^https:\/\/formspree\.io\/f\//)
    expect(init.method).toBe("POST")
    expect(init.headers).toEqual({ Accept: "application/json" })
    const body = init.body as FormData
    expect(body.get("email")).toBe("ada@example.com")
    expect(body.get("_subject")).toBe("Newsletter sign-up")
    expect(body.get("type")).toBe("newsletter-signup")
    expect(body.has("_gotcha")).toBe(true)
  })

  test("clears the field after a successful sign-up", async () => {
    fetchMock.mockResolvedValue({ ok: true })
    render(<SignupForm />)
    submit()

    await screen.findByText("Thanks, you're signed up.")
    expect(screen.getByLabelText("Email")).toHaveValue("")
  })

  test("shows the error message when Formspree returns a non-ok response", async () => {
    fetchMock.mockResolvedValue({ ok: false })
    render(<SignupForm />)
    submit()

    expect(await screen.findByText("Something went wrong. Please try again later.")).toBeInTheDocument()
    expect(screen.queryByText("Thanks, you're signed up.")).not.toBeInTheDocument()
  })

  test("shows the error message when the request throws", async () => {
    fetchMock.mockRejectedValue(new Error("network down"))
    render(<SignupForm />)
    submit()

    expect(await screen.findByText("Something went wrong. Please try again later.")).toBeInTheDocument()
  })

  test("disables the button while sending", async () => {
    let resolve!: (v: { ok: boolean }) => void
    fetchMock.mockReturnValue(new Promise((r) => (resolve = r)))
    render(<SignupForm />)
    submit()

    expect(await screen.findByRole("button", { name: "Sending..." })).toBeDisabled()
    resolve({ ok: true })
    expect(await screen.findByRole("button", { name: "Sign up" })).toBeEnabled()
  })
})
