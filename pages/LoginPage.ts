import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly bankManagerLoginButton: Locator;
  readonly customerLoginButton: Locator;
  readonly customerNameSelect: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.customerNameSelect = page.locator('#userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    const fullUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';
    await this.page.goto(fullUrl);
  }

  async loginAsBankManager() {
    await this.bankManagerLoginButton.click();
  }

  async loginAsCustomer(name: string) {
    await this.customerLoginButton.click();
    await this.customerNameSelect.selectOption({ label: name });
    await this.loginButton.click();
    await expect(this.page.getByText(`Welcome ${name}`)).toBeVisible();
  }

}

