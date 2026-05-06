# OrangeHRM QA Automation Sprint Planning Table

| Epic | User Story ID | Feature | User Story | Story Points | Sprint # |
| --- | --- | --- | --- | --- | --- |
| Framework Readiness | QA-US-001 | Baseline Playwright Configuration | As a QA Automation Engineer, I want to validate the Playwright TypeScript framework configuration so that the team can build reliable automation on a stable foundation. | 3 | Sprint 1 |
| Smoke Automation | QA-US-002 | Login Page Smoke Coverage | As a Scrum Team member, I want automated coverage for the OrangeHRM login page load so that every build confirms the AUT is reachable. | 3 | Sprint 1 |
| Smoke Automation | QA-US-003 | Valid Login and Dashboard Smoke Flow | As a product stakeholder, I want an automated valid login and dashboard landing test so that critical user access is verified early. | 5 | Sprint 1 |
| Smoke Automation | QA-US-004 | Logout Smoke Flow | As a QA Automation Engineer, I want an automated logout test so that authenticated sessions can be safely ended and validated. | 3 | Sprint 1 |
| Smoke Automation | QA-US-005 | PIM Navigation Smoke Flow | As a Scrum Team member, I want automated navigation from Dashboard to PIM so that a critical employee-management module is available after login. | 3 | Sprint 1 |
| Authentication E2E | QA-US-006 | Invalid Login Validation | As a QA Automation Engineer, I want automated invalid credential validation so that authentication error handling is protected from regression. | 3 | Sprint 2 |
| Authentication E2E | QA-US-007 | Required Field Validation | As an end user, I want username and password required-field validation to be tested automatically so that form validation remains clear and functional. | 5 | Sprint 2 |
| Authentication E2E | QA-US-008 | Forgot Password Flow | As an OrangeHRM user, I want the forgot password navigation flow automated so that account recovery entry points remain available. | 3 | Sprint 2 |
| Dashboard E2E | QA-US-009 | Dashboard Widget Rendering | As a product stakeholder, I want dashboard widgets validated automatically so that the landing page continues to show key HR summaries. | 5 | Sprint 2 |
| Dashboard E2E | QA-US-010 | User Dropdown Menu | As an authenticated user, I want user-menu options validated automatically so that account actions such as logout remain accessible. | 3 | Sprint 2 |
| Dashboard E2E | QA-US-011 | Quick Launch Navigation | As an OrangeHRM user, I want dashboard Quick Launch shortcuts tested automatically so that common HR actions remain reachable. | 5 | Sprint 2 |
| PIM E2E | QA-US-012 | Employee List Page | As an HR user, I want Employee List page rendering automated so that employee records can be accessed reliably. | 3 | Sprint 3 |
| PIM E2E | QA-US-013 | Employee Search and Reset | As an HR user, I want employee search and reset behavior automated so that I can locate records without stale filters. | 5 | Sprint 3 |
| PIM E2E | QA-US-014 | Add Employee Validation | As an HR user, I want Add Employee required-field validation automated so that incomplete employee records cannot be submitted silently. | 3 | Sprint 3 |
| PIM E2E | QA-US-015 | Add Employee Happy Path | As an HR user, I want new employee creation automated with unique data so that the PIM create flow is protected from regression. | 8 | Sprint 3 |
| Accessibility | QA-US-016 | Login Accessibility | As a user relying on assistive technology, I want the login page checked for accessibility issues so that authentication is usable by more users. | 5 | Sprint 4 |
| Accessibility | QA-US-017 | Dashboard and PIM Accessibility | As a user relying on assistive technology, I want Dashboard and PIM pages checked for accessibility issues so that core post-login workflows remain accessible. | 8 | Sprint 4 |
| Accessibility | QA-US-018 | Keyboard Navigation | As a keyboard-only user, I want login, navigation, and user-menu flows tested automatically so that critical actions do not require a mouse. | 5 | Sprint 4 |
| Responsive Automation | QA-US-019 | Mobile Login and Dashboard | As a mobile user, I want login and dashboard responsive behavior validated so that the application remains usable on smaller viewports. | 5 | Sprint 4 |
| Responsive Automation | QA-US-020 | Tablet and Mobile PIM Forms | As an HR user on a smaller device, I want PIM forms validated on responsive viewports so that employee workflows remain usable. | 5 | Sprint 4 |
| API and Contracts | QA-US-021 | Login and Protected Route Contracts | As a QA Automation Engineer, I want HTTP contract checks for public and protected routes so that routing and access behavior remains stable. | 5 | Sprint 5 |
| API and Contracts | QA-US-022 | Dashboard Widget API Contracts | As a Scrum Team member, I want dashboard API widget endpoints validated so that UI widgets have reliable backend responses. | 8 | Sprint 5 |
| Cross-Browser Regression | QA-US-023 | Cross-Browser Smoke Execution | As a release owner, I want smoke tests to run across Chromium, Firefox, WebKit, and mobile projects so that browser compatibility risk is reduced. | 5 | Sprint 5 |
| CI/CD Enablement | QA-US-024 | CI Reporting and Test Artifacts | As a Scrum Team member, I want CI to publish Playwright reports, traces, screenshots, videos, JSON, and JUnit output so that failures are diagnosable. | 5 | Sprint 5 |
| Regression Hardening | QA-US-025 | Test Data and Flakiness Controls | As a QA Automation Engineer, I want dynamic test data and stable assertions so that tests remain reliable against the mutable public demo site. | 8 | Sprint 5 |
