import { test, expect, type Page, type Request } from "@playwright/test"

const FORMSPREE_URL = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`

// both forms post to the same Formspree URL, so contact-form tests are scoped to the form
// that has the message field and the sign-up tests to the named sign-up form
const contactForm = (page: Page) => page.locator("form").filter({ has: page.locator("#message") })
const signupForm = (page: Page) => page.getByRole("form", { name: "Newsletter sign-up" })

function multipartFields(request: Request) {
  const body = request.postData() ?? ""
  const fields: Record<string, string> = {}
  for (const match of body.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)\r\n/g)) {
    fields[match[1]] = match[2]
  }
  return fields
}

test.describe("contact page", () => {
  test("renders a heading", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible()
  })

  test("form posts to the configured Formspree endpoint", async ({ page }) => {
    await page.goto("/contact")
    await page.route(FORMSPREE_URL, async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    })
    const requestPromise = page.waitForRequest(FORMSPREE_URL)
    await contactForm(page).getByLabel("Name").fill("Ada Lovelace")
    await contactForm(page).getByLabel("Email").fill("ada@example.com")
    await contactForm(page).getByLabel("Message").fill("Hello, I'd like to get in touch.")
    await contactForm(page).getByRole("button", { name: "Send" }).click()
    const request = await requestPromise
    expect(request.method()).toBe("POST")
    expect(multipartFields(request)).not.toHaveProperty("type")
    await expect(page.getByText("Thanks, your message has been sent.")).toBeVisible()
  })

  test("shows an error message when Formspree fails", async ({ page }) => {
    await page.goto("/contact")
    await page.route(FORMSPREE_URL, async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "fail" }) })
    })
    const requestPromise = page.waitForRequest(FORMSPREE_URL)
    await contactForm(page).getByLabel("Name").fill("Ada Lovelace")
    await contactForm(page).getByLabel("Email").fill("ada@example.com")
    await contactForm(page).getByLabel("Message").fill("Hello, I'd like to get in touch.")
    await contactForm(page).getByRole("button", { name: "Send" }).click()
    await requestPromise
    await expect(page.getByText("Something went wrong. Please try again later.")).toBeVisible()
    await expect(page.getByText("Thanks, your message has been sent.")).toHaveCount(0)
  })

  test("has name, email, and message fields", async ({ page }) => {
    await page.goto("/contact")
    await expect(contactForm(page).getByLabel("Name")).toBeVisible()
    await expect(contactForm(page).getByLabel("Email")).toHaveAttribute("type", "email")
    await expect(contactForm(page).getByLabel("Message")).toBeVisible()
  })

  test("has a hidden honeypot field to deter spam bots", async ({ page }) => {
    await page.goto("/contact")
    const honeypot = contactForm(page).locator('input[name="_gotcha"]')
    await expect(honeypot).toHaveAttribute("type", "hidden")
  })

  test("fields accept user input", async ({ page }) => {
    await page.goto("/contact")
    await contactForm(page).getByLabel("Name").fill("Ada Lovelace")
    await contactForm(page).getByLabel("Email").fill("ada@example.com")
    await contactForm(page).getByLabel("Message").fill("Hello, I'd like to get in touch.")

    await expect(contactForm(page).getByLabel("Name")).toHaveValue("Ada Lovelace")
    await expect(contactForm(page).getByLabel("Email")).toHaveValue("ada@example.com")
    await expect(contactForm(page).getByLabel("Message")).toHaveValue("Hello, I'd like to get in touch.")
  })

  test("submit button is present and enabled", async ({ page }) => {
    await page.goto("/contact")
    const submit = contactForm(page).getByRole("button", { name: "Send" })
    await expect(submit).toBeVisible()
    await expect(submit).toBeEnabled()
  })
})

test.describe("newsletter sign-up", () => {
  test("renders under a Get updates heading with an email field", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.getByRole("heading", { level: 2, name: "Get updates" })).toBeVisible()
    const email = signupForm(page).getByLabel("Email")
    await expect(email).toHaveAttribute("type", "email")
    await expect(email).toHaveAttribute("required", "")
    await expect(signupForm(page).locator('input[name="_gotcha"]')).toHaveAttribute("type", "hidden")
  })

  test("posts email, subject and type to the Formspree endpoint", async ({ page }) => {
    await page.goto("/contact")
    await page.route(FORMSPREE_URL, async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    })
    const requestPromise = page.waitForRequest(FORMSPREE_URL)
    await signupForm(page).getByLabel("Email").fill("ada@example.com")
    await signupForm(page).getByRole("button", { name: "Sign up" }).click()
    const request = await requestPromise
    expect(request.method()).toBe("POST")
    expect(multipartFields(request)).toMatchObject({
      email: "ada@example.com",
      _subject: "Newsletter sign-up",
      type: "newsletter-signup",
    })
    await expect(page.getByText("Thanks, you're signed up.")).toBeVisible()
    await expect(page.getByText("Thanks, your message has been sent.")).toHaveCount(0)
  })

  test("shows an error message when Formspree fails", async ({ page }) => {
    await page.goto("/contact")
    await page.route(FORMSPREE_URL, async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "fail" }) })
    })
    const requestPromise = page.waitForRequest(FORMSPREE_URL)
    await signupForm(page).getByLabel("Email").fill("ada@example.com")
    await signupForm(page).getByRole("button", { name: "Sign up" }).click()
    await requestPromise
    await expect(signupForm(page).getByText("Something went wrong. Please try again later.")).toBeVisible()
    await expect(contactForm(page).getByText("Something went wrong. Please try again later.")).toHaveCount(0)
    await expect(page.getByText("Thanks, you're signed up.")).toHaveCount(0)
  })
})
