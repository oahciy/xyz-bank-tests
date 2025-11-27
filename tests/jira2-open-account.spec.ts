// tests/jira2-open-account.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { CustomersPage } from '../pages/CustomersPage';

test.describe('JIRA-2: Bank Manager Operations - Open Account', () => {
  let loginPage: LoginPage;
  let openAccountPage: OpenAccountPage;
  let customersPage: CustomersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    openAccountPage = new OpenAccountPage(page);
    customersPage = new CustomersPage(page);

    await loginPage.goto();
    await loginPage.loginAsBankManager();
    await openAccountPage.navigateTo();
  });

  test('AC 1: Should have Dollar, Pound, Rupee as currency options', async () => {
    const requiredCurrencies = ['Dollar', 'Pound', 'Rupee'];
    await openAccountPage.verifyCurrencyOptions(requiredCurrencies);
  });

  test('AC 2 & 3: Should open account successfully and update table', async ({ page }) => {
    // TODO: You can only search by first name / last name, not by full name
    const customerfName = 'Hermoine';
    const customerlName = 'Granger';
    const customerfullName = `${customerfName} ${customerlName}`;
    const currency = 'Dollar';
    let newAccountNumber = '';

    page.once('dialog', async dialog => {
      const message = dialog.message();
      console.log(`Alert Message: ${message}`);
      
      expect(message).toContain('Account created successfully');
      
      newAccountNumber = message.split(':')[1];
      console.log(`Extracted Account Number: ${newAccountNumber}`);
      
      await dialog.accept();
    });

    await openAccountPage.openAccount(customerfullName , currency);

    await customersPage.navigateTo();
    await customersPage.verifySpecificAccount(customerfName, newAccountNumber);
  });
});