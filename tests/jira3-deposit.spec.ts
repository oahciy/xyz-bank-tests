// tests/jira3-deposit.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DepositPage } from '../pages/DepositPage';
import { TransactionsPage } from '../pages/TransactionsPage';

test.describe('JIRA-3: Bank Customer Operations - Make a Deposit', () => {
  let loginPage: LoginPage;
  let depositPage: DepositPage;
  let transactionsPage: TransactionsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    depositPage = new DepositPage(page);
    transactionsPage = new TransactionsPage(page);

    await loginPage.goto();
    await loginPage.loginAsCustomer('Hermoine Granger');
  });

  test('AC 1, 2 & 3: Should deposit money, update balance and transaction history', async ({ page }) => {
    const depositAmount = '500';

    // 1. Get initial balance
    await depositPage.navigateTo();
    const initialBalance = await depositPage.getBalance();
    console.log(`Initial Balance: ${initialBalance}`);

    // 2. Make a deposit
    await depositPage.makeDeposit(depositAmount);

    // 3. Verify AC1: success message
    await expect(depositPage.messageSpan).toHaveText('Deposit Successful');

    // 4. Verify AC2: balance update
    const newBalance = await depositPage.getBalance();
    expect(newBalance).toBe(initialBalance + parseInt(depositAmount));

    // 5. Verify AC3: transaction history
    await page.waitForTimeout(2000);
    await transactionsPage.navigateTo();
    await transactionsPage.verifyTransaction(depositAmount, 'Credit');
  });

  test('AC 4: Should show tooltip for empty amount', async ({ page }) => {
    await depositPage.navigateTo();
    await depositPage.submitBtn.click();
    await depositPage.verifyRequiredFieldTooltip();
  });
});