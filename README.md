# Playwright + Cucumber – SauceDemo Automation

This repository contains UI test automation for SauceDemo using:
- Playwright
- Cucumber (BDD)
- TypeScript
- Page Object Model
- GitHub Actions CI

## Project Structure

```
features/            # Feature files (BDD)
step-definitions/    # Step definitions + hooks
pages/               # Page objects
utils/               # Utilities
visual-baseline/     # Future visual regression snapshots
test-results/        # Reports, screenshots, artifacts
.github/workflows/   # CI workflow
```

## Setup

Install dependencies:

```
npm install
npm run playwright:install
```

## Running Tests

Run all:

```
npm test
```

By tag:

```
npm test -- --tags "@smoke"
npm test -- --tags "@regression"
```

Headed mode:

```
HEADLESS=false npm test
```

## Reports

### HTML Report

```
test-results/cucumber-report.html
```

### Allure Report

Generate:

```
npm run report:allure
```

View:

```
npm run report:allure:open
```

## Visual Baseline (Future)

The project includes a placeholder for visual regression:

- Utility: `utils/visualHelper.ts`
- Baseline: `visual-baseline/`

Visual testing can be enabled later and integrated into CI.

## CI Pipeline

The workflow in:

```
.github/workflows/ci.yml
```

runs tests automatically on push and pull requests, and uploads results as artifacts.
