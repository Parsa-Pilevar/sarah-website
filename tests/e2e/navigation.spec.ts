import { test, expect } from "@playwright/test"

const routes = [
  { href: "/", label: "About", heading: "About" },
  { href: "/q-art", label: "Q-Art", heading: "Q-Art" },
  { href: "/research", label: "Research", heading: "Research" },
  { href: "/employment", label: "Employment", heading: "Employment" },
  { href: "/contact", label: "Contact", heading: "Contact" },
]

test.describe("primary navigation", () => {
  for (const route of routes) {
    test(`nav link "${route.label}" navigates to ${route.href}`, async ({ page }) => {
      await page.goto("/")
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: route.label, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${route.href}$`))
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading)
    })
  }

  test("clicking the active nav link highlights it", async ({ page }) => {
    await page.goto("/employment")
    const employmentLink = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Employment", exact: true })
    await expect(employmentLink).toHaveClass(/bg-accent/)

    const aboutLink = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About", exact: true })
    await expect(aboutLink).not.toHaveClass(/bg-accent(?!-)/)
  })

  test("brand link in the nav returns to the home page", async ({ page }) => {
    await page.goto("/employment")
    await page.getByRole("link", { name: /sarah rowles/i }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  test("nav bar persists across all routes", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route.href)
      await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible()
      await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About", exact: true })).toBeVisible()
    }
  })
})
