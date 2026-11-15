// Shared by metadataBase, canonicals, the sitemap and robots.txt. SITE_URL is set by the host;
// the fallback is the production domain so canonicals never point at localhost.
export const siteUrl = process.env.SITE_URL || "https://www.sarahrowlesedd.com"
