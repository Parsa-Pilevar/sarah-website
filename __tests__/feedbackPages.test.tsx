import { describe, expect, test, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"

const { sanityFetch } = vi.hoisted(() => ({ sanityFetch: vi.fn() }))

vi.mock("@/sanity/lib/live", () => ({ sanityFetch }))
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }))

import ResearchPage from "@/app/(site)/research/page"
import EmploymentPage from "@/app/(site)/employment/page"
import EducationPage from "@/app/(site)/education/page"
import Sidebar from "@/components/Sidebar"

const citation = (text: string, href?: string) => [
  {
    _type: "block",
    _key: `b-${text}`,
    markDefs: href ? [{ _type: "link", _key: "l1", href }] : [],
    children: [{ _type: "span", _key: `s-${text}`, text, marks: href ? ["l1"] : [] }],
  },
]

async function renderPage(page: () => Promise<React.ReactElement>, data: unknown) {
  sanityFetch.mockResolvedValue({ data })
  render(await page())
}

function jumpLinkLabels() {
  const nav = screen.queryByRole("navigation", { name: "On this page" })
  return nav ? within(nav).getAllByRole("link").map((a) => a.textContent) : []
}

beforeEach(() => {
  sanityFetch.mockReset()
})

describe("Research publication groups", () => {
  test("renders group headings in stored order and skips empty groups", async () => {
    await renderPage(ResearchPage, {
      publicationGroups: [
        { _key: "g1", heading: "Journal articles", items: [{ _key: "p1", citation: citation("Paper one") }] },
        { _key: "g2", heading: "No items", items: [] },
        { _key: "g3", heading: "Only invalid items", items: [{ _key: "p2", citation: [] }, { _key: "p3" }] },
        { _key: "g4", heading: "   ", items: [{ _key: "p4", citation: citation("Headless") }] },
        { _key: "g5", heading: "Book chapters", items: [{ _key: "p5", citation: citation("Chapter one") }] },
      ],
    })

    const section = document.getElementById("publications")!
    const headings = within(section).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    expect(headings).toEqual(["Journal articles", "Book chapters"])
    expect(screen.queryByText("Headless")).toBeNull()
    expect(jumpLinkLabels()).toEqual(["Publications"])
  })

  test("keeps items in stored order within a group", async () => {
    await renderPage(ResearchPage, {
      publicationGroups: [
        {
          heading: "Articles",
          items: [{ citation: citation("Second stored first") }, { citation: citation("Then this one") }],
        },
      ],
    })

    const items = within(document.getElementById("publications")!).getAllByRole("listitem")
    expect(items.map((li) => li.textContent)).toEqual(["Second stored first", "Then this one"])
  })

  test("renders no Publications section or jump link without groups", async () => {
    await renderPage(ResearchPage, { publicationGroups: [{ heading: "Empty", items: [] }] })
    expect(document.getElementById("publications")).toBeNull()
    expect(screen.queryByRole("heading", { name: "Publications" })).toBeNull()
    expect(jumpLinkLabels()).toEqual([])
  })
})

describe("Employment Enterprise section", () => {
  test("renders after Teaching with its jump link when there are roles", async () => {
    await renderPage(EmploymentPage, {
      researchRoles: [{ title: "Researcher" }],
      teachingRoles: [{ title: "Lecturer" }],
      enterpriseRoles: [{ title: "Consultant", organisation: "Acme" }],
    })

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(["Research", "Teaching", "Enterprise"])
    expect(jumpLinkLabels()).toEqual(["Research", "Teaching", "Enterprise"])
    expect(within(document.getElementById("enterprise")!).getByText("Consultant")).toBeInTheDocument()
  })

  test("renders no Enterprise section or jump link when empty", async () => {
    await renderPage(EmploymentPage, {
      researchRoles: [{ title: "Researcher" }],
      enterpriseRoles: [{ title: null }],
    })

    expect(document.getElementById("enterprise")).toBeNull()
    expect(screen.queryByRole("heading", { name: "Enterprise" })).toBeNull()
    expect(jumpLinkLabels()).toEqual(["Research"])
  })
})

describe("Education page", () => {
  test("renders qualifications and professional affiliations", async () => {
    await renderPage(EducationPage, {
      qualifications: [{ title: "PhD", organisation: "University of Somewhere", years: "2020" }],
      affiliations: ["Royal Society of Something", ""],
    })

    expect(screen.getByRole("heading", { level: 1, name: "Education" })).toBeInTheDocument()
    expect(screen.getByText("PhD")).toBeInTheDocument()
    expect(screen.getByText("University of Somewhere")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Professional affiliations" })).toBeInTheDocument()
    const list = within(document.getElementById("affiliations")!).getAllByRole("listitem")
    expect(list.map((li) => li.textContent)).toEqual(["Royal Society of Something"])
  })

  test("renders only the heading when the document is missing", async () => {
    await renderPage(EducationPage, null)
    expect(screen.getByRole("heading", { level: 1, name: "Education" })).toBeInTheDocument()
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0)
    expect(screen.queryAllByRole("listitem")).toHaveLength(0)
  })
})

describe("external links from CMS data", () => {
  function expectNoReferrer(link: HTMLElement) {
    if (link.getAttribute("target") === "_blank") {
      expect(link.getAttribute("rel")).toBe("noopener noreferrer")
    } else {
      expect(link).toHaveAttribute("referrerpolicy", "no-referrer")
    }
  }

  test("publication urls and PortableText links carry noreferrer", async () => {
    await renderPage(ResearchPage, {
      publicationGroups: [
        {
          heading: "Articles",
          items: [{ citation: citation("Linked citation", "https://example.com/inline"), url: "https://doi.org/10.1/x" }],
        },
      ],
    })

    const pubLink = screen.getByRole("link", { name: "View publication" })
    const inlineLink = screen.getByRole("link", { name: "Linked citation" })
    expect(pubLink).toHaveAttribute("href", "https://doi.org/10.1/x")
    expect(inlineLink).toHaveAttribute("href", "https://example.com/inline")
    expectNoReferrer(pubLink)
    expectNoReferrer(inlineLink)
  })

  test("role urls carry noreferrer on Employment and Education", async () => {
    await renderPage(EmploymentPage, { enterpriseRoles: [{ title: "Consultant", url: "https://acme.example" }] })
    expectNoReferrer(screen.getByRole("link", { name: "Consultant" }))

    await renderPage(EducationPage, { qualifications: [{ title: "PhD", url: "https://uni.example" }] })
    expectNoReferrer(screen.getByRole("link", { name: "PhD" }))
  })

  test("sidebar links carry noreferrer", async () => {
    await renderPage(Sidebar, { links: [{ label: "ORCID", url: "https://orcid.org/0000" }] })
    expectNoReferrer(screen.getByRole("link", { name: "ORCID" }))
  })
})
