import { test, expect } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * HTTP Contract Tests (@api @regression)
 * Lightweight checks for the public OrangeHRM demo app routes.
 */

test.describe('OrangeHRM HTTP Contract Tests', () => {
  const baseURL = process.env['BASE_URL'] || 'https://opensource-demo.orangehrmlive.com';

  test('@api @critical - Should retrieve login page', async ({ request }) => {
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

  test('@api @regression - Should redirect protected dashboard route when unauthenticated', async ({
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

  test('@api @regression - Should validate login page response headers', async ({ request }) => {
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

  test('@api @regression - Should validate login page response time', async ({ request }) => {
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
});
