import { expect, test } from "@playwright/test";

test("artwork page opens and closes the viewer", async ({ page }) => {
  await page.goto("/artwork/the-sovereign", { waitUntil: "domcontentloaded" });
  const viewer = page.getByRole("dialog", { name: /full image viewer/i });

  await page.getByRole("button", { name: "View full image" }).first().click();
  await expect(viewer).toBeVisible();

  // Arrow keys move between the work and its detail crops.
  await page.keyboard.press("ArrowRight");
  await expect(viewer).toContainText(/detail/i);

  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  // Page scrolling is restored on close.
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("artwork navigation stays inside the collection", async ({ page }) => {
  await page.goto("/artwork/the-sovereign", { waitUntil: "domcontentloaded" });
  const nav = page.getByRole("navigation", { name: "Artwork navigation" });
  await expect(nav).toContainText(/Next in Noble Creatures/i);
});

test("makes no blanket originality claims", async ({ page }) => {
  await page.goto("/artwork/gemstone-bloom", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).not.toContainText("One of one");
  await expect(page.getByText("Availability")).toBeVisible();
});

test("a collection page opens with its works and next-collection link", async ({ page }) => {
  await page.goto("/collections/reliquaries", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Reliquaries");
  await expect(page.locator("a[href^='/artwork/']").first()).toBeVisible();
  await expect(page.getByText(/Next collection/i)).toBeVisible();
});

test("collection pages never show the same image twice", async ({ page }) => {
  for (const slug of ["reliquaries", "noble-creatures", "personae"]) {
    await page.goto(`/collections/${slug}`, { waitUntil: "domcontentloaded" });
    const names = await page.evaluate(() =>
      [...document.querySelectorAll("img")]
        .map(
          (i) =>
            (i.currentSrc || i.src).match(
              /artworks(?:%2F|\/)(?:details(?:%2F|\/))?([a-z0-9-]+)\.jpg/
            )?.[1]
        )
        .filter(Boolean)
    );
    expect(new Set(names).size).toBe(names.length);
  }
});

test("contact form carries the artwork through and validates on the server", async ({ page }) => {
  await page.goto("/contact?artwork=the-orb", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#type")).toHaveValue("Artwork acquisition");
  await expect(page.getByText("The Orb")).toBeVisible();

  // Empty submit surfaces server-side field errors.
  await page.getByRole("button", { name: /Send inquiry/i }).click();
  await expect(page.getByText(/Please tell us your name/i)).toBeVisible();

  // A valid submit keeps what was typed even if delivery is not configured.
  await page.fill("#name", "Test Collector");
  await page.fill("#email", "collector@example.com");
  await page.fill("#message", "I would like to ask about acquiring this work.");
  await page.getByRole("button", { name: /Send inquiry/i }).click();
  await expect(page.locator("#name")).toHaveValue("Test Collector");
});

test("the site is walkable by keyboard", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const reached: string[] = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    reached.push(
      await page.evaluate(() => document.activeElement?.tagName.toLowerCase() ?? "none")
    );
  }
  // Focus actually lands on interactive elements rather than the body.
  expect(reached.filter((t) => t === "a" || t === "button").length).toBeGreaterThan(3);
});
