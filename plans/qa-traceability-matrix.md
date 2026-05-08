# OrangeHRM QA Traceability Matrix

Application URL: `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

| Requirement / Plan Item | Scenario ID(s) | User Story ID | Automation Layer | Priority | Sprint # | Coverage / Acceptance Target | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Baseline Playwright TypeScript framework is configured for OrangeHRM | N/A | QA-US-001 | Framework | Critical | Sprint 1 | Config supports base URL, browser projects, reports, traces, screenshots, videos, POM, fixtures, and tags | Configuration Complete |
| Login page loads successfully | AUTH-001 | QA-US-002 | Smoke UI | Critical | Sprint 1 | Login heading, Username, Password, and Login button are visible | Implemented |
| Valid user can log in | AUTH-002, DASH-001 | QA-US-003 | Smoke UI | Critical | Sprint 1 | Valid credentials redirect to `/dashboard/index` and Dashboard heading is visible | Implemented |
| Authenticated user can logout | AUTH-008 | QA-US-004 | Smoke UI | Critical | Sprint 1 | Logout menu item returns user to `/auth/login` | Implemented |
| PIM module is reachable after login | PIM-001 | QA-US-005 | Smoke UI | Critical | Sprint 1 | PIM Employee List page and Employee Information section are visible | Implemented |
| Invalid credentials are rejected | AUTH-003 | QA-US-006 | Functional UI | Critical | Sprint 2 | Alert displays `Invalid credentials` and user remains on login page | Implemented |
| Login required-field validation works | AUTH-004, AUTH-005 | QA-US-007 | Functional UI | High | Sprint 2 | Missing username and missing password display Required validation | Implemented |
| Forgot password route is available | AUTH-006, AUTH-007 | QA-US-008 | Functional UI | Medium | Sprint 2 | Reset Password page opens and Cancel returns to login | Implemented |
| Dashboard widgets render after login | DASH-001, DASH-006 | QA-US-009 | Functional UI | High | Sprint 2 | Stable widget headings are visible without asserting mutable values | Implemented |
| User dropdown menu exposes account actions | DASH-003, AUTH-008 | QA-US-010 | Functional UI | High | Sprint 2 | About, Support, Change Password, and Logout menu items are visible | Implemented |
| Quick Launch shortcuts are visible and navigable | DASH-004, DASH-005 | QA-US-011 | Functional UI | High | Sprint 2 | Shortcut buttons are visible and representative shortcut navigation works | Implemented |
| Employee List page renders filters and table | PIM-001, PIM-002 | QA-US-012 | Functional UI | Critical | Sprint 3 | Filters, Search, Reset, and employee table are visible | Implemented |
| Employee search and reset work with dynamic data | PIM-003, PIM-004 | QA-US-013 | Functional UI | High | Sprint 3 | Existing employee ID is discovered, searched, and reset clears criteria | Implemented |
| Add Employee required-field validation works | PIM-006 | QA-US-014 | Functional UI | High | Sprint 3 | Empty Add Employee save displays validation and does not create a record | Implemented |
| Employee can be created with unique data | PIM-005, PIM-007, PIM-008 | QA-US-015 | Functional UI | High | Sprint 3 | Unique employee is saved and can be verified on details/search flow | Implemented |
| Login page accessibility is validated | A11Y-001, A11Y-005 | QA-US-016 | Accessibility | High | Sprint 4 | axe scan has no critical violations and login controls have accessible names | Implemented |
| Dashboard and PIM accessibility are validated | A11Y-002, A11Y-003 | QA-US-017 | Accessibility | High | Sprint 4 | axe scans have no critical violations on Dashboard and PIM | Implemented |
| Keyboard navigation supports critical flows | A11Y-004 | QA-US-018 | Accessibility | High | Sprint 4 | Login and account-menu flows can be operated by keyboard or limitations are documented | Implemented |
| Mobile login and dashboard are usable | RWD-001, RWD-002, RWD-003 | QA-US-019 | Responsive UI | High | Sprint 4 | Mobile viewport shows login controls, Dashboard heading, widgets, and reachable user menu | Implemented |
| PIM forms are usable on responsive viewports | RWD-004 | QA-US-020 | Responsive UI | Medium | Sprint 4 | PIM Employee List and Add Employee controls remain visible/reachable on tablet or mobile | Implemented |
| Login and protected route contracts are validated | AUTH-001, API-001, API-002 | QA-US-021 | API / HTTP | High | Sprint 5 | Login returns success and unauthenticated dashboard route requires authentication | Implemented |
| Dashboard widget APIs return successful structured responses | DASH-007, API-003 | QA-US-022 | API / Contract | High | Sprint 5 | Dashboard API endpoints return `200` and valid JSON after authentication | Implemented |
| Smoke suite runs across supported browser projects | CB-001 | QA-US-023 | Cross-Browser | High | Sprint 5 | Smoke suite executes in Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari | Configuration Complete |
| CI publishes useful automation artifacts | CI-001 | QA-US-024 | CI/CD | High | Sprint 5 | HTML, JSON, JUnit, trace, screenshot, and video artifacts are published | Configuration Complete |
| Tests avoid brittle assumptions against public demo data | DATA-001 | QA-US-025 | Reliability | High | Sprint 5 | Dynamic data, generated employee records, and stable assertions are implemented | Implemented |

## Scenario Reference

| Scenario ID | Source Area | Scenario Name |
| --- | --- | --- |
| AUTH-001 | Authentication | User opens login page successfully |
| AUTH-002 | Authentication | User logs in with `Admin/admin123` |
| AUTH-003 | Authentication | User sees validation for invalid credentials |
| AUTH-004 | Authentication | User sees required validation for empty username |
| AUTH-005 | Authentication | User sees required validation for empty password |
| AUTH-006 | Authentication | User navigates to forgot password page |
| AUTH-007 | Authentication | User cancels password reset and returns to login |
| AUTH-008 | Authentication | Authenticated user logs out |
| DASH-001 | Dashboard | Dashboard renders after login |
| DASH-002 | Dashboard | Side navigation lists major modules |
| DASH-003 | Dashboard | User dropdown opens and shows expected menu items |
| DASH-004 | Dashboard | Quick Launch buttons are visible |
| DASH-005 | Dashboard | Quick Launch buttons navigate to target pages |
| DASH-006 | Dashboard | Dashboard widgets render without console errors |
| DASH-007 | Dashboard / API | Dashboard widget API calls return `200` |
| PIM-001 | PIM | Employee List page loads |
| PIM-002 | PIM | Employee search form fields are visible |
| PIM-003 | PIM | Search by existing employee ID works |
| PIM-004 | PIM | Reset clears search criteria |
| PIM-005 | PIM | Add Employee page loads |
| PIM-006 | PIM | Required validation appears on empty Add Employee save |
| PIM-007 | PIM | New employee can be added with unique data |
| PIM-008 | PIM | Newly created employee can be found in Employee List |
| A11Y-001 | Accessibility | Login page has no critical axe violations |
| A11Y-002 | Accessibility | Dashboard has no critical axe violations |
| A11Y-003 | Accessibility | PIM Employee List has no critical axe violations |
| A11Y-004 | Accessibility | Login flow is keyboard operable |
| A11Y-005 | Accessibility | Form fields have accessible names |
| RWD-001 | Responsive | Login page is usable at mobile viewport |
| RWD-002 | Responsive | Dashboard widgets stack at mobile viewport |
| RWD-003 | Responsive | Mobile user menu remains reachable |
| RWD-004 | Responsive | PIM form remains usable on tablet/mobile |
| API-001 | API / HTTP | Login route returns successful response |
| API-002 | API / HTTP | Protected dashboard route requires authentication |
| API-003 | API / Contract | Dashboard widget endpoints return valid authenticated responses |
| CB-001 | Cross-Browser | Smoke suite runs across supported browser projects |
| CI-001 | CI/CD | CI publishes Playwright reports and failure artifacts |
| DATA-001 | Reliability | Tests use dynamic data and stable assertions |

## Coverage Summary

| Area | Planned Stories | Planned Scenarios | Primary Sprints |
| --- | ---: | ---: | --- |
| Framework and reliability foundation | 2 | 2 | Sprint 1, Sprint 5 |
| Smoke testing | 4 | 5 | Sprint 1 |
| Authentication E2E | 3 | 8 | Sprint 2 |
| Dashboard E2E | 3 | 7 | Sprint 2 |
| PIM E2E | 4 | 8 | Sprint 3 |
| Accessibility | 3 | 5 | Sprint 4 |
| Responsive design | 2 | 4 | Sprint 4 |
| API and contract testing | 2 | 3 | Sprint 5 |
| Cross-browser and CI/CD | 2 | 2 | Sprint 5 |
