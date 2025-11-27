import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly bankManagerLoginButton: Locator;
  readonly customerLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
  }

  async goto() {
    const fullUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';
    await this.page.goto(fullUrl);
  }

  async loginAsBankManager() {
    await this.bankManagerLoginButton.click();
  }

  async loginAsCustomer() {
    await this.customerLoginButton.click();
  }

}

