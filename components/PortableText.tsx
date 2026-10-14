import type { SanityImageSource } from "@sanity/image-url"
import {
  PortableText as BasePortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import { safeHref } from "@/lib/safeHref"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 first:mt-0 max-w-[65ch] text-ink/80 leading-relaxed">{children}</p>,
    h3: ({ children }) => <h3 className="mt-8 font-serif text-xl text-ink">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 ml-5 max-w-[65ch] list-disc space-y-1 text-ink/80 leading-relaxed">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 ml-5 max-w-[65ch] list-decimal space-y-1 text-ink/80 leading-relaxed">{children}</ol>,
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ value, children }) => {
      const href = safeHref(value?.href)
      if (!href) return <>{children}</>
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-ink">
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <img
          src={urlFor(value as SanityImageSource).width(1200).fit("max").auto("format").url()}
          alt={typeof value.alt === "string" ? value.alt : ""}
          className="mt-6 w-full max-w-[65ch] rounded"
        />
      )
    },
  },
}

export default function PortableText({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value?.length) return null
  return <BasePortableText value={value} components={components} />
}
