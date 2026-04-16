import { Page, expect } from '@playwright/test';

type CartData = {
  quantities: Record<string, number>;
  prices: Record<string, number>;
};

export class CartPage {
  constructor(private page: Page) {}

  async getPrice(product: string) {
    return this.page.locator(`xpath=//td[contains(., "${product}")]/following-sibling::td[1]`);
  }

  async getSubtotal(product: string) {
    return this.page.locator(`xpath=//td[contains(., "${product}")]/following-sibling::td[3]`);
  }

  async verifyPrices(testData: CartData) {
    for (const [product, expectedPrice] of Object.entries(testData.prices)) {
      const priceCell = await this.getPrice(product);
      const priceText = await priceCell.textContent();         
      expect(priceText?.trim()).toBe(`$${expectedPrice}`);
    }
  }

  async verifySubtotals(testData: CartData) {
    for (const [product, qty] of Object.entries(testData.quantities) as [string, number][]) {
      const expectedSubtotal = Number((testData.prices[product] * qty).toFixed(2));

      const subtotalCell = await this.getSubtotal(product);     
      const subtotalText = (await subtotalCell.textContent())?.trim();
      expect(subtotalText).toBe(`$${expectedSubtotal.toFixed(2)}`);
    }
  }

  async verifyTotal() {
  // Get all subtotal cells (4th column)
  const subtotalCells = await this.page.locator('//tr[@class="cart-item ng-scope"]/td[4]').allTextContents();

  const numericSubtotals = subtotalCells.map(s =>parseFloat(s.replace('$', '')));

  const expectedTotal = numericSubtotals.reduce((a, b) => a + b, 0);

  // Correct total locator
  const totalText = await this.page.locator('//strong[contains(@class, "total")]').textContent();

  const actualTotal = parseFloat(totalText!.replace('Total:', '').trim());

  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
}
}