import { test, expect } from '../fixtures/test.fixture';
import { generateEmployee, URLS } from '../utils/test-data';
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

  test('PIM-001 @smoke @critical - Should navigate from Dashboard to PIM employee list', async ({
    dashboardPage,
    page,
    pimPage,
  }) => {
    await test.step('Navigate from Dashboard side panel to PIM', async () => {
      await dashboardPage.navigate();
      await dashboardPage.navigateToPim();
    });

    await test.step('Verify PIM employee list loads', async () => {
      await expect(page).toHaveURL(new RegExp(URLS.PIM));
      await expect(pimPage.employeeInformationHeading).toBeVisible();
      logger.logAssertion('Dashboard side navigation opens PIM Employee List');
    });
  });

  test('PIM-001 PIM-002 @smoke @critical - Should display employee information page', async ({ pimPage }) => {
    await test.step('Verify PIM page is loaded', async () => {
      await expect(pimPage.pageTitle).toBeVisible();
      await expect(pimPage.employeeInformationHeading).toBeVisible();
      await expect(pimPage.employeeNameInput).toBeVisible();
      await expect(pimPage.employeeIdInput).toBeVisible();
      await expect(pimPage.searchButton).toBeVisible();
      await expect(pimPage.resetButton).toBeVisible();
      await expect(pimPage.recordsFound).toBeVisible();
      logger.logAssertion('PIM employee information page loaded successfully');
    });
  });

  test('PIM-001 @regression - Should show employee records', async ({ pimPage }) => {
    await test.step('Verify records are displayed', async () => {
      const summary = await pimPage.getRecordSummary();
      const rowCount = await pimPage.getVisibleEmployeeRowCount();

      expect(summary).toMatch(/Records Found/);
      expect(rowCount).toBeGreaterThan(0);
      logger.logAssertion(`Employee records are visible: ${summary}`);
    });
  });

  test('PIM-003 @regression - Should search by employee ID', async ({ pimPage, page }) => {
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

  test('PIM-004 @regression - Should reset employee search filters', async ({ pimPage }) => {
    await test.step('Search and then reset filters', async () => {
      const employeeId = await pimPage.getFirstEmployeeId();
      await pimPage.searchByEmployeeId(employeeId);
      await pimPage.resetSearch();
    });

    await test.step('Verify record summary is restored', async () => {
      await expect(pimPage.employeeIdInput).toHaveValue('');
      await expect(pimPage.recordsFound).toBeVisible();
      expect(await pimPage.getVisibleEmployeeRowCount()).toBeGreaterThan(0);
      logger.logAssertion('PIM search filters reset successfully');
    });
  });

  test('PIM-005 @regression - Should navigate to add employee page', async ({ pimPage, page }) => {
    await test.step('Click Add employee', async () => {
      await pimPage.openAddEmployee();
    });

    await test.step('Verify add employee page loads', async () => {
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
      await expect(page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
      logger.logAssertion('Add Employee page loaded successfully');
    });
  });

  test('PIM-006 @regression - Should validate required fields on Add Employee', async ({
    pimPage,
    page,
  }) => {
    await test.step('Open Add Employee page', async () => {
      await pimPage.openAddEmployee();
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
    });

    await test.step('Submit empty Add Employee form', async () => {
      await pimPage.saveAddEmployeeForm();
    });

    await test.step('Verify required validation appears', async () => {
      await expect(pimPage.requiredMessages.first()).toBeVisible();
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
      logger.logAssertion('Add Employee required validation is displayed');
    });
  });

  test('PIM-007 PIM-008 @regression - Should create and find a unique employee', async ({
    pimPage,
    page,
  }) => {
    const employee = generateEmployee();
    let employeeId = '';

    await test.step('Open Add Employee page', async () => {
      await pimPage.openAddEmployee();
      await expect(page).toHaveURL(new RegExp(URLS.ADD_EMPLOYEE));
    });

    await test.step('Create employee with unique data', async () => {
      employeeId = await pimPage.createEmployee(employee.firstName, employee.lastName);
      await expect(pimPage.personalDetailsHeading).toBeVisible({ timeout: 15000 });
    });

    await test.step('Search for the created employee by ID', async () => {
      await pimPage.navigate();
      await pimPage.searchByEmployeeId(employeeId);
      await expect(page.getByText(employeeId).first()).toBeVisible({ timeout: 15000 });
      logger.logAssertion(`Created employee is searchable by ID: ${employeeId}`);
    });
  });
});
