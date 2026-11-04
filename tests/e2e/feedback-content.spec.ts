import { test, expect } from "@playwright/test"

// These need Sarah's feedback content in the dataset, so they fail until the content
// script has run. Skip them with --grep-invert @content.
test.describe("feedback content", () => {
  test("@content /research shows publication group headings", async ({ page }) => {
    await page.goto("/research")
    await expect(page.locator("#publications").getByRole("heading", { level: 3 }).first()).toBeVisible()
  })

  test("@content /work shows the Enterprise section and jump link", async ({ page }) => {
    await page.goto("/work")
    await expect(page.getByRole("heading", { level: 2, name: "Enterprise" })).toBeVisible()
    await expect(page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Enterprise" })).toBeVisible()
  })
})
