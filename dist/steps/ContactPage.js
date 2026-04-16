"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const ContactPage_1 = require("../pages/ContactPage");
const contactData_json_1 = __importDefault(require("../datafiles/contactData.json"));
(0, cucumber_1.When)('I click the submit button', async function () {
    const contact = new ContactPage_1.ContactPage(this.page);
    await contact.clickSubmit();
});
(0, cucumber_1.Then)('I should see validation error messages for mandatory fields', async function () {
    const contact = new ContactPage_1.ContactPage(this.page);
    await contact.expectErrorsVisible();
});
(0, cucumber_1.When)('I populate all mandatory fields', async function () {
    const contact = new ContactPage_1.ContactPage(this.page);
    await contact.fillMandatoryFields(contactData_json_1.default.validData);
});
(0, cucumber_1.Then)('I should not see any validation error messages', async function () {
    const contact = new ContactPage_1.ContactPage(this.page);
    await contact.expectErrorsHidden();
});
(0, cucumber_1.Then)('I should see a successful submission message', async function () {
    const contact = new ContactPage_1.ContactPage(this.page);
    await contact.expectSuccessMessageVisible();
});
