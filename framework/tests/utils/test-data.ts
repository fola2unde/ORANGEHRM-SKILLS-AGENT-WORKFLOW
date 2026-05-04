/**
 * Test Data Constants
 * Centralized test data management
 */

export const TEST_USERS = {
  VALID_USER: {
    username: 'Admin',
    password: 'admin123',
    firstName: 'Orange',
    lastName: 'Admin',
  },
  INVALID_USER: {
    username: 'invalid-user',
    password: 'wrongpassword',
  },
  ADMIN_USER: {
    username: 'Admin',
    password: 'admin123',
    firstName: 'Orange',
    lastName: 'Admin',
  },
};

export const TEST_EMPLOYEES = {
  SEARCHABLE_EMPLOYEE: 'Linda Anderson',
  INVALID_EMPLOYEE: 'No Such OrangeHRM Employee 99999',
};

export const TEST_ADDRESSES = {
  BILLING: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
  SHIPPING: {
    firstName: 'Jane',
    lastName: 'Doe',
    address: '456 Oak Avenue',
    city: 'Boston',
    state: 'MA',
    zip: '02101',
    country: 'United States',
  },
};

export const TEST_PAYMENT_METHODS = {
  CREDIT_CARD: {
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvc: '123',
    cardholderName: 'John Doe',
  },
  VISA: {
    cardNumber: '4532111111111111',
    expiry: '06/27',
    cvc: '456',
    cardholderName: 'Jane Doe',
  },
};

export const TEST_COUPON_CODES = {
  VALID_COUPON: 'SAVE10',
  EXPIRED_COUPON: 'EXPIRED20',
  INVALID_COUPON: 'FAKE123',
  MAX_USES_COUPON: 'MAXUSES',
};

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  VERY_LONG: 60000,
};

export const URLS = {
  LOGIN: '/web/index.php/auth/login',
  FORGOT_PASSWORD: '/web/index.php/auth/requestPasswordResetCode',
  DASHBOARD: '/web/index.php/dashboard/index',
  PIM: '/web/index.php/pim/viewEmployeeList',
  ADD_EMPLOYEE: '/web/index.php/pim/addEmployee',
  MY_INFO: '/web/index.php/pim/viewMyDetails',
};

export const TEST_LABELS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  ACCESSIBILITY: '@a11y',
  API: '@api',
  CRITICAL: '@critical',
  LOW_PRIORITY: '@low-priority',
};
