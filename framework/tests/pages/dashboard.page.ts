import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Dashboard Page Object
 */
export class DashboardPage extends BasePage {
  readonly pageTitle: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly quickLaunchWidget: Locator;
  readonly buzzLatestPostsWidget: Locator;
  readonly employeesOnLeaveWidget: Locator;
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timesheetsButton: Locator;
  readonly applyLeaveButton: Locator;
  readonly myLeaveButton: Locator;
  readonly myTimesheetButton: Locator;
  readonly userMenu: Locator;
  readonly aboutMenuItem: Locator;
  readonly supportMenuItem: Locator;
  readonly changePasswordMenuItem: Locator;
  readonly logoutMenuItem: Locator;
  readonly pimNavigationLink: Locator;
  readonly sideNavigationLinks: Locator;
  readonly subUnitDistributionWidget: Locator;
  readonly locationDistributionWidget: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: /dashboard/i });
    this.timeAtWorkWidget = page.getByText('Time at Work');
    this.myActionsWidget = page.getByText('My Actions');
    this.quickLaunchWidget = page.getByText('Quick Launch');
    this.buzzLatestPostsWidget = page.getByText('Buzz Latest Posts');
    this.employeesOnLeaveWidget = page.getByText('Employees on Leave Today');
    this.assignLeaveButton = page.getByRole('button', { name: 'Assign Leave' });
    this.leaveListButton = page.getByRole('button', { name: 'Leave List' });
    this.timesheetsButton = page.getByRole('button', { name: 'Timesheets' });
    this.applyLeaveButton = page.getByRole('button', { name: 'Apply Leave' });
    this.myLeaveButton = page.getByRole('button', { name: 'My Leave' });
    this.myTimesheetButton = page.getByRole('button', { name: 'My Timesheet' });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.aboutMenuItem = page.getByRole('menuitem', { name: 'About' });
    this.supportMenuItem = page.getByRole('menuitem', { name: 'Support' });
    this.changePasswordMenuItem = page.getByRole('menuitem', { name: 'Change Password' });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
    this.pimNavigationLink = page.getByRole('link', { name: 'PIM' });
    this.sideNavigationLinks = page.locator('nav[aria-label="Sidepanel"] a');
    this.subUnitDistributionWidget = page.getByText('Employee Distribution by Sub Unit');
    this.locationDistributionWidget = page.getByText('Employee Distribution by Location');
  }

  /**
   * Navigate to dashboard
   */
  async navigate(): Promise<void> {
    await super.navigate('/web/index.php/dashboard/index');
  }

  /**
   * Get statistic value
   */
  async areCoreWidgetsVisible(): Promise<boolean> {
    return (
      (await this.isElementVisible(this.timeAtWorkWidget)) &&
      (await this.isElementVisible(this.myActionsWidget)) &&
      (await this.isElementVisible(this.quickLaunchWidget)) &&
      (await this.isElementVisible(this.buzzLatestPostsWidget))
    );
  }

  async openAssignLeave(): Promise<void> {
    await this.assignLeaveButton.click();
  }

  async openLeaveList(): Promise<void> {
    await this.leaveListButton.click();
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async navigateToPim(): Promise<void> {
    await this.pimNavigationLink.click();
  }

  async getSideNavigationText(): Promise<string> {
    return (await this.sideNavigationLinks.allTextContents()).join(' ');
  }

  /**
   * Check if dashboard is loaded
   */
  async isDashboardLoaded(): Promise<boolean> {
    return this.isElementVisible(this.pageTitle);
  }

  async openMyTimesheet(): Promise<void> {
    await this.myTimesheetButton.click();
  }
}
