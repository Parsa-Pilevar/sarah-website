import { test, expect } from "@playwright/test"

test.use({ viewport: { width: 375, height: 812 } })

test.describe("mobile nav at 375px", () => {
  test("all main nav links sit on one row", async ({ page }) => {
    await page.goto("/")
    const links = page.getByRole("navigation", { name: "Main" }).getByRole("listitem")
    await expect(links).toHaveCount(5)
    const tops = await links.evaluateAll((items) => items.map((li) => li.getBoundingClientRect().top))
    expect(new Set(tops).size, `link tops: ${tops.join(", ")}`).toBe(1)
  })

  // Jump links only render when the section has content, so these need the dataset.
  for (const path of ["/research", "/work"]) {
    test(`@content first jump link on ${path} lands below the sticky nav`, async ({ page }) => {
      await page.goto(path)
      const jumpLink = page.getByRole("navigation", { name: "On this page" }).getByRole("link").first()
      const hash = await jumpLink.getAttribute("href")
      await jumpLink.click()
      await expect(page).toHaveURL(new RegExp(`${hash}$`))

      const navBottom = await page
        .getByRole("navigation", { name: "Main" })
        .evaluate((nav) => nav.getBoundingClientRect().bottom)
      await expect
        .poll(() => page.locator(hash!).evaluate((el) => el.getBoundingClientRect().top))
        .toBeGreaterThanOrEqual(navBottom)
    })
  }
})
