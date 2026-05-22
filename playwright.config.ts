import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    /**
     * Instead of using the development server if it takes a long time to render,
     * or if the development server is not stable, or if it runs out of memory,
     * you can use the production server instead. To do this, replace the command
     * with `bun run start`, and make sure to build the application before running
     * the tests.
     */
    command: "bun run dev",
    url: "http://localhost:3000",
  },
});
