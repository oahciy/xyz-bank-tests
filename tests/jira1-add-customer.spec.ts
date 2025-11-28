// tests/jira1-add-customer.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddCustomerPage } from '../pages/AddCustomerPage';
import { CustomersPage } from '../pages/CustomersPage';

test.describe('JIRA-1: Bank Manager Operations - Add Customer', () => {
  let loginPage: LoginPage;
  let addCustomerPage: AddCustomerPage;
  let customersPage: CustomersPage;

  const createdCustomers: string[] = [];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addCustomerPage = new AddCustomerPage(page);
    customersPage = new CustomersPage(page);

    await loginPage.goto();
    await loginPage.loginAsBankManager();
    
    await addCustomerPage.navigateTo();
  });

  test.afterEach(async () => {
    if (createdCustomers.length > 0) {
      await customersPage.navigateTo();
      await customersPage.deleteCustomers(createdCustomers);
      createdCustomers.length = 0;
    }
  });

  test('Should add a new customer successfully and verify in table', async ({ page }) => {
    const fName = 'TestUser';
    const lName = 'AutoTest';
    const pCode = 'E72 5JB';
    
    createdCustomers.push(fName);

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
    const fName = 'Hermoine';
    const lName = 'Granger';
    const pCode = 'E85 9AB';

    page.once('dialog', dialog => dialog.accept());
    await addCustomerPage.createCustomer(fName, lName, pCode);

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Customer may be duplicate');
      await dialog.accept();
    });

    await addCustomerPage.createCustomer(fName, lName, pCode);
  });

  test.describe('AC1: Required Field Validation', () => {
    test('Should show validation error when First Name is empty', async () => {
      await addCustomerPage.fillFormExcept('firstName');
      await addCustomerPage.submitEmptyForm();

      await addCustomerPage.verifyRequiredFieldTooltip(addCustomerPage.firstNameInput);
    });

    test('Should show validation error when Last Name is empty', async () => {
      await addCustomerPage.fillFormExcept('lastName');
      await addCustomerPage.submitEmptyForm();

      await addCustomerPage.verifyRequiredFieldTooltip(addCustomerPage.lastNameInput);
    });

    test('Should show validation error when Post Code is empty', async () => {
      await addCustomerPage.fillFormExcept('postCode');
      await addCustomerPage.submitEmptyForm();

      await addCustomerPage.verifyRequiredFieldTooltip(addCustomerPage.postCodeInput);
    });

    test('Should show validation error when all fields are empty', async () => {
      await addCustomerPage.submitEmptyForm();

      await addCustomerPage.verifyRequiredFieldTooltip(addCustomerPage.firstNameInput);
    });
  });
});