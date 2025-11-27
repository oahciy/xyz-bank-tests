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
    //TODO: FInish this test
    await loginPage.loginAsCustomer("Harry Potter");
    await expect(loginPage.page).toHaveURL(/.*account/);
  });
});