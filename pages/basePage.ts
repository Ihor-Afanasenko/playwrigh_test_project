import { Page, Locator } from "@playwright/test";
import { SingletonPage } from "./singeltonPage";

export class BasePage extends SingletonPage {
  readonly pageTitle: string = ".base";
  readonly message: string = ".page .messages [data-bind^='html']";

  fillField = async (field: Locator, setData: string): Promise<void> => {
    await field.fill(setData);
  };

  typeField = async (field: Locator, setData: string): Promise<void> => {
    await field.type(setData);
  };

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
