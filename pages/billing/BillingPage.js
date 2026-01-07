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
    this.dailyBillingButton = 'xpath=//button[contains(., "Daily Billing") or contains(@aria-label, "Daily Billing")]';
    this.refreshButton = 'xpath=//button[contains(., "Refresh") or contains(@aria-label, "Refresh") or @title="Refresh"]';

    // Filters - Daily Billing Page
    this.clinicDropdown = 'xpath=//p-dropdown | //select[contains(@class, "clinic")] | //div[contains(@class, "p-dropdown")]';
    this.clinicDropdownTrigger = 'xpath=//p-dropdown//span[@class="p-dropdown-trigger-icon"] | //div[contains(@class, "p-dropdown-trigger")]';
    this.clinicDropdownOptions = 'xpath=//li[contains(@class, "p-dropdown-item")]';

    // Organization Dropdown
    this.organizationDropdown = 'xpath=//p-dropdown | //select | //div[contains(@class, "p-dropdown")]';
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

  async clickDailyBillingButton() {
    await this.click(this.dailyBillingButton);
    await this.waitForTimeout(2000);
  }

  async refreshPage() {
    try {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await this.waitForTimeout(3000);
      return true;
    } catch (error) {
      console.log(`Error refreshing page: ${error.message}`);
      return false;
    }
  }

  async selectClinicFromDropdown(clinicName) {
    try {
      // Try to click the dropdown to open it
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      await dropdown.click({ timeout: 10000 });
      await this.waitForTimeout(1500);

      // Try to select the first available option
      const firstOption = await this.page.locator('li[role="option"], .p-dropdown-item, option').first();
      if (firstOption) {
        await firstOption.click({ timeout: 10000 });
        await this.waitForTimeout(2000);
        return true;
      }
      return false;
    } catch (error) {
      console.log(`Error selecting clinic: ${error.message}`);
      return false;
    }
  }

  async isClinicDropdownVisible() {
    return await this.isVisible(this.clinicDropdown);
  }

  async isOrganizationDropdownVisible() {
    try {
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      return await dropdown.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  async isOrganizationDropdownAccessible() {
    try {
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      const isVisible = await dropdown.isVisible({ timeout: 5000 });
      const isEnabled = await dropdown.isEnabled({ timeout: 5000 });
      return isVisible && isEnabled;
    } catch (error) {
      return false;
    }
  }

  async selectOrganizationFromDropdown(organizationName) {
    try {
      // Click the dropdown to open it
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      await dropdown.click({ timeout: 10000 });
      await this.waitForTimeout(1500);

      // Get all available options
      const options = await this.page.locator('li[role="option"], .p-dropdown-item, option').all();
      console.log(`Total options available in dropdown: ${options.length}`);

      let selectedOptionText = '';

      if (organizationName) {
        // Select specific organization by name
        const option = await this.page.locator(`li[role="option"]:has-text("${organizationName}"), .p-dropdown-item:has-text("${organizationName}"), option:has-text("${organizationName}")`).first();
        selectedOptionText = await option.textContent();
        console.log(`Selecting organization: ${selectedOptionText?.trim()}`);
        await option.click({ timeout: 10000 });
      } else {
        // Select the next available option (second option, index 1)
        if (options.length > 1) {
          selectedOptionText = await options[1].textContent();
          console.log(`Selecting next option: ${selectedOptionText?.trim()}`);
          await options[1].click({ timeout: 10000 });
        } else if (options.length === 1) {
          selectedOptionText = await options[0].textContent();
          console.log(`Only one option available: ${selectedOptionText?.trim()}`);
          await options[0].click({ timeout: 10000 });
        }
      }

      await this.waitForTimeout(2000);
      return selectedOptionText?.trim() || 'Unknown';
    } catch (error) {
      console.log(`Error selecting organization: ${error.message}`);
      return null;
    }
  }

  async getBillingGridRowCount() {
    try {
      await this.waitForTimeout(2000);
      const rows = await this.page.locator('table tbody tr, .p-datatable-tbody tr, .grid-row').count();
      return rows;
    } catch (error) {
      console.log(`Error getting billing grid row count: ${error.message}`);
      return 0;
    }
  }

  async getSelectedOrganizationText() {
    try {
      await this.waitForTimeout(1000);
      const selectedText = await this.page.locator('p-dropdown .p-dropdown-label, .p-dropdown-label, select option:checked').first().textContent();
      return selectedText?.trim() || 'Unknown';
    } catch (error) {
      console.log(`Error getting selected organization text: ${error.message}`);
      return 'Unknown';
    }
  }

  async getBillingRecordsSample() {
    try {
      await this.waitForTimeout(2000);
      const rows = await this.page.locator('table tbody tr, .p-datatable-tbody tr, .grid-row').all();
      const sampleData = [];

      // Get first 3 rows as sample
      for (let i = 0; i < Math.min(3, rows.length); i++) {
        const rowText = await rows[i].textContent();
        sampleData.push(rowText?.trim());
      }

      return sampleData;
    } catch (error) {
      console.log(`Error getting billing records sample: ${error.message}`);
      return [];
    }
  }
}

module.exports = BillingPage;
