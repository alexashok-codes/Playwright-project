import { type Locator, type Page, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly forename: Locator;
  readonly email: Locator;
  readonly message: Locator;
  readonly forenameError: Locator;
  readonly emailError: Locator;
  readonly messageError: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
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

  // ------------------------------
  // COMMON REUSABLE HELPERS
  // ------------------------------

  async waitUntilVisible(locator: Locator, timeout = 30000) {
    await locator.waitFor({ state: 'attached', timeout });
    await expect(locator).toBeVisible({ timeout });
  }
async waitForVisibleWithLoop(locator: Locator, timeout = 1500000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await locator.isVisible()) {
        return; // element found ✅
      }
      await this.page.waitForTimeout(5000); // small delay
    }
    throw new Error('Element not visible after timeout');
  }
  // ------------------------------
  // PAGE ACTIONS
  // ------------------------------

  async clickSubmit() {
    await this.submitButton.click();
  }

  async expectErrorsVisible() {
    await expect(this.forenameError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.messageError).toBeVisible();
  }

  async fillMandatoryFields(data: any) {
    await this.forename.fill(data.forename);
    await this.email.fill(data.email);
    await this.message.fill(data.message);
  }

  async expectErrorsHidden() {
    await expect(this.forenameError).toBeHidden();
    await expect(this.emailError).toBeHidden();
    await expect(this.messageError).toBeHidden();
  }

  async expectSuccessMessageVisible() {
    const alert = this.page.locator('.alert.alert-success');
    await this.waitUntilVisible(alert, 180000);
    await this.waitForVisibleWithLoop(alert);
    await expect(alert).toContainText(/thank|success/i);
  }
}
