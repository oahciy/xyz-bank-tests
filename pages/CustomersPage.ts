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

  async clearSearch() {
    await this.searchInput.clear();
  }

  async verifyCustomerExists(firstName: string) {
    await this.searchCustomer(firstName);
    
    await expect(this.tableRows.first()).toContainText(firstName);
  }
  
  async verifySpecificAccount(firstName: string, accountNumber: string) {
    await this.searchCustomer(firstName);
    await expect(this.tableRows.first()).toContainText(accountNumber);
  }

  async deleteCustomer(firstName: string): Promise<boolean> {
    await this.searchCustomer(firstName);
    
    const rowCount = await this.tableRows.count();
    if (rowCount === 0) {
      return false;
    }

    const deleteBtn = this.tableRows.first().getByRole('button', { name: 'Delete' });
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      return true;
    }
    return false;
  }

  async deleteCustomers(firstNames: string[]): Promise<void> {
    for (const firstName of firstNames) {
      await this.deleteCustomer(firstName);
      await this.clearSearch();
    }
  }
}