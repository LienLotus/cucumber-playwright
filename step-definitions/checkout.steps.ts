import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from './world';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

Given('I have 1 item in the cart', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.isOnProductsPage();
  await productsPage.addBackpackToCart();
});

When('I proceed to checkout and enter details', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.openCart();

  const cartPage = new CartPage(this.page);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.checkout('Lan', 'QA', '70000');
});

Then('I should see the order confirmation message', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.isOrderConfirmed();
  await expect(checkoutPage.confirmationMessage).toBeVisible();
});
