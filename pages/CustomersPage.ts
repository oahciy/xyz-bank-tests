// pages/CustomersPage.ts
import { type Locator, type Page, expect } from '@playwright/test';

export class CustomersPage {
  readonly page: Page;
  readonly customersTab: Locator;
  readonly searchInput: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customersTab = page.getByRole('button', { name: 'Customers' });
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
  }

  async navigateTo() {
    await this.customersTab.click();
  }

  async searchCustomer(name: string) {
    await this.searchInput.fill(name);
  }

  async verifyCustomerExists(firstName: string) {
    await this.searchCustomer(firstName);
    
    await expect(this.tableRows.first()).toContainText(firstName);
  }
}