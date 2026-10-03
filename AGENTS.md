<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## This repository is public

Never commit tokens, API keys, Sanity write tokens, or any `.env` file. `.gitignore`
excludes `.env*` with a single exception for `.env.example`, which holds variable names
and no values. Secrets belong in `.env.local` locally, and in the host's or GitHub's
encrypted settings for deploys and CI. Anything that lands in a commit on a public repo
should be treated as leaked even if a later commit removes it.

## Sanity CMS content trust boundary

CMS content from Sanity must not be treated as trusted input. The Studio editor is the
client (Sarah), not the developer, so content is authored outside this repository and
outside code review.

In practice:

- Render rich text through `<PortableText />`, which builds React elements from
  structured blocks. Do not reach for `dangerouslySetInnerHTML`.
- Never interpolate a CMS string into raw HTML, a `javascript:`/`data:` URL, a `src`,
  or an inline style.
- Validate link fields that come from the CMS before rendering them as an `href` —
  an editor can paste anything.
- If a future field genuinely needs to render HTML, sanitize it before it reaches the
  DOM and say so at the call site.
