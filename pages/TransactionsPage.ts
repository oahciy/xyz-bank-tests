import { type Locator, type Page, expect } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;
  readonly transactionsTab: Locator;
  readonly tableRows: Locator;
  readonly backBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transactionsTab = page.getByRole('button', { name: 'Transactions' });
    this.tableRows = page.locator('tbody tr');
    this.backBtn = page.getByRole('button', { name: 'Back' });
  }

  async navigateTo() {
    await this.transactionsTab.click();
  }

  async verifyTransaction(amount: string, type: 'Credit' | 'Debit') {
    
    try {
      await this.tableRows.first().waitFor({ state: 'visible', timeout: 2000 });
    } catch (e) {
      console.log('Table is empty on first load. Attempting to refresh view...');
      
      await this.backBtn.click();
      await this.page.waitForTimeout(500);
      await this.transactionsTab.click();
      
      await this.tableRows.first().waitFor({ state: 'visible', timeout: 10000 });
    }
    // the lastest transaction is the last row
    const lastRow = this.tableRows.last();
    await lastRow.scrollIntoViewIfNeeded();
    
    await expect(lastRow).toContainText(amount);
    await expect(lastRow).toContainText(type);
  }
}