import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';
import testData from '../datafiles/contactData.json';


When('I click the submit button', async function () {
  const contact = new ContactPage(this.page);
  await contact.clickSubmit();
});

Then('I should see validation error messages for mandatory fields', async function () {
  const contact = new ContactPage(this.page);
  await contact.expectErrorsVisible();
});

When('I populate all mandatory fields', async function () {
  const contact = new ContactPage(this.page);
  await contact.fillMandatoryFields(testData.validData);
});

Then('I should not see any validation error messages', async function () {
  const contact = new ContactPage(this.page);
  await contact.expectErrorsHidden();
});

Then('I should see a successful submission message', async function () {
  const contact = new ContactPage(this.page);
  await contact.expectSuccessMessageVisible();
});
