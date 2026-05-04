import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';
import { TEST_USERS, URLS } from '../utils/test-data';

type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  authenticatedPage: Page;
};

/**
 * Custom test fixture extending Playwright base test
 * Provides page objects and authenticated context
 */
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },

  /**
   * Fixture for tests that require authentication
   * Automatically logs in before the test runs
   */
  authenticatedPage: async ({ page, loginPage }, use) => {
    await page.goto(URLS.LOGIN);
    await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    await expect(page).toHaveURL(/dashboard\/index/);
    await use(page);
  },
});

export { expect };
