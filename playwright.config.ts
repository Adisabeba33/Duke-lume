import { defineConfig, devices } from "@playwright/test";

/**
 * E2E covers the journeys listed in the brief (§30). It builds and serves the
 * production app, since several behaviours (static params, redirects, image
 * optimisation) only exist in a production build.
 */
// Sandboxes and images that ship their own Chromium can point at it instead of
// downloading one; CI uses the standard `npx playwright install`.
const executablePath = process.env.PW_CHROMIUM_PATH;
const launchOptions = executablePath ? { executablePath } : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3210",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions } },
    // 320px is the narrowest width the brief asks us to support.
    {
      name: "mobile-320",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions,
        viewport: { width: 320, height: 700 },
      },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npm run build && npm run start -- -p 3210",
        url: "http://127.0.0.1:3210",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
