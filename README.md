# XYZ Bank Test Automation

Playwright/TypeScript test automation for the XYZ Bank application using Page Object Model (POM).

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests (all browsers)
npm test

# Run by user story
npm run test:jira1     # JIRA-1: Add Customer
npm run test:jira2     # JIRA-2: Open Account
npm run test:jira3     # JIRA-3: Make Deposit

# Run by test type
npm run test:functional   # All functional tests
npm run test:visual       # Visual regression tests

# Run by browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Update visual snapshots
npm run test:update-snapshots

# View report
npm run report
```

## Test Coverage

| Story                | Tests | Type       |
| -------------------- | ----- | ---------- |
| JIRA-1: Add Customer | 6     | Functional |
| JIRA-2: Open Account | 2     | Functional |
| JIRA-3: Make Deposit | 2     | Functional |
| Visual Regression    | 6     | Visual     |

**Total: 18 tests** (16 functional + 6 visual)

## Project Structure

```
├── pages/           # Page Object Models
├── tests/           # Test specifications
│   ├── jira1-add-customer.spec.ts
│   ├── jira2-open-account.spec.ts
│   ├── jira3-deposit.spec.ts
│   ├── visual-regression.spec.ts
│   └── visual-regression.spec.ts-snapshots/
└── playwright.config.ts
```
