import { test, expect } from '../fixtures/test.fixture';
import { TEST_USERS, URLS } from '../utils/test-data';
import { logger } from '../utils/logger';

test.describe('Responsive Critical Flows', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('RWD-001 RWD-002 RWD-003 @responsive @regression - Should support mobile login and dashboard', async ({
    page,
    loginPage,
    dashboardPage,
  }) => {
    await test.step('Open login page on mobile viewport', async () => {
      await page.goto(URLS.LOGIN);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    await test.step('Login and verify dashboard remains usable', async () => {
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      await expect(dashboardPage.quickLaunchWidget).toBeVisible();
      await expect(dashboardPage.userMenu).toBeVisible();
      logger.logAssertion('Mobile login, dashboard, and user menu are reachable');
    });
  });

  test('RWD-004 @responsive @regression - Should keep PIM forms usable on tablet viewport', async ({
    page,
    loginPage,
    pimPage,
  }) => {
    await test.step('Set tablet viewport and authenticate', async () => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(URLS.LOGIN);
      await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Verify PIM employee list controls are reachable', async () => {
      await pimPage.navigate();
      await expect(pimPage.employeeInformationHeading).toBeVisible();
      await expect(pimPage.searchButton).toBeVisible();
      await expect(pimPage.resetButton).toBeVisible();
      await expect(pimPage.addButton).toBeVisible();
    });

    await test.step('Verify Add Employee fields are reachable', async () => {
      await pimPage.openAddEmployee();
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
      await expect(pimPage.firstNameInput).toBeVisible();
      await expect(pimPage.lastNameInput).toBeVisible();
      await expect(pimPage.saveButton).toBeVisible();
      logger.logAssertion('Responsive PIM form controls are reachable');
    });
  });
});
