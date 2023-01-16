import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class PantsAllPage extends BasePage {
  private page: Page;
  readonly productItem: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.productItem = page.locator(".product-item-info");
    this.endpoint = "/promotions/pants-all.html";
  }

  async selectItemByName(itemName: string): Promise<void> {
    await this.productItem.filter({ hasText: itemName }).click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
