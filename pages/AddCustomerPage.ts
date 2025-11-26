import { type Locator, type Page } from '@playwright/test';

export class AddCustomerPage {
  readonly page: Page;
  readonly addCustomerTab: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postCodeInput: Locator;

  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    
    this.submitBtn = page.locator('form button[type="submit"]');
  }

  async navigateTo() {
    await this.addCustomerTab.click();
  }

  async createCustomer(fName: string, lName: string, pCode: string) {
    await this.firstNameInput.fill(fName);
    await this.lastNameInput.fill(lName);
    await this.postCodeInput.fill(pCode);
    await this.submitBtn.click();
  }
}