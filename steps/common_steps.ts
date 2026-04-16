import { Given } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';

Given('I go to the contact page from the home page', async function () {
  const home = new HomePage(this.page);
  await home.goto();
  await home.goToContactPage();
});
