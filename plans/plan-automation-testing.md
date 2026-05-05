# OrangeHRM Automation Testing Plan

## 1. Objective

Create a comprehensive automation strategy for OrangeHRM Open Source Demo:

```text
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

The automation approach is layered and practical:

1. Smoke tests for critical login and navigation paths.
2. UI interaction tests for core functional workflows.
3. API/HTTP contract checks for stable supporting endpoints.
4. Basic accessibility checks using axe and accessibility-first locators.
5. Responsive checks for desktop, tablet, and mobile layouts.
6. Cross-browser regression coverage with Chromium, Firefox, WebKit, and mobile projects.

## 2. Automation Scope

### In Scope

1. Authentication:
   - Login page load.
   - Valid login.
   - Invalid login.
   - Required-field validation.
   - Forgot password navigation.
   - Logout.

2. Dashboard:
   - Dashboard landing after login.
   - Side navigation visibility.
   - User dropdown menu.
   - Dashboard widgets.
   - Quick Launch shortcuts.
   - Dashboard API-backed widget rendering.

3. PIM:
   - Employee List page load.
   - Employee search form.
   - Search by existing employee ID.
   - Reset search form.
   - Add Employee page load.
   - Add Employee required-field validation.
   - Add Employee happy path using unique generated data where safe.

4. Accessibility:
   - Login page form semantics.
   - Dashboard landmarks and headings.
   - Keyboard navigation for login, user menu, and primary nav.
   - Basic WCAG scan with `@axe-core/playwright`.

5. Responsive design:
   - Login page on mobile viewport.
   - Dashboard card stacking on mobile.
   - Side panel collapsed behavior.
   - PIM forms on desktop and mobile/tablet where practical.

6. API/HTTP contract checks:
   - Login page availability.
   - Protected route redirect behavior.
   - Dashboard widget endpoints after authentication.
   - Basic status/header checks.

### Out of Scope

1. Deep business-rule validation for HR/payroll workflows.
2. Destructive delete/update scenarios against shared demo data unless isolated test data is created.
3. Full visual regression baselines for all pages.
4. Exhaustive WCAG manual audit.
5. Load testing against the public OrangeHRM demo environment.
6. Security testing beyond basic authentication behavior and protected-route checks.

## 3. Playwright-CLI Exploration Findings

Exploration was performed with Playwright browser automation against the live OrangeHRM demo site on May 5, 2026.

### Login Page

1. URL: `/web/index.php/auth/login`.
2. Page title: `OrangeHRM`.
3. Visible credential hints:
   - `Username : Admin`
   - `Password : admin123`
4. Accessible controls found:
   - Textbox `Username`.
   - Textbox `Password`.
   - Button `Login`.
5. Valid credentials redirect to `/web/index.php/dashboard/index`.
6. Invalid credentials display an alert with text `Invalid credentials`.
7. Forgot password navigates to `/web/index.php/auth/requestPasswordResetCode`.
8. Password reset page includes:
   - Heading `Reset Password`.
   - Textbox `Username`.
   - Buttons `Cancel` and `Reset Password`.
9. No console errors or warnings were observed during the explored paths.

### Dashboard

1. Successful login displays heading `Dashboard`.
2. The logged-in user menu showed user `Tiago Ferreira` during exploration.
3. User dropdown contains menu items:
   - About
   - Support
   - Change Password
   - Logout
4. Logout returns to `/web/index.php/auth/login`.
5. Main side navigation includes:
   - Admin
   - PIM
   - Leave
   - Time
   - Recruitment
   - My Info
   - Performance
   - Dashboard
   - Directory
   - Maintenance
   - Claim
   - Buzz
6. Dashboard widgets observed:
   - Time at Work
   - My Actions
   - Quick Launch
   - Buzz Latest Posts
   - Employees on Leave Today
   - Employee Distribution by Sub Unit
   - Employee Distribution by Location
7. Quick Launch controls have accessible names such as `Assign Leave`, `Leave List`, `Timesheets`, `Apply Leave`, `My Leave`, and `My Timesheet`.
8. Some icon-only controls expose glyph names instead of descriptive names, so tests should prefer stable nearby text or known button labels where possible.

### PIM

1. PIM navigation opens `/web/index.php/pim/viewEmployeeList`.
2. PIM topbar includes:
   - Configuration
   - Employee List
   - Add Employee
   - Reports
3. Employee List showed `(123) Records Found` at exploration time.
4. Employee Information filters include:
   - Employee Name
   - Employee Id
   - Employment Status
   - Include
   - Supervisor Name
   - Job Title
   - Sub Unit
5. Search and Reset buttons are visible and accessible by role.
6. Employee table columns include:
   - Id
   - First (& Middle) Name
   - Last Name
   - Job Title
   - Employment Status
   - Sub Unit
   - Supervisor
   - Actions
7. Live demo employee records are mutable and noisy. Tests should not depend on fixed employee names unless created during the test.
8. Add Employee opens `/web/index.php/pim/addEmployee`.
9. Add Employee form fields include:
   - First Name
   - Middle Name
   - Last Name
   - Employee Id
   - Create Login Details checkbox
   - Cancel
   - Save
10. The Add Employee form shows the current default employee ID value, observed as `0415`, but this value should not be hard-coded.

### Responsive Findings

1. Login page at `390 x 844` remains usable.
2. Login fields, Login button, Forgot Password link, social links, and footer remain visible.
3. Dashboard at `390 x 844` stacks widgets into a single column.
4. Side navigation collapses to a narrow off-canvas/icon-width layout.
5. User name text is hidden on mobile, but profile image and dropdown affordance remain visible.
6. Responsive tests should assert usability and key content visibility, not pixel-perfect layout.

### API/Network Findings

Dashboard loads these API endpoints after authentication and they returned `200` during exploration:

1. `/web/index.php/api/v2/dashboard/employees/time-at-work`
2. `/web/index.php/api/v2/dashboard/employees/action-summary`
3. `/web/index.php/api/v2/dashboard/shortcuts`
4. `/web/index.php/api/v2/buzz/feed`
5. `/web/index.php/api/v2/dashboard/employees/leaves`
6. `/web/index.php/api/v2/dashboard/employees/subunit`
7. `/web/index.php/api/v2/dashboard/employees/locations`

## 4. Test Architecture Proposal

### Framework

Use the existing Playwright + TypeScript framework under `framework`.

Recommended architecture:

1. `tests/pages`
   - `base.page.ts`
   - `login.page.ts`
   - `dashboard.page.ts`
   - `pim.page.ts`
   - Add page objects only when flows become large enough to justify them.

2. `tests/fixtures`
   - Extend Playwright fixtures with page objects.
   - Provide authenticated page/context setup for post-login tests.

3. `tests/utils`
   - Centralize credentials, URLs, generated test data, timeouts, and common assertions.

4. `tests/e2e`
   - Functional UI workflows.

5. `tests/api`
   - API/HTTP contract checks.

6. `tests/accessibility`
   - axe-based checks and keyboard behavior.

### Locator Strategy

1. Prefer role-based locators:
   - `getByRole('button', { name: 'Login' })`
   - `getByRole('textbox', { name: 'Username' })`
   - `getByRole('heading', { name: 'Dashboard' })`
2. Use `getByPlaceholder` for fields where accessible labels are not reliable.
3. Avoid brittle CSS selectors unless the app lacks semantic targets.
4. For table data, read from the current table first and then test search/reset behavior using discovered values.

### Data Strategy

1. Use public demo credentials only from centralized test data.
2. Generate unique employee names and IDs for add-employee tests.
3. Avoid deleting shared records unless the test owns the data and cleanup is reliable.
4. Do not hard-code dashboard widget values because the live demo changes.
5. Assert presence, shape, status, and navigation outcomes rather than exact mutable business data.

## 5. Step-by-Step Automation Plan

### Step 1: Baseline Configuration

1. Confirm `BASE_URL` defaults to `https://opensource-demo.orangehrmlive.com`.
2. Keep browser projects:
   - Chromium
   - Firefox
   - WebKit
   - Mobile Chrome
   - Mobile Safari
   - Tablet
3. Use retries in CI only.
4. Keep trace, screenshot, and video on failure.
5. Validate the framework with:

```bash
cd framework
npm run type-check
npm run test:smoke -- --project=chromium --workers=1
```

### Step 2: Smoke Suite

Automate the smallest suite that proves the application is usable.

1. Login page loads.
2. Valid user logs in.
3. Dashboard heading is visible.
4. PIM navigation works.
5. Logout returns to the login page.

Recommended tag: `@smoke @critical`.

### Step 3: Authentication Functional Suite

1. Valid login redirects to dashboard.
2. Invalid login displays `Invalid credentials`.
3. Empty username displays required validation.
4. Empty password displays required validation.
5. Password field is masked.
6. Forgot password page loads.
7. Cancel from forgot password returns to login.
8. Authenticated user can logout.
9. Protected dashboard route redirects unauthenticated users to login.

Recommended tags: `@regression`, with critical cases also tagged `@critical`.

### Step 4: Dashboard Functional Suite

1. Dashboard loads after authenticated setup.
2. Side navigation renders expected module links.
3. User dropdown opens and shows all menu items.
4. Quick Launch buttons are visible.
5. Quick Launch buttons navigate to their expected modules.
6. Dashboard widgets render their headings.
7. Employee distribution widgets render legends or a valid empty state.
8. Buzz Latest Posts renders feed content or a stable container.

Recommended tag: `@regression`.

### Step 5: PIM Suite

1. Employee List page loads.
2. Employee Information search form renders all expected fields.
3. Search by a discovered existing employee ID returns matching row data.
4. Reset clears entered filter values.
5. Add Employee page loads.
6. Save with missing first/last name displays required validation.
7. Add Employee creates a unique employee record.
8. Created employee details page loads after save.
9. Created employee can be found from Employee List search.

Recommended tags:

1. Search and page-load tests: `@smoke @regression`.
2. Create employee tests: `@regression`, run serially if shared data causes flakiness.

### Step 6: API/HTTP Contract Suite

1. GET login page returns `200`.
2. GET dashboard without authentication redirects or returns expected auth behavior.
3. After login/session setup, dashboard widget endpoints return `200`.
4. Dashboard widget endpoints return JSON with expected top-level structure.
5. Invalid API route returns a non-success status.
6. Verify content/security headers that are stable in the public demo environment.

Recommended tag: `@api`.

### Step 7: Accessibility Suite

1. Run axe scan on login page.
2. Run axe scan on dashboard page.
3. Run axe scan on PIM Employee List page.
4. Verify login form can be completed using keyboard navigation.
5. Verify user dropdown can be opened and Logout selected with keyboard.
6. Verify each page has a visible heading.
7. Verify form controls have accessible names.

Recommended tag: `@a11y`.

### Step 8: Responsive Suite

1. Login page renders usable controls at mobile viewport.
2. Dashboard mobile viewport shows heading and stacked widgets.
3. Mobile user menu remains reachable.
4. PIM Employee List remains navigable at mobile/tablet viewport.
5. Add Employee form fields remain accessible without overlap.
6. Critical desktop flows run on tablet project.

Recommended tags: `@responsive`, `@mobile`.

### Step 9: Cross-Browser Execution

1. Run smoke tests on all browser projects.
2. Run full regression primarily on Chromium in PR validation.
3. Run full cross-browser regression nightly or scheduled.
4. Keep mobile tests focused on critical paths to avoid slow/flaky CI runs.

Suggested command pattern:

```bash
npm run test:smoke -- --workers=1
npm run test:regression -- --project=chromium
npm run test:a11y -- --project=chromium
npm run test:api -- --project=chromium
npm run test:mobile
```

### Step 10: CI/CD

1. Install dependencies with `npm ci`.
2. Install Playwright browsers.
3. Run type-check.
4. Run smoke tests on every pull request.
5. Run regression and accessibility on main branch merges.
6. Upload Playwright HTML report, traces, screenshots, videos, JSON, and JUnit output.
7. Keep CI workers low for the live demo app to reduce rate/flakiness risk.

## 6. Manual Scenarios Proposed for Automation

### Authentication

| ID | Scenario | Priority | Layer |
| --- | --- | --- | --- |
| AUTH-001 | User opens login page successfully | Critical | Smoke |
| AUTH-002 | User logs in with `Admin/admin123` | Critical | Smoke |
| AUTH-003 | User sees validation for invalid credentials | Critical | UI |
| AUTH-004 | User sees required validation for empty username | High | UI |
| AUTH-005 | User sees required validation for empty password | High | UI |
| AUTH-006 | User navigates to forgot password page | Medium | UI |
| AUTH-007 | User cancels password reset and returns to login | Medium | UI |
| AUTH-008 | Authenticated user logs out | Critical | Smoke |

### Dashboard

| ID | Scenario | Priority | Layer |
| --- | --- | --- | --- |
| DASH-001 | Dashboard renders after login | Critical | Smoke |
| DASH-002 | Side navigation lists major modules | High | UI |
| DASH-003 | User dropdown opens and shows expected menu items | High | UI |
| DASH-004 | Quick Launch buttons are visible | High | UI |
| DASH-005 | Quick Launch buttons navigate to target pages | Medium | UI |
| DASH-006 | Dashboard widgets render without console errors | Medium | UI |
| DASH-007 | Dashboard widget API calls return `200` | High | API |

### PIM

| ID | Scenario | Priority | Layer |
| --- | --- | --- | --- |
| PIM-001 | Employee List page loads | Critical | Smoke |
| PIM-002 | Employee search form fields are visible | High | UI |
| PIM-003 | Search by existing employee ID works | High | UI |
| PIM-004 | Reset clears search criteria | Medium | UI |
| PIM-005 | Add Employee page loads | High | UI |
| PIM-006 | Required validation appears on empty Add Employee save | High | UI |
| PIM-007 | New employee can be added with unique data | High | UI |
| PIM-008 | Newly created employee can be found in Employee List | High | UI |

### Accessibility

| ID | Scenario | Priority | Layer |
| --- | --- | --- | --- |
| A11Y-001 | Login page has no critical axe violations | High | Accessibility |
| A11Y-002 | Dashboard has no critical axe violations | High | Accessibility |
| A11Y-003 | PIM Employee List has no critical axe violations | Medium | Accessibility |
| A11Y-004 | Login flow is keyboard operable | High | Accessibility |
| A11Y-005 | Form fields have accessible names | High | Accessibility |

### Responsive

| ID | Scenario | Priority | Layer |
| --- | --- | --- | --- |
| RWD-001 | Login page is usable at mobile viewport | High | Responsive |
| RWD-002 | Dashboard widgets stack at mobile viewport | High | Responsive |
| RWD-003 | Mobile user menu remains reachable | High | Responsive |
| RWD-004 | PIM form remains usable on tablet/mobile | Medium | Responsive |

## 7. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Public demo data changes frequently | Flaky assertions | Discover data at runtime and assert behavior instead of exact records |
| Shared environment may be modified by other users | Test instability | Use unique generated data and avoid destructive operations |
| Demo credentials may change | Login failures | Centralize credentials and fail fast with clear diagnostics |
| Network latency can vary | Timeout failures | Use Playwright auto-waits, sensible timeouts, and CI retries |
| Icon-only controls have weak accessible names | Brittle selectors | Prefer visible text, role locators, and page object encapsulation |
| Mobile side nav is collapsed/off-canvas | False responsive failures | Assert critical usability rather than exact desktop parity |

## 8. Definition of Done

1. Test plan is reviewed and accepted.
2. Smoke suite runs successfully in Chromium.
3. Critical authentication and dashboard scenarios are automated.
4. PIM search and Add Employee paths are automated with dynamic data.
5. Accessibility suite covers login, dashboard, and PIM.
6. Responsive checks cover mobile login and dashboard.
7. API checks validate login/protected route/dashboard widget contracts.
8. CI runs type-check, smoke tests, and publishes reports.
9. All tests use POM, fixtures, centralized test data, and role-first locators.

## 9. Recommended Execution Matrix

| Suite | Chromium | Firefox | WebKit | Mobile Chrome | Mobile Safari | Frequency |
| --- | --- | --- | --- | --- | --- | --- |
| Smoke | Yes | Yes | Yes | Yes | Yes | Every PR |
| Auth Regression | Yes | Yes | Yes | Limited | Limited | Main/nightly |
| Dashboard Regression | Yes | Limited | Limited | Limited | Limited | Main/nightly |
| PIM Regression | Yes | Limited | Limited | No | No | Main/nightly |
| API | Yes | No | No | No | No | Every PR |
| Accessibility | Yes | No | No | No | No | Main/nightly |
| Responsive | No | No | No | Yes | Yes | Main/nightly |

## 10. Next Implementation Order

1. Stabilize `LoginPage` and authenticated fixture.
2. Finish smoke suite.
3. Expand authentication negative tests.
4. Add dashboard widget and quick-launch coverage.
5. Add dynamic PIM search tests.
6. Add Add Employee tests with generated data.
7. Add dashboard API contract checks.
8. Add axe scans and keyboard tests.
9. Add responsive smoke checks.
10. Wire final suite tags into CI.
