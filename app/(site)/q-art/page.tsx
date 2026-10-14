import type { Metadata } from "next"
import type { PortableTextBlock } from "@portabletext/react"
import type { SanityImageSource } from "@sanity/image-url"
import { sanityFetch } from "@/sanity/lib/live"
import { urlFor } from "@/sanity/lib/image"
import PortableText from "@/components/PortableText"
import { safeHref } from "@/lib/safeHref"

export const metadata: Metadata = {
  title: "Q-Art | Sarah Rowles",
}

const QART_QUERY = `*[_id == "qartPage"][0]{ body, image, websiteUrl }`

type QArtData = {
  body?: PortableTextBlock[] | null
  image?: ({ alt?: string; asset?: unknown } & Record<string, unknown>) | null
  websiteUrl?: string | null
}

export default async function QArtPage() {
  const { data } = await sanityFetch({ query: QART_QUERY })
  const qart = (data ?? null) as QArtData | null
  const websiteHref = safeHref(qart?.websiteUrl)

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Q-Art</h1>
      <div className="fade-up-delay mt-8">
        <PortableText value={qart?.body} />
        {qart?.image?.asset ? (
          <img
            src={urlFor(qart.image as unknown as SanityImageSource).width(1200).fit("max").auto("format").url()}
            alt={qart.image.alt || ""}
            className="mt-8 w-full max-w-[65ch] rounded"
          />
        ) : null}
        {websiteHref && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-accent px-1 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:text-ink hover:border-ink"
          >
            Visit the Q-Art website
          </a>
        )}
      </div>
    </div>
  )
}
