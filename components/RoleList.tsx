import { safeHref } from "@/lib/safeHref"

export type Role = {
  _key?: string
  years?: string | null
  title?: string | null
  organisation?: string | null
  description?: string | null
  url?: string | null
}

export default function RoleList({ id, heading, roles }: { id: string; heading?: string; roles: Role[] }) {
  if (roles.length === 0) return null
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      {heading && <h2 className="font-serif text-2xl text-ink">{heading}</h2>}
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
