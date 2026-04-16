import { Page } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async gotoShop() {
    await this.page.click('#nav-shop a');
    await this.page.waitForLoadState('networkidle');
  }

  async buyProduct(productName: string, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.page.click(`xpath=//h4[text()="${productName}"]/../p/a`);
    }
  }

  async gotoCart() {
    await this.page.click('#nav-cart a');
    await this.page.waitForLoadState('networkidle');
  }
}
