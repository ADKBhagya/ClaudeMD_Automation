const BasePage = require('../common/BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators - Using actual XPath from ClaudeMD application
    this.usernameInput = 'xpath=/html/body/ng-component/div/div/aeliusmd-login/div/div/div/form/div/div[2]/div[2]/div/input';
    this.passwordInput = 'xpath=/html/body/ng-component/div/div/aeliusmd-login/div/div/div/form/div/div[3]/div/div/p-password/div/input';
    this.loginButton = 'xpath=/html/body/ng-component/div/div/aeliusmd-login/div/div/div/form/div/div[4]/button/span';

    // Additional locators (may need to be updated based on actual page)
    this.errorMessage = '.p-toast-message-error, .error-message, [role="alert"]';
    this.successMessage = '.p-toast-message-success, .success-message';
    this.forgotPasswordLink = '//a[contains(text(), "Forgot") or contains(text(), "forgot")]';
    this.rememberMeCheckbox = '//input[@type="checkbox"]';
    this.loginForm = 'xpath=/html/body/ng-component/div/div/aeliusmd-login/div/div/div/form';
    this.logoImage = 'xpath=/html/body/ng-component/div/div/aeliusmd-login/div/div/div/form/div/div[1]';
  }

  async navigateToLoginPage() {
    // Navigate to login URL with activation key parameter
    const loginURL = process.env.LOGIN_URL || `${process.env.BASE_URL}/authentication/login?activationkey=${process.env.ACTIVATION_KEY}`;
    await this.page.goto(loginURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    // Wait for the login form to be visible
    await this.waitForSelector(this.usernameInput, { timeout: 60000 });
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    // Click the login button normally
    await this.page.locator(this.loginButton).click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithEnvCredentials() {
    await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );
  }

  async getErrorMessage() {
    await this.waitForSelector(this.errorMessage, { timeout: 5000 });
    return await this.getText(this.errorMessage);
  }

  async getSuccessMessage() {
    await this.waitForSelector(this.successMessage, { timeout: 5000 });
    return await this.getText(this.successMessage);
  }

  async isLoginButtonEnabled() {
    return await this.isEnabled(this.loginButton);
  }

  async isLoginFormVisible() {
    return await this.isVisible(this.loginForm);
  }

  async clickForgotPassword() {
    await this.click(this.forgotPasswordLink);
  }

  async checkRememberMe() {
    await this.click(this.rememberMeCheckbox);
  }

  async isLogoVisible() {
    return await this.isVisible(this.logoImage);
  }

  async clearUsername() {
    await this.fill(this.usernameInput, '');
  }

  async clearPassword() {
    await this.fill(this.passwordInput, '');
  }

  async clearAllFields() {
    await this.clearUsername();
    await this.clearPassword();
  }

  async getUsernameValue() {
    return await this.getAttribute(this.usernameInput, 'value');
  }

  async getPasswordValue() {
    return await this.getAttribute(this.passwordInput, 'value');
  }

  async waitForLoginPageLoad() {
    await this.waitForSelector(this.loginForm);
    await this.waitForSelector(this.loginButton);
  }
}

module.exports = LoginPage;
