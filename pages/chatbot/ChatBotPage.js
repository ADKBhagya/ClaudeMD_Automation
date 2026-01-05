const BasePage = require('../common/BasePage');

class ChatBotPage extends BasePage {
  constructor(page) {
    super(page);

    // ChatBot Container
    this.chatBotContainer = 'xpath=/html/body/div/div/div';

    // ChatBot Close Button
    this.chatBotCloseButton = 'xpath=/html/body/div/div/div/div/div/div[1]/div[2]/button[4]/svg';

    // ChatBot Header Elements
    this.chatBotHeader = 'xpath=/html/body/div/div/div/div/div/div[1]';
    this.chatBotTitle = 'xpath=/html/body/div/div/div/div/div/div[1]/div[1]';

    // ChatBot Action Buttons
    this.minimizeButton = 'xpath=/html/body/div/div/div/div/div/div[1]/div[2]/button[1]';
    this.maximizeButton = 'xpath=/html/body/div/div/div/div/div/div[1]/div[2]/button[2]';
    this.refreshButton = 'xpath=/html/body/div/div/div/div/div/div[1]/div[2]/button[3]';

    // ChatBot Input Area
    this.chatInput = 'xpath=/html/body/div/div/div/div/div/div[2]/div/input';
    this.sendButton = 'xpath=/html/body/div/div/div/div/div/div[2]/div/button';

    // ChatBot Messages
    this.chatMessages = 'xpath=/html/body/div/div/div/div/div/div[2]';
    this.userMessage = '.user-message';
    this.botMessage = '.bot-message';
  }

  async isChatBotVisible() {
    try {
      return await this.isVisible(this.chatBotContainer, { timeout: 5000 });
    } catch (e) {
      return false;
    }
  }

  async closeChatBot() {
    try {
      const closeButton = this.page.locator(this.chatBotCloseButton);
      if (await closeButton.isVisible({ timeout: 5000 })) {
        await closeButton.click();
        await this.waitForTimeout(1000);
        return true;
      }
    } catch (e) {
      // ChatBot may not be visible
      console.log('ChatBot close button not found or already closed');
      return false;
    }
    return false;
  }

  async minimizeChatBot() {
    try {
      const button = this.page.locator(this.minimizeButton);
      if (await button.isVisible({ timeout: 5000 })) {
        await button.click();
        await this.waitForTimeout(500);
        return true;
      }
    } catch (e) {
      console.log('Minimize button not found');
      return false;
    }
    return false;
  }

  async maximizeChatBot() {
    try {
      const button = this.page.locator(this.maximizeButton);
      if (await button.isVisible({ timeout: 5000 })) {
        await button.click();
        await this.waitForTimeout(500);
        return true;
      }
    } catch (e) {
      console.log('Maximize button not found');
      return false;
    }
    return false;
  }

  async refreshChatBot() {
    try {
      const button = this.page.locator(this.refreshButton);
      if (await button.isVisible({ timeout: 5000 })) {
        await button.click();
        await this.waitForTimeout(500);
        return true;
      }
    } catch (e) {
      console.log('Refresh button not found');
      return false;
    }
    return false;
  }

  async sendMessage(message) {
    try {
      await this.fill(this.chatInput, message);
      await this.click(this.sendButton);
      await this.waitForTimeout(1000);
      return true;
    } catch (e) {
      console.log('Failed to send message');
      return false;
    }
  }

  async getChatMessages() {
    try {
      const messages = await this.page.locator(this.chatMessages).textContent();
      return messages;
    } catch (e) {
      console.log('Failed to get chat messages');
      return '';
    }
  }

  async isChatBotClosed() {
    try {
      return !(await this.isVisible(this.chatBotContainer, { timeout: 2000 }));
    } catch (e) {
      return true;
    }
  }

  async isChatBotMinimized() {
    // Check if chatbot is minimized by checking if certain elements are hidden
    try {
      const isInputVisible = await this.isVisible(this.chatInput, { timeout: 2000 });
      return !isInputVisible;
    } catch (e) {
      return false;
    }
  }

  async waitForChatBotToAppear() {
    await this.waitForSelector(this.chatBotContainer, { timeout: 10000 });
  }

  async waitForChatBotToDisappear() {
    try {
      await this.page.waitForSelector(this.chatBotContainer, {
        state: 'hidden',
        timeout: 5000
      });
    } catch (e) {
      console.log('ChatBot did not disappear within timeout');
    }
  }

  async isTitleVisible() {
    return await this.isVisible(this.chatBotTitle);
  }

  async isCloseButtonVisible() {
    try {
      return await this.isVisible(this.chatBotCloseButton, { timeout: 2000 });
    } catch (e) {
      return false;
    }
  }

  async isMinimizeButtonVisible() {
    try {
      return await this.isVisible(this.minimizeButton, { timeout: 2000 });
    } catch (e) {
      return false;
    }
  }

  async isSendButtonVisible() {
    try {
      return await this.isVisible(this.sendButton, { timeout: 2000 });
    } catch (e) {
      return false;
    }
  }
}

module.exports = ChatBotPage;
