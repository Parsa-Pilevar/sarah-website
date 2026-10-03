import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News | Sarah Rowles",
}

export default function NewsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">News</h1>
    </div>
  )
}
