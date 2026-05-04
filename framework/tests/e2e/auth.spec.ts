import { test, expect } from '../fixtures/test.fixture';
import { TEST_USERS, URLS } from '../utils/test-data';
import { logger } from '../utils/logger';

/**
 * Authentication Tests (@smoke @critical)
 * Tests for login, logout, and authentication flows
 */

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    logger.logStep('Navigate to login page');
    await page.goto(URLS.LOGIN);
  });

  test('@smoke @critical - Should login with valid credentials', async ({ loginPage, page }) => {
    await test.step('Enter valid username and password', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    });

    await test.step('Verify dashboard loads', async () => {
      await expect(page).toHaveURL(/dashboard\/index/);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      logger.logAssertion('User successfully logged in and redirected to dashboard');
    });
  });

  test('@smoke @critical - Should display error for invalid credentials', async ({
    loginPage,
  }) => {
    await test.step('Enter invalid username and password', async () => {
      await loginPage.login(TEST_USERS.INVALID_USER.username, TEST_USERS.INVALID_USER.password);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible({ timeout: 15000 });
      logger.logAssertion('Error message displayed for invalid credentials');
    });
  });

  test('@critical - Should logout successfully', async ({ loginPage, page }) => {
    await test.step('Login first', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
      await expect(page).toHaveURL(/dashboard\/index/);
    });

    await test.step('Logout', async () => {
      await loginPage.logout();
    });

    await test.step('Verify user is logged out', async () => {
      await expect(page).toHaveURL(URLS.LOGIN);
      logger.logAssertion('User successfully logged out');
    });
  });

  test('@regression - Should validate username field is required', async ({ loginPage }) => {
    await test.step('Attempt to login without username', async () => {
      await loginPage.passwordInput.fill(TEST_USERS.VALID_USER.password);
      await loginPage.loginButton.click();
    });

    await test.step('Verify validation message appears', async () => {
      await expect(loginPage.usernameInput.locator('..').getByText('Required')).toBeVisible();
      logger.logAssertion('Username validation working correctly');
    });
  });

  test('@regression - Should have visible password field toggle', async ({ page, loginPage }) => {
    await test.step('Enter password', async () => {
      await loginPage.passwordInput.fill(TEST_USERS.VALID_USER.password);
    });

    await test.step('Verify password field is not visible', async () => {
      const passwordType = await loginPage.passwordInput.getAttribute('type');
      expect(passwordType).toBe('password');
      logger.logAssertion('Password field is properly masked');
    });
  });

  test('@regression - Should navigate to forgot password page', async ({ loginPage, page }) => {
    await test.step('Click forgot password link', async () => {
      await loginPage.clickForgotPassword();
    });

    await test.step('Verify forgot password page loads', async () => {
      const currentUrl = page.url();
      expect(currentUrl.toLowerCase()).toContain('forgot');
      logger.logAssertion('Successfully navigated to forgot password page');
    });
  });
});
