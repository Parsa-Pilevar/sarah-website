import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found | Sarah Rowles",
}

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Page not found</h1>
      <div className="fade-up-delay">
        <p className="mt-4 max-w-[65ch] text-ink/80 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm text-muted hover:text-accent">
          Back to home
        </Link>
      </div>
    </div>
  )
}
