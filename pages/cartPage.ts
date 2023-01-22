import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  private page: Page;
  readonly productProperty: Locator;
  readonly addPath: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.productProperty = page.locator(".product-item-details .item-options");
    this.addPath = "/checkout/cart";
  }

  async getProductProperty(): Promise<string> {
    return await this.productProperty.innerText();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
