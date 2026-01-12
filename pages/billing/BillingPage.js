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
    this.clinicDropdown = 'xpath=//p-dropdown | //select | //div[contains(@class, "p-dropdown")]';
    this.clinicDropdownTrigger = 'xpath=//p-dropdown//span[@class="p-dropdown-trigger-icon"] | //div[contains(@class, "p-dropdown-trigger")]';
    this.clinicDropdownOptions = 'xpath=//li[contains(@class, "p-dropdown-item")]';

    // Date Range Filters
    this.fromDateInput = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[2]/div/input';
    this.toDateInput = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[4]/div/input';
    this.fromDateCalendarIcon = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[2]/div/button';
    this.toDateCalendarIcon = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[4]/div/button';
    this.datePickerPanel = '.p-datepicker, .p-calendar-panel, [role="dialog"].p-component';
    this.dateRangeClearButton = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[5]/button[2]';
    this.searchButton = 'xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/p-toolbar/div/div[1]/div/div[3]/div/div[5]/button[1]';

    // DOS Panel
    this.dosPanel = 'xpath=//div[contains(@class, "dos-panel") or contains(@class, "date-panel") or contains(@class, "left-panel")]';
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


  async isClinicDropdownVisible() {
    try {
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      return await dropdown.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  async isClinicDropdownAccessible() {
    try {
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      const isVisible = await dropdown.isVisible({ timeout: 5000 });
      const isEnabled = await dropdown.isEnabled({ timeout: 5000 });
      return isVisible && isEnabled;
    } catch (error) {
      return false;
    }
  }

  async selectClinicFromDropdown(clinicName) {
    try {
      // Click the dropdown to open it
      const dropdown = await this.page.locator('p-dropdown, .p-dropdown, select').first();
      await dropdown.click({ timeout: 10000 });
      await this.waitForTimeout(1500);

      // Get all available options
      const options = await this.page.locator('li[role="option"], .p-dropdown-item, option').all();
      console.log(`Total options available in dropdown: ${options.length}`);

      let selectedOptionText = '';

      if (clinicName) {
        // Select specific clinic by name
        const option = await this.page.locator(`li[role="option"]:has-text("${clinicName}"), .p-dropdown-item:has-text("${clinicName}"), option:has-text("${clinicName}")`).first();
        selectedOptionText = await option.textContent();
        console.log(`Selecting clinic: ${selectedOptionText?.trim()}`);
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
      console.log(`Error selecting clinic: ${error.message}`);
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

  async getSelectedClinicText() {
    try {
      await this.waitForTimeout(1000);
      const selectedText = await this.page.locator('p-dropdown .p-dropdown-label, .p-dropdown-label, select option:checked').first().textContent();
      return selectedText?.trim() || 'Unknown';
    } catch (error) {
      console.log(`Error getting selected clinic text: ${error.message}`);
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

  async isDOSPanelVisible() {
    try {
      await this.waitForTimeout(2000);
      // Try multiple selectors to find the DOS panel
      const dosPanelSelectors = [
        'div[class*="dos-panel"]',
        'div[class*="date-panel"]',
        'div[class*="left-panel"]',
        'div[class*="sidebar"]',
        '.dos-list',
        '.date-list'
      ];

      for (const selector of dosPanelSelectors) {
        const panel = await this.page.locator(selector).first();
        const isVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          console.log(`DOS panel found with selector: ${selector}`);
          return true;
        }
      }

      // If specific selectors fail, check for any left-side panel with dates
      const anyPanel = await this.page.locator('div').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).first();
      const hasDatePanel = await anyPanel.isVisible({ timeout: 3000 }).catch(() => false);
      if (hasDatePanel) {
        console.log('DOS panel found by date pattern');
        return true;
      }

      return false;
    } catch (error) {
      console.log(`Error checking DOS panel visibility: ${error.message}`);
      return false;
    }
  }

  async getDOSPanelDates() {
    try {
      await this.waitForTimeout(2000);
      // Look for date patterns in the page
      const dateElements = await this.page.locator('div, span, li').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).all();
      const dates = [];
      const uniqueDates = new Set();

      for (let i = 0; i < dateElements.length; i++) {
        const dateText = await dateElements[i].textContent();
        const dateMatch = dateText?.match(/\d{2}\/\d{2}\/\d{4}/);
        if (dateMatch) {
          uniqueDates.add(dateMatch[0]);
        }
      }

      return Array.from(uniqueDates);
    } catch (error) {
      console.log(`Error getting DOS panel dates: ${error.message}`);
      return [];
    }
  }

  async getCurrentSelectedDOSDate() {
    try {
      await this.waitForTimeout(1000);
      // Look for the selected/active DOS date in the panel
      const selectedDate = await this.page.locator('div[class*="active"], li[class*="active"], .selected, [aria-selected="true"]').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).first();

      if (await selectedDate.isVisible({ timeout: 3000 }).catch(() => false)) {
        const dateText = await selectedDate.textContent();
        const dateMatch = dateText?.match(/\d{2}\/\d{2}\/\d{4}/);
        if (dateMatch) {
          return dateMatch[0];
        }
      }

      // If no active/selected element found, try to get from the billing records
      const firstRecord = await this.page.locator('table tbody tr, .p-datatable-tbody tr, .grid-row').first();
      if (await firstRecord.isVisible({ timeout: 3000 }).catch(() => false)) {
        const recordText = await firstRecord.textContent();
        const dateMatch = recordText?.match(/\d{2}\/\d{2}\/\d{4}/);
        if (dateMatch) {
          return dateMatch[0];
        }
      }

      return 'Unknown';
    } catch (error) {
      console.log(`Error getting current selected DOS date: ${error.message}`);
      return 'Unknown';
    }
  }

  async clickDOSDate(dateIndex = 0) {
    try {
      await this.waitForTimeout(2000);
      // Find all date elements
      const dateElements = await this.page.locator('div, span, li, button').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).all();

      if (dateElements.length === 0) {
        console.log('No DOS dates found to click');
        return null;
      }

      // Click on the specified date (default first one)
      const targetIndex = Math.min(dateIndex, dateElements.length - 1);
      const dateText = await dateElements[targetIndex].textContent();
      const dateMatch = dateText?.match(/\d{2}\/\d{2}\/\d{4}/);

      if (dateMatch) {
        console.log(`Clicking on DOS date: ${dateMatch[0]}`);
        await dateElements[targetIndex].click({ timeout: 5000 });
        await this.waitForTimeout(2000);
        return dateMatch[0];
      }

      return null;
    } catch (error) {
      console.log(`Error clicking DOS date: ${error.message}`);
      return null;
    }
  }

  async clickDOSDateByValue(targetDate) {
    try {
      await this.waitForTimeout(2000);
      // Find all date elements
      const dateElements = await this.page.locator('div, span, li, button').filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ }).all();

      if (dateElements.length === 0) {
        console.log('No DOS dates found to click');
        return null;
      }

      console.log(`Searching for DOS date: ${targetDate}`);

      // Find the element that contains the target date
      for (let i = 0; i < dateElements.length; i++) {
        const dateText = await dateElements[i].textContent();
        const dateMatch = dateText?.match(/\d{2}\/\d{2}\/\d{4}/);

        if (dateMatch && dateMatch[0] === targetDate) {
          console.log(`Found DOS date at index [${i}]: ${dateMatch[0]}`);
          await dateElements[i].click({ timeout: 5000 });
          await this.waitForTimeout(2000);
          console.log(`✓ Clicked on DOS date: ${dateMatch[0]}`);
          return dateMatch[0];
        }
      }

      console.log(`DOS date ${targetDate} not found. Available dates:`);
      for (let i = 0; i < Math.min(10, dateElements.length); i++) {
        const dateText = await dateElements[i].textContent();
        const dateMatch = dateText?.match(/\d{2}\/\d{2}\/\d{4}/);
        if (dateMatch) {
          console.log(`  [${i}] ${dateMatch[0]}`);
        }
      }

      return null;
    } catch (error) {
      console.log(`Error clicking DOS date by value: ${error.message}`);
      return null;
    }
  }

  async setFromDate(dateValue) {
    try {
      await this.waitForTimeout(1000);
      console.log(`Setting From Date: ${dateValue}`);

      // Click on the From Date field
      await this.click(this.fromDateInput);
      await this.waitForTimeout(500);

      // Clear the field
      await this.page.locator(this.fromDateInput).fill('');
      await this.waitForTimeout(500);

      // Enter the date value
      await this.page.locator(this.fromDateInput).fill(dateValue);
      await this.waitForTimeout(500);

      // Press Enter to confirm
      await this.page.locator(this.fromDateInput).press('Enter');
      await this.waitForTimeout(1000);

      console.log(`✓ From Date set to: ${dateValue}`);
      return true;
    } catch (error) {
      console.log(`Error setting From Date: ${error.message}`);
      return false;
    }
  }

  async setToDate(dateValue) {
    try {
      await this.waitForTimeout(1000);
      console.log(`Setting To Date: ${dateValue}`);

      // Click on the To Date field
      await this.click(this.toDateInput);
      await this.waitForTimeout(500);

      // Clear the field
      await this.page.locator(this.toDateInput).fill('');
      await this.waitForTimeout(500);

      // Enter the date value
      await this.page.locator(this.toDateInput).fill(dateValue);
      await this.waitForTimeout(500);

      // Press Enter to confirm
      await this.page.locator(this.toDateInput).press('Enter');
      await this.waitForTimeout(1000);

      console.log(`✓ To Date set to: ${dateValue}`);
      return true;
    } catch (error) {
      console.log(`Error setting To Date: ${error.message}`);
      return false;
    }
  }

  async clickSearchButton() {
    try {
      await this.waitForTimeout(1000);
      console.log('Clicking Search button...');
      await this.click(this.searchButton);
      await this.waitForTimeout(2000);
      console.log('✓ Search button clicked');
      return true;
    } catch (error) {
      console.log(`Error clicking Search button: ${error.message}`);
      return false;
    }
  }

  async clickFromDateCalendarIcon() {
    try {
      await this.waitForTimeout(1000);
      console.log('Clicking From Date calendar icon...');
      await this.click(this.fromDateCalendarIcon);
      await this.waitForTimeout(1000);
      console.log('✓ From Date calendar icon clicked');
      return true;
    } catch (error) {
      console.log(`Error clicking From Date calendar icon: ${error.message}`);
      return false;
    }
  }

  async clickToDateCalendarIcon() {
    try {
      await this.waitForTimeout(1000);
      console.log('Clicking To Date calendar icon...');
      await this.click(this.toDateCalendarIcon);
      await this.waitForTimeout(1000);
      console.log('✓ To Date calendar icon clicked');
      return true;
    } catch (error) {
      console.log(`Error clicking To Date calendar icon: ${error.message}`);
      return false;
    }
  }

  async isDatePickerVisible() {
    try {
      await this.waitForTimeout(500);
      const datePickerVisible = await this.page.locator(this.datePickerPanel).isVisible({ timeout: 5000 });
      return datePickerVisible;
    } catch (error) {
      console.log(`Error checking date picker visibility: ${error.message}`);
      return false;
    }
  }

  async selectDateFromPicker(day) {
    try {
      await this.waitForTimeout(1000);
      console.log(`Selecting day ${day} from date picker...`);

      // Wait for date picker to be visible
      await this.page.locator(this.datePickerPanel).waitFor({ state: 'visible', timeout: 5000 });

      // Find and click the date cell with the specific day
      // Try multiple selectors for date cells
      const dateCell = this.page.locator(`
        ${this.datePickerPanel} td:not(.p-datepicker-other-month) span:has-text("${day}"),
        ${this.datePickerPanel} .p-datepicker-calendar td:not(.p-disabled) span:text-is("${day}"),
        ${this.datePickerPanel} [role="gridcell"]:not([data-p-disabled="true"]) span:text-is("${day}")
      `).first();

      await dateCell.click({ timeout: 5000 });
      await this.waitForTimeout(1000);
      console.log(`✓ Selected day ${day} from date picker`);
      return true;
    } catch (error) {
      console.log(`Error selecting date from picker: ${error.message}`);
      return false;
    }
  }

  async getFromDateValue() {
    try {
      await this.waitForTimeout(500);
      const value = await this.page.locator(this.fromDateInput).inputValue();
      return value;
    } catch (error) {
      console.log(`Error getting From Date value: ${error.message}`);
      return '';
    }
  }

  async getToDateValue() {
    try {
      await this.waitForTimeout(500);
      const value = await this.page.locator(this.toDateInput).inputValue();
      return value;
    } catch (error) {
      console.log(`Error getting To Date value: ${error.message}`);
      return '';
    }
  }

  async clickDateRangeClearButton() {
    try {
      await this.waitForTimeout(1000);
      console.log('Clicking date range clear button (cross button)...');
      await this.click(this.dateRangeClearButton);
      await this.waitForTimeout(1000);
      console.log('✓ Date range clear button clicked');
      return true;
    } catch (error) {
      console.log(`Error clicking date range clear button: ${error.message}`);
      return false;
    }
  }

  async verifyBillingRecordsInDateRange(fromDate, toDate) {
    try {
      await this.waitForTimeout(2000);

      // Get billing records from the specific container using XPath
      const billingContainer = await this.page.locator('xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/div/div/aeliusmd-billing-injury-daily-board/div/div/div/div/div[1]/div');

      // Get all rows within the container
      const rows = await billingContainer.locator('table tbody tr, .p-datatable-tbody tr').all();

      if (rows.length === 0) {
        console.log('No billing records found in DOS container');
        return { isValid: true, recordCount: 0, message: 'No records to validate' };
      }

      console.log(`Total rows in DOS container: ${rows.length}`);

      // Parse the date range
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      let recordsInRange = 0;
      let recordsOutOfRange = 0;
      let dosHeadersChecked = 0;

      // Check all rows - look for DOS date header rows (single cell rows with dates)
      for (let i = 0; i < rows.length; i++) {
        const cells = await rows[i].locator('td').all();

        // Process DOS date header rows (single cell rows containing dates)
        if (cells.length === 1) {
          dosHeadersChecked++;

          const dosText = await cells[0].textContent();
          const dateMatch = dosText?.trim().match(/\d{2}\/\d{2}\/\d{4}/);

          if (dateMatch) {
            const recordDate = new Date(dateMatch[0]);

            if (recordDate >= fromDateObj && recordDate <= toDateObj) {
              recordsInRange++;
            } else {
              recordsOutOfRange++;
              console.log(`WARNING: DOS date OUT OF RANGE: ${dateMatch[0]}`);
            }
          }
        }
      }

      return {
        isValid: recordsOutOfRange === 0,
        recordCount: dosHeadersChecked,
        sampledRecords: dosHeadersChecked,
        recordsInRange,
        recordsOutOfRange,
        message: recordsOutOfRange === 0 ? 'All DOS dates are within date range' : `${recordsOutOfRange} DOS dates out of date range`
      };
    } catch (error) {
      console.log(`Error verifying billing records date range: ${error.message}`);
      return { isValid: false, recordCount: 0, message: error.message };
    }
  }

  async clickInjuryNewBatchButton() {
    try {
      await this.waitForTimeout(2000);
      console.log('Attempting to click Injury New batch button...');

      // Look for Injury New batch button - trying multiple possible selectors
      const injuryNewBatchSelectors = [
        'button:has-text("Injury New")',
        'button:has-text("New")',
        'text=/injury.*new/i',
        '[class*="injury"][class*="new"]',
        'div:has-text("Injury New")',
        '.batch-filter button:has-text("New")',
        '[aria-label*="Injury New"]',
        '[title*="Injury New"]'
      ];

      for (const selector of injuryNewBatchSelectors) {
        try {
          const element = this.page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            console.log(`✓ Found Injury New batch button using selector: ${selector}`);
            await element.click();
            await this.waitForTimeout(2000);
            console.log('✓ Clicked on Injury New batch button');
            return { success: true, selector };
          }
        } catch (error) {
          // Continue to next selector
        }
      }

      console.log('⚠ Injury New batch button not found with any selector');
      return { success: false, selector: null };
    } catch (error) {
      console.log(`Error clicking Injury New batch button: ${error.message}`);
      return { success: false, selector: null, error: error.message };
    }
  }

  async getVisitTypeValues() {
    try {
      await this.waitForTimeout(2000);
      console.log('Retrieving Visit Type values from billing records...');

      // Get all billing records from the grid
      const billingContainer = await this.page.locator('xpath=/html/body/ng-component/div/div/aeliusmd-billing-daily-board/div/div/div/div/aeliusmd-billing-injury-daily-board/div/div/div/div/div[1]/div');
      const rows = await billingContainer.locator('table tbody tr, .p-datatable-tbody tr').all();

      console.log(`Total rows found: ${rows.length}`);

      let recordsChecked = 0;
      let visitTypeValues = [];

      // Iterate through rows to check Visit Type column
      for (let i = 0; i < rows.length; i++) {
        const cells = await rows[i].locator('td').all();

        // Skip DOS date header rows (single cell rows)
        if (cells.length <= 1) {
          continue;
        }

        recordsChecked++;

        // Try to find the Visit Type column
        // Assuming Visit Type might be in different column positions, we'll check all cells
        for (let j = 0; j < cells.length; j++) {
          const cellText = await cells[j].textContent();
          const cellTextTrimmed = cellText?.trim();

          // Check if this cell contains visit type information
          if (cellTextTrimmed === 'WNI' || cellTextTrimmed === 'WI' || cellTextTrimmed === 'WR' || cellTextTrimmed === 'PT' || cellTextTrimmed === 'Recheck') {
            visitTypeValues.push({
              rowIndex: i,
              visitType: cellTextTrimmed
            });
            break;
          }
        }
      }

      return {
        success: true,
        recordsChecked,
        visitTypeValues,
        uniqueVisitTypes: [...new Set(visitTypeValues.map(v => v.visitType))]
      };
    } catch (error) {
      console.log(`Error getting Visit Type values: ${error.message}`);
      return {
        success: false,
        recordsChecked: 0,
        visitTypeValues: [],
        uniqueVisitTypes: [],
        error: error.message
      };
    }
  }

  async verifyAllRecordsHaveVisitType(expectedVisitType) {
    try {
      await this.waitForTimeout(2000);
      console.log(`Verifying all records have Visit Type = ${expectedVisitType}...`);

      const result = await this.getVisitTypeValues();

      if (!result.success) {
        return {
          isValid: false,
          message: `Error retrieving visit types: ${result.error}`,
          recordsChecked: 0,
          recordsWithExpectedType: 0,
          recordsWithDifferentType: 0
        };
      }

      const recordsWithExpectedType = result.visitTypeValues.filter(v => v.visitType === expectedVisitType).length;
      const recordsWithDifferentType = result.visitTypeValues.filter(v => v.visitType !== expectedVisitType).length;

      console.log(`Records checked: ${result.recordsChecked}`);
      console.log(`Records with Visit Type = ${expectedVisitType}: ${recordsWithExpectedType}`);
      console.log(`Records with Visit Type ≠ ${expectedVisitType}: ${recordsWithDifferentType}`);

      if (result.uniqueVisitTypes.length > 0) {
        console.log(`Unique Visit Type values found: ${result.uniqueVisitTypes.join(', ')}`);
      }

      return {
        isValid: recordsWithDifferentType === 0 && recordsWithExpectedType > 0,
        message: recordsWithDifferentType === 0 && recordsWithExpectedType > 0
          ? `All records have Visit Type = ${expectedVisitType}`
          : `Found ${recordsWithDifferentType} records with Visit Type ≠ ${expectedVisitType}`,
        recordsChecked: result.recordsChecked,
        recordsWithExpectedType,
        recordsWithDifferentType,
        uniqueVisitTypes: result.uniqueVisitTypes,
        visitTypeValues: result.visitTypeValues
      };
    } catch (error) {
      console.log(`Error verifying Visit Type: ${error.message}`);
      return {
        isValid: false,
        message: error.message,
        recordsChecked: 0,
        recordsWithExpectedType: 0,
        recordsWithDifferentType: 0
      };
    }
  }
}

module.exports = BillingPage;
