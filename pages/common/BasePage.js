class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async navigateToBaseURL() {
    await this.page.goto(process.env.BASE_URL);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async isEnabled(selector) {
    return await this.page.isEnabled(selector);
  }

  async waitForSelector(selector, options = {}) {
    await this.page.waitForSelector(selector, options);
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoadState(state = 'load') {
    await this.page.waitForLoadState(state);
  }

  async screenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  async hover(selector) {
    await this.page.hover(selector);
  }

  async doubleClick(selector) {
    await this.page.dblclick(selector);
  }

  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async getElementCount(selector) {
    return await this.page.locator(selector).count();
  }
}

module.exports = BasePage;
