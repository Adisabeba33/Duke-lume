import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests only — E2E specs run under Playwright, not Vitest.
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
  },
});
