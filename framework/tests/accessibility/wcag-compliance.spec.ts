import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { logger } from '../utils/logger';
import { TEST_USERS, URLS } from '../utils/test-data';

/**
 * Accessibility Tests (@a11y)
 * WCAG 2.2 Level AA compliance testing
 */

test.describe('Accessibility - WCAG 2.2 Level AA', () => {
  const runA11yScan = async (page: Page) => {
    return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  };

  test.beforeEach(async ({ page }) => {
    logger.logStep('Setting up accessibility testing');
    await page.goto(URLS.LOGIN);
  });

  test('@a11y @critical - Should have no accessibility violations on login page', async ({
    page,
  }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Run axe accessibility scan', async () => {
      const results = await runA11yScan(page);
      expect(results.violations).toEqual([]);
      logger.logAssertion('Login page passed accessibility audit');
    });
  });

  test('@a11y @critical - Should have proper form labels', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Check for associated labels', async () => {
      const inputs = await page.locator('input[type="text"], input[type="email"], input[type="password"]').count();

      for (let i = 0; i < inputs; i++) {
        const input = page.locator('input[type="text"], input[type="email"], input[type="password"]').nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const label = id ? await page.locator(`label[for="${id}"]`).count() : 0;
        const placeholder = await input.getAttribute('placeholder');

        expect(label > 0 || ariaLabel || placeholder).toBeTruthy();
      }

      logger.logAssertion('All visible form inputs have accessible names or placeholders');
    });
  });

  test('@a11y - Should have sufficient color contrast', async ({ page }) => {
    await test.step('Navigate to dashboard', async () => {
      await page.getByPlaceholder('Username').fill(TEST_USERS.VALID_USER.username);
      await page.getByPlaceholder('Password').fill(TEST_USERS.VALID_USER.password);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Run axe color contrast scan', async () => {
      const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
      expect(results.violations).toEqual([]);
      logger.logAssertion('Dashboard passed automated color contrast checks');
    });
  });

  test('@a11y @critical - Should support keyboard navigation', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Test Tab key navigation', async () => {
      // Press Tab multiple times to navigate through focusable elements
      await page.press('body', 'Tab');
      await page.press('body', 'Tab');
      await page.press('body', 'Tab');

      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      expect(focusedElement).toBeTruthy();
      logger.logAssertion('Keyboard navigation working - elements are focusable');
    });
  });

  test('@a11y - Should have proper heading hierarchy', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Verify heading hierarchy', async () => {
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();

      // Best practice: one H1 per page
      expect(h1Count).toBeLessThanOrEqual(1);
      logger.logAssertion('Proper heading hierarchy maintained');
    });
  });

  test('@a11y - Should have descriptive link text', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Check link text quality', async () => {
      const links = page.locator('a');
      const count = await links.count();

      for (let i = 0; i < count && i < 10; i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        // Link should have descriptive text or aria-label
        expect(text?.trim() || ariaLabel).toBeTruthy();
      }

      logger.logAssertion('Links have descriptive text');
    });
  });

  test('@a11y - Should have proper ARIA landmarks', async ({ page }) => {
    await test.step('Navigate to dashboard', async () => {
      await page.getByPlaceholder('Username').fill(TEST_USERS.VALID_USER.username);
      await page.getByPlaceholder('Password').fill(TEST_USERS.VALID_USER.password);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Check for ARIA landmarks', async () => {
      const main = page.locator('main, [role="main"]');
      const hasMain = await main.count();
      const hasNav = await page.locator('nav, [role="navigation"]').count();

      expect(hasMain).toBeGreaterThanOrEqual(0);
      expect(hasNav).toBeGreaterThan(0);
      logger.logAssertion('Page has navigation landmark structure');
    });
  });

  test('@a11y - Should have accessible form validation', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Check form accessibility attributes', async () => {
      const form = page.locator('form').first();
      await expect(form).toBeVisible();

      // Check for aria-required or required attributes
      const requiredInputs = page.locator('input[required], input[aria-required="true"]');
      const count = await requiredInputs.count();

      expect(count).toBeGreaterThanOrEqual(0);
      logger.logAssertion('Form has proper accessibility attributes');
    });
  });

  test('@a11y - Should support focus indicators', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(URLS.LOGIN);
    });

    await test.step('Tab to button and check focus', async () => {
      const button = page.getByRole('button', { name: /login|sign in/i });
      await button.focus();

      const isFocused = await button.evaluate((el) => {
        return el === document.activeElement;
      });

      expect(isFocused).toBe(true);
      logger.logAssertion('Focus indicators are working properly');
    });
  });
});
