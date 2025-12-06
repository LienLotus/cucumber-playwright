import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

Given('I am logged in as {string}', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();

  const user = username === 'standard_user'
    ? process.env.STANDARD_USER || username
    : username;
  const pwd = process.env.STANDARD_PASSWORD || 'secret_sauce';

  await loginPage.login(user, pwd);

  const productsPage = new ProductsPage(this.page);
  await productsPage.isOnProductsPage();
});

When('I add the product {string} to the cart', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page);

  if (productName === 'Sauce Labs Backpack') {
    await productsPage.addBackpackToCart();
  } else {
    throw new Error(`Product "${productName}" is not implemented in step definition yet`);
  }
});

Then('the cart icon badge should show {string}', async function (this: CustomWorld, expectedCount: string) {
  const productsPage = new ProductsPage(this.page);
  const badgeText = await productsPage.getCartBadgeText();
  expect(badgeText).toBe(expectedCount);
});
