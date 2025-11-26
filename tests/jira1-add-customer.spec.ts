// tests/jira1-add-customer.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddCustomerPage } from '../pages/AddCustomerPage';
import { CustomersPage } from '../pages/CustomersPage';

test.describe('JIRA-1: Bank Manager Operations - Add Customer', () => {
  let loginPage: LoginPage;
  let addCustomerPage: AddCustomerPage;
  let customersPage: CustomersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addCustomerPage = new AddCustomerPage(page);
    customersPage = new CustomersPage(page);

    await loginPage.goto();
    await loginPage.loginAsBankManager();
    
    await addCustomerPage.navigateTo();
  });

  test('Should add a new customer successfully and verify in table', async ({ page }) => {
    const fName = 'Harry';
    const lName = 'Potter';
    const pCode = 'E72 5JB';

    
    page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      
      expect(dialog.message()).toContain('Customer added successfully');
      
      await dialog.accept();
    });

    await addCustomerPage.createCustomer(fName, lName, pCode);

    await customersPage.navigateTo();
    await customersPage.verifyCustomerExists(fName);
  });

  test('Should show alert when adding a duplicate customer', async ({ page }) => {
    const fName = 'Hermione';
    const lName = 'Granger';
    const pCode = 'E85 9AB';

    page.once('dialog', dialog => dialog.accept());
    await addCustomerPage.createCustomer(fName, lName, pCode);

    page.once('dialog', async dialog => {
      console.log(`Duplicate Dialog message: ${dialog.message()}`);
      
      expect(dialog.message()).toContain('Customer may be duplicate');
      
      await dialog.accept();
    });

    await addCustomerPage.createCustomer(fName, lName, pCode);
  });
});