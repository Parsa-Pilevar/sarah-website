import type { SanityImageSource } from "@sanity/image-url"
import { FaRegEnvelope } from "react-icons/fa"
import { sanityFetch } from "@/sanity/lib/live"
import { urlFor } from "@/sanity/lib/image"
import LinkIcon from "@/components/LinkIcon"

const SIDEBAR_QUERY = `*[_id == "aboutPage"][0]{
  name,
  title,
  institution,
  department,
  university,
  email,
  links,
  photo
}`

type SidebarData = {
  name?: string
  title?: string
  institution?: string
  department?: string
  university?: string
  email?: string
  links?: { label: string; url: string }[]
  photo?: { alt?: string } & Record<string, unknown>
}

export default async function Sidebar() {
  const { data } = await sanityFetch({ query: SIDEBAR_QUERY })
  // The aboutPage singleton does not exist yet, so every field here is optional.
  const profile = (data ?? null) as SidebarData | null

  return (
    <aside className="w-full shrink-0 border-hairline px-6 pt-6 pb-10 lg:w-80 lg:border-r lg:px-10 lg:pt-10 lg:pb-20">
      <div className="flex flex-col">
        {profile?.photo && (
          <img src={urlFor(profile.photo as unknown as SanityImageSource).width(360).height(480).fit("crop").url()}
            alt={profile.photo.alt || profile.name || "Sarah Rowles"}
            className="mx-auto aspect-[3/4] w-40 rounded border-2 border-accent-gold object-cover"
          />
        )}
        <p className="mt-5 text-left font-serif text-2xl text-ink">{profile?.name || "Sarah Rowles"}</p>
        {profile?.title && <p className="mt-1 text-left text-sm text-muted">{profile.title}</p>}
        {[profile?.institution, profile?.department, profile?.university].filter(Boolean).map((line) => (
          <p key={line} className="text-left text-sm text-muted">{line}</p>
        ))}
        <div className="mt-5 flex flex-col items-start gap-2 text-sm">
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 text-muted hover:text-accent">
              <FaRegEnvelope className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
          )}
          {(profile?.links ?? []).map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-accent">
              <LinkIcon label={link.label} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
