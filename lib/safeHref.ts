// CMS link fields are editor-controlled, so only plain web links make it into an href.
const allowedProtocols = new Set(["http:", "https:"])

export function safeHref(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  try {
    const url = new URL(value.trim())
    return allowedProtocols.has(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}
