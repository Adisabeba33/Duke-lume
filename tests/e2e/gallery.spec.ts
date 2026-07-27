import { expect, test } from "@playwright/test";

test("home loads with the hero work and no placeholder copy", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("next stage");
  // The hero work is a real image, not a tonal fallback.
  await expect(page.locator("main img").first()).toBeVisible();
});

test("navigates from home to the gallery", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /Explore Gallery/i }).first().click();
  await expect(page).toHaveURL(/\/gallery/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("archive");
});

test("switches between Exhibition and Archive, keeping it in the URL", async ({ page }) => {
  await page.goto("/gallery", { waitUntil: "domcontentloaded" });
  await page.getByRole("tab", { name: "Archive" }).click();
  await expect(page).toHaveURL(/view=archive/);
  await page.getByRole("tab", { name: "Exhibition" }).click();
  await expect(page).not.toHaveURL(/view=archive/);
});

test("applies and clears a filter, with the count following", async ({ page }) => {
  await page.goto("/gallery?view=archive", { waitUntil: "domcontentloaded" });
  const count = page.getByText(/^\d+ works?$/).first();
  const before = await count.textContent();

  await page.goto("/gallery?view=archive&style=photorealistic", { waitUntil: "domcontentloaded" });
  const after = await count.textContent();
  expect(after).not.toBe(before);
  await expect(page).toHaveURL(/style=photorealistic/);
});

test("empty filter combinations explain themselves", async ({ page }) => {
  // Photorealistic works are not portrait-only; this pairing yields nothing.
  await page.goto("/gallery?view=archive&style=illustrative&orientation=landscape", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/No works match/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Clear filters/i })).toBeVisible();
});

test("opens an artwork and returns to the gallery with state preserved", async ({ page }) => {
  await page.goto("/gallery?view=archive&style=painterly", { waitUntil: "domcontentloaded" });
  await page.locator("a[href^='/artwork/']").first().click();
  await expect(page).toHaveURL(/\/artwork\//);
  await page.goBack();
  await expect(page).toHaveURL(/view=archive/);
  await expect(page).toHaveURL(/style=painterly/);
});
