import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import JumpLinks from "@/components/JumpLinks"
import { safeHref } from "@/lib/safeHref"

export const metadata: Metadata = {
  title: "Employment | Sarah Rowles",
}

const EMPLOYMENT_QUERY = `*[_id == "employmentPage"][0]{ researchRoles, teachingRoles }`

type Role = {
  _key?: string
  years?: string | null
  title?: string | null
  organisation?: string | null
  description?: string | null
  url?: string | null
}

type EmploymentData = {
  researchRoles?: Role[] | null
  teachingRoles?: Role[] | null
}

function RoleList({ id, heading, roles }: { id: string; heading: string; roles: Role[] }) {
  if (roles.length === 0) return null
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="font-serif text-2xl text-ink">{heading}</h2>
      <ul className="mt-4 flex flex-col gap-6">
        {roles.map((role, i) => {
          const href = safeHref(role.url)
          return (
            <li key={role._key ?? i} className="max-w-[65ch]">
              {role.years && <p className="text-xs uppercase tracking-[0.08em] text-muted">{role.years}</p>}
              <p className="font-medium text-ink">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline underline-offset-2">
                    {role.title}
                  </a>
                ) : (
                  role.title
                )}
              </p>
              {role.organisation && <p className="text-sm text-muted">{role.organisation}</p>}
              {role.description && <p className="mt-2 text-ink/80 leading-relaxed">{role.description}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default async function EmploymentPage() {
  const { data } = await sanityFetch({ query: EMPLOYMENT_QUERY })
  const employment = (data ?? null) as EmploymentData | null

  const researchRoles = (employment?.researchRoles ?? []).filter((r) => r?.title)
  const teachingRoles = (employment?.teachingRoles ?? []).filter((r) => r?.title)

  const sections = [
    researchRoles.length > 0 && { id: "research", label: "Research" },
    teachingRoles.length > 0 && { id: "teaching", label: "Teaching" },
  ].filter((s): s is { id: string; label: string } => Boolean(s))

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Employment</h1>
      <div className="fade-up-delay">
        <JumpLinks links={sections} />
        <RoleList id="research" heading="Research" roles={researchRoles} />
        <RoleList id="teaching" heading="Teaching" roles={teachingRoles} />
      </div>
    </div>
  )
}
