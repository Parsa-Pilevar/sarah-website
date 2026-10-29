import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import JumpLinks from "@/components/JumpLinks"
import RoleList, { type Role } from "@/components/RoleList"

export const metadata: Metadata = {
  title: "Employment | Sarah Rowles",
}

const EMPLOYMENT_QUERY = `*[_id == "employmentPage"][0]{ researchRoles, teachingRoles, enterpriseRoles }`

type EmploymentData = {
  researchRoles?: Role[] | null
  teachingRoles?: Role[] | null
  enterpriseRoles?: Role[] | null
}

export default async function EmploymentPage() {
  const { data } = await sanityFetch({ query: EMPLOYMENT_QUERY })
  const employment = (data ?? null) as EmploymentData | null

  const researchRoles = (employment?.researchRoles ?? []).filter((r) => r?.title)
  const teachingRoles = (employment?.teachingRoles ?? []).filter((r) => r?.title)
  const enterpriseRoles = (employment?.enterpriseRoles ?? []).filter((r) => r?.title)

  const sections = [
    researchRoles.length > 0 && { id: "research", label: "Research" },
    teachingRoles.length > 0 && { id: "teaching", label: "Teaching" },
    enterpriseRoles.length > 0 && { id: "enterprise", label: "Enterprise" },
  ].filter((s): s is { id: string; label: string } => Boolean(s))

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Employment</h1>
      <div className="fade-up-delay">
        <JumpLinks links={sections} />
        <RoleList id="research" heading="Research" roles={researchRoles} />
        <RoleList id="teaching" heading="Teaching" roles={teachingRoles} />
        <RoleList id="enterprise" heading="Enterprise" roles={enterpriseRoles} />
      </div>
    </div>
  )
}
