import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Login Page Object
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly userDropdown: Locator;
  readonly logoutMenuItem: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginPageTitle: Locator;
  readonly usernameRequiredMessage: Locator;
  readonly passwordRequiredMessage: Locator;
  readonly resetPasswordTitle: Locator;
  readonly resetUsernameInput: Locator;
  readonly resetCancelButton: Locator;
  readonly resetPasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('alert');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.loginPageTitle = page.getByRole('heading', { name: /login/i });
    this.usernameRequiredMessage = this.usernameInput.locator('..').getByText('Required');
    this.passwordRequiredMessage = this.passwordInput.locator('..').getByText('Required');
    this.resetPasswordTitle = page.getByRole('heading', { name: 'Reset Password' });
    this.resetUsernameInput = page.getByPlaceholder('Username');
    this.resetCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    await super.navigate('/web/index.php/auth/login');
  }

  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
  }

  /**
   * Check if login page is visible
   */
  async isLoginPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.loginPageTitle);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return this.isElementVisible(this.errorMessage);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async cancelPasswordReset(): Promise<void> {
    await this.resetCancelButton.click();
  }
}
