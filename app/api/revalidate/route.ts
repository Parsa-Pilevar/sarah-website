import { timingSafeEqual } from "node:crypto"
import { revalidatePath } from "next/cache"

function matches(sent: string, expected: string): boolean {
  const a = Buffer.from(sent)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const sent = request.headers.get("x-revalidate-secret") ?? ""
  if (!secret || !matches(sent, secret)) {
    return new Response("Unauthorized", { status: 401 })
  }
  // next-sanity's cache tags are opaque hashes, so refresh the whole site instead of one page.
  revalidatePath("/", "layout")
  return Response.json({ revalidated: true })
}
