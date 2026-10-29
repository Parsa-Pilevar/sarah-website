import { test, expect } from "@playwright/test"

const pages = [
  { path: "/", title: /^Sarah Rowles$/ },
  { path: "/q-art", title: /Q-Art \| Sarah Rowles/ },
  { path: "/research", title: /Research \| Sarah Rowles/ },
  { path: "/employment", title: /Employment \| Sarah Rowles/ },
  { path: "/education", title: /Education \| Sarah Rowles/ },
  { path: "/contact", title: /Contact \| Sarah Rowles/ },
]

test.describe("page smoke tests", () => {
  for (const { path, title } of pages) {
    test(`${path} loads with a 200 response, correct title, and no console errors`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on("console", (msg) => {
        // dev-only React warning, its own text says it never fires in production
        if (msg.type() === "error" && !msg.text().startsWith("eval() is not supported in this environment")) {
          consoleErrors.push(msg.text())
        }
      })
      page.on("pageerror", (err) => consoleErrors.push(err.message))

      const response = await page.goto(path)
      expect(response?.ok()).toBeTruthy()
      await expect(page).toHaveTitle(title)
      expect(consoleErrors, `console errors on ${path}:\n${consoleErrors.join("\n")}`).toEqual([])
    })
  }

  test("unknown route renders a not-found page instead of crashing", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible()
  })

  for (const path of ["/news", "/teaching"]) {
    test(`removed route ${path} returns 404`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)
    })
  }

  // The dataset is empty in dev and CI, so showSpotlight is unset and Spotlight must stay hidden.
  test("/research hides Spotlight when it isn't switched on", async ({ page }) => {
    await page.goto("/research")
    await expect(page.getByRole("heading", { level: 1, name: "Research" })).toBeVisible()
    await expect(page.getByRole("heading", { name: /spotlight/i })).toHaveCount(0)
    await expect(page.locator('a[href="#spotlight"]')).toHaveCount(0)
    await expect(page.locator("#spotlight")).toHaveCount(0)
  })
})
