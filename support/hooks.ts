import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();
setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"]
  });

  this.context = await this.browser.newContext({
    viewport: null
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }

  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
