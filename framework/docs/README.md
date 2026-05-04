# Playwright Automation Framework

A Playwright automation framework for the OrangeHRM demo site with **Page Object Model (POM)** pattern, **custom fixtures**, **test utilities**, and **CI/CD integration**.

## 📋 Table of Contents

- [Framework Overview](#framework-overview)
- [Directory Structure](#directory-structure)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Page Object Model](#page-object-model)
- [Test Fixtures](#test-fixtures)
- [Test Organization](#test-organization)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Framework Overview

### Key Features

✅ **Page Object Model** - Maintainable, reusable page interactions  
✅ **Custom Fixtures** - Reusable test setup and utilities  
✅ **Test Data Management** - Externalized and centralized test data  
✅ **Custom Assertions** - Business-logic assertions  
✅ **Comprehensive Logging** - Detailed test execution logs  
✅ **Screenshots & Videos** - Automatic artifacts for debugging  
✅ **Parallel Execution** - Cross-browser testing  
✅ **CI/CD Ready** - GitHub Actions integration  
✅ **Accessibility Testing** - WCAG 2.2 Level AA compliance  
✅ **HTTP Contract Tests** - Public route validation  
✅ **Retry Logic** - Flaky test handling  

### Tech Stack

- **Framework**: Playwright @latest
- **Language**: TypeScript
- **Test Runner**: Playwright Test
- **Reporting**: HTML + JSON + JUnit
- **Page Objects**: Custom POM pattern
- **Accessibility**: axe-core
- **CI/CD**: GitHub Actions

## Directory Structure

```
framework/
├── tests/
│   ├── pages/                    # Page Object Model
│   │   ├── base.page.ts         # Base page class with common methods
│   │   ├── login.page.ts        # Login page object
│   │   ├── dashboard.page.ts    # Dashboard page object
│   │   └── pim.page.ts          # PIM employee page object
│   ├── fixtures/                 # Custom test fixtures
│   │   └── test.fixture.ts      # Extended test fixtures with page objects
│   ├── utils/                    # Test utilities
│   │   ├── test-data.ts         # Test data constants
│   │   ├── logger.ts            # Custom logging utility
│   │   └── assertions.ts        # Custom assertions
│   ├── e2e/                      # End-to-end tests
│   │   ├── auth.spec.ts         # Authentication tests
│   │   ├── dashboard.spec.ts    # Dashboard tests
│   │   └── pim.spec.ts          # PIM employee tests
│   ├── api/                      # API integration tests
│   │   └── user-api.spec.ts     # API endpoint tests
│   └── accessibility/            # Accessibility tests
│       └── wcag-compliance.spec.ts # WCAG 2.2 AA tests
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── docs/
    └── README.md                 # This file
```

## Setup & Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Update `.env` file**
   ```env
   BASE_URL=https://opensource-demo.orangehrmlive.com
   CI=false
   ```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/e2e/auth.spec.ts

# Run tests matching a pattern
npx playwright test --grep "authentication"

# Run tests with specific tag
npm run test:smoke      # @smoke tests
npm run test:regression # @regression tests
npm run test:a11y       # @a11y tests
npm run test:api        # @api tests
```

### Browser-Specific Testing

```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# Safari only
npm run test:webkit

# Mobile testing
npm run test:mobile

# All browsers
npm run test:all-browsers
```

### Advanced Options

```bash
# Run tests with specific workers
npx playwright test --workers=4

# Run in serial mode (no parallelization)
npx playwright test --workers=1

# Update snapshots
npx playwright test --update-snapshots

# Show test report
npm run test:report

# Generate and show trace
npx playwright show-trace trace.zip
```

## Page Object Model

### Base Page Class

All page objects extend `BasePage` which provides common methods:

```typescript
import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class MyPage extends BasePage {
  readonly element: Locator;

  constructor(page: Page) {
    super(page);
    this.element = page.getByRole('button', { name: /click me/i });
  }

  async myMethod(): Promise<void> {
    await this.element.click();
  }
}
```

### Available Base Methods

- `navigate(path: string)` - Navigate to URL
- `getCurrentUrl()` - Get current URL
- `getPageTitle()` - Get page title
- `waitForUrl(urlPattern)` - Wait for URL match
- `waitForElement(locator)` - Wait for element visibility
- `takeScreenshot(name)` - Take screenshot
- `isElementVisible(locator)` - Check visibility
- `isElementEnabled(locator)` - Check if enabled
- `getElementText(locator)` - Get element text
- `getElementAttribute(locator, attribute)` - Get attribute value

### Locator Strategy (Priority Order)

```typescript
// ✅ BEST: Role-based (accessible, resilient)
page.getByRole('button', { name: 'Submit' });
page.getByRole('textbox', { name: 'Email' });

// ✅ GOOD: User-facing text
page.getByPlaceholder('Username');
page.getByPlaceholder('Username');
page.getByText('Welcome back');

// ✅ GOOD: Test IDs (stable)
page.getByTestId('submit-button');

// ⚠️ AVOID: CSS selectors (brittle)
page.locator('.btn-primary');

// ❌ NEVER: XPath (extremely brittle)
page.locator('//button[contains(text(), "Submit")]');
```

## Test Fixtures

### Using Page Objects in Tests

```typescript
import { test, expect } from '../fixtures/test.fixture';

test.describe('My Feature', () => {
  test('should do something', async ({ loginPage, dashboardPage }) => {
    await test.step('Login', async () => {
      await loginPage.navigate();
      await loginPage.login('Admin', 'admin123');
    });

    await test.step('Verify dashboard', async () => {
      await expect(dashboardPage.pageTitle).toBeVisible();
    });
  });
});
```

### Authenticated Fixture

For tests requiring authentication:

```typescript
test('dashboard test', async ({ authenticatedPage, dashboardPage }) => {
  // User is automatically logged in
  await dashboardPage.navigate();
  // Your test code
});
```

## Test Organization

### Test Tags

Tests are tagged for easy filtering:

```typescript
test('@smoke @critical - Should login', async ({ loginPage }) => {
  // Test code
});

test('@regression - Should validate form', async ({ page }) => {
  // Test code
});

test('@a11y - Should have no violations', async ({ page }) => {
  // Test code
});

test('@api - Should retrieve login page', async ({ request }) => {
  // Test code
});
```

### Test Steps

Use `test.step()` for clear test structure:

```typescript
test('complete flow', async ({ page }) => {
  await test.step('Step 1: Navigate', async () => {
    await page.goto('/');
  });

  await test.step('Step 2: Click button', async () => {
    await page.getByRole('button').click();
  });

  await test.step('Step 3: Verify', async () => {
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

## Best Practices

### 1. **Use Page Objects**
Always interact with UI through Page Objects, not directly in tests.

### 2. **Prefer Role-Based Locators**
```typescript
// Good
page.getByRole('button', { name: 'Submit' });

// Avoid
page.locator('.btn-submit');
```

### 3. **Use Test Steps**
Group related actions for better reporting and debugging.

### 4. **Externalize Test Data**
Use `test-data.ts` instead of hardcoding values.

### 5. **Wait Properly**
```typescript
// Good - Playwright auto-waits
await page.getByRole('button').click();

// Avoid - Hard-coded waits
await page.waitForTimeout(1000);
```

### 6. **Use Custom Assertions**
```typescript
import { CustomAssertions } from '../utils/assertions';

await CustomAssertions.assertElementIsVisible(locator);
await CustomAssertions.assertPageUrl(page, /dashboard\/index/);
```

### 7. **Log Important Actions**
```typescript
import { logger } from '../utils/logger';

logger.logStep('Logging in user');
logger.logAssertion('User logged in successfully');
```

### 8. **Handle Flaky Tests**
```typescript
// Increase timeout for slow operations
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

// Retry specific operations
await expect(element).toBeVisible({ timeout: 10000 });
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/tests.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npm test -- --project=${{ matrix.browser }}
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 30
```

### Local Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
npm run test:smoke
```

## Troubleshooting

### Common Issues

**Q: Tests are timing out**  
A: Increase timeout in `playwright.config.ts` or specific test:
```typescript
test.setTimeout(60000); // 60 seconds
```

**Q: Browser not launching**  
A: Install Playwright browsers:
```bash
npx playwright install
```

**Q: Flaky tests**  
A: Use `test.retries` or increase wait timeouts:
```typescript
test.describe.configure({ retries: 2 });
```

**Q: Screenshots not working**  
A: Create `screenshots` directory:
```bash
mkdir -p screenshots
```

### Debug Mode

Run tests with debugging enabled:

```bash
npm run test:debug

# Or specific file
npx playwright test tests/e2e/auth.spec.ts --debug
```

### View Test Reports

```bash
npm run test:report
```

## Contributing

1. Create feature branch: `git checkout -b feature/new-tests`
2. Add tests following existing patterns
3. Run tests: `npm test`
4. Commit: `git commit -am 'Add new tests'`
5. Push: `git push origin feature/new-tests`

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Playwright docs
3. Open an issue in the repository

---

**Last Updated**: 2024  
**Maintained By**: QA Automation Team
