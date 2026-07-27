import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

/**
 * Flat config (ESLint 9+). Deliberately lean: the Next.js core-web-vitals rules
 * catch the mistakes that actually matter here — unoptimised images, bad links,
 * missing keys — plus the TypeScript basics, without a wall of stylistic noise.
 */
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "src/content/blur.ts", // generated
    ],
  },
  {
    files: ["**/*.{ts,tsx,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    plugins: { "@next/next": nextPlugin, "@typescript-eslint": tseslint.plugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs}"],
    plugins: { "@next/next": nextPlugin },
    rules: { ...nextPlugin.configs.recommended.rules },
  },
];
