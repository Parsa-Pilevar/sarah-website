import type { Metadata } from "next"
import type { PortableTextBlock } from "@portabletext/react"
import { sanityFetch } from "@/sanity/lib/live"
import PortableText from "@/components/PortableText"
import { pageMetadata, siteDescription } from "@/lib/metadata"
import { siteUrl } from "@/lib/site"

export const metadata: Metadata = pageMetadata({ path: "/", description: siteDescription })

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sarah Rowles",
  honorificPrefix: "Dr",
  honorificSuffix: "EdD",
  url: siteUrl,
  jobTitle: "Postdoctoral Researcher",
  affiliation: { "@type": "CollegeOrUniversity", name: "University of the Arts Helsinki" },
  description: siteDescription,
}

const ABOUT_QUERY = `*[_id == "aboutPage"][0]{ bio }`

type AboutData = { bio?: PortableTextBlock[] | null }

export default async function Home() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY })
  const about = (data ?? null) as AboutData | null

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <script
        type="application/ld+json"
        // Built only from the constants above, never CMS content. Escaping "<" stops the
        // JSON from closing the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <h1 className="fade-up font-serif text-4xl text-ink">About</h1>
      <div className="fade-up-delay mt-8">
        <PortableText value={about?.bio} />
      </div>
    </div>
  )
}
