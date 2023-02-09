import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class WishListPage extends BasePage {
  readonly addPath: string = "/wishlist";

  constructor(private page: Page) {
    super();
  }

  getProductLocatorByName(name: string): Locator {
    return this.page.locator(`.product-item-name a[title='${name}']`);
  }

  async itemWithNameVisible(name: string): Promise<boolean> {
    return await this.getProductLocatorByName(name).isVisible();
  }

  async openItemInPreview(name: string): Promise<void> {
    await this.getProductLocatorByName(name).click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
