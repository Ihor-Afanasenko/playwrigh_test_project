import { Page } from "@playwright/test";
import { SingletonPage } from "./singeltonPage";

export class BasePage extends SingletonPage {
  readonly pageTitle: string;
  readonly message: string;

  constructor() {
    super();
    this.pageTitle = ".base";
    this.message = ".page .messages [data-bind^='html']";
  }

  async getPageTitle(page: Page): Promise<string> {
    await page.waitForLoadState("networkidle");
    return await page.locator(this.pageTitle).innerText();
  }

  async getMessage(page: Page): Promise<string> {
    await page.waitForLoadState("networkidle");
    return (await page.locator(this.message).innerText()).trim();
  }

  async open(page: Page, path: string): Promise<void> {
    await page.goto(`${path}`);
    await page.waitForURL(`**${path}`);
  }
}
