import {defineConfig} from "@playwright/test";

const PORT = 4173;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: {
        browserName: "chromium",
        viewport: {width: 1366, height: 900},
      },
    },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        viewport: {width: 768, height: 1024},
      },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: {width: 390, height: 844},
      },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: `${baseURL}/ru`,
    timeout: 120000,
    reuseExistingServer: true,
  },
});
