import { Page, Locator } from '@playwright/test';

/**
 * Base Page class containing common methods for all pages
 * Implements the Page Object Model pattern
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Get page source
   */
  async getPageSource(): Promise<string> {
    return this.page.content();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  /**
   * Get element attribute value
   */
  async getElementAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  /**
   * Get element text content
   */
  async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Dismiss alert if present
   */
  async dismissAlert(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.dismiss());
  }

  /**
   * Accept alert
   */
  async acceptAlert(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
  }

  /**
   * Close current tab
   */
  async closePage(): Promise<void> {
    await this.page.close();
  }

  /**
   * Refresh page
   */
  async refreshPage(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back in history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward in history
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
}
