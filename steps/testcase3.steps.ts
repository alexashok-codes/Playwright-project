import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { CartPage } from '../pages/CartPage';
import testData from '../datafiles/testcase3.json';


When(
  'I go to the Shop page from the home page and add all Test Case 3 products to the cart',
  async function () {
    const shop = new ShopPage(this.page);

    await shop.gotoShop();

    await shop.buyProduct('Stuffed Frog', testData.quantities['Stuffed Frog']);
    await shop.buyProduct('Fluffy Bunny', testData.quantities['Fluffy Bunny']);
    await shop.buyProduct('Valentine Bear', testData.quantities['Valentine Bear']);
  }
);

When('I go to the cart page', async function () {
  const shop = new ShopPage(this.page);
  await shop.gotoCart();
});

Then('the price for each Test Case 3 product should be correct', async function () {
  const cart = new CartPage(this.page);
  await cart.verifyPrices(testData);
});

Then('the subtotal for each Test Case 3 product should be correct', async function () {
  const cart = new CartPage(this.page);
  await cart.verifySubtotals(testData);
});

Then('the total should equal the sum of all Test Case 3 subtotals', async function () {
  const cart = new CartPage(this.page);
  await cart.verifyTotal();
});
