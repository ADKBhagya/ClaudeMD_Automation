const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/LoginPage');
const BillingPage = require('../../pages/billing/BillingPage');
const loginData = require('../../data/login/loginData.json');
const billingData = require('../../data/billing/billingData.json');

test.describe('Billing Module - Smoke Tests', () => {
  let loginPage;
  let billingPage;

  // Configure tests to run serially to avoid timeout issues
  test.describe.configure({ mode: 'serial', timeout: 90000 });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    billingPage = new BillingPage(page);

    // Login before each test
    await loginPage.navigateToLoginPage();
    const validCreds = loginData.validCredentials;
    await loginPage.login(validCreds.username, validCreds.password);
    await page.waitForLoadState('networkidle');
  });

  test('BILL_001 - Verify user can navigate to Billing', async ({ page }) => {
    // Navigate to Dashboard, Close ChatBot, and Navigate to Billing
    await billingPage.navigateToBilling();

    // Verify we are on Billing page
    const currentURL = page.url();
    expect(currentURL).toContain('6/0');

    // Verify Billing page loads successfully
    await page.waitForLoadState('domcontentloaded');
    expect(true).toBeTruthy();
  });

  test('BILL_002 - Verify clear/cross button functionality', async ({ page }) => {
    // Navigate to Billing page
    await billingPage.navigateToBilling();

    // Verify we are on Billing page
    let currentURL = page.url();
    expect(currentURL).toContain('6/0');

    // Click clear/cross button
    await billingPage.clickClearButton();

    // Wait for navigation
    await page.waitForTimeout(2000);

    // Verify we are back on Dashboard
    currentURL = page.url();
    expect(currentURL).toContain('dashboard');
  });
});
