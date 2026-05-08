# OrangeHRM QA Automation User Stories

Application URL:

```text
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

Default demo credentials:

- Username: `Admin`
- Password: `admin123`

## User Story Template

Each story follows this Agile QA template:

- **Story ID**
- **Epic**
- **Sprint**
- **Priority**
- **Story Points**
- **User Story**
- **Business Value**
- **Scenario Traceability**
- **Acceptance Criteria**
- **Automation Mapping**
- **Current Automation Status**
- **Definition of Done**

Status values:

- **Implemented**: Matching automated coverage exists.
- **Partial**: Some planned acceptance criteria are automated, but gaps remain.
- **Planned**: No matching automated coverage exists yet.
- **Configuration**: Covered by framework or CI setup rather than a single executable test.

---

## QA-US-001: Baseline Playwright Framework Configuration

**Epic:** Framework Readiness  
**Sprint:** Sprint 1  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Configuration

**User Story:** As a QA Automation Engineer, I want the Playwright TypeScript framework configured for OrangeHRM so that the Scrum team can build reliable automation on a stable foundation.

**Business Value:** Establishes the reusable automation foundation for smoke, regression, API, accessibility, responsive, and cross-browser testing.

**Scenario Traceability:** Framework readiness

**Acceptance Criteria:**

```gherkin
Scenario: Framework configuration supports OrangeHRM automation
  Given the Playwright framework is installed
  When the QA engineer reviews the configuration
  Then the base URL should target the OrangeHRM demo site
  And browser projects should include desktop, mobile, and tablet coverage
  And reports, traces, screenshots, and videos should be configured
  And page objects, fixtures, test data, and tags should be available
```

**Automation Mapping:**

- `framework/playwright.config.ts`
- `framework/tsconfig.json`
- `framework/tests/fixtures/test.fixture.ts`
- `framework/tests/pages/*.page.ts`
- `framework/tests/utils/test-data.ts`

**Definition of Done:**

- TypeScript type-check runs successfully.
- Playwright test discovery lists expected suites.
- Framework supports POM, fixtures, reporting, browser projects, and centralized test data.

---

## QA-US-002: Login Page Smoke Coverage

**Epic:** Smoke Automation  
**Sprint:** Sprint 1  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As a Scrum Team member, I want automated coverage for the OrangeHRM login page load so that every build confirms the application under test is reachable.

**Business Value:** Confirms the entry point is available before running deeper authenticated workflows.

**Scenario Traceability:** AUTH-001

**Acceptance Criteria:**

```gherkin
Scenario: Login page loads successfully
  Given the user navigates to the OrangeHRM login page
  When the page is displayed
  Then the page title should be "OrangeHRM"
  And the Login heading should be visible
  And the Username field should be visible
  And the Password field should be visible
  And the Login button should be visible
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `AUTH-001 @smoke @critical - Should load login page`

**Definition of Done:**

- Test title includes scenario ID and `@smoke @critical`.
- Test validates title, heading, username, password, and login button.

---

## QA-US-003: Valid Login and Dashboard Smoke Flow

**Epic:** Smoke Automation  
**Sprint:** Sprint 1  
**Priority:** Critical  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As a product stakeholder, I want an automated valid login and dashboard landing test so that critical user access is verified early in every test cycle.

**Business Value:** Protects the highest-value happy path: authenticate and reach the dashboard.

**Scenario Traceability:** AUTH-002, DASH-001

**Acceptance Criteria:**

```gherkin
Scenario: Successful login
  Given the user is on the OrangeHRM login page
  When the user enters valid credentials
  And clicks Login
  Then the Dashboard page should be displayed
  And the URL should contain "/dashboard/index"
  And the Dashboard heading should be visible
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `@smoke @critical - Should login with valid credentials`

**Definition of Done:**

- Test uses centralized credentials.
- Test uses `LoginPage.login`.
- Test asserts URL and Dashboard heading with Playwright expectations.

---

## QA-US-004: Logout Smoke Flow

**Epic:** Smoke Automation  
**Sprint:** Sprint 1  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As a QA Automation Engineer, I want an automated logout test so that authenticated sessions can be safely ended and validated.

**Business Value:** Confirms session termination and protects a critical account action.

**Scenario Traceability:** AUTH-008

**Acceptance Criteria:**

```gherkin
Scenario: Successful logout
  Given the user is logged in to OrangeHRM
  When the user opens the profile dropdown
  And selects Logout
  Then the login page should be displayed
  And the URL should contain "/auth/login"
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `AUTH-008 @smoke @critical - Should logout successfully`

**Definition of Done:**

- Test uses `LoginPage.logout`.
- Test asserts return to the login route.

---

## QA-US-005: PIM Navigation Smoke Flow

**Epic:** Smoke Automation  
**Sprint:** Sprint 1  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As a Scrum Team member, I want automated navigation from Dashboard to PIM so that a critical employee-management module is available after login.

**Business Value:** Confirms authenticated users can reach the main employee management area.

**Scenario Traceability:** PIM-001

**Acceptance Criteria:**

```gherkin
Scenario: Navigate to PIM Employee List
  Given the user is logged in and on the Dashboard
  When the user selects the PIM navigation link
  Then the PIM page should be displayed
  And the Employee Information heading should be visible
  And the URL should contain "/pim/viewEmployeeList"
```

**Automation Mapping:**

- `framework/tests/e2e/pim.spec.ts`
- Test: `PIM-001 @smoke @critical - Should navigate from Dashboard to PIM employee list`
- Test: `PIM-001 PIM-002 @smoke @critical - Should display employee information page`

**Definition of Done:**

- Keep PIM page assertions for heading and Employee Information section.

---

## QA-US-006: Invalid Login Validation

**Epic:** Authentication E2E  
**Sprint:** Sprint 2  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As a QA Automation Engineer, I want automated invalid credential validation so that authentication error handling is protected from regression.

**Business Value:** Verifies failed login is blocked and user feedback is visible.

**Scenario Traceability:** AUTH-003

**Acceptance Criteria:**

```gherkin
Scenario: Invalid login displays an error
  Given the user is on the login page
  When the user enters invalid credentials
  And clicks Login
  Then an error alert should be displayed
  And the user should remain unauthenticated
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `@smoke @critical - Should display error for invalid credentials`

**Definition of Done:**

- Test uses invalid credentials from centralized test data.
- Test asserts the error alert with a web-first assertion.

---

## QA-US-007: Required Field Validation

**Epic:** Authentication E2E  
**Sprint:** Sprint 2  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As an end user, I want username and password required-field validation to be tested automatically so that login form validation remains clear and functional.

**Business Value:** Prevents regressions in mandatory field validation.

**Scenario Traceability:** AUTH-004, AUTH-005

**Acceptance Criteria:**

```gherkin
Scenario: Username is required
  Given the user is on the login page
  When the user submits the form without a username
  Then a Required validation message should be displayed for the username field

Scenario: Password is required
  Given the user is on the login page
  When the user submits the form without a password
  Then a Required validation message should be displayed for the password field
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `AUTH-004 @regression - Should validate username field is required`
- Test: `AUTH-005 @regression - Should validate password field is required`

**Definition of Done:**

- Keep username and password required validation.
- Encapsulate validation locators in `LoginPage` for maintainability.

---

## QA-US-008: Forgot Password Flow

**Epic:** Authentication E2E  
**Sprint:** Sprint 2  
**Priority:** Medium  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As an OrangeHRM user, I want the forgot password flow automated so that account recovery entry points remain available.

**Business Value:** Protects the account recovery entry point and cancel path.

**Scenario Traceability:** AUTH-006, AUTH-007

**Acceptance Criteria:**

```gherkin
Scenario: Forgot password page opens
  Given the user is on the login page
  When the user clicks Forgot your password
  Then the Reset Password page should be displayed
  And the Username field should be visible
  And Cancel and Reset Password buttons should be visible

Scenario: Cancel password reset
  Given the user is on the Reset Password page
  When the user clicks Cancel
  Then the login page should be displayed
```

**Automation Mapping:**

- `framework/tests/e2e/auth.spec.ts`
- Test: `AUTH-006 @regression - Should navigate to forgot password page`
- Test: `AUTH-007 @regression - Should cancel forgot password flow`

**Definition of Done:**

- Assert reset page heading and controls.
- Assert Cancel returns to login.
- Keep email delivery out of scope.

---

## QA-US-009: Dashboard Widget Rendering

**Epic:** Dashboard E2E  
**Sprint:** Sprint 2  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As a product stakeholder, I want dashboard widgets validated automatically so that the landing page continues to show key HR summaries.

**Business Value:** Validates visible authenticated dashboard content without relying on mutable counts.

**Scenario Traceability:** DASH-001, DASH-006

**Acceptance Criteria:**

```gherkin
Scenario: Dashboard widgets render
  Given the user is logged in
  When the Dashboard page is displayed
  Then stable dashboard widget headings should be visible
  And no generic application error should be visible
```

**Automation Mapping:**

- `framework/tests/e2e/dashboard.spec.ts`
- Tests for dashboard load, core widgets, employee distribution widgets, employees on leave widget, and no application error text.

**Definition of Done:**

- Assert stable widget headings only.
- Avoid exact widget values from the public demo.

---

## QA-US-010: User Dropdown Menu

**Epic:** Dashboard E2E  
**Sprint:** Sprint 2  
**Priority:** High  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As an authenticated user, I want user-menu options validated automatically so that account actions such as logout remain accessible.

**Business Value:** Protects account-level navigation and logout discoverability.

**Scenario Traceability:** DASH-003, AUTH-008

**Acceptance Criteria:**

```gherkin
Scenario: User dropdown shows account actions
  Given the user is logged in
  When the user opens the profile dropdown
  Then About should be visible
  And Support should be visible
  And Change Password should be visible
  And Logout should be visible
```

**Automation Mapping:**

- `framework/tests/e2e/dashboard.spec.ts`
- Test: `DASH-003 @regression - Should display user menu account actions`
- `framework/tests/e2e/auth.spec.ts` covers Logout action.

**Definition of Done:**

- Assert About, Support, Change Password, and Logout menu items.
- Keep displayed profile name out of assertions because demo data varies.

---

## QA-US-011: Quick Launch Navigation

**Epic:** Dashboard E2E  
**Sprint:** Sprint 2  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As an OrangeHRM user, I want dashboard Quick Launch shortcuts tested automatically so that common HR actions remain reachable.

**Business Value:** Protects high-use navigation shortcuts from the Dashboard.

**Scenario Traceability:** DASH-004, DASH-005

**Acceptance Criteria:**

```gherkin
Scenario: Quick Launch shortcuts are visible and navigable
  Given the user is on the Dashboard
  When the Quick Launch section is displayed
  Then representative shortcut buttons should be visible
  And selected shortcuts should navigate to their target workflows
```

**Automation Mapping:**

- `framework/tests/e2e/dashboard.spec.ts`
- Tests for Quick Launch visibility, Assign Leave navigation, and Leave List navigation.

**Definition of Done:**

- Assert all observed Quick Launch controls are visible.
- Keep representative navigation tests focused and stable.

---

## QA-US-012: Employee List Page

**Epic:** PIM E2E  
**Sprint:** Sprint 3  
**Priority:** Critical  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As an HR user, I want Employee List page rendering automated so that employee records can be accessed reliably.

**Business Value:** Verifies the main PIM search and record-list entry point is available.

**Scenario Traceability:** PIM-001, PIM-002

**Acceptance Criteria:**

```gherkin
Scenario: Employee List page renders
  Given the user is logged in
  When the user opens PIM Employee List
  Then the Employee Information heading should be visible
  And Search and Reset controls should be visible
  And the employee table or records summary should be visible
```

**Automation Mapping:**

- `framework/tests/e2e/pim.spec.ts`
- Tests for Employee Information page, search controls, and employee records.

**Definition of Done:**

- Assert core filter and action controls.
- Avoid exact record-count assertions.

---

## QA-US-013: Employee Search and Reset

**Epic:** PIM E2E  
**Sprint:** Sprint 3  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As an HR user, I want employee search and reset behavior automated so that I can locate records without stale filters.

**Business Value:** Validates a high-frequency employee lookup workflow using current demo data.

**Scenario Traceability:** PIM-003, PIM-004

**Acceptance Criteria:**

```gherkin
Scenario: Search by existing employee ID
  Given an employee ID is available in the current table
  When the user searches by that employee ID
  Then the results should include that employee ID

Scenario: Reset employee search filters
  Given an employee ID filter has been entered
  When the user clicks Reset
  Then the Employee Id filter should be cleared
  And employee records should be visible again
```

**Automation Mapping:**

- `framework/tests/e2e/pim.spec.ts`
- Tests for employee ID search and reset.

**Definition of Done:**

- Confirm the reset test asserts cleared filter value and visible records.
- Keep dynamic employee ID discovery to avoid brittle fixed data.

---

## QA-US-014: Add Employee Validation

**Epic:** PIM E2E  
**Sprint:** Sprint 3  
**Priority:** High  
**Story Points:** 3  
**Current Automation Status:** Implemented

**User Story:** As an HR user, I want Add Employee required-field validation automated so that incomplete employee records cannot be submitted silently.

**Business Value:** Protects employee data quality and validation behavior.

**Scenario Traceability:** PIM-006

**Acceptance Criteria:**

```gherkin
Scenario: Add Employee requires mandatory name fields
  Given the user is on the Add Employee page
  When the user clicks Save without entering required employee names
  Then required validation messages should be displayed
  And the employee record should not be created
```

**Automation Mapping:**

- `framework/tests/e2e/pim.spec.ts`
- Test: `PIM-006 @regression - Should validate required fields on Add Employee`

**Definition of Done:**

- Add Employee page object exposes Save and validation messages.
- Regression test verifies empty required fields.

---

## QA-US-015: Add Employee Happy Path

**Epic:** PIM E2E  
**Sprint:** Sprint 3  
**Priority:** High  
**Story Points:** 8  
**Current Automation Status:** Implemented

**User Story:** As an HR user, I want new employee creation automated with unique data so that the PIM create flow is protected from regression.

**Business Value:** Covers the most important PIM create workflow while reducing data collision risk.

**Scenario Traceability:** PIM-005, PIM-007, PIM-008

**Acceptance Criteria:**

```gherkin
Scenario: Add a new employee
  Given the user is on the Add Employee page
  When the user enters unique employee data
  And saves the employee
  Then the employee details page should be displayed
  And the employee name should match the submitted data

Scenario: Newly created employee is searchable
  Given a unique employee has been created
  When the user searches for that employee
  Then the Employee List results should include the created employee
```

**Automation Mapping:**

- `framework/tests/e2e/pim.spec.ts`
- Test: `PIM-005 @regression - Should navigate to add employee page`
- Test: `PIM-007 PIM-008 @regression - Should create and find a unique employee`

**Definition of Done:**

- Use generated unique employee data.
- Verify personal details load after create.
- Search the created employee by generated employee ID.
- Run serially if the public demo environment causes data dependency risk.

---

## QA-US-016: Login Accessibility

**Epic:** Accessibility  
**Sprint:** Sprint 4  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As a user relying on assistive technology, I want the login page checked for accessibility issues so that authentication remains usable.

**Business Value:** Improves accessibility coverage for the entry point.

**Scenario Traceability:** A11Y-001, A11Y-005

**Acceptance Criteria:**

```gherkin
Scenario: Login page accessibility is checked
  Given the user is on the login page
  When automated accessibility checks run
  Then no agreed critical violations should be reported
  And login form controls should have accessible names
```

**Automation Mapping:**

- `framework/tests/accessibility/wcag-compliance.spec.ts`
- Tests for login axe scan and form labels.

**Definition of Done:**

- Critical-severity threshold is used for public-demo axe scans.
- Keep form-control accessible-name checks.
- Document known violations if the third-party demo cannot be changed.

---

## QA-US-017: Dashboard and PIM Accessibility

**Epic:** Accessibility  
**Sprint:** Sprint 4  
**Priority:** High  
**Story Points:** 8  
**Current Automation Status:** Implemented

**User Story:** As a user relying on assistive technology, I want Dashboard and PIM pages checked for accessibility issues so that core post-login workflows remain accessible.

**Business Value:** Expands accessibility checks beyond authentication into authenticated workflows.

**Scenario Traceability:** A11Y-002, A11Y-003

**Acceptance Criteria:**

```gherkin
Scenario: Authenticated pages have accessibility coverage
  Given the user is logged in
  When accessibility checks run on Dashboard and PIM
  Then no agreed critical violations should be reported
  And each page should expose a visible heading
```

**Automation Mapping:**

- `framework/tests/accessibility/wcag-compliance.spec.ts`
- Dashboard color contrast and landmark checks exist.
- PIM critical accessibility scan exists.

**Definition of Done:**

- Maintain targeted Dashboard checks.
- Maintain PIM Employee List accessibility scan.
- Keep checks focused on actionable severity levels.

---

## QA-US-018: Keyboard Navigation

**Epic:** Accessibility  
**Sprint:** Sprint 4  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented with documented limitation

**User Story:** As a keyboard-only user, I want login, navigation, and user-menu flows tested automatically so that critical actions do not require a mouse.

**Business Value:** Confirms critical workflows are keyboard reachable.

**Scenario Traceability:** A11Y-004

**Acceptance Criteria:**

```gherkin
Scenario: Login flow supports keyboard use
  Given the user is on the login page
  When the user navigates through controls with the keyboard
  Then focus should move to interactive controls
  And the user should be able to complete or submit the login flow

Scenario: User menu supports keyboard use
  Given the user is logged in
  When the user opens the account menu with the keyboard
  Then account actions should be reachable
```

**Automation Mapping:**

- `framework/tests/accessibility/wcag-compliance.spec.ts`
- Current tests cover Tab navigation, focus indicator, and keyboard login submission.
- User-menu keyboard operation remains documented as a public demo markup limitation.

**Definition of Done:**

- Keep keyboard login completion coverage.
- Document user-menu keyboard limitation if it cannot be operated by keyboard in the demo markup.

---

## QA-US-019: Mobile Login and Dashboard

**Epic:** Responsive Automation  
**Sprint:** Sprint 4  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As a mobile user, I want login and dashboard responsive behavior validated so that the application remains usable on smaller viewports.

**Business Value:** Reduces mobile usability regression risk for critical entry and dashboard flows.

**Scenario Traceability:** RWD-001, RWD-002, RWD-003

**Acceptance Criteria:**

```gherkin
Scenario: Login and Dashboard remain usable on mobile
  Given the test is running in a mobile viewport
  When the user opens Login and authenticates
  Then login controls should be visible and usable
  And Dashboard heading and core widgets should remain reachable
  And the mobile user menu should remain reachable
```

**Automation Mapping:**

- `framework/tests/e2e/responsive.spec.ts`
- Test: `RWD-001 RWD-002 RWD-003 @responsive @regression - Should support mobile login and dashboard`

**Definition of Done:**

- Verify mobile login controls, dashboard heading/widgets, and user-menu reachability.

---

## QA-US-020: Tablet and Mobile PIM Forms

**Epic:** Responsive Automation  
**Sprint:** Sprint 4  
**Priority:** Medium  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As an HR user on a smaller device, I want PIM forms validated on responsive viewports so that employee workflows remain usable.

**Business Value:** Protects PIM usability across tablet and mobile-like layouts.

**Scenario Traceability:** RWD-004

**Acceptance Criteria:**

```gherkin
Scenario: PIM forms remain usable on responsive viewports
  Given the test is running in a tablet or mobile viewport
  When the user opens PIM Employee List or Add Employee
  Then critical form controls should be visible or reachable
  And no blocking overlap should prevent use
```

**Automation Mapping:**

- `framework/tests/e2e/responsive.spec.ts`
- Test: `RWD-004 @responsive @regression - Should keep PIM forms usable on tablet viewport`

**Definition of Done:**

- Assert tablet PIM list controls and Add Employee form controls.
- Prefer tablet for complex PIM forms if phone layout is constrained.

---

## QA-US-021: Login and Protected Route API Contracts

**Epic:** API and Contracts  
**Sprint:** Sprint 5  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Implemented

**User Story:** As a QA Automation Engineer, I want HTTP contract checks for public and protected routes so that routing and access behavior remains stable.

**Business Value:** Validates route availability and authentication protection without launching the UI.

**Scenario Traceability:** API-001, API-002, AUTH-001

**Acceptance Criteria:**

```gherkin
Scenario: Login and protected route contracts are valid
  Given an unauthenticated request context
  When the client requests the login page
  Then the response should be successful
  When the client requests the protected dashboard route
  Then the response should redirect to login or require authentication
```

**Automation Mapping:**

- `framework/tests/api/user-api.spec.ts`
- Tests for login page retrieval and protected dashboard redirect.

**Definition of Done:**

- API tests run with `@api` tag.
- Tests assert status/header behavior without relying on mutable UI data.

---

## QA-US-022: Dashboard Widget API Contracts

**Epic:** API and Contracts  
**Sprint:** Sprint 5  
**Priority:** High  
**Story Points:** 8  
**Current Automation Status:** Implemented

**User Story:** As a Scrum Team member, I want dashboard API widget endpoints validated so that UI widgets have reliable backend responses.

**Business Value:** Adds contract coverage for API-backed dashboard widgets.

**Scenario Traceability:** DASH-007, API-003

**Acceptance Criteria:**

```gherkin
Scenario: Dashboard widget APIs return structured responses
  Given the user has an authenticated request context
  When dashboard widget endpoints are requested
  Then each endpoint should return a successful status
  And each response should contain valid JSON with expected top-level structure
```

**Automation Mapping:**

- `framework/tests/api/user-api.spec.ts`
- Test: `API-003 DASH-007 @api @regression - Should validate dashboard widget contracts`

**Definition of Done:**

- Authenticated request/session setup is established through UI login.
- Dashboard widget endpoint list is asserted for successful JSON responses.
- Assert status and stable response shape only.

---

## QA-US-023: Cross-Browser Smoke Execution

**Epic:** Cross-Browser Regression  
**Sprint:** Sprint 5  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Configuration

**User Story:** As a release owner, I want smoke tests to run across Chromium, Firefox, WebKit, and mobile projects so that browser compatibility risk is reduced.

**Business Value:** Expands confidence beyond a single browser and surfaces compatibility issues early.

**Scenario Traceability:** CB-001

**Acceptance Criteria:**

```gherkin
Scenario: Smoke suite runs across supported browser projects
  Given smoke tests are implemented
  When the smoke suite runs
  Then tests should execute in Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, and Tablet projects
  And browser-specific failures should produce diagnostics
```

**Automation Mapping:**

- `framework/playwright.config.ts`
- `framework/.github/workflows/tests.yml`
- Full headed run previously exposed cross-browser failures, so this remains a hardening track.

**Definition of Done:**

- Smoke command is verified across configured projects.
- Cross-browser failures are triaged and linked to defects or hardening stories.

---

## QA-US-024: CI Reporting and Test Artifacts

**Epic:** CI/CD Enablement  
**Sprint:** Sprint 5  
**Priority:** High  
**Story Points:** 5  
**Current Automation Status:** Configuration

**User Story:** As a Scrum Team member, I want CI to publish Playwright reports, traces, screenshots, videos, JSON, and JUnit output so that failures are diagnosable.

**Business Value:** Makes automation results actionable for sprint reviews, defect triage, and release decisions.

**Scenario Traceability:** CI-001

**Acceptance Criteria:**

```gherkin
Scenario: CI publishes automation results
  Given the automation suite runs in CI
  When test execution completes
  Then an HTML report should be generated
  And JSON and JUnit results should be generated
  And failure traces, screenshots, and videos should be retained
```

**Automation Mapping:**

- `framework/playwright.config.ts`
- `framework/.github/workflows/tests.yml`

**Definition of Done:**

- CI workflow uses `npm ci`.
- Playwright browsers are installed.
- Test reports and failure artifacts are uploaded.
- A real GitHub Actions run validates artifact availability.

---

## QA-US-025: Test Data and Flakiness Controls

**Epic:** Regression Hardening  
**Sprint:** Sprint 5  
**Priority:** High  
**Story Points:** 8  
**Current Automation Status:** Implemented

**User Story:** As a QA Automation Engineer, I want dynamic test data and stable assertions so that tests remain reliable against the mutable public demo site.

**Business Value:** Reduces false failures caused by shared, changing public demo data.

**Scenario Traceability:** DATA-001

**Acceptance Criteria:**

```gherkin
Scenario: Tests avoid brittle live-demo assumptions
  Given OrangeHRM demo data can change
  When automation tests execute
  Then credentials and URLs should be centralized
  And employee search should use dynamic discovery or generated records
  And assertions should avoid volatile dashboard values
  And failure diagnostics should be available
```

**Automation Mapping:**

- `framework/tests/utils/test-data.ts`
- `framework/tests/e2e/pim.spec.ts`
- `framework/playwright.config.ts`

**Definition of Done:**

- Keep credentials and URLs centralized.
- Use generated unique employee data for create flows.
- Use dynamic discovery for mutable employee records.
- Track flaky cross-browser/mobile failures as hardening backlog items.
