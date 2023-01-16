import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class WishListPage extends BasePage {
  private page: Page;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.endpoint = "/wishlist";
  }

  async itemWithNameVisible(name: string): Promise<boolean> {
    return await this.page
      .locator(`.product-item-name a[title='${name}']`)
      .isVisible();
  }

  async openItemInPreview(name: string): Promise<void> {
    await this.page.locator(`.product-item-name a[title='${name}']`).click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
