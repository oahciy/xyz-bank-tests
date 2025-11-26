import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Bank Manager should be able to login', async () => {
    await loginPage.loginAsBankManager();
    await expect(loginPage.page).toHaveURL(/.*manager/);
  });

  test('Customer should be able to login', async () => {
    await loginPage.loginAsCustomer();
    await expect(loginPage.page).toHaveURL(/.*customer/);
  });
});