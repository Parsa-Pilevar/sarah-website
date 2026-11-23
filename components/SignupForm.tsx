"use client"

import { useState } from "react"

type Status = "idle" | "sending" | "sent" | "error"

const FORMSPREE_URL = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`

export default function SignupForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("sending")
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Newsletter sign-up" className="mt-6 flex max-w-md flex-col gap-6">
      <input type="hidden" name="_gotcha" />
      <input type="hidden" name="_subject" value="Newsletter sign-up" />
      <input type="hidden" name="type" value="newsletter-signup" />
      <div className="flex flex-col gap-1">
        <label htmlFor="signup-email" className="text-xs uppercase tracking-[0.08em] text-muted">Email</label>
        <input id="signup-email" name="email" type="email" autoComplete="email" required className="border-b border-hairline bg-transparent py-2 text-ink focus:border-accent focus:outline-none" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-fit border-b border-accent px-1 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-ink hover:border-ink disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Sign up"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-accent">Thanks, you&apos;re signed up.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again later.</p>
      )}
    </form>
  )
}
