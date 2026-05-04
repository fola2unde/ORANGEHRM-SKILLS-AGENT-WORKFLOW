# Playwright Automation Framework - OrangeHRM Setup

## Summary

This framework is configured and testable against the OrangeHRM demo site:

```text
https://opensource-demo.orangehrmlive.com
```

The example tests use the public login page at:

```text
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

## What Is Included

- Page Object Model classes for `LoginPage`, `DashboardPage`, and `PimPage`
- Custom Playwright fixtures for page objects and authenticated tests
- OrangeHRM test data for demo credentials and route constants
- E2E examples for authentication, dashboard widgets, and PIM employee flows
- Accessibility examples using `@axe-core/playwright`
- HTTP contract checks for public OrangeHRM routes
- GitHub Actions workflow and Playwright HTML/JSON/JUnit reporting

## Key Commands

```bash
npm install
npx playwright install
npm run type-check
npm run test:smoke -- --project=chromium --workers=1
npm run test:a11y -- --project=chromium --workers=1
npm run test:api -- --project=chromium --workers=1
```

## Current Test Inventory

- Authentication: login, invalid login, logout, required field, password masking, forgot password
- Dashboard: dashboard load, widgets, quick launch navigation
- PIM: employee list load, record display, employee ID search, reset, add employee navigation
- Accessibility: login/dashboard form, keyboard, contrast, landmarks, links, headings
- HTTP contracts: login page availability, protected route redirect, headers, invalid route handling

## Notes

- The framework no longer starts a local `npm run dev` server.
- `BASE_URL` defaults to `https://opensource-demo.orangehrmlive.com`.
- The OrangeHRM demo app is a live third-party environment, so UI data can change. The PIM search example reads an employee ID from the current table before searching to avoid hard-coded employee records.
