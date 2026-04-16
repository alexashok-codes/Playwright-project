"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const ShopPage_1 = require("../pages/ShopPage");
const CartPage_1 = require("../pages/CartPage");
const testcase3_json_1 = __importDefault(require("../datafiles/testcase3.json"));
(0, cucumber_1.When)('I go to the Shop page from the home page and add all Test Case 3 products to the cart', async function () {
    const shop = new ShopPage_1.ShopPage(this.page);
    await shop.gotoShop();
    await shop.buyProduct('Stuffed Frog', testcase3_json_1.default.quantities['Stuffed Frog']);
    await shop.buyProduct('Fluffy Bunny', testcase3_json_1.default.quantities['Fluffy Bunny']);
    await shop.buyProduct('Valentine Bear', testcase3_json_1.default.quantities['Valentine Bear']);
});
(0, cucumber_1.When)('I go to the cart page', async function () {
    const shop = new ShopPage_1.ShopPage(this.page);
    await shop.gotoCart();
});
(0, cucumber_1.Then)('the price for each Test Case 3 product should be correct', async function () {
    const cart = new CartPage_1.CartPage(this.page);
    await cart.verifyPrices(testcase3_json_1.default);
});
(0, cucumber_1.Then)('the subtotal for each Test Case 3 product should be correct', async function () {
    const cart = new CartPage_1.CartPage(this.page);
    await cart.verifySubtotals(testcase3_json_1.default);
});
(0, cucumber_1.Then)('the total should equal the sum of all Test Case 3 subtotals', async function () {
    const cart = new CartPage_1.CartPage(this.page);
    await cart.verifyTotal();
});
