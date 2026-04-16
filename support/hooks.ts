import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();
setDefaultTimeout(60 * 1000);

Before(async function () {
  // GitHub Actions automatically sets CI=true
  const isCI = process.env.CI === "true";

  this.browser = await chromium.launch({
    headless: isCI ? true : false,         // Headless in CI, headed locally
    args: isCI ? ["--no-sandbox"] : ["--start-maximized"]
  });

  this.context = await this.browser.newContext({
    viewport: isCI ? { width: 1280, height: 720 } : null
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
