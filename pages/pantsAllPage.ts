import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class PantsAllPage extends BasePage {
  readonly productItem: Locator;
  readonly addPath: string = "/promotions/pants-all.html";

  constructor(private page: Page) {
    super();
    this.productItem = page.locator(".product-item-info");
  }

  async selectItemByName(itemName: string): Promise<void> {
    await this.productItem.filter({ hasText: itemName }).click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
