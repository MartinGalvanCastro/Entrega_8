import type { IWorldOptions } from "@cucumber/cucumber";
import {
  setWorldConstructor,
  World,
  setDefaultTimeout,
  After,
} from "@cucumber/cucumber";
import { chromium, firefox, webkit, devices } from "@playwright/test";
import type {
  Browser,
  BrowserContext,
  BrowserType,
  Page,
  PlaywrightTestOptions,
  ViewportSize,
} from "@playwright/test";
import "dotenv/config";
import { Faker, faker } from "@faker-js/faker";

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export type Browsers = "chrome" | "firefox" | "safari";

/**
 * Playwright World Interface
 */
export interface IPlaywrightWorld extends World {
  page: Page;
  baseUrl: string;
  selectedBrowser: string;
  adminUser?: string;
  adminPassword?: string;
  playwrightOptions?: PlaywrightTestOptions;
  dataGenerator: Faker;
  init(device: Browsers): Promise<void>;
  teardown(): Promise<void>;
}

/**
 * Playwright World Class
 */
class PlaywrightWorld extends World implements IPlaywrightWorld {
  debug = false;
  baseUrl = "";
  browser!: Browser;
  browserContext!: BrowserContext;
  page!: Page;
  dataGenerator!: Faker;

  constructor(options: IWorldOptions) {
    super(options);
    this.dataGenerator = faker;
  }
  selectedBrowser: Browsers = "chrome";
  adminUser?: string | undefined;
  adminPassword?: string | undefined;
  playwrightOptions?: PlaywrightTestOptions | undefined;

  /**
   * Call this in a Before Hook
   */
  async init(browser: Browsers) {
    this.selectedBrowser = browser;
    this.baseUrl = "https://ghost-al42.onrender.com";
    const headless = process.env.HEAD !== "1";
    this.browser = await chromium.launch({
      headless: headless,
      channel: browser,
    });
    this.browserContext = await this.browser.newContext({
      baseURL: this.baseUrl,
    });
    this.page = await this.browserContext.newPage();
    await this.page.goto("");
    await this.page.waitForURL(this.baseUrl);
  }

  /**
   * Call this in a After Hook
   */
  async teardown() {
    this.page.close();
    this.browserContext.close();
    this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
setDefaultTimeout(40 * 1000);

After(async function (this: IPlaywrightWorld) {
  await this.teardown();
});
