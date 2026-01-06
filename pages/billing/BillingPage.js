const BasePage = require('../common/BasePage');
const ChatBotPage = require('../chatbot/ChatBotPage');

class BillingPage extends BasePage {
  constructor(page) {
    super(page);

    // Initialize ChatBotPage
    this.chatBot = new ChatBotPage(page);

    // Navigation
    this.billingMenu = 'xpath=/html/body/ng-component/div/div/dashboard/div[3]/div/div/div[6]';

    // Action Buttons
    this.clearButton = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-board/div/div/p-toolbar/div/div[2]/button/span[1]';
  }

  async navigateToBilling() {
    // Navigate to Dashboard first
    const dashboardURL = process.env.DASHBOARD_URL;
    await this.page.goto(dashboardURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);

    // Close ChatBot if visible using ChatBotPage
    await this.chatBot.closeChatBot();

    // Navigate to Billing page
    const billingURL = process.env.BILLING_URL;
    await this.page.goto(billingURL, { timeout: 60000, waitUntil: 'domcontentloaded' });
    await this.waitForTimeout(2000);
  }

  async clickClearButton() {
    await this.click(this.clearButton);
    await this.waitForTimeout(1000);
  }
}

module.exports = BillingPage;
