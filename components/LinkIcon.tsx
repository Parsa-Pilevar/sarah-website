import { FaLinkedin } from "react-icons/fa"
import { SiGooglescholar, SiOrcid } from "react-icons/si"
import { HiAcademicCap } from "react-icons/hi2"

export default function LinkIcon({ label }: { label: string }) {
  const key = label.toLowerCase()

  if (key.includes("linkedin")) {
    return <FaLinkedin className="h-4 w-4" aria-hidden="true" />
  }
  if (key.includes("scholar")) {
    return <SiGooglescholar className="h-4 w-4" aria-hidden="true" />
  }
  if (key.includes("orcid")) {
    return <SiOrcid className="h-4 w-4" aria-hidden="true" />
  }

  return <HiAcademicCap className="h-4 w-4" aria-hidden="true" />
}
