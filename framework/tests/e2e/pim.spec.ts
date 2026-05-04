import { test, expect } from '../fixtures/test.fixture';
import { URLS } from '../utils/test-data';
import { logger } from '../utils/logger';

/**
 * PIM Tests (@smoke @regression)
 * Tests for OrangeHRM employee list search and navigation.
 */

test.describe('PIM Employee Management', () => {
  test.beforeEach(async ({ authenticatedPage, pimPage }) => {
    logger.logStep('Navigate to PIM employee list');
    await pimPage.navigate();
    await expect(authenticatedPage.getByRole('heading', { name: 'PIM' })).toBeVisible();
  });

  test('@smoke @critical - Should display employee information page', async ({ pimPage }) => {
    await test.step('Verify PIM page is loaded', async () => {
      await expect(pimPage.pageTitle).toBeVisible();
      await expect(pimPage.employeeInformationHeading).toBeVisible();
      await expect(pimPage.recordsFound).toBeVisible();
      logger.logAssertion('PIM employee information page loaded successfully');
    });
  });

  test('@regression - Should show employee records', async ({ pimPage }) => {
    await test.step('Verify records are displayed', async () => {
      const summary = await pimPage.getRecordSummary();
      const rowCount = await pimPage.getVisibleEmployeeRowCount();

      expect(summary).toMatch(/Records Found/);
      expect(rowCount).toBeGreaterThan(0);
      logger.logAssertion(`Employee records are visible: ${summary}`);
    });
  });

  test('@regression - Should search by employee ID', async ({ pimPage, page }) => {
    let employeeId = '';

    await test.step('Read an employee ID from the current result set', async () => {
      employeeId = await pimPage.getFirstEmployeeId();
      expect(employeeId).toBeTruthy();
    });

    await test.step('Search for the employee ID', async () => {
      await pimPage.searchByEmployeeId(employeeId);
    });

    await test.step('Verify filtered employee list updates', async () => {
      await expect(page.getByText(employeeId).first()).toBeVisible({ timeout: 15000 });
      logger.logAssertion('Employee ID search returned matching records');
    });
  });

  test('@regression - Should reset employee search filters', async ({ pimPage }) => {
    await test.step('Search and then reset filters', async () => {
      const employeeId = await pimPage.getFirstEmployeeId();
      await pimPage.searchByEmployeeId(employeeId);
      await pimPage.resetSearch();
    });

    await test.step('Verify record summary is restored', async () => {
      await expect(pimPage.recordsFound).toBeVisible();
      expect(await pimPage.getVisibleEmployeeRowCount()).toBeGreaterThan(0);
      logger.logAssertion('PIM search filters reset successfully');
    });
  });

  test('@regression - Should navigate to add employee page', async ({ pimPage, page }) => {
    await test.step('Click Add employee', async () => {
      await pimPage.openAddEmployee();
    });

    await test.step('Verify add employee page loads', async () => {
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
      await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
      logger.logAssertion('Add Employee page loaded successfully');
    });
  });
});
