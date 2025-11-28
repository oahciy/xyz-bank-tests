import { type Locator, type Page, expect } from '@playwright/test';

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

  async verifyRequiredFieldTooltip(field: Locator) {
    const validationMessage = await field.evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });

    const acceptableMessages = [
      'Please fill out this field.', // Chromium
      'Please fill in this field.',  // Chromium
      'Fill out this field',         // WebKit
      'Please fill out this field',  // Firefox
    ];

    expect(
      acceptableMessages.some((msg) => validationMessage.includes(msg)),
      `Expected validation message, got: "${validationMessage}"`
    ).toBeTruthy();
  }

  async submitEmptyForm() {
    await this.submitBtn.click();
  }

  async fillFormExcept(
    exclude: 'firstName' | 'lastName' | 'postCode',
    data: { fName?: string; lName?: string; pCode?: string } = {}
  ) {
    const defaults = {
      fName: 'Test',
      lName: 'User',
      pCode: 'EC2M 4AA',
    };

    if (exclude !== 'firstName') {
      await this.firstNameInput.fill(data.fName ?? defaults.fName);
    }
    if (exclude !== 'lastName') {
      await this.lastNameInput.fill(data.lName ?? defaults.lName);
    }
    if (exclude !== 'postCode') {
      await this.postCodeInput.fill(data.pCode ?? defaults.pCode);
    }
  }
}