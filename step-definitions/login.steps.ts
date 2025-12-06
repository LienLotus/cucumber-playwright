import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import path from 'path';
import { compareScreenshotWithBaseline } from '../utils/visualHelper';

Given('I open the SauceDemo login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    const user = username === 'standard_user'
      ? process.env.STANDARD_USER || username
      : username;
    const pwd = username === 'standard_user'
      ? process.env.STANDARD_PASSWORD || password
      : password;

    const loginPage = new LoginPage(this.page);
    await loginPage.login(user, pwd);
  }
);

When('I login with username {string}', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
  
  // locked_out_user uses default password from app docs
  await loginPage.login(username, 'secret_sauce');
});

Then('I should be redirected to the Products page', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.isOnProductsPage();

  // Simple visual snapshot of products page
  const filePath = path.join('test-results', 'visual', 'products-page.png');
  await this.page.screenshot({ path: filePath, fullPage: true });
  await compareScreenshotWithBaseline(filePath, 'products-page.png');

  await expect(productsPage.title).toBeVisible();
});

Then('I should see an error message', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.errorMessage.waitFor({ state: 'visible' });
  await expect(loginPage.errorMessage).toBeVisible();
});
