import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * PIM Page Object for OrangeHRM employee management.
 */
export class PimPage extends BasePage {
  readonly pageTitle: Locator;
  readonly employeeInformationHeading: Locator;
  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly addButton: Locator;
  readonly recordsFound: Locator;
  readonly employeeRows: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdOnAddEmployeeInput: Locator;
  readonly saveButton: Locator;
  readonly requiredMessages: Locator;
  readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'PIM' });
    this.employeeInformationHeading = page.getByRole('heading', {
      name: 'Employee Information',
    });
    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.employeeIdInput = page.locator('.oxd-form-row input').nth(2);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: /Add/ });
    this.recordsFound = page.getByText(/Records Found/);
    this.employeeRows = page.locator('.oxd-table-card');
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdOnAddEmployeeInput = page.locator('.orangehrm-employee-form input').last();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.requiredMessages = page.getByText('Required');
    this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details' });
  }

  async navigate(): Promise<void> {
    await super.navigate('/web/index.php/pim/viewEmployeeList');
  }

  async searchByEmployeeName(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
  }

  async searchByEmployeeId(employeeId: string): Promise<void> {
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
  }

  async openAddEmployee(): Promise<void> {
    await this.addButton.click();
  }

  async saveAddEmployeeForm(): Promise<void> {
    await this.saveButton.click();
  }

  async createEmployee(firstName: string, lastName: string): Promise<string> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    const employeeId = (await this.employeeIdOnAddEmployeeInput.inputValue()).trim();
    await this.saveButton.click();
    return employeeId;
  }

  async getRecordSummary(): Promise<string> {
    return (await this.getElementText(this.recordsFound)).trim();
  }

  async getVisibleEmployeeRowCount(): Promise<number> {
    return this.employeeRows.count();
  }

  async getFirstEmployeeId(): Promise<string> {
    return (await this.employeeRows.first().locator('.oxd-table-cell').nth(1).textContent())?.trim() || '';
  }

  async getEmployeeIdSearchValue(): Promise<string> {
    return this.employeeIdInput.inputValue();
  }
}
