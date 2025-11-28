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
    // 1. Navigate to deposit and wait for form to be ready
    await depositPage.navigateTo();
    await expect(depositPage.amountInput).toBeVisible();

    // 2. Get initial balance
    const initialBalance = await depositPage.getBalance();
    console.log(`Initial Balance: ${initialBalance}`);

    // 3. Make a deposit
    await depositPage.makeDeposit(depositAmount);

    // 4. Verify AC1: success message
    await expect(depositPage.messageSpan).toHaveText('Deposit Successful');

    // 5. Verify AC2: balance update - wait for balance to reflect new value
    const expectedBalance = initialBalance + parseInt(depositAmount);
    await expect(depositPage.balanceLabel).toHaveText(String(expectedBalance));
    const newBalance = await depositPage.getBalance();
    expect(newBalance).toBe(expectedBalance);
    
    // 6. Verify AC3: transaction history
    await transactionsPage.navigateTo();
    await transactionsPage.verifyTransaction(depositAmount, 'Credit');
  });

  test('AC 4: Should show tooltip for empty amount', async ({ page }) => {
    await depositPage.navigateTo();
    await depositPage.submitBtn.click();
    await depositPage.verifyRequiredFieldTooltip();
  });
});