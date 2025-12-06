import { Page, Locator } from 'playwright';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
