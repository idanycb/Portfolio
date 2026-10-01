import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: "node scripts/serve-check.mjs 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    env: {
      RESEND_API_KEY: "",
      TURNSTILE_SECRET_KEY: "",
      CONTACT_TO_EMAIL: "",
      CONTACT_FROM_EMAIL: "",
    },
  },
});
