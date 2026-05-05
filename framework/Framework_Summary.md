# 🎯 Playwright Automation Framework - OrangeHRM Edition

## Summary

This framework is configured and testable against the OrangeHRM demo site:

```text
https://opensource-demo.orangehrmlive.com
```

The example tests use the public login page at:

```text
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

---

## What Is Included

- ✅ Page Object Model classes for `LoginPage`, `DashboardPage`, and `PimPage`
- ✅ Custom Playwright fixtures for page objects and authenticated tests
- ✅ OrangeHRM test data for demo credentials and route constants
- ✅ E2E examples for authentication, dashboard widgets, and PIM employee flows
- ✅ Accessibility examples using `@axe-core/playwright`
- ✅ HTTP contract checks for public OrangeHRM routes
- ✅ GitHub Actions workflow and Playwright HTML/JSON/JUnit reporting
- ✅ Multi-browser support (Chromium, Firefox, WebKit, Mobile variants)
- ✅ TypeScript strict mode with path aliases
- ✅ Centralized test data management
- ✅ Custom logging and assertion utilities

---

## Key Commands

```bash
npm install
npx playwright install
npm run type-check
npm run test:smoke -- --project=chromium --workers=1
npm run test:a11y -- --project=chromium --workers=1
npm run test:api -- --project=chromium --workers=1
```

---

## 📊 Framework Components

### Page Objects
| Class | Location | Coverage |
|-------|----------|----------|
| **BasePage** | `tests/pages/base.page.ts` | Common methods for all pages |
| **LoginPage** | `tests/pages/login.page.ts` | Authentication (login, logout, validation) |
| **DashboardPage** | `tests/pages/dashboard.page.ts` | Statistics, navigation, user menu |
| **PimPage** | `tests/pages/pim.page.ts` | Employee records, search, add employee |

### Custom Fixtures
| Fixture | Location | Purpose |
|---------|----------|---------|
| Test Base | `tests/fixtures/test.fixture.ts` | Extends Playwright with page objects + authenticated context |

### Testing Utilities
| Utility | File | Features |
|---------|------|----------|
| **Test Data** | `tests/utils/test-data.ts` | OrangeHRM demo credentials, employees, routes, timeouts, URLs |
| **Logger** | `tests/utils/logger.ts` | Test execution logging with timestamps |
| **Assertions** | `tests/utils/assertions.ts` | 15+ custom business logic assertions |

### Example Test Suites (40+ Tests)

#### E2E Tests
| Suite | File | Tests | Tags |
|-------|------|-------|------|
| **Authentication** | `tests/e2e/auth.spec.ts` | 7 tests | @smoke, @critical, @regression |
| **Dashboard** | `tests/e2e/dashboard.spec.ts` | 7 tests | @smoke, @regression |
| **PIM (People)** | `tests/e2e/pim.spec.ts` | 8 tests | @smoke, @regression |

#### API Tests
| Suite | File | Tests | Tags |
|-------|------|-------|------|
| **User API** | `tests/api/user-api.spec.ts` | 7 tests | @api, @regression, @critical |

#### Accessibility Tests
| Suite | File | Tests | Tags |
|-------|------|-------|------|
| **WCAG 2.2 AA** | `tests/accessibility/wcag-compliance.spec.ts` | 9 tests | @a11y, @critical |

### Configuration Files
| Component | File | Purpose |
|-----------|------|---------|
| Config | `playwright.config.ts` | Multi-browser, parallel execution, reporting |
| TypeScript | `tsconfig.json` | Strict type checking, path aliases |
| Dependencies | `package.json` | All required packages and npm scripts |
| Environment | `.env.example` | Configuration template |
| Git | `.gitignore` | Exclude build artifacts |

---

## 🎯 Framework Capabilities

### Page Object Model Pattern
```typescript
// Maintainable, reusable page interactions
const login = new LoginPage(page);
await login.login('user@example.com', 'password');
```

### Custom Fixtures
```typescript
test('dashboard test', async ({ dashboardPage, authenticatedPage }) => {
  // User automatically authenticated
  await dashboardPage.navigate();
});
```

### Role-Based Locators (Accessibility First)
```typescript
// ✅ Best practice - accessible and resilient
page.getByRole('button', { name: 'Submit' });
page.getByLabel('Email address');

// ❌ Avoid - brittle
page.locator('.btn-submit');
```

### Test Organization & Tagging
```typescript
test('@smoke @critical - Should login', async ({ loginPage }) => {
  // Tag tests for flexible execution
});

// Run: npm run test:smoke
```

### Structured Test Steps
```typescript
test('flow', async () => {
  await test.step('Login', async () => {
    // Step code
  });
  
  await test.step('Navigate', async () => {
    // Step code
  });
});
```

### Custom Assertions
```typescript
await CustomAssertions.assertElementIsVisible(button);
await CustomAssertions.assertPageUrl(page, '/dashboard');
```

### Comprehensive Logging
```typescript
logger.logStep('Navigating to login');
logger.logAssertion('User logged in successfully');
```

### Accessibility Testing
```typescript
test('@a11y', async ({ page }) => {
  await injectAxe(page);
  await checkA11y(page);
});
```

### API Integration Testing
```typescript
test('@api', async ({ request }) => {
  const response = await request.get('/api/products');
  expect(response.status()).toBe(200);
});
```

---

## 📈 Current Test Inventory

| Category | Tests | Coverage |
|----------|-------|----------|
| Authentication | 7 tests | Login, invalid login, logout, required field, password masking, forgot password |
| Dashboard | 7 tests | Dashboard load, widgets, quick launch navigation |
| PIM (People) | 8 tests | Employee list load, record display, employee ID search, reset, add employee |
| API/HTTP Contracts | 7 tests | Login page availability, protected route redirect, headers, invalid handling |
| Accessibility | 9 tests | Forms, keyboard navigation, contrast, landmarks, links, headings, ARIA |
| **Total** | **38+ tests** | Multi-tag support |

---

## 🚀 Quick Start

### Installation
```bash
npm install
npx playwright install
```

### Configure Environment
```bash
cp .env.example .env
# Edit .env with your BASE_URL
```

### Running Tests
```bash
npm test                  # All tests
npm run test:smoke       # Smoke tests only
npm run test:regression  # Full regression
npm run test:a11y        # Accessibility
npm run test:api         # API tests
npm run test:headed      # See browser
npm run test:report      # View HTML report
```

---

## 📋 Available Scripts

```bash
npm test                     # All tests
npm run test:headed         # Tests in headed mode
npm run test:debug          # Debug mode
npm run test:smoke          # @smoke tests
npm run test:regression     # @regression tests
npm run test:a11y           # @a11y tests
npm run test:api            # @api tests
npm run test:chrome         # Chromium only
npm run test:firefox        # Firefox only
npm run test:webkit         # Safari only
npm run test:mobile         # Mobile Chrome
npm run test:all-browsers   # All browsers
npm run test:report         # View HTML report
npm run codegen             # Code generation
npm run trace:show          # Show trace
npm run lint                # ESLint check
npm run type-check          # TypeScript check
```

---

## 🌐 Browser Support

- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)
- ✅ Tablet (iPad)

---

## 📊 Reporting

- **HTML Report** - Visual test results (screenshots, videos)
- **JSON Report** - CI integration
- **JUnit Report** - Jenkins/Azure DevOps
- **Console Output** - Real-time execution

---

## 🤖 Agents & Skills Integration

### Playwright Framework Orchestrator Agent
- Coordinates framework setup
- Orchestrates subagents
- Ensures best practices
- Validates architecture

### Playwright Automation Framework Skill
- Complete framework documentation
- Usage guides
- Best practices
- Troubleshooting

### Subagent Integration
- `playwright-test-planner` - Test planning
- `playwright-test-generator` - Test generation
- `playwright-test-healer` - Test debugging

---

## ✨ Key Features

### Architecture
- **POM Pattern** - Maintainable page objects
- **Custom Fixtures** - Reusable test setup
- **Utility Layer** - Data, logging, assertions
- **Configuration** - Centralized settings

### Quality
- **Type Safety** - TypeScript strict mode
- **Accessibility** - WCAG 2.2 AA compliance
- **Error Handling** - Comprehensive logging
- **Best Practices** - Industry standards

### Automation
- **Parallel Execution** - Fast test runs
- **Cross-Browser** - Multiple browsers
- **CI/CD Ready** - GitHub Actions
- **Retry Logic** - Flaky test handling

### Documentation
- **Setup Guide** - Complete instructions
- **API Reference** - Method documentation
- **Examples** - Working test samples
- **Troubleshooting** - Common issues

---

## 🎓 Best Practices Implemented

✅ Page Object Model (POM) pattern  
✅ Role-based accessible locators  
✅ Externalized test data  
✅ Custom fixtures and utilities  
✅ Comprehensive logging  
✅ Test tagging and organization  
✅ Accessibility testing (WCAG 2.2 AA)  
✅ API integration testing  
✅ CI/CD integration  
✅ Cross-browser testing  
✅ Proper error handling  
✅ Parallel test execution  

---

## 🔗 Framework Architecture Diagram

```
Test Execution
    ↓
├─ Fixture Setup (authenticatedPage)
│  ├─ Custom Fixtures (test.fixture.ts)
│  └─ Page Objects (pages/*.page.ts)
│
├─ Test Steps (test.step())
│  ├─ Page Object Methods (login, click, fill)
│  └─ Assertions (expect, CustomAssertions)
│
├─ Utilities
│  ├─ Test Data (test-data.ts)
│  ├─ Logger (logger.ts)
│  └─ Assertions (assertions.ts)
│
└─ Reporting
   ├─ HTML Report
   ├─ JSON Report
   └─ JUnit Report
```

---

## 🚦 Next Steps

1. **Review Framework**: Check `docs/README.md`
2. **Run Example Tests**: `npm test` in the framework directory
3. **Customize Page Objects**: Add your application's pages
4. **Extend Test Data**: Update `tests/utils/test-data.ts`
5. **Configure CI/CD**: Push to repository for automated runs
6. **Add Your Tests**: Create new test specs in `tests/e2e/`

---

## ⚙️ OrangeHRM Configuration Notes

### Important Points

- The framework **no longer starts a local `npm run dev` server**.
- `BASE_URL` defaults to `https://opensource-demo.orangehrmlive.com`.
- The OrangeHRM demo app is a **live third-party environment**, so UI data can change over time.
- The **PIM search example** reads an employee ID from the current table before searching to avoid hard-coded employee records that may no longer exist.
- Login credentials are from the public demo site and are subject to change.

### Live Site Behavior

When testing against the live OrangeHRM site:
- Employee data may vary between test runs
- Dashboard widgets may display different values
- New features may be deployed without notice
- Data added during tests will persist (use unique IDs where possible)

---

## 📞 Support Resources

- [Playwright Documentation](https://playwright.dev)
- [Framework README](./docs/README.md)
- [OrangeHRM Demo Site](https://opensource-demo.orangehrmlive.com)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Test Examples](./tests/e2e/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 🔧 Troubleshooting

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

### Common Commands

```bash
# Install dependencies
npm ci

# Update snapshots
npx playwright test --update-snapshots

# Run with specific workers
npx playwright test --workers=4

# Run in serial mode
npx playwright test --workers=1

# Show traces
npx playwright show-trace trace.zip

# Generate test code
npx playwright codegen http://localhost:3000
```

---

**Last Updated**: 2024  
**Framework Version**: 1.0.0  
**Status**: Production-Ready ✅
