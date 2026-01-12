require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Maximum time one test can run (increased for slow-loading pages)
  timeout: parseInt(process.env.TIMEOUT) || 120000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['list']
  ],

  // Shared settings for all projects
  use: {
    // Base URL from environment
    baseURL: process.env.BASE_URL,

    // Browser context options
    headless: process.env.HEADLESS === 'true',

    // Screenshot disabled
    screenshot: 'off',

    // Video on failure
    video: 'retain-on-failure',

    // Collect trace on failure
    trace: 'retain-on-failure',

    // Action timeout
    actionTimeout: 15000,

    // Navigation timeout (increased for slow-loading pages)
    navigationTimeout: 120000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },

    // Uncomment to run tests on other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Output folders
  outputDir: 'test-results/',
});
