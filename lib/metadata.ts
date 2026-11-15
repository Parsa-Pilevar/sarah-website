import type { Metadata } from "next"

export const siteName = "Sarah Rowles EdD"

export const defaultTitle = "Sarah Rowles EdD | Fine art pedagogy researcher"

export const siteDescription =
  "Dr Sarah Rowles is a postdoctoral researcher in higher education fine art pedagogy at Uniarts Helsinki, and Founding Director of Q-Art. Her research looks at art education's role in the production of contemporary artists."

export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dr Sarah Rowles, fine art pedagogy researcher",
}

// Next merges metadata shallowly, so a page that sets openGraph.url would otherwise
// lose the site-wide openGraph fields and the file-based image from app/opengraph-image.tsx.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string
  title?: string
  description: string
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_GB",
      url: path,
      // the root title template doesn't reach openGraph.title, so spell out the full title
      title: title ? `${title} | ${siteName}` : defaultTitle,
      description,
      images: [ogImage],
    },
  }
}
