import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contact | Sarah Rowles",
  description: "Get in touch with Sarah Rowles.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:max-w-4xl lg:px-10 xl:max-w-5xl xl:px-16">
      <h1 className="fade-up font-serif text-4xl text-ink">Contact</h1>
      <div className="fade-up-delay">
        <ContactForm />
      </div>
    </div>
  )
}
