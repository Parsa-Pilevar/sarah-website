import type { Metadata } from "next"
import type { PortableTextBlock } from "@portabletext/react"
import { sanityFetch } from "@/sanity/lib/live"
import PortableText from "@/components/PortableText"
import JumpLinks from "@/components/JumpLinks"
import { safeHref } from "@/lib/safeHref"
import { shouldShowSpotlight } from "@/lib/spotlight"

export const metadata: Metadata = {
  title: "Research | Sarah Rowles",
}

const RESEARCH_QUERY = `*[_id == "researchPage"][0]{
  publications,
  presentations,
  presentationsNote,
  networks,
  showSpotlight,
  spotlightTitle,
  spotlightBody
}`

type ResearchData = {
  publications?: { _key?: string; citation?: PortableTextBlock[] | null; url?: string | null }[] | null
  presentations?: { _key?: string; date?: string | null; title?: string | null; details?: string | null }[] | null
  presentationsNote?: string | null
  networks?: string[] | null
  showSpotlight?: boolean | null
  spotlightTitle?: string | null
  spotlightBody?: PortableTextBlock[] | null
}

const sectionHeading = "font-serif text-2xl text-ink"

export default async function ResearchPage() {
  const { data } = await sanityFetch({ query: RESEARCH_QUERY })
  const research = (data ?? null) as ResearchData | null

  const publications = (research?.publications ?? []).filter((p) => p?.citation?.length)
  const presentations = (research?.presentations ?? []).filter((p) => p?.title)
  const networks = (research?.networks ?? []).filter(Boolean)
  const showSpotlight = shouldShowSpotlight(research)

  const sections = [
    publications.length > 0 && { id: "publications", label: "Publications" },
    presentations.length > 0 && { id: "presentations", label: "Presentations" },
    networks.length > 0 && { id: "networks", label: "Networks" },
    showSpotlight && { id: "spotlight", label: "Spotlight" },
  ].filter((s): s is { id: string; label: string } => Boolean(s))

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Research</h1>
      <div className="fade-up-delay">
        <JumpLinks links={sections} />

        {publications.length > 0 && (
          <section id="publications" className="mt-12 scroll-mt-24">
            <h2 className={sectionHeading}>Publications</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {publications.map((pub, i) => {
                const href = safeHref(pub.url)
                return (
                  <li key={pub._key ?? i}>
                    <PortableText value={pub.citation} />
                    {href && (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-accent hover:text-ink">
                        View publication
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {presentations.length > 0 && (
          <section id="presentations" className="mt-12 scroll-mt-24">
            <h2 className={sectionHeading}>Presentations</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {presentations.map((talk, i) => (
                <li key={talk._key ?? i} className="max-w-[65ch] text-ink/80 leading-relaxed">
                  {talk.date && <p className="text-xs uppercase tracking-[0.08em] text-muted">{talk.date}</p>}
                  <p><em className="italic text-ink">{talk.title}</em></p>
                  {talk.details && <p className="text-sm">{talk.details}</p>}
                </li>
              ))}
            </ul>
            {research?.presentationsNote && (
              <p className="mt-6 max-w-[65ch] text-sm text-muted">{research.presentationsNote}</p>
            )}
          </section>
        )}

        {networks.length > 0 && (
          <section id="networks" className="mt-12 scroll-mt-24">
            <h2 className={sectionHeading}>Networks</h2>
            <ul className="mt-4 ml-5 list-disc space-y-1 max-w-[65ch] text-ink/80 leading-relaxed">
              {networks.map((network, i) => (
                <li key={i}>{network}</li>
              ))}
            </ul>
          </section>
        )}

        {showSpotlight && (
          <section id="spotlight" className="mt-12 scroll-mt-24">
            <h2 className={sectionHeading}>{research?.spotlightTitle || "Spotlight"}</h2>
            <div className="mt-4">
              <PortableText value={research?.spotlightBody} />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
