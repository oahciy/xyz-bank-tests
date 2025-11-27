import { type Locator, type Page, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly openAccountTab: Locator;
  readonly customerSelect: Locator;
  readonly currencySelect: Locator;
  readonly processBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    
    this.processBtn = page.getByRole('button', { name: 'Process' });
  }

  async navigateTo() {
    await this.openAccountTab.click();
  }

  async openAccount(customerName: string, currency: string) {
    await this.customerSelect.selectOption({ label: customerName });
    await this.currencySelect.selectOption({ label: currency });
    
    await this.processBtn.click();
  }

  // JIRA-2 AC1: Available currencies: Dollar, Pound, Rupee
  async verifyCurrencyOptions(expectedCurrencies: string[]) {
    await this.navigateTo();
    await expect(this.currencySelect).toBeVisible();

    const options = await this.currencySelect.locator('option').allInnerTexts();
    console.log(options);
    for (const currency of expectedCurrencies) {
      expect(options).toContain(currency);
    }
  }
}