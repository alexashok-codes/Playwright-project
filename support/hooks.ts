import {
  Before,
  After,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";

import { chromium, Browser, Page, BrowserContext } from "playwright";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

// Extend Cucumber World
declare module "@cucumber/cucumber" {
  interface World {
    browser: Browser;
    context: BrowserContext;
    page: Page;
  }
}

/**
 * BEFORE HOOK
 */
Before(async function () {
  const isCI = process.env.CI === "true";

  this.browser = await chromium.launch({
    headless: isCI,
    args: isCI ? ["--no-sandbox"] : ["--start-maximized"]
  });

  this.context = await this.browser.newContext({
    viewport: isCI ? { width: 1280, height: 720 } : null
  });

  this.page = await this.context.newPage();
});

/**
 * AFTER HOOK
 */
After(async function (scenario) {
  try {
    // Screenshot only on failure
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({
        fullPage: true
      });

      await this.attach(screenshot, "image/png");
    }
  } catch (err) {
    console.log("After hook error:", err);
  }

  // Cleanup safely
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});