import { Page, Locator } from 'playwright';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly backpackAddToCart: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.backpackAddToCart = page.getByRole('button', { name: 'Add to cart', exact: false }).nth(0);
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('[data-test="shopping-cart-badge"]');
  }

  async isOnProductsPage() {
    await this.title.waitFor({ state: 'visible', timeout: 5000 });
    const titleText = (await this.title.textContent())?.trim();
    if (titleText !== 'Products') {
      throw new Error(`Expected to be on Products page, but saw title "${titleText}"`);
    }
  }

  async addBackpackToCart() {
    await this.backpackAddToCart.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getCartBadgeText(): Promise<string | null> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent();
    }
    return null;
  }
}
