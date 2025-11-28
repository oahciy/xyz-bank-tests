// tests/visual-regression.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddCustomerPage } from '../pages/AddCustomerPage';
import { CustomersPage } from '../pages/CustomersPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { DepositPage } from '../pages/DepositPage';

test.describe('Visual Regression Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Login Page', () => {
    test('should match login page snapshot', async ({ page }) => {
      await expect(page).toHaveScreenshot('login-page.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });
  });

  test.describe('Bank Manager Views', () => {
    test.beforeEach(async () => {
      await loginPage.loginAsBankManager();
    });

    test('should match Add Customer form snapshot', async ({ page }) => {
      const addCustomerPage = new AddCustomerPage(page);
      await addCustomerPage.navigateTo();

      await expect(page).toHaveScreenshot('add-customer-form.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });

    test('should match Open Account form snapshot', async ({ page }) => {
      const openAccountPage = new OpenAccountPage(page);
      await openAccountPage.navigateTo();

      await expect(page).toHaveScreenshot('open-account-form.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });

    test('should match Customers table snapshot', async ({ page }) => {
      const customersPage = new CustomersPage(page);
      await customersPage.navigateTo();

      await page.locator('tbody tr').first().waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot('customers-table.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });
  });

  test.describe('Bank Customer Views', () => {
    test.beforeEach(async () => {
      await loginPage.loginAsCustomer('Hermoine Granger');
    });

    test('should match customer account page snapshot', async ({ page }) => {
      await expect(page).toHaveScreenshot('customer-account.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });

    test('should match deposit form snapshot', async ({ page }) => {
      const depositPage = new DepositPage(page);
      await depositPage.navigateTo();

      await expect(page).toHaveScreenshot('deposit-form.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
      });
    });
  });
});