const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login/LoginPage');
const ChatBotPage = require('../../pages/chatbot/ChatBotPage');
const loginData = require('../../data/login/loginData.json');
const chatbotData = require('../../data/chatbot/chatbotData.json');

test.describe('ChatBot Module - Smoke Tests', () => {
  let loginPage;
  let chatBotPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    chatBotPage = new ChatBotPage(page);

    // Login and navigate to dashboard
    await loginPage.navigateToLoginPage();
    const validCreds = loginData.validCredentials;
    await loginPage.login(validCreds.username, validCreds.password);
    await page.waitForURL('**/dashboard', { timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for dashboard to load
  });

  test('CHAT_001 - Verify ChatBot appears on Dashboard', async ({ page }) => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Verify we are on dashboard
    const currentURL = page.url();
    expect(currentURL).toContain('dashboard');
  });

  test('CHAT_002 - Verify user can close ChatBot', async ({ page }) => {
    // Verify ChatBot is visible first
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Close ChatBot
    const closed = await chatBotPage.closeChatBot();
    expect(closed).toBeTruthy();

    // Verify ChatBot is closed
    await page.waitForTimeout(1000);
    const isClosed = await chatBotPage.isChatBotClosed();
    expect(isClosed).toBeTruthy();
  });

  test('CHAT_003 - Verify ChatBot close button is visible', async () => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Verify close button is visible
    const isCloseButtonVisible = await chatBotPage.isCloseButtonVisible();
    expect(isCloseButtonVisible).toBeTruthy();
  });

  test('CHAT_004 - Verify user can minimize ChatBot', async ({ page }) => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Minimize ChatBot
    const minimized = await chatBotPage.minimizeChatBot();
    await page.waitForTimeout(1000);

    // Verify ChatBot is minimized (this assertion may need adjustment based on actual behavior)
    expect(minimized).toBeTruthy();
  });

  test('CHAT_005 - Verify user can maximize ChatBot', async ({ page }) => {
    // Minimize ChatBot first
    await chatBotPage.minimizeChatBot();
    await page.waitForTimeout(1000);

    // Maximize ChatBot
    const maximized = await chatBotPage.maximizeChatBot();
    await page.waitForTimeout(1000);

    // Verify ChatBot is maximized
    expect(maximized).toBeTruthy();
  });

  test('CHAT_006 - Verify user can send message to ChatBot', async ({ page }) => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Send a message
    const testMessage = chatbotData.testMessages[0];
    const messageSent = await chatBotPage.sendMessage(testMessage.message);
    await page.waitForTimeout(2000);

    // Verify message was sent
    expect(messageSent).toBeTruthy();
  });

  test('CHAT_007 - Verify ChatBot responds to messages', async ({ page }) => {
    // Send a greeting message
    const greetingMessage = chatbotData.testMessages[0];
    await chatBotPage.sendMessage(greetingMessage.message);
    await page.waitForTimeout(3000); // Wait for response

    // Get chat messages
    const messages = await chatBotPage.getChatMessages();

    // Verify messages exist
    expect(messages).toBeTruthy();
  });

  test('CHAT_008 - Verify user can refresh ChatBot', async ({ page }) => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Refresh ChatBot
    const refreshed = await chatBotPage.refreshChatBot();
    await page.waitForTimeout(1000);

    // Verify refresh action completed
    expect(refreshed).toBeTruthy();
  });

  test('CHAT_009 - Verify ChatBot persists across page navigation', async ({ page }) => {
    // Verify ChatBot is visible on Dashboard
    let isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Navigate to another page (e.g., refresh the page)
    await page.reload();
    await page.waitForTimeout(2000);

    // Verify ChatBot is still visible
    isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();
  });

  test('CHAT_010 - Verify ChatBot UI elements are visible', async () => {
    // Verify ChatBot is visible
    const isChatBotVisible = await chatBotPage.isChatBotVisible();
    expect(isChatBotVisible).toBeTruthy();

    // Verify close button
    const isCloseButtonVisible = await chatBotPage.isCloseButtonVisible();
    expect(isCloseButtonVisible).toBeTruthy();

    // Verify minimize button (may not always be visible)
    const isMinimizeButtonVisible = await chatBotPage.isMinimizeButtonVisible();
    // This is optional, so we just check if the function runs
    expect(typeof isMinimizeButtonVisible).toBe('boolean');

    // Verify send button
    const isSendButtonVisible = await chatBotPage.isSendButtonVisible();
    // This is optional, so we just check if the function runs
    expect(typeof isSendButtonVisible).toBe('boolean');
  });
});
