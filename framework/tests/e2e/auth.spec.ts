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

  test('AUTH-001 @smoke @critical - Should load login page', async ({ loginPage, page }) => {
    await test.step('Verify login page shell', async () => {
      await expect(page).toHaveTitle('OrangeHRM');
      await expect(loginPage.loginPageTitle).toBeVisible();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      logger.logAssertion('Login page smoke elements are visible');
    });
  });

  test('AUTH-002 DASH-001 @smoke @critical - Should login with valid credentials', async ({ loginPage, page }) => {
    await test.step('Enter valid username and password', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    });

    await test.step('Verify dashboard loads', async () => {
      await expect(page).toHaveURL(/dashboard\/index/);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      logger.logAssertion('User successfully logged in and redirected to dashboard');
    });
  });

  test('AUTH-003 @smoke @critical - Should display error for invalid credentials', async ({
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

  test('AUTH-008 @smoke @critical - Should logout successfully', async ({ loginPage, page }) => {
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

  test('AUTH-004 @regression - Should validate username field is required', async ({ loginPage }) => {
    await test.step('Attempt to login without username', async () => {
      await loginPage.passwordInput.fill(TEST_USERS.VALID_USER.password);
      await loginPage.loginButton.click();
    });

    await test.step('Verify validation message appears', async () => {
      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      logger.logAssertion('Username validation working correctly');
    });
  });

  test('AUTH-005 @regression - Should validate password field is required', async ({ loginPage }) => {
    await test.step('Attempt to login without password', async () => {
      await loginPage.usernameInput.fill(TEST_USERS.VALID_USER.username);
      await loginPage.loginButton.click();
    });

    await test.step('Verify validation message appears', async () => {
      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      logger.logAssertion('Password validation working correctly');
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

  test('AUTH-006 @regression - Should navigate to forgot password page', async ({ loginPage, page }) => {
    await test.step('Click forgot password link', async () => {
      await loginPage.clickForgotPassword();
    });

    await test.step('Verify forgot password page loads', async () => {
      await expect(page).toHaveURL(URLS.FORGOT_PASSWORD);
      await expect(loginPage.resetPasswordTitle).toBeVisible();
      await expect(loginPage.resetUsernameInput).toBeVisible();
      await expect(loginPage.resetCancelButton).toBeVisible();
      await expect(loginPage.resetPasswordButton).toBeVisible();
      logger.logAssertion('Successfully navigated to forgot password page');
    });
  });

  test('AUTH-007 @regression - Should cancel forgot password flow', async ({ loginPage, page }) => {
    await test.step('Navigate to forgot password page', async () => {
      await loginPage.clickForgotPassword();
      await expect(page).toHaveURL(URLS.FORGOT_PASSWORD);
    });

    await test.step('Cancel password reset', async () => {
      await loginPage.cancelPasswordReset();
    });

    await test.step('Verify user returns to login page', async () => {
      await expect(page).toHaveURL(URLS.LOGIN);
      await expect(loginPage.loginPageTitle).toBeVisible();
      logger.logAssertion('Forgot password Cancel returned to login page');
    });
  });
});
