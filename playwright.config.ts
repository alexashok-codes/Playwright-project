import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
     ['allure-playwright', { resultsDir: 'allure-results'}]
  ],

  use: {
    headless: false,
    viewport: null, // allow full screen
    launchOptions: {
      args: ['--start-maximized'] // maximize browser
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' } // IMPORTANT FIX
    }
  ],

  expect: {
    timeout: 10000
  }
});
