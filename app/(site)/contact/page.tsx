import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { sanityFetch } from "@/sanity/lib/live"
import ContactForm from "@/components/ContactForm"
import SignupForm from "@/components/SignupForm"

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Get in touch with Dr Sarah Rowles using the contact form.",
})

const CONTACT_QUERY = `*[_id == "contactPage"][0]{ intro }`

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: CONTACT_QUERY })
  const intro = (data as { intro?: string | null } | null)?.intro

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Contact</h1>
      <div className="fade-up-delay">
        {intro && <p className="mt-6 max-w-[65ch] whitespace-pre-line text-ink/80 leading-relaxed">{intro}</p>}
        <ContactForm />
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-ink">Get updates</h2>
          <p className="mt-4 max-w-[65ch] text-ink/80 leading-relaxed">
            Leave your email to get occasional updates on Sarah&apos;s research, once or twice a year. Your address is
            only used for these updates, and you can ask to be removed at any time.
          </p>
          <SignupForm />
        </section>
      </div>
    </div>
  )
}
