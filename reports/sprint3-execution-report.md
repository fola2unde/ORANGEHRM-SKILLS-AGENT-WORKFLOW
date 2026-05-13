# Sprint 3 Execution Report

Date: 2026-05-12
Project: OHRM
Jira URL: https://ajbaba2unde.atlassian.net/
Sprint: OHRM Sprint 3 Planning
Sprint ID: 101

## Jira Updates

| Story ID | Jira Key | Summary | Sprint Update | Status |
| --- | --- | --- | --- | --- |
| QA-US-012 | OHRM-16 | Employee List Page | Moved to OHRM Sprint 3 Planning | In Progress |
| QA-US-013 | OHRM-17 | Employee Search and Reset | Moved to OHRM Sprint 3 Planning | In Progress |
| QA-US-014 | OHRM-18 | Add Employee Validation | Moved to OHRM Sprint 3 Planning | In Progress |
| QA-US-015 | OHRM-19 | Add Employee Happy Path | Moved to OHRM Sprint 3 Planning | In Progress |

## Sprint 2 Completion

Sprint 2 user stories were transitioned to `Done`:

- `OHRM-6` QA-US-006: Invalid Login Validation
- `OHRM-7` QA-US-008: Forgot Password Flow
- `OHRM-8` QA-US-009: Dashboard Widget Rendering
- `OHRM-13` QA-US-007: Required Field Validation
- `OHRM-14` QA-US-010: User Dropdown Menu
- `OHRM-15` QA-US-011: Quick Launch Navigation

The direct Agile API call to close `OHRM Sprint 2 Planning` was blocked by connector SSRF protection, and the available Jira tools did not expose a complete-sprint action. Final verification still showed Sprint 2 state as `active`.

## Sprint 3 Planning Confirmation

`OHRM Sprint 3 Planning` was created on board `34` with start date `2026-05-13T00:30:00.000Z`, end date `2026-05-20T00:30:00.000Z`, and goal covering Sprint 3 PIM automation stories.

Final Jira verification confirmed:

- Sprint 3 Planning exists as sprint `101`.
- Sprint 3 stories `OHRM-16`, `OHRM-17`, `OHRM-18`, and `OHRM-19` are in Sprint 3 Planning and `In Progress`.
- Sprint 2 stories are `Done`.

## Automation Coverage Check

| Story ID | Automated Coverage | Result |
| --- | --- | --- |
| QA-US-012 | `framework/tests/e2e/pim.spec.ts` - `PIM-001`, `PIM-002` | Covered |
| QA-US-013 | `framework/tests/e2e/pim.spec.ts` - `PIM-003`, `PIM-004` | Covered |
| QA-US-014 | `framework/tests/e2e/pim.spec.ts` - `PIM-006` | Covered |
| QA-US-015 | `framework/tests/e2e/pim.spec.ts` - `PIM-007`, `PIM-008` | Covered |

## Sprint 3 Test Execution

Command:

```powershell
npx playwright test tests/e2e/pim.spec.ts --project=chromium
```

Final result: Blocked

Summary:

| Metric | Value |
| --- | ---: |
| Tests executed | 8 |
| Passed | 0 |
| Failed / timed out | 8 |
| Duration | 83.8s |
| Browser project | Chromium |

All eight tests timed out in the shared authenticated-page fixture while navigating to the OrangeHRM public demo login page:

```text
TimeoutError: page.goto: Timeout 30000ms exceeded.
navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
```

An initial sandboxed run failed with `net::ERR_NETWORK_ACCESS_DENIED`. The same command was rerun with network escalation; the external site navigation then timed out before the login step completed.

## Bug Issues Created

| Jira Key | Summary | Reason |
| --- | --- | --- |
| [OHRM-30](https://ajbaba2unde.atlassian.net/browse/OHRM-30) | Sandboxed Sprint 3 PIM automation run denied external OrangeHRM network access | Tracks the initial sandboxed run failure: `net::ERR_NETWORK_ACCESS_DENIED` |
| [OHRM-31](https://ajbaba2unde.atlassian.net/browse/OHRM-31) | Sprint 3 PIM automation blocked by OrangeHRM login page timeout | Tracks the escalated network rerun failure: 8/8 PIM tests timed out at login navigation |

## Verification

| Check | Command / Source | Result |
| --- | --- | --- |
| Jira Sprint 2 story statuses | `project = OHRM AND labels IN ("sprint-2", "sprint-3")` | Sprint 2 stories are `Done` |
| Jira Sprint 3 Planning | `JIRA_LIST_SPRINTS` board `34` | Sprint `101` exists |
| Jira Sprint 3 story statuses | `project = OHRM AND labels IN ("sprint-2", "sprint-3")` | Sprint 3 stories are `In Progress` |
| Sprint 3 automation coverage | `framework/tests/e2e/pim.spec.ts` | Covered |
| Sprint 3 execution | PIM Chromium command above | Blocked by external OrangeHRM login page timeout |
| Jira bug issue creation | `OHRM-30`, `OHRM-31` | Created for Sprint 3 execution blockers |
