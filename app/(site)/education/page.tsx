import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import RoleList, { type Role } from "@/components/RoleList"

export const metadata: Metadata = {
  title: "Education | Sarah Rowles",
}

const EDUCATION_QUERY = `*[_id == "educationPage"][0]{ qualifications, affiliations }`

type EducationData = {
  qualifications?: Role[] | null
  affiliations?: string[] | null
}

export default async function EducationPage() {
  const { data } = await sanityFetch({ query: EDUCATION_QUERY })
  const education = (data ?? null) as EducationData | null

  const qualifications = (education?.qualifications ?? []).filter((q) => q?.title)
  const affiliations = (education?.affiliations ?? []).filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Education</h1>
      <div className="fade-up-delay">
        <RoleList id="qualifications" roles={qualifications} />
        {affiliations.length > 0 && (
          <section id="affiliations" className="mt-12 scroll-mt-24">
            <h2 className="font-serif text-2xl text-ink">Professional affiliations</h2>
            <ul className="mt-4 ml-5 list-disc space-y-1 max-w-[65ch] text-ink/80 leading-relaxed">
              {affiliations.map((affiliation, i) => (
                <li key={i}>{affiliation}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
