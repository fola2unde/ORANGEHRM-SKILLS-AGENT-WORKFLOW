# Sprint 2 Execution Report

Date: 2026-05-11
Project: OHRM
Jira URL: https://ajbaba2unde.atlassian.net/
Sprint: OHRM Sprint 2 Planning
Sprint ID: 68

## Jira Updates

| Story ID | Jira Key | Summary | Sprint Update | Status |
| --- | --- | --- | --- | --- |
| QA-US-006 | OHRM-6 | Invalid Login Validation | Moved to OHRM Sprint 2 Planning | In Progress |
| QA-US-007 | OHRM-13 | Required Field Validation | Moved to OHRM Sprint 2 Planning | In Progress |
| QA-US-008 | OHRM-7 | Forgot Password Flow | Moved to OHRM Sprint 2 Planning | In Progress |
| QA-US-009 | OHRM-8 | Dashboard Widget Rendering | Moved to OHRM Sprint 2 Planning | In Progress |
| QA-US-010 | OHRM-14 | User Dropdown Menu | Moved to OHRM Sprint 2 Planning | In Progress |
| QA-US-011 | OHRM-15 | Quick Launch Navigation | Moved to OHRM Sprint 2 Planning | In Progress |

## Sprint 2 Planning Confirmation

`OHRM Sprint 2 Planning` was created on board `34` with start date `2026-05-11T22:00:00.000Z`, end date `2026-05-18T22:00:00.000Z`, and goal covering Sprint 2 Authentication and Dashboard automation stories.

Final Jira verification confirmed:

- Sprint 1 stories `OHRM-10`, `OHRM-11`, `OHRM-5`, `OHRM-9`, and `OHRM-12` are `Done`.
- Sprint 2 stories `OHRM-6`, `OHRM-13`, `OHRM-7`, `OHRM-8`, `OHRM-14`, and `OHRM-15` are in Sprint 2 Planning and `In Progress`.
- Sprint 1 itself still verified as `active`; the available Jira tools completed story status updates, but the Agile API sprint-close call was blocked by proxy validation.

## Automation Coverage Check

| Story ID | Automated Coverage | Result |
| --- | --- | --- |
| QA-US-006 | `framework/tests/e2e/auth.spec.ts` - `AUTH-003 @smoke @critical` | Covered |
| QA-US-007 | `framework/tests/e2e/auth.spec.ts` - `AUTH-004 @regression`, `AUTH-005 @regression` | Covered |
| QA-US-008 | `framework/tests/e2e/auth.spec.ts` - `AUTH-006 @regression`, `AUTH-007 @regression` | Covered |
| QA-US-009 | `framework/tests/e2e/dashboard.spec.ts` - `DASH-001 DASH-006 @smoke @critical`, `DASH-006 @regression`, `DASH-006 @smoke` | Covered |
| QA-US-010 | `framework/tests/e2e/dashboard.spec.ts` - `DASH-003 @regression` | Covered |
| QA-US-011 | `framework/tests/e2e/dashboard.spec.ts` - `DASH-004 @regression`, `DASH-005 @regression` | Covered |

## Automation Maintenance

The first Sprint 2 execution reached the OrangeHRM demo site and passed 11 of 13 tests. `AUTH-004` and `AUTH-005` failed because the required-message locator in `LoginPage` targeted the textbox's immediate parent, while the current OrangeHRM DOM renders `Required` in the input group container.

Fix applied:

- Updated `framework/tests/pages/login.page.ts` so username and password required-message locators resolve through the nearest `oxd-input-group` ancestor.

## Sprint 2 Test Execution

Command:

```powershell
npx playwright test --project=chromium --grep "AUTH-003|AUTH-004|AUTH-005|AUTH-006|AUTH-007|DASH-001|DASH-003|DASH-004|DASH-005|DASH-006"
```

Final result: Passed

Summary:

| Metric | Value |
| --- | ---: |
| Tests executed | 13 |
| Passed | 13 |
| Failed | 0 |
| Duration | 20.4s |
| Browser project | Chromium |

Executed scenarios:

| Scenario | Story Coverage | Result |
| --- | --- | --- |
| `AUTH-003 @smoke @critical - Should display error for invalid credentials` | QA-US-006 | Passed |
| `AUTH-004 @regression - Should validate username field is required` | QA-US-007 | Passed |
| `AUTH-005 @regression - Should validate password field is required` | QA-US-007 | Passed |
| `AUTH-006 @regression - Should navigate to forgot password page` | QA-US-008 | Passed |
| `AUTH-007 @regression - Should cancel forgot password flow` | QA-US-008 | Passed |
| `DASH-001 DASH-006 @smoke @critical - Should display dashboard with core widgets` | QA-US-009 | Passed |
| `DASH-006 @regression - Should display extended dashboard widgets` | QA-US-009 | Passed |
| `DASH-006 @smoke - Should load without application error text` | QA-US-009 | Passed |
| `DASH-003 @regression - Should display user menu account actions` | QA-US-010 | Passed |
| `DASH-004 @regression - Should display quick actions section` | QA-US-011 | Passed |
| `DASH-005 @regression - Should navigate to assign leave from quick launch` | QA-US-011 | Passed |
| `DASH-005 @regression - Should navigate to leave list from quick launch` | QA-US-011 | Passed |
| `AUTH-002 DASH-001 @smoke @critical - Should login with valid credentials` | QA-US-009 supporting dashboard login prerequisite | Passed |

## Verification

| Check | Command / Source | Result |
| --- | --- | --- |
| TypeScript type-check | `npm run type-check` | Passed |
| Required-field repair check | `npx playwright test --project=chromium --grep "AUTH-004|AUTH-005"` | Passed: 2/2 |
| Full Sprint 2 execution | Sprint 2 grep command above | Passed: 13/13 |
| Jira Sprint 2 membership | `project = OHRM AND sprint = 68` | Six Sprint 2 stories found |
