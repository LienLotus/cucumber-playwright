import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests-playwright',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['html', { outputFolder: 'test-results/playwright-report', open: 'never' }]
  ],
  fullyParallel: true,
  retries: 1,
  workers: 2
});
