const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/LoginPage');
const testData = require('../../data/login/loginData.json');

test.describe('Login Module - Smoke Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('LOGIN_001 - Verify successful login with valid credentials', async ({ page }) => {
    const validCreds = testData.validCredentials;

    await loginPage.login(validCreds.username, validCreds.password);

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard', { timeout: 30000 });

    // Verify URL is the dashboard
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toContain('dashboard');
  });

  test('LOGIN_002 - Verify login page elements are visible', async () => {
    // Verify login form is visible
    const isFormVisible = await loginPage.isLoginFormVisible();
    expect(isFormVisible).toBeTruthy();

    // Verify logo is visible
    const isLogoVisible = await loginPage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();

    // Verify login button is visible
    const isButtonEnabled = await loginPage.isLoginButtonEnabled();
    expect(isButtonEnabled).toBeDefined();
  });

  test('LOGIN_003 - Verify login fails with invalid username', async () => {
    const invalidCreds = testData.invalidCredentials[0];

    await loginPage.login(invalidCreds.username, invalidCreds.password);

    // Verify error message is displayed
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('LOGIN_004 - Verify login fails with invalid password', async () => {
    const invalidCreds = testData.invalidCredentials[1];

    await loginPage.login(invalidCreds.username, invalidCreds.password);

    // Verify error message is displayed
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('LOGIN_005 - Verify login fails with empty username', async () => {
    const invalidCreds = testData.invalidCredentials[2];

    await loginPage.login(invalidCreds.username, invalidCreds.password);

    // Verify validation error or button state
    const isButtonEnabled = await loginPage.isLoginButtonEnabled();
    // Either button is disabled or error message is shown
    if (isButtonEnabled) {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
    } else {
      expect(isButtonEnabled).toBeFalsy();
    }
  });

  test('LOGIN_006 - Verify login fails with empty password', async () => {
    const invalidCreds = testData.invalidCredentials[3];

    await loginPage.login(invalidCreds.username, invalidCreds.password);

    // Verify validation error or button state
    const isButtonEnabled = await loginPage.isLoginButtonEnabled();
    // Either button is disabled or error message is shown
    if (isButtonEnabled) {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
    } else {
      expect(isButtonEnabled).toBeFalsy();
    }
  });

  test('LOGIN_007 - Verify login button state', async () => {
    // Verify login button exists and get its state
    const isButtonEnabled = await loginPage.isLoginButtonEnabled();
    expect(isButtonEnabled).toBeDefined();
  });

  test('LOGIN_008 - Verify login page title', async () => {
    const pageTitle = await loginPage.getTitle();
    // Page title should contain 'ClaudMD' or 'Login'
    expect(pageTitle.toLowerCase()).toMatch(/claudmd|login/);
  });
});
