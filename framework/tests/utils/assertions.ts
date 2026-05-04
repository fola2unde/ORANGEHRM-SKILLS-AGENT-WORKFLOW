/**
 * Custom Assertions for Business Logic
 * Common assertions used across tests
 */

import { expect, Page, Locator } from '@playwright/test';

export class CustomAssertions {
  /**
   * Assert element has exact text
   */
  static async assertElementHasText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Assert element contains partial text
   */
  static async assertElementContainsText(locator: Locator, partialText: string): Promise<void> {
    await expect(locator).toContainText(partialText);
  }

  /**
   * Assert element is visible
   */
  static async assertElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Assert element is hidden
   */
  static async assertElementIsHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert element is enabled
   */
  static async assertElementIsEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  static async assertElementIsDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled();
  }

  /**
   * Assert page has URL
   */
  static async assertPageUrl(page: Page, expectedUrl: string | RegExp): Promise<void> {
    await expect(page).toHaveURL(expectedUrl);
  }

  /**
   * Assert page has title
   */
  static async assertPageTitle(page: Page, expectedTitle: string | RegExp): Promise<void> {
    await expect(page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert element has count
   */
  static async assertElementCount(locator: Locator, expectedCount: number): Promise<void> {
    await expect(locator).toHaveCount(expectedCount);
  }

  /**
   * Assert element has attribute value
   */
  static async assertElementAttribute(
    locator: Locator,
    attribute: string,
    expectedValue: string,
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, expectedValue);
  }

  /**
   * Assert element has class
   */
  static async assertElementHasClass(locator: Locator, className: string): Promise<void> {
    await expect(locator).toHaveClass(new RegExp(className));
  }

  /**
   * Assert element is checked (for checkboxes)
   */
  static async assertElementIsChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  /**
   * Assert element is not checked
   */
  static async assertElementIsNotChecked(locator: Locator): Promise<void> {
    await expect(locator).not.toBeChecked();
  }

  /**
   * Assert input has value
   */
  static async assertInputValue(locator: Locator, expectedValue: string): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Assert multiple elements have count
   */
  static async assertMultipleElements(
    locators: Locator[],
    expectedCounts: number[],
  ): Promise<void> {
    for (let i = 0; i < locators.length; i++) {
      await expect(locators[i]).toHaveCount(expectedCounts[i]);
    }
  }

  /**
   * Assert element has focus
   */
  static async assertElementIsFocused(locator: Locator): Promise<void> {
    await expect(locator).toBeFocused();
  }

  /**
   * Assert text is visible somewhere on page
   */
  static async assertTextIsVisible(page: Page, text: string): Promise<void> {
    await expect(page.getByText(text)).toBeVisible();
  }
}
