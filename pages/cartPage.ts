import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  readonly productProperty: Locator;
  readonly addPath: string = "/checkout/cart";

  constructor(private page: Page) {
    super();
    this.productProperty = page.locator(".product-item-details .item-options");
  }

  async getProductProperty(): Promise<string> {
    return await this.productProperty.innerText();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
