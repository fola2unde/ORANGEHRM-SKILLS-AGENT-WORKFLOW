# OrangeHRM QA Automation User Stories

Application URL:

```text
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

Default demo credentials from the automation plan:

- Username: Admin
- Password: admin123

## QA-US-001: Baseline Playwright Framework Configuration

### Description

Validate and prepare the existing Playwright TypeScript framework for OrangeHRM automation. This story confirms the base URL, browser projects, reporting, screenshots, traces, fixtures, page objects, and test tagging strategy needed for later smoke, regression, accessibility, responsive, and API suites.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Framework configuration supports OrangeHRM automation
  Given the Playwright TypeScript framework is installed
  When the QA engineer reviews the configuration
  Then the base URL should target the OrangeHRM demo site
  And browser projects should include desktop, mobile, and tablet coverage
  And reports, traces, screenshots, and videos should be configured for diagnostics
```

### Business Rules

- The framework must support reusable Page Object Model classes.
- Test data and URLs must be centralized.
- CI-friendly output formats must be available.

### Technical Notes

- Use `framework/playwright.config.ts`.
- Keep `BASE_URL` configurable by environment variable.
- Preserve role-first locator strategy.

### Definition of Done

- Configuration has been reviewed.
- TypeScript type-check can be executed.
- Smoke test command is documented and ready to run.

## QA-US-002: Login Page Smoke Coverage

### Description

Automate a smoke test that confirms the OrangeHRM login page loads, the page title is correct, credential hints are visible, and the Username, Password, and Login controls are available.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Login page loads successfully
  Given the user navigates to the OrangeHRM login page
  When the page finishes loading
  Then the page title should be "OrangeHRM"
  And the Login heading should be visible
  And the Username field should be visible
  And the Password field should be visible
  And the Login button should be visible
```

### Business Rules

- The login page is the entry point for all authenticated workflows.
- Credential hints may appear on the demo site and can be asserted as non-critical supporting content.

### Technical Notes

- Prefer `getByRole('textbox', { name: 'Username' })`.
- Prefer `getByRole('button', { name: 'Login' })`.
- Tag as `@smoke @critical`.

### Definition of Done

- Test is implemented in the authentication suite.
- Test passes in Chromium.
- Failure artifacts are available when the test fails.

## QA-US-003: Valid Login and Dashboard Smoke Flow

### Description

Automate the critical happy path where a valid user logs in and lands on the Dashboard page. This story validates authentication, redirect behavior, and the first authenticated page.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Successful login
  Given the user navigates to the login page
  When the user enters valid credentials
  And clicks the login button
  Then the dashboard should be displayed
  And the page URL should contain "/dashboard/index"
  And the Dashboard heading should be visible
```

### Business Rules

- Valid public demo credentials must authenticate successfully.
- Dashboard must be displayed only after successful authentication.

### Technical Notes

- Encapsulate login behavior in `LoginPage.login`.
- Assert URL and heading rather than mutable dashboard values.
- Tag as `@smoke @critical`.

### Definition of Done

- Test uses centralized credentials.
- Test passes in Chromium.
- Test is included in the smoke command.

## QA-US-004: Logout Smoke Flow

### Description

Automate logout from an authenticated session to confirm the user menu is reachable and the session exits back to the login page.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Successful logout
  Given the user is logged in to OrangeHRM
  When the user opens the profile dropdown
  And selects Logout
  Then the login page should be displayed
  And the page URL should contain "/auth/login"
```

### Business Rules

- Authenticated users must be able to end their session.
- Logout must return the user to the login page.

### Technical Notes

- Use the user dropdown menu item with accessible role `menuitem`.
- Avoid asserting the displayed user name because demo data may vary.

### Definition of Done

- Logout helper exists in the page object.
- Test passes from a logged-in session.
- Test is tagged as smoke or critical.

## QA-US-005: PIM Navigation Smoke Flow

### Description

Automate navigation from the Dashboard to the PIM Employee List page to verify that a critical HR module is reachable after login.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Navigate to PIM Employee List
  Given the user is logged in to OrangeHRM
  When the user clicks the PIM navigation link
  Then the PIM page should be displayed
  And the Employee Information heading should be visible
  And the page URL should contain "/pim/viewEmployeeList"
```

### Business Rules

- PIM is a core employee-management module.
- Navigation should be available from the main side panel after authentication.

### Technical Notes

- Use `getByRole('link', { name: 'PIM' })`.
- Tag as `@smoke @regression`.

### Definition of Done

- PIM navigation method exists in a page object or helper.
- Test passes in Chromium.
- Test is included in smoke coverage.

## QA-US-006: Invalid Login Validation

### Description

Automate invalid credential validation to confirm that OrangeHRM prevents access and displays the expected error alert.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: invalid-user
- Password: invalid-password

### Acceptance Criteria

```gherkin
Scenario: Invalid login displays an error
  Given the user navigates to the login page
  When the user enters invalid credentials
  And clicks the login button
  Then an alert should be displayed
  And the alert text should contain "Invalid credentials"
  And the user should remain on the login page
```

### Business Rules

- Invalid credentials must not authenticate.
- Error feedback must be visible to the user.

### Technical Notes

- Assert role `alert`.
- Do not rely on screenshot comparison.

### Definition of Done

- Negative authentication test is automated.
- Test uses isolated invalid credentials.
- Test is tagged as `@critical` or `@regression`.

## QA-US-007: Required Field Validation

### Description

Automate username and password required-field validation so the team can detect regressions in login form validation.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: TBD for empty-field scenario
- Password: TBD for empty-field scenario

### Acceptance Criteria

```gherkin
Scenario: Username is required
  Given the user navigates to the login page
  When the user leaves the username field blank
  And enters a password
  And clicks the login button
  Then a Required validation message should be displayed for the username field

Scenario: Password is required
  Given the user navigates to the login page
  When the user enters a username
  And leaves the password field blank
  And clicks the login button
  Then a Required validation message should be displayed for the password field
```

### Business Rules

- Username is mandatory.
- Password is mandatory.
- Required-field validation must block login submission.

### Technical Notes

- Use field-adjacent validation locators encapsulated in the page object.
- Keep assertions resilient to DOM wrapper changes.

### Definition of Done

- Username required validation is covered.
- Password required validation is covered.
- Tests pass in Chromium.

## QA-US-008: Forgot Password Flow

### Description

Automate the forgot password flow to confirm the reset page is reachable and provides a username field plus Cancel and Reset Password actions.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: not required for reset navigation

### Acceptance Criteria

```gherkin
Scenario: Forgot password page opens
  Given the user navigates to the login page
  When the user clicks Forgot your password
  Then the Reset Password page should be displayed
  And the Username field should be visible
  And the Cancel button should be visible
  And the Reset Password button should be visible

Scenario: Cancel password reset
  Given the user is on the Reset Password page
  When the user clicks Cancel
  Then the login page should be displayed
```

### Business Rules

- Account recovery entry point must be available from login.
- Cancel should not submit a reset request.

### Technical Notes

- Assert URL contains `/requestPasswordResetCode`.
- Avoid testing email delivery in the public demo environment.

### Definition of Done

- Forgot password navigation is automated.
- Cancel behavior is automated.
- Tests are tagged as regression.

## QA-US-009: Dashboard Widget Rendering

### Description

Automate dashboard rendering checks for key widgets and stable headings after login.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Dashboard widgets render
  Given the user is logged in to OrangeHRM
  When the Dashboard page loads
  Then the Time at Work widget should be visible
  And the My Actions widget should be visible
  And the Quick Launch widget should be visible
  And the Buzz Latest Posts widget should be visible
  And employee distribution widgets should be visible
```

### Business Rules

- Dashboard values are mutable and should not be hard-coded.
- Widget containers and headings are stable automation targets.

### Technical Notes

- Use heading/text assertions.
- Do not assert exact counts, dates, or names.

### Definition of Done

- Dashboard page object exposes widget locators.
- Test passes with live demo data.
- Test is tagged as regression.

## QA-US-010: User Dropdown Menu

### Description

Automate the authenticated user dropdown menu to verify account-related menu items remain accessible.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: User dropdown shows account actions
  Given the user is logged in to OrangeHRM
  When the user opens the profile dropdown
  Then the About menu item should be visible
  And the Support menu item should be visible
  And the Change Password menu item should be visible
  And the Logout menu item should be visible
```

### Business Rules

- Authenticated account actions must be visible through the user menu.
- The displayed profile name may vary and should not be a strict assertion.

### Technical Notes

- Prefer role `menuitem`.
- Encapsulate dropdown opening in `DashboardPage`.

### Definition of Done

- Menu open behavior is automated.
- All expected menu items are asserted.
- Test remains independent from exact user display name.

## QA-US-011: Quick Launch Navigation

### Description

Automate Dashboard Quick Launch shortcut visibility and representative navigation to verify high-use HR actions remain reachable.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Quick Launch shortcuts are available
  Given the user is logged in to OrangeHRM
  When the Dashboard page loads
  Then the Assign Leave shortcut should be visible
  And the Leave List shortcut should be visible
  And the Timesheets shortcut should be visible
  And the Apply Leave shortcut should be visible
  And the My Leave shortcut should be visible
  And the My Timesheet shortcut should be visible

Scenario: Quick Launch shortcut navigates to target workflow
  Given the user is on the Dashboard page
  When the user selects a Quick Launch shortcut
  Then the corresponding module page should be displayed
```

### Business Rules

- Quick Launch shortcuts must remain reachable from Dashboard.
- Navigation success should be validated by URL or page heading.

### Technical Notes

- Test one or two representative shortcuts in depth.
- Assert all shortcuts are visible.

### Definition of Done

- Shortcut visibility test is automated.
- Representative navigation test is automated.
- Tests avoid exact mutable content assertions.

## QA-US-012: Employee List Page

### Description

Automate PIM Employee List rendering checks, including the Employee Information section, filters, Search and Reset buttons, and employee table headers.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Employee List page renders
  Given the user is logged in to OrangeHRM
  When the user navigates to PIM
  Then the Employee Information heading should be visible
  And the Employee Name filter should be visible
  And the Employee Id filter should be visible
  And the Search button should be visible
  And the Reset button should be visible
  And the employee table should be visible
```

### Business Rules

- PIM Employee List is the main entry point for employee search and maintenance.
- Table content is mutable and should be treated dynamically.

### Technical Notes

- Assert table headers where stable.
- Avoid fixed record-count assertions.

### Definition of Done

- PIM page object exposes filter and table locators.
- Test passes with current demo data.
- Test is tagged as smoke/regression.

## QA-US-013: Employee Search and Reset

### Description

Automate employee search by reading an existing employee ID from the current table, searching for it, and verifying reset clears the filter.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Search by existing employee ID
  Given the user is on the PIM Employee List page
  And an employee ID is available in the current table
  When the user enters that employee ID in the Employee Id filter
  And clicks Search
  Then the results should include a row with the searched employee ID

Scenario: Reset employee search filters
  Given the user has entered an employee ID filter
  When the user clicks Reset
  Then the Employee Id filter should be cleared
```

### Business Rules

- Search should operate on current live data.
- Reset should clear stale filters.

### Technical Notes

- Discover data at runtime.
- Skip or fail clearly if no usable employee ID is available.
- Encapsulate table parsing in `PimPage`.

### Definition of Done

- Search by discovered employee ID is automated.
- Reset validation is automated.
- Test does not depend on a fixed employee record.

## QA-US-014: Add Employee Validation

### Description

Automate Add Employee required-field validation to confirm incomplete records cannot be saved without mandatory names.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Add Employee requires mandatory name fields
  Given the user is on the Add Employee page
  When the user clicks Save without entering required employee names
  Then required validation messages should be displayed
  And the employee record should not be created
```

### Business Rules

- Employee Full Name required fields must be enforced.
- Invalid submissions must keep the user on the Add Employee page.

### Technical Notes

- Navigate through PIM topbar or direct route after authentication.
- Do not assert default employee ID value.

### Definition of Done

- Required validation test is automated.
- Test asserts the page remains on Add Employee.
- Test is tagged as regression.

## QA-US-015: Add Employee Happy Path

### Description

Automate creation of a new employee using unique generated test data, then verify the resulting employee details page and searchability where possible.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Add a new employee
  Given the user is logged in to OrangeHRM
  And the user is on the Add Employee page
  When the user enters a unique first name
  And enters a unique last name
  And saves the employee
  Then the employee details page should be displayed
  And the employee name should match the submitted data

Scenario: Newly created employee is searchable
  Given a unique employee has been created
  When the user searches for the created employee in Employee List
  Then the results should include the created employee
```

### Business Rules

- Test data must be unique to reduce collisions in the shared demo environment.
- Cleanup is not required unless reliable ownership and deletion are available.

### Technical Notes

- Use timestamp or GUID suffixes.
- Consider serial execution for create/search dependency.
- Avoid destructive cleanup unless explicitly safe.

### Definition of Done

- Add employee happy path is automated.
- Created data is unique.
- Search verification is automated or clearly documented if blocked by demo instability.

## QA-US-016: Login Accessibility

### Description

Automate basic accessibility checks on the login page using axe and role-based assertions for critical form controls.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Login page has no critical accessibility violations
  Given the user navigates to the login page
  When an accessibility scan is executed
  Then no critical accessibility violations should be reported
  And the Username field should have an accessible name
  And the Password field should have an accessible name
  And the Login button should have an accessible name
```

### Business Rules

- Authentication must be accessible to users with assistive technology.
- Critical issues should fail the automated accessibility test.

### Technical Notes

- Use `@axe-core/playwright`.
- Configure severity threshold to avoid blocking on minor known demo issues unless agreed.

### Definition of Done

- Login axe scan is automated.
- Accessible names for core controls are asserted.
- Test is tagged as `@a11y`.

## QA-US-017: Dashboard and PIM Accessibility

### Description

Automate basic accessibility scans on authenticated Dashboard and PIM pages to catch critical issues in core post-login workflows.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Dashboard has no critical accessibility violations
  Given the user is logged in to OrangeHRM
  When an accessibility scan is executed on the Dashboard page
  Then no critical accessibility violations should be reported
  And the Dashboard heading should be visible

Scenario: PIM Employee List has no critical accessibility violations
  Given the user is logged in to OrangeHRM
  When the user navigates to PIM
  And an accessibility scan is executed
  Then no critical accessibility violations should be reported
  And the Employee Information heading should be visible
```

### Business Rules

- Core authenticated pages should remain accessible.
- Accessibility checks should supplement, not replace, manual accessibility review.

### Technical Notes

- Use authenticated fixture setup.
- Document any known exclusions if public demo markup causes repeat false positives.

### Definition of Done

- Dashboard axe scan is automated.
- PIM axe scan is automated.
- Critical violations fail the test.

## QA-US-018: Keyboard Navigation

### Description

Automate keyboard-only checks for login and key authenticated actions to ensure the application is usable without a mouse.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Login can be completed with keyboard navigation
  Given the user navigates to the login page
  When the user navigates through fields using the keyboard
  And enters valid credentials
  And submits the form
  Then the Dashboard page should be displayed

Scenario: User menu can be operated with keyboard navigation
  Given the user is logged in to OrangeHRM
  When the user focuses the profile dropdown with the keyboard
  And opens the menu
  Then account menu options should be reachable
```

### Business Rules

- Critical user journeys should not require pointer-only interaction.
- Focus order should allow completion of primary workflows.

### Technical Notes

- Use Playwright keyboard APIs.
- Assert focus and final navigation outcomes.

### Definition of Done

- Keyboard login test is automated.
- User menu keyboard coverage is automated or documented if blocked by app behavior.
- Tests are tagged as `@a11y`.

## QA-US-019: Mobile Login and Dashboard

### Description

Automate responsive checks for login and Dashboard at mobile viewport sizes, focusing on usability and critical content visibility.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Login page is usable on mobile
  Given the browser viewport is set to a mobile size
  When the user navigates to the login page
  Then the Username field should be visible
  And the Password field should be visible
  And the Login button should be visible

Scenario: Dashboard is usable on mobile
  Given the browser viewport is set to a mobile size
  And the user is logged in
  When the Dashboard page loads
  Then the Dashboard heading should be visible
  And core dashboard widgets should be visible in a stacked layout
```

### Business Rules

- Mobile checks validate usability, not pixel-perfect layout.
- Critical controls must remain reachable.

### Technical Notes

- Use Playwright mobile projects or explicit viewport.
- Avoid brittle coordinate-based assertions.

### Definition of Done

- Mobile login responsive test is automated.
- Mobile dashboard responsive test is automated.
- Tests pass in Mobile Chrome or equivalent project.

## QA-US-020: Tablet and Mobile PIM Forms

### Description

Automate responsive checks for PIM Employee List and Add Employee forms on tablet or mobile-like viewports.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: PIM Employee List remains usable on responsive viewport
  Given the browser viewport is set to a tablet or mobile size
  And the user is logged in
  When the user navigates to PIM
  Then the Employee Information section should be visible
  And Search and Reset controls should be reachable

Scenario: Add Employee form remains usable on responsive viewport
  Given the browser viewport is set to a tablet or mobile size
  And the user is on the Add Employee page
  Then the First Name field should be visible
  And the Last Name field should be visible
  And the Save button should be reachable
```

### Business Rules

- PIM responsive testing should prioritize form usability.
- Exact desktop parity is not required on smaller viewports.

### Technical Notes

- Prefer tablet for PIM if mobile table layout is constrained.
- Assert visibility and reachability rather than exact CSS positions.

### Definition of Done

- Responsive PIM list check is automated.
- Responsive Add Employee check is automated.
- Any app limitations are documented.

## QA-US-021: Login and Protected Route API Contracts

### Description

Automate HTTP contract checks for the public login page and protected authenticated routes to verify expected availability and access behavior.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Login page returns success
  Given an unauthenticated API request context
  When the client requests the login page
  Then the response status should be 200

Scenario: Protected dashboard route requires authentication
  Given an unauthenticated API request context
  When the client requests the dashboard route
  Then the response should redirect to login or otherwise indicate authentication is required
```

### Business Rules

- Public routes should be available.
- Protected routes should not expose authenticated content without a session.

### Technical Notes

- Use Playwright `request` fixture.
- Keep assertions flexible for redirect status differences.

### Definition of Done

- Login HTTP contract is automated.
- Protected route behavior is automated.
- Tests are tagged as `@api`.

## QA-US-022: Dashboard Widget API Contracts

### Description

Automate contract checks for Dashboard widget endpoints observed during exploration, validating response status and top-level JSON shape after authentication.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Dashboard widget APIs return successful responses
  Given the user has an authenticated request context
  When the client requests dashboard widget API endpoints
  Then each endpoint should return a 200 response
  And each response should contain valid JSON
```

### Business Rules

- Dashboard widgets depend on API responses.
- Contract tests should validate availability and structure, not volatile widget values.

### Technical Notes

- Endpoints include time-at-work, action-summary, shortcuts, buzz feed, leaves, subunit, and locations.
- Reuse authenticated session setup where possible.

### Definition of Done

- Dashboard widget endpoint list is centralized.
- Contract tests are automated.
- Tests are tagged as `@api @regression`.

## QA-US-023: Cross-Browser Smoke Execution

### Description

Configure and validate smoke execution across desktop and mobile browser projects to reduce release compatibility risk.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Smoke suite runs across supported browser projects
  Given the smoke suite is implemented
  When the test runner executes supported browser projects
  Then smoke tests should run in Chromium
  And smoke tests should run in Firefox
  And smoke tests should run in WebKit
  And smoke tests should run in mobile browser projects
```

### Business Rules

- Critical access flows must be browser compatible.
- Full regression can remain focused on Chromium unless scheduled differently.

### Technical Notes

- Use existing Playwright projects.
- Keep workers low against the live public demo.

### Definition of Done

- Smoke suite runs across configured projects.
- Browser-specific failures generate artifacts.
- Execution command is documented.

## QA-US-024: CI Reporting and Test Artifacts

### Description

Enable CI reporting for Playwright automation so failures are diagnosable by the Scrum team.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: CI publishes automation results
  Given the automation suite runs in CI
  When tests complete
  Then an HTML report should be generated
  And JSON and JUnit results should be generated
  And screenshots, videos, and traces should be retained for failures
```

### Business Rules

- CI must provide actionable feedback.
- Pull requests should prioritize type-check and smoke feedback.

### Technical Notes

- Use `npm ci`, Playwright browser install, type-check, and targeted test scripts.
- Upload `playwright-report` and `test-results` artifacts.

### Definition of Done

- CI job is configured or updated.
- Artifacts are published.
- Failure diagnostics are verified.

## QA-US-025: Test Data and Flakiness Controls

### Description

Implement test data and reliability controls to keep automation stable against the mutable public OrangeHRM demo environment.

### Application URL

`https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

### Test Credentials

- Username: Admin
- Password: admin123

### Acceptance Criteria

```gherkin
Scenario: Tests avoid brittle live demo assumptions
  Given the OrangeHRM demo data can change
  When automation tests execute
  Then tests should use centralized credentials
  And employee creation should use unique generated data
  And employee search should discover existing data dynamically
  And assertions should avoid volatile dashboard values
```

### Business Rules

- Shared public data must not be assumed stable.
- Destructive scenarios are out of scope unless safe ownership and cleanup are available.

### Technical Notes

- Generate unique suffixes for employee records.
- Avoid fixed employee IDs, widget values, and record counts.
- Use Playwright auto-waits and clear diagnostic messages.

### Definition of Done

- Test data helper supports unique generated data.
- PIM tests use dynamic discovery or generated records.
- Known flakiness risks are documented.
