"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPage = void 0;
const test_1 = require("@playwright/test");
class ContactPage {
    constructor(page) {
        this.page = page;
        this.submitButton = page.getByText('Submit');
        this.forename = page.locator('#forename');
        this.email = page.locator('#email');
        this.message = page.locator('#message');
        this.forenameError = page.locator('#forename-err');
        this.emailError = page.locator('#email-err');
        this.messageError = page.locator('#message-err');
        this.successMessage = page.locator('.alert-success');
    }
    async clickSubmit() {
        await this.submitButton.click();
    }
    async expectErrorsVisible() {
        await (0, test_1.expect)(this.forenameError).toBeVisible();
        await (0, test_1.expect)(this.emailError).toBeVisible();
        await (0, test_1.expect)(this.messageError).toBeVisible();
    }
    async fillMandatoryFields(data) {
        await this.forename.fill(data.forename);
        await this.email.fill(data.email);
        await this.message.fill(data.message);
    }
    async expectErrorsHidden() {
        await (0, test_1.expect)(this.forenameError).toBeHidden();
        await (0, test_1.expect)(this.emailError).toBeHidden();
        await (0, test_1.expect)(this.messageError).toBeHidden();
    }
    async expectSuccessMessageVisible() {
        await this.successMessage.waitFor({ state: 'attached', timeout: 180000 });
        await (0, test_1.expect)(this.successMessage).toBeVisible({ timeout: 180000 });
        await this.page.locator('.popup.modal').waitFor({ state: 'hidden' });
        await (0, test_1.expect)(this.successMessage).toHaveText(/success|thank/i, { timeout: 180000 });
    }
}
exports.ContactPage = ContactPage;
