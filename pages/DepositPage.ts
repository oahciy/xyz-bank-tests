import { type Locator, type Page, expect } from '@playwright/test';

export class DepositPage {
  readonly page: Page;
  readonly depositTab: Locator;
  readonly amountInput: Locator;
  readonly submitBtn: Locator;
  readonly messageSpan: Locator; // Red message: "Deposit Successful"
  readonly balanceLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.depositTab = page.getByRole('button', { name: 'Deposit' });
    this.amountInput = page.getByPlaceholder('amount');
    this.submitBtn = page.locator('form button[type="submit"]');
    this.messageSpan = page.locator('.error');
    this.balanceLabel = page.locator('div.center strong').nth(1);
  }

  async navigateTo() {
    await this.depositTab.click();
  }

  async makeDeposit(amount: string) {
    await this.amountInput.fill(amount);
    await this.submitBtn.click();
  }

  async getBalance(): Promise<number> {
    const text = await this.balanceLabel.innerText();
    return parseInt(text, 10);
  }

  async verifyRequiredFieldTooltip() {
    const validationMessage = await this.amountInput.evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });

    console.log(`Tooltip message: ${validationMessage}`);

    const acceptableMessages = [
      'Please fill out this field.', //chromium
      'Please fill in this field.', //chromium
      'Fill out this field', // webkit
      'Please enter a number.' // firefox
    ]
    expect(acceptableMessages.some(msg => validationMessage.includes(msg))).toBeTruthy();
  }
}