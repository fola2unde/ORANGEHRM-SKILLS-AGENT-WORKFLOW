import { test, expect } from '../fixtures/test.fixture';
import { logger } from '../utils/logger';

/**
 * Dashboard Tests (@smoke @regression)
 * Tests for dashboard functionality and user interface
 */

test.describe('Dashboard', () => {
  test.beforeEach(async ({ authenticatedPage, dashboardPage }) => {
    logger.logStep('Navigate to dashboard');
    await dashboardPage.navigate();
    await expect(authenticatedPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('DASH-001 DASH-006 @smoke @critical - Should display dashboard with core widgets', async ({
    dashboardPage,
  }) => {
    await test.step('Verify dashboard is loaded', async () => {
      const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
      expect(isDashboardLoaded).toBe(true);
      logger.logAssertion('Dashboard page loaded successfully');
    });

    await test.step('Verify core dashboard widgets are displayed', async () => {
      const widgetsVisible = await dashboardPage.areCoreWidgetsVisible();
      expect(widgetsVisible).toBe(true);
      logger.logAssertion('Core dashboard widgets are visible');
    });
  });

  test('DASH-006 @regression - Should display extended dashboard widgets', async ({ dashboardPage }) => {
    await test.step('Verify employees on leave widget', async () => {
      await expect(dashboardPage.employeesOnLeaveWidget).toBeVisible();
      await expect(dashboardPage.subUnitDistributionWidget).toBeVisible();
      await expect(dashboardPage.locationDistributionWidget).toBeVisible();
      logger.logAssertion('Employees on Leave Today widget is visible');
    });
  });

  test('DASH-002 @regression - Should display side navigation module links', async ({ dashboardPage }) => {
    await test.step('Verify side navigation contains major modules', async () => {
      const sideNavigationText = await dashboardPage.getSideNavigationText();
      for (const moduleName of [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
      ]) {
        expect(sideNavigationText).toContain(moduleName);
      }
      logger.logAssertion('Side navigation exposes expected OrangeHRM modules');
    });
  });

  test('DASH-003 @regression - Should display user menu account actions', async ({ dashboardPage }) => {
    await test.step('Verify user menu is visible', async () => {
      await expect(dashboardPage.userMenu).toBeVisible();
      await dashboardPage.openUserMenu();
      await expect(dashboardPage.aboutMenuItem).toBeVisible();
      await expect(dashboardPage.supportMenuItem).toBeVisible();
      await expect(dashboardPage.changePasswordMenuItem).toBeVisible();
      await expect(dashboardPage.logoutMenuItem).toBeVisible();
      logger.logAssertion('User menu is available');
    });
  });

  test('DASH-004 @regression - Should display quick actions section', async ({ dashboardPage }) => {
    await test.step('Check if quick actions are available', async () => {
      await expect(dashboardPage.quickLaunchWidget).toBeVisible();
      await expect(dashboardPage.assignLeaveButton).toBeVisible();
      await expect(dashboardPage.leaveListButton).toBeVisible();
      await expect(dashboardPage.timesheetsButton).toBeVisible();
      await expect(dashboardPage.applyLeaveButton).toBeVisible();
      await expect(dashboardPage.myLeaveButton).toBeVisible();
      await expect(dashboardPage.myTimesheetButton).toBeVisible();
      logger.logAssertion('Quick actions section is available');
    });
  });

  test('DASH-005 @regression - Should navigate to assign leave from quick launch', async ({
    dashboardPage,
    page,
  }) => {
    await test.step('Click assign leave button', async () => {
      await dashboardPage.openAssignLeave();
    });

    await test.step('Verify navigation to assign leave page', async () => {
      await expect(page).toHaveURL(/leave\/assignLeave/);
      logger.logAssertion('Successfully navigated to assign leave page');
    });
  });

  test('DASH-005 @regression - Should navigate to leave list from quick launch', async ({ dashboardPage, page }) => {
    await test.step('Click leave list button', async () => {
      await dashboardPage.openLeaveList();
    });

    await test.step('Verify navigation to leave list page', async () => {
      await expect(page).toHaveURL(/leave\/viewLeaveList/);
      logger.logAssertion('Successfully navigated to leave list page');
    });
  });

  test('DASH-006 @smoke - Should load without application error text', async ({ page }) => {
    await test.step('Verify page has no generic application error', async () => {
      await expect(page.getByText(/application error|internal server error/i)).toHaveCount(0);
      logger.logAssertion('Dashboard loaded without visible application errors');
    });
  });
});
