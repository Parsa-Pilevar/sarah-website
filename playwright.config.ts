import { defineConfig, devices } from "@playwright/test"

// Next loads .env.local itself, but the Playwright runner does not, and the contact
// spec needs NEXT_PUBLIC_FORMSPREE_ID to build the endpoint it intercepts.
try {
  process.loadEnvFile(".env.local")
} catch {
  // no .env.local (CI); whatever is already in the environment stands
}

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
