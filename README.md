# sarah-website

Academic website for Sarah Rowles. Next.js, Sanity (Studio at /studio), Formspree, Vercel.

Copy `.env.example` to `.env.local` and fill it in. Never commit env files or tokens.

    npm run dev
    npx tsc --noEmit && npm run build && npx vitest run && npx playwright test
