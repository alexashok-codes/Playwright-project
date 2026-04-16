"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopPage = void 0;
class ShopPage {
    constructor(page) {
        this.page = page;
    }
    async gotoShop() {
        await this.page.click('#nav-shop a');
        await this.page.waitForLoadState('networkidle');
    }
    async buyProduct(productName, quantity) {
        for (let i = 0; i < quantity; i++) {
            await this.page.click(`xpath=//h4[text()="${productName}"]/../p/a`);
        }
    }
    async gotoCart() {
        await this.page.click('#nav-cart a');
        await this.page.waitForLoadState('networkidle');
    }
}
exports.ShopPage = ShopPage;
