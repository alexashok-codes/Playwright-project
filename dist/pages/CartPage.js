"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPage = void 0;
const test_1 = require("@playwright/test");
class CartPage {
    constructor(page) {
        this.page = page;
    }
    async getPrice(product) {
        return this.page.locator(`xpath=//td[contains(., "${product}")]/following-sibling::td[1]`);
    }
    async getSubtotal(product) {
        return this.page.locator(`xpath=//td[contains(., "${product}")]/following-sibling::td[3]`);
    }
    async verifyPrices(testData) {
        for (const [product, expectedPrice] of Object.entries(testData.prices)) {
            const priceCell = await this.getPrice(product);
            const priceText = await priceCell.textContent();
            console.log('Price cell', priceCell);
            console.log('UI Price:', priceText);
            (0, test_1.expect)(priceText === null || priceText === void 0 ? void 0 : priceText.trim()).toBe(`$${expectedPrice}`);
        }
    }
    async verifySubtotals(testData) {
        var _a;
        for (const [product, qty] of Object.entries(testData.quantities)) {
            const expectedSubtotal = Number((testData.prices[product] * qty).toFixed(2));
            const subtotalCell = await this.getSubtotal(product);
            const subtotalText = (_a = (await subtotalCell.textContent())) === null || _a === void 0 ? void 0 : _a.trim();
            (0, test_1.expect)(subtotalText).toBe(`$${expectedSubtotal.toFixed(2)}`);
        }
    }
    async verifyTotal() {
        const subtotalCells = await this.page.locator('td.subtotal').allTextContents();
        const numericSubtotals = subtotalCells.map(s => parseFloat(s.replace('$', '')));
        const expectedTotal = numericSubtotals.reduce((a, b) => a + b, 0);
        const totalText = await this.page.locator('#total').textContent();
        const actualTotal = parseFloat(totalText.replace('Total: $', ''));
        (0, test_1.expect)(actualTotal).toBeCloseTo(expectedTotal, 2);
    }
}
exports.CartPage = CartPage;
