import { Page, Locator, expect } from '@playwright/test';
import process from 'process';

export class HomePage {
  constructor(private page: Page) { }

  async goto() {
    const url = process.env.BASE_URL;
    if (!url) throw new Error('BASE_URL is not defined in environment variables');
    await this.page.goto(url);
  }

  async goToContactPage() {
    const contactLink = this.page.locator('#nav-contact a');

    // Use the universal wait method
    await this.waitUntilVisible(contactLink);

    await contactLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitUntilVisible(locator: Locator, timeout = 30000) {
    // Wait until the element exists in the DOM
    await locator.waitFor({ state: 'attached', timeout });

    // Wait until the element is visible
    await expect(locator).toBeVisible({ timeout });
  }
  

}
