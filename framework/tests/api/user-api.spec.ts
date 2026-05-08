import { test, expect } from '@playwright/test';
import { logger } from '../utils/logger';
import { TEST_USERS, URLS } from '../utils/test-data';

/**
 * HTTP Contract Tests (@api @regression)
 * Lightweight checks for the public OrangeHRM demo app routes.
 */

test.describe('OrangeHRM HTTP Contract Tests', () => {
  const baseURL = process.env['BASE_URL'] || 'https://opensource-demo.orangehrmlive.com';

  test('API-001 @api @critical - Should retrieve login page', async ({ request }) => {
    await test.step('Make GET request to login page', async () => {
      const response = await request.get(`${baseURL}/web/index.php/auth/login`);
      expect(response.status()).toBe(200);
      logger.logAssertion('Login page returned 200');
    });

    await test.step('Verify response contains OrangeHRM shell', async () => {
      const response = await request.get(`${baseURL}/web/index.php/auth/login`);
      const body = await response.text();
      expect(body).toContain('OrangeHRM');
      logger.logAssertion('Login response contains OrangeHRM markup');
    });
  });

  test('API-002 @api @regression - Should redirect protected dashboard route when unauthenticated', async ({
    request,
  }) => {
    await test.step('Request dashboard without session', async () => {
      const response = await request.get(`${baseURL}/web/index.php/dashboard/index`, {
        maxRedirects: 0,
      });
      expect([302, 303]).toContain(response.status());
      expect(response.headers()['location']).toContain('/auth/login');
      logger.logAssertion('Protected dashboard redirects unauthenticated users');
    });
  });

  test('API-001 @api @regression - Should validate login page response headers', async ({ request }) => {
    await test.step('Check response headers', async () => {
      const response = await request.get(`${baseURL}/web/index.php/auth/login`);

      expect(response.headers()['content-type']).toContain('text/html');
      logger.logAssertion('Login page response headers contain text/html');
    });
  });

  test('@api @regression - Should return not found for invalid app route', async ({ request }) => {
    await test.step('Request invalid route', async () => {
      const response = await request.get(`${baseURL}/web/index.php/not-a-real-route`);
      expect([404, 500]).toContain(response.status());
      logger.logAssertion(`Invalid route handled with ${response.status()}`);
    });
  });

  test('API-001 @api @regression - Should validate login page response time', async ({ request }) => {
    await test.step('Measure login page response time', async () => {
      const startTime = Date.now();
      const response = await request.get(`${baseURL}/web/index.php/auth/login`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(response.ok()).toBe(true);
      expect(responseTime).toBeLessThan(5000); // Less than 5 seconds
      logger.logAssertion(`Login page responded in ${responseTime}ms`);
    });
  });

  test('API-003 DASH-007 @api @regression - Should validate dashboard widget contracts', async ({
    page,
  }) => {
    const dashboardEndpoints = [
      '/web/index.php/api/v2/dashboard/employees/time-at-work',
      '/web/index.php/api/v2/dashboard/employees/action-summary',
      '/web/index.php/api/v2/dashboard/shortcuts',
      '/web/index.php/api/v2/buzz/feed',
      '/web/index.php/api/v2/dashboard/employees/leaves',
      '/web/index.php/api/v2/dashboard/employees/subunit',
      '/web/index.php/api/v2/dashboard/employees/locations',
    ];

    await test.step('Authenticate through the UI to establish session cookies', async () => {
      await page.goto(URLS.LOGIN);
      await page.getByPlaceholder('Username').fill(TEST_USERS.VALID_USER.username);
      await page.getByPlaceholder('Password').fill(TEST_USERS.VALID_USER.password);
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Validate dashboard widget API responses', async () => {
      for (const endpoint of dashboardEndpoints) {
        const response = await page.context().request.get(`${baseURL}${endpoint}`);
        expect(response.status(), `${endpoint} status`).toBe(200);
        expect(response.headers()['content-type'], `${endpoint} content-type`).toContain(
          'application/json',
        );

        const body = await response.json();
        expect(body, `${endpoint} response body`).toBeTruthy();
      }

      logger.logAssertion('Dashboard widget endpoints returned successful JSON responses');
    });
  });
});
