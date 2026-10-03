// Shared by metadataBase, the sitemap and robots.txt. SITE_URL is set by the host;
// the localhost fallback keeps local dev and CI builds working without it.
export const siteUrl = process.env.SITE_URL || "http://localhost:3000"
